import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import mapboxgl from 'mapbox-gl';
import Ballade from './Ballade';

const mapboxAccessToken = 'pk.eyJ1IjoiZ2lsbGVzODQ3NSIsImEiOiJjazdmcmtuM2YwNWZrM2VuNjlrbnNldGI3In0.NVN_OrsfDaW6RfsQzwY4jg';
const IGNTOKEN = 'choisirgeoportail'
mapboxgl.accessToken = mapboxAccessToken
const myPolyline = []
let myDivIcon = L.divIcon()

/* This code is needed to properly load the images in the Leaflet CSS */
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

function getElevation(lat, lng) {
    // Construct the API request
    console.log(lat);
    console.log(lng);
    let querymapbox = 'https://api.mapbox.com/v4/mapbox.mapbox-terrain-v2/tilequery/' + lng + ',' + lat + '.json?layers=contour&limit=50&access_token=' + mapboxgl.accessToken
    let query = `https://wxs.ign.fr/${IGNTOKEN}/alti/rest/elevation.json?lon=${lng}&lat=${lat}`



    fetch(query)
        .then(res => res.json())
        .then(res => console.log('alti IGN: ' + res.elevations[0].z))




}



function LeafletMap(divRef, mapstyle = 'outdoors') {
    //console.log(mapstyle)
    //const style = 'mapbox://styles/mapbox/outdoors-v11'
    //const style= stylesMap[mapstyle]
    //const style = stylesMap.outdoors




    let myPromise = new Promise((res, rej) => {
        const elem = document.createElement('div')
        elem.id = divRef
        elem.style.height = '600px'
        elem.addEventListener("contextmenu", event => event.preventDefault())
        document.body.appendChild(elem)

        res(elem)

    })

    myPromise.then((el) => {

        const map = L.map(divRef).setView([44.14, 5.05], 13)
        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox/outdoors-v11',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: mapboxAccessToken
        }).addTo(map);
        //ajoute un trajet à la carte
        // const myTrajet = L.polyline(myPolyline, {
        //     color: 'red',
        // })

        const myTrajet = new Ballade(map)


        const handleClick = (e) => {

            let isCTRLKeyPressed = e.originalEvent.ctrlKey

            let isRightButtonPressed = e.originalEvent.button == 2 ? true : false
            let lat = e.latlng.lat
            let long = e.latlng.lng
            //console.log(e.originalEvent.button);

            if (isCTRLKeyPressed) {
                myTrajet.display()
                console.log('ctrlkey was pressed')
                myTrajet.addpoint(e.latlng)


               


            } else {


                let query = `https://wxs.ign.fr/${IGNTOKEN}/alti/rest/elevation.json?lon=${long}&lat=${lat}`


                getElevation(lat, long)

            }

        }

        map.on('mousedown', handleClick)



        map.on('dblclick', (e) => {
            //recherche le point le plus proche sur le trajet et l'affiche sous forme de marker
            myTrajet.insertpoint(e.layerPoint)
            


        })
        let popup = L.popup({
            maxWidth: 300,
        })
            .setLatLng([43, 2])
            .setContent('<img width=200 src="./photos/dentelles.jpg" alt="dentelles" />').addTo(map)



        return map
    })
}
export default LeafletMap