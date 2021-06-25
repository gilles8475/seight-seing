import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

class Ballade extends Array {

    constructor(idmap, initialPath=[]) {
        super()
        this.idmap = idmap
        this.icon = L.divIcon()
        this._path = initialPath //un tableau des coordonnées des points de la trace
        this._path.forEach(item=>this.addpoint(item))
        this.track = L.polyline(this._path, { color: 'red' })//la trace sur la carte
        this.odoMarker=L.marker()
        this._title=""
    }

    display() {
        this.track.addTo(this.idmap)
    }
    get path() {
        return this._path
    }

    set path(path) {
        //remove all marker
        while(this[0]){
            this[this.length-1].remove()//remove the marker
            this.pop()
        }
        path.forEach(item=>this.addpoint(item))
        //this.track.setLatLngs(path)

    }
    set title(title){
        this._title=title
    }

    get title(){
        return this._title
    }

    setOdoMarker(length){
        
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

    getLength() {
        let length = 0
        this._path.forEach((value, index) => {
            index != 0 ? length += this.idmap.distance(value, this._path[index - 1]) : 0
        })
        return length

    }

    getPointFromOdo(length){
        //return a point on the track given a distance from the origin of the track
        let lref=0
        let index=0
       
        while (lref<=length){
            //search where is the point on the track
            //loop out when at the index where the point is just before
            index++
            
            lref+=this.idmap.distance(this._path[index],this._path[index-1])
            
        }
        
        let lSegment= this.idmap.distance(this._path[index],this._path[index-1])//variable to store the length of the segment where the point has be be set
        
        let reldist= length-lref+lSegment //give the distance on relative length of the searched point on the segment (ie distance from searched point to this._path[index-1])
        //now we have 3 points on a line and two distances. we will use trigo to find the coordinates of the points
        //first we convert lat long in cartesian point
        let P1=this.idmap.latLngToLayerPoint(this._path[index-1])
        let P2=this.idmap.latLngToLayerPoint(this._path[index])
        //then we apply for vector P1M = (reldist/lSegment)P1P2 (since P1 M and P2 are aligned, M is the searched point)

        let X= (reldist/lSegment)*(P2.x-P1.x)+P1.x
        let Y= (reldist/lSegment)*(P2.y-P1.y)+P1.y

        // now we convert this point in geo ref
        let M= this.idmap.layerPointToLatLng([X,Y])
        return M
        

    }

    async getVerticalProfil() {
        //formatage de la requete vers l'api ign de calcul altimétrique. voirhttps://geoservices.ign.fr/documentation/geoservices/alti.html
        //exemple de requete alti https://wxs.ign.fr/choisirgeoportail/alti/rest/elevation.json?lon=0.2367|2.1570&lat=48.0551|46.6077&indent=true
        // this async method return an object containing points with altitude along the track. the distance
        //between each points on the track is equal to the "sampling"
        const samplingValue=100 //adjust here if you want different sampling 100 means 1 point each 100m

        let lon = []
        let lat = []
        let sampling = Math.ceil(this.getLength() / samplingValue) 

        for (let point of this._path) {
            //on fait un tableau de lat et un tableau de long
            //create an array of lat
            lat.push(point.lat)
            lon.push(point.lng)
        }
        
        let reqLon = lon.join('|')
        
        let reqLat = lat.join('|')
        let reqAltiIgn = `https://wxs.ign.fr/choisirgeoportail/alti/rest/elevationLine.json?sampling=${sampling}&lon=${reqLon}&lat=${reqLat}&indent=true)`


        const coordinates= await fetch(reqAltiIgn)
            .then(rep => rep.json())
            .then(data => {
                let elevationPoints = data.elevations
                console.log("élévation points: ",elevationPoints);
                //abscisses represent the distance on the track relative to his origin ie the last point is the length of the track
                let abscisses = elevationPoints.map((value, index) => {

                    const result = index != 0 ? Math.ceil(this.idmap.distance(
                        [value.lat, value.lon], [elevationPoints[index - 1].lat, elevationPoints[index - 1].lon]
                    ) ): 0
                    return result
                })
                for (let i=1; i< abscisses.length; i++){
                    abscisses[i]+=abscisses[i-1]
                }

                let ordonnees= data.elevations.map((value)=> Math.ceil(value.z))
                //console.log("abscisses: ",abscisses)
                //console.log("ordonnées: ",ordonnees)
                return([abscisses,ordonnees])
            })
        return coordinates
    }
}

export default Ballade