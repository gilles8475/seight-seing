import { afterRead } from '@popperjs/core'
import { TimeScale } from 'chart.js'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

class Ballade extends Array {

    constructor(idmap, initialPath = []) {
        super()
        this.idmap = idmap
        this.icon = L.divIcon()
        this._path = initialPath //un tableau des coordonnées des points de la trace
        this._path.forEach(item => this.addpoint(item))
        this.track = L.polyline(this._path, { color: 'blue' })//la trace sur la carte
        this.track.on("click", (e) => {
            console.log(e);
            this.insertpoint(e.layerPoint)
        })
        this.odoMarker = L.marker()
        this._title = ""
        this.track.on('mouseover', (e) => {
            this.track.setStyle({ color: 'red' })
        })
        this.track.on('mouseout', (e) => {
            this.track.setStyle({ color: 'blue' })
        })
        //this.track.on('click',(e)=>{console.log(this.track.getPane())})

    }

    display() {
        this.track.addTo(this.idmap)
    }
    get path() {
        return this._path
    }

    set path(path) {
        this.track.setLatLngs([])
        this._path = []
        //remove all marker
        while (this[0]) {
            this[this.length - 1].remove()//remove the marker
            this.pop()
        }
        path.forEach(item => this.addpoint(item))
        //this.track.setLatLngs(path)

    }
    set title(title) {
        this._title = title
    }

    get title() {
        return this._title
    }

    setOdoMarker(length) {

        this.odoMarker.setLatLng(this.getPointFromOdo(length)).addTo(this.idmap)
    }
    addpoint(latlong) {
        //console.log(latlong)
        let newMark = L.marker(latlong, {
            icon: this.icon,
            draggable: true,
        }).addTo(this.idmap)
        this.push(newMark)
        this._path = this.map((value) => value.getLatLng())
        this.track.setLatLngs(this._path)


        newMark.on('drag', () => {
            this.refresh()
        })


    }

    refresh() {
        this._path = this.map((value) => value.getLatLng())
        this.track.setLatLngs(this._path)

    }

    insertpoint(layerpoint) {

        const p = this.track.closestLayerPoint(layerpoint)
        let pos = this.idmap.layerPointToLatLng(p)// donne les coordonnées geo du point
        let newMark = L.marker((pos), { icon: this.icon, draggable: true }).addTo(this.idmap) //crée un marker sur le trajet
        //now we have to integrate this marker in the myPolyline array. myPoliline is an array of marker
        let refDist = this.idmap.distance(pos, this[0].getLatLng())

        let indexToInsert = 0
        //let mytempMap = this.idmap //to refer in the foreach loop

        this.forEach((value, index) => {
            //for each point on the path we check the distance between the point to insert and the point on the path
            let itemDist = this.idmap.distance(pos, value.getLatLng())

            //console.log('distance from index ' + index + '=' + itemDist);
            if (itemDist < refDist) {
                indexToInsert = index
                refDist = itemDist
            }
        }
        )
        //indexToInsert is index of the closest point in the track

        //now we are not sure that the closest point on the path is after or before the point to insert
        //we have to test if the point is before or after the point found on the path
        //to do that, we calculate the distance between the point to insert and the points with indexToInsert and indexToInsert +1 


        if (indexToInsert != 0) {
            let epsilon = 0.001 //marge d'incertitude pour les comparaisons
            let returnedPoint = this[indexToInsert].getLatLng()
            let beforeReturnedPoint = this[indexToInsert - 1].getLatLng()
            let test = (this.idmap.distance(pos, returnedPoint) + this.idmap.distance(pos, beforeReturnedPoint) - epsilon > this.idmap.distance(beforeReturnedPoint, returnedPoint))

            let beforeOrAfter = test ? 0 : 1
            indexToInsert -= beforeOrAfter


        }
        //now we insert the point in tne array
        this.splice(indexToInsert + 1, 0, newMark)
        newMark.on('drag', e => this.refresh())
        this.refresh()


    }

    getTruncatedLength() {
        const truncatePath = this.truncatePath()
        const truncateLength = []

        truncatePath.forEach((value, index, array) => {
            let length = 0
            //iterate on each piece of path
            value.forEach((item, index, array) => {
                length += (index != 0) ? this.idmap.distance(item, array[index - 1]) : 0
            })
            truncateLength.push(length)


        })
        return truncateLength //array cooresponding at the lengths of the parts of path

    }

    getLength() {
        let length = 0
        this._path.forEach((value, index) => {
            index != 0 ? length += this.idmap.distance(value, this._path[index - 1]) : 0
        })
        return length

    }

