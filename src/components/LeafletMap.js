import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import mapboxgl from 'mapbox-gl';

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
        const myTrajet = L.polyline(myPolyline, {
            color: 'red',


        })
            .addTo(map)

        // myTrajet.on('mouseover',(e)=>{
        //     myTrajet.bindPopup('<h1>Test popup</h1>').openPopup()


        //})
        var marker = L.marker([44, 5]).addTo(map);


        const handleClick = (e) => {

            let isCTRLKeyPressed = e.originalEvent.ctrlKey
            let isRightButtonPressed = e.originalEvent.button == 2 ? true : false
            let lat = e.latlng.lat
            let long = e.latlng.lng
            //console.log(e.originalEvent.button);

            if (isCTRLKeyPressed) {

                console.log('ctrlkey was pressed')

                //let myPoint=L.circle(e.latlng)
                let myPoint = L.marker(e.latlng, {
                    icon: myDivIcon,
                    draggable: true,
                })
                    .addTo(map)
                myPoint.on('drag', () => {
                    let myPath = myPolyline.map((value) => value.getLatLng())
                    myTrajet.setLatLngs(myPath)
                })

                //ajoute un poin au chemin
                myPolyline.push(myPoint)
                //myPoint.addTo(map)
                let myPath = myPolyline.map((value) => value.getLatLng())
                //console.log(myPath);
                myTrajet.setLatLngs(myPath)

                //console.log(myPolyline);
            } else if (isRightButtonPressed) {
                console.log('rightButton pressed');
                const myTrajet = L.polygon(myPolyline, {
                    color: 'blue',
                    weight: 1,
                })
                    .addTo(map)


            } else {


                let query = `https://wxs.ign.fr/${IGNTOKEN}/alti/rest/elevation.json?lon=${long}&lat=${lat}`


                getElevation(lat, long)

            }

        }

        map.on('mousedown', handleClick)
        //map.on('mousedown', (e) => console.log(e.originalEvent.ctrlKey))


        map.on('dblclick', (e) => {
            //recherche le point le plus proche sur le trajet et l'affiche sous forme de marker

            const a = myTrajet.closestLayerPoint(e.layerPoint)
            console.clear()
            console.log(e.latlng)
            console.log(a);
            let pos = map.layerPointToLatLng(a)// donne les coordonnées geo du point

            let newMark = L.marker((pos), { icon: myDivIcon, draggable: true }).addTo(map) //crée un marker sur le trajet
            //now we have to integrate this marker in the myPolyline array. myPoliline is an array of marker

            let refDist = map.distance(pos, myPolyline[0].getLatLng())
            let indexToInsert = 0
            myPolyline.forEach((value, index) => {
                //for each point on the path we check the distance between the point to insert and the point on the path
                let itemDist = map.distance(pos, value.getLatLng())
                if (itemDist < refDist) {
                    indexToInsert = index
                    refDist = itemDist
                }
            })

            //now we are not sure that the closest point on the path is after or before the point to insert
            //we have to test if the point is before or after the point found on the path
            //to do that we calculate the distance between the point to insert and the points with indexToInsert and indexToInsert +1

            if (indexToInsert != 0) {
                let epsilon = 0.001 //marge d'incertitude pour les comparaisons
                let returnedPoint = myPolyline[indexToInsert].getLatLng()
                let beforeReturnedPoint = myPolyline[indexToInsert - 1].getLatLng()
                let test = (map.distance(pos, returnedPoint) + map.distance(pos, beforeReturnedPoint) - epsilon > map.distance(beforeReturnedPoint, returnedPoint))

                // console.log(
                //     test
                // );


                let beforeOrAfter = test ? 0 : 1
                indexToInsert -= beforeOrAfter


            }
            myPolyline.splice(indexToInsert + 1, 0, newMark)
            let myPath = myPolyline.map((value) => value.getLatLng())
            myTrajet.setLatLngs(myPath)
            console.log(myPolyline.length);


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