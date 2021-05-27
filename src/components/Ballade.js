import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

class Ballade extends Array {

    constructor(idmap) {
        super()
        this.idmap = idmap
        this.icon = L.divIcon()
        this._path = [] //un tableau des coordonnées des points de la trace
        this.track = L.polyline(this._path, { color: 'red' })//la trace sur la carte
    }

    display() {
        this.track.addTo(this.idmap)
    }
    get path() {
        return this._path
    }

    set path(path) {
        this._path = path
        this.track.setLatLngs(path)

    }

    addpoint(latlong) {
        let newMark = L.marker(latlong, {
            icon: this.icon,
            draggable: true,
        }).addTo(this.idmap)
        this.push(newMark)
        this.path = this.map((value) => value.getLatLng())
        //this.track.setLatLngs(this._path)


        newMark.on('drag', () => {
            this.refresh()
        })


    }

    refresh() {
        this.path = this.map((value) => value.getLatLng())

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
            
            console.log('distance from index ' + index + '=' + itemDist);
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

    getElevations(){
        //formatage de la requete vers l'api ign de calcul altimétrique. voirhttps://geoservices.ign.fr/documentation/geoservices/alti.html
        //exemple de requete alti https://wxs.ign.fr/choisirgeoportail/alti/rest/elevation.json?lon=0.2367|2.1570&lat=48.0551|46.6077&indent=true
        
        let lon=[]
        let lat=[]
        
        for (let point of this._path){
            //on fait un tableau de lat et un tableau de long
            lat.push(point.lat)
            lon.push(point.lng)
        }

        let reqLon= lon.join('|')
        let reqLat = lat.join('|')
        let reqAltiIgn = `https://wxs.ign.fr/choisirgeoportail/alti/rest/elevation.json?lon=${reqLon}&lat=${reqLat}&indent=true)`
        console.log(reqAltiIgn)

        fetch(reqAltiIgn)
        .then(rep=>rep.json())
        .then(data=>console.log(data))
    }
}

export default Ballade