    getPointFromOdo(length) {
        //return a point on the track given a distance from the origin of the track
        let lref = 0
        let index = 0

        while (lref <= length) {
            //search where is the point on the track
            //loop out when at the index where the point is just before
            index++

            lref += this.idmap.distance(this._path[index], this._path[index - 1])

        }

        let lSegment = this.idmap.distance(this._path[index], this._path[index - 1])//variable to store the length of the segment where the point has be be set

        let reldist = length - lref + lSegment //give the distance on relative length of the searched point on the segment (ie distance from searched point to this._path[index-1])
        //now we have 3 points on a line and two distances. we will use trigo to find the coordinates of the points
        //first we convert lat long in cartesian point
        let P1 = this.idmap.latLngToLayerPoint(this._path[index - 1])
        let P2 = this.idmap.latLngToLayerPoint(this._path[index])
        //then we apply for vector P1M = (reldist/lSegment)P1P2 (since P1 M and P2 are aligned, M is the searched point)

        let X = (reldist / lSegment) * (P2.x - P1.x) + P1.x
        let Y = (reldist / lSegment) * (P2.y - P1.y) + P1.y

        // now we convert this point in geo ref
        let M = this.idmap.layerPointToLatLng([X, Y])
        return M


    }

    async getVerticalProfil(samplingValue = 200) {
        //formatage de la requete vers l'api ign de calcul altimétrique. voirhttps://geoservices.ign.fr/documentation/geoservices/alti.html
        //exemple de requete alti https://wxs.ign.fr/choisirgeoportail/alti/rest/elevation.json?lon=0.2367|2.1570&lat=48.0551|46.6077&indent=true
        // this async method return an object containing points with altitude along the track. the distance
        //between each points on the track is equal to the "sampling"
        //const samplingValue=200 //adjust here if you want different sampling 100 means 1 point each 100m

        const truncatePath = this.truncatePath()
        //console.log("truncated path is", truncatePath);
        const truncateLength = this.getTruncatedLength()
        let index = 0 //for index incrementation below
        let concatResult = []
        for (let path of truncatePath) {

            let lon = []
            let lat = []
            let sampling = Math.ceil(truncateLength[index] / samplingValue)
            //console.log("truncated length index", index, " : ", truncateLength[index]);
            console.log("sampling: ", sampling)
            for (let point of path) {
                //on fait un tableau de lat et un tableau de long
                //create an array of lat
                lat.push(point.lat)
                lon.push(point.lng)
            }

            let reqLon = lon.join('|')
            //console.log(reqLon);

            let reqLat = lat.join('|')
            // console.log(reqLat);
            console.log("lat & lon lengths", lat.length, ":", lon.length);
            let reqAltiIgn = `https://wxs.ign.fr/choisirgeoportail/alti/rest/elevationLine.json?sampling=${sampling}&lon=${reqLon}&lat=${reqLat}&indent=true)`
            const coordinates = await fetch(reqAltiIgn)
                .then(rep => rep.json())
                .then(data => {
                    //console.log(data);
                    let elevationPoints = data.elevations
                    elevationPoints.forEach((value) => {
                        concatResult.push({ point: [value.lat, value.lon], z: value.z })
                        //abscisses represents the distance on the track relative to his origin ie the last point is the length of the track

                        // let abscisses = elevationPoints.map((value, index, array) => {

                        //     const result = index != 0 ? Math.ceil(this.idmap.distance(
                        //         [value.lat, value.lon], [array[index - 1].lat, array[index - 1].lon]
                        //     )) : 0 //give an array representing distance between points
                        //     return result
                    })

                    // console.log("truncate length :", truncateLength);

                    // abscisses[0] = (index != 0) ? truncateLength[index - 1] + this.idmap.distance([elevationPoints.lat, elevationPoints.lon], [last.lat,last.lon]) : 0
                    // last = elevationPoints[elevationPoints.length - 1]//the last point of the sample
                    // for (let i = 1; i < abscisses.length; i++) {
                    //     abscisses[i] += abscisses[i - 1]
                    // }

                    // let ordonnees = data.elevations.map((value) => Math.ceil(value.z))
                    return concatResult
                })

            index += 1

        }
        const SEGMENT = concatResult.map((value, idx, array) => {
            let dist = (idx == 0) ? 0 : this.idmap.distance(value.point, array[idx - 1].point)

            return dist
            //array of distances between points
        })
        let cumulD = 0
        const ABSCISSES =SEGMENT.map((value,idx,array)=>{
            cumulD += (idx==0)? 0:value
            return cumulD
        })

        const ORDONNEES = concatResult.map((value)=>{
            return value.z
        })
        return ([ABSCISSES, ORDONNEES])


    }



    truncatePath() {
        const pathLength = this.path.length
        const troncatedPath = []
        const nPart = Math.floor(this.path.length / 200) //number of pieces of 200 values of the track. 200 seems to be approximatly the max number of points acceptable for the ign vertical profile api
        //cut the path to a given value. Usefull for example if it not possible to get the vertical profile due to a to much number of points
        if (nPart > 0) {

            for (let i = 0; i < nPart; i++) {
                let offset = (i == 0) ? 0 : 1 //offset for slicing array
                troncatedPath.push(this.path.slice(200 * i + offset, 200 * (i + 1)))
            }
            troncatedPath.push(this.path.slice(nPart * 200 + 1))//the rest of the array
            return troncatedPath
        } else {
            return ([this.path])
        }

    }
}

export default Ballade