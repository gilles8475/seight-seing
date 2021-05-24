import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

class Ballade extends Array {

    constructor(map){
        super()
        this.map=map
        this.icon= L.divIcon()
    }

    addpoint(latlong){
        let newPoint=L.marker(e.latlng, {
            icon: myDivIcon,
            draggable: true,
        }).addTo(map)
        


    }
}