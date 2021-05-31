import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import mapboxgl from 'mapbox-gl';
import Ballade from './Ballade';
import PathProfil from './PathProfil';
import { IgnLayer, mapboxLayer, IgnTypes } from './tileLayers.js'
import ExifDatas from '../../exifdataFile.json'

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
        elem.style.width = '800px'
        //prevent navigator context menu to open on right click
        elem.addEventListener("contextmenu", event => event.preventDefault())


        res(elem)

    })

    myPromise.then((el) => {
        const rootDiv = document.getElementById('root')
        rootDiv.appendChild(el)

        const layerIgnPhotos = IgnLayer(IgnTypes.IgnPhotos)
        const layerIgnPlan = IgnLayer(IgnTypes.IgnPlan)
        const layerMapbox = mapboxLayer
        const layerPov = L.layerGroup([])

        const map = L.map(el.id, {
            center: [42, 5],
            zoom: 10,
            layers: [layerIgnPlan, layerIgnPhotos, layerMapbox,layerPov ]
        })
        const home = map.locate()
        //triggered when a location is found
        map.on('locationfound', (e) => map.panTo(e.latlng))

        //IgnLayer(IgnTypes.IgnPhotos).addTo(map)
        //IgnLayer(IgnTypes.IgnPlan).addTo(map)
        //mapboxLayer.addTo(map)
        const baseMaps = {
            "Photos IGN": layerIgnPhotos,
            "Plan IGN": layerIgnPlan,
            "Mapbox": layerMapbox
        }

        const pov={"pointof view": layerPov}
        L.control.layers(baseMaps,pov).addTo(map)
        /*layer group for the markers*/

        

        /*ajout des markers */
        for (let img of ExifDatas) {
            let [lat, lon] = [img.latitude, img.longitude]
            console.log("lat-long: ", lat, "-", lon);
            if (lat) {

                let markerOption = {
                    title: img.filename
                }

                let M = L.marker([lat, lon], markerOption).addTo(layerPov)
                M.on('mouseover',
                    (event) => {
                        let el = document.getElementById('pano')
                        el.src = img.filename
                    }

                )

            }
        }
        const myTrajet = new Ballade(map)


        const handleClick = (e) => {

            let isCTRLKeyPressed = e.originalEvent.ctrlKey

            let isRightButtonPressed = e.originalEvent.button == 2 ? true : false
            let lat = e.latlng.lat
            let long = e.latlng.lng
            //console.log(e.originalEvent.button);

            if (isCTRLKeyPressed) {
                myTrajet.display()

                myTrajet.addpoint(e.latlng)





            }
            else if (isRightButtonPressed) {
                console.log("longueur du trajet: ", myTrajet.getLength())
                let myProfile = myTrajet.getVerticalProfil()
                myProfile.then(data => {
                    /*création d'une vue qui affiche le profil alti du trajet
                     à l'aide de charte js*/
                    PathProfil(data, "myChart")
                })
                //myTrajet.getElevations()
            }

            else {


                let query = `https://wxs.ign.fr/${IGNTOKEN}/alti/rest/elevation.json?lon=${long}&lat=${lat}`


                getElevation(lat, long)

            }

        }

        map.on('mousedown', handleClick)



        map.on('dblclick', (e) => {
            //recherche le point le plus proche sur le trajet et l'affiche sous forme de marker
            myTrajet.insertpoint(e.layerPoint)



        })




        return el
    })
}
export default LeafletMap