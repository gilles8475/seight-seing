import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import '../style.css'
import Ballade from './Ballade';
import PathProfil from './js/PathProfil';
import { IgnLayer, mapboxLayer, IgnTypes, mapboxOutdoor } from './tileLayers.js'
import ExifDatas from '../../exifdataFile.json'
//import dropdown from './dropdownMenu'
//icone that will be displayed for markers
import iconPaysage from '../assets/icons8-alpes-80.png'
import iconPosition from '../assets/arrow4.png'
import HandleClickOnMap from './js/HandleClickOnMap'
import Tour_du_ventoux from '../assets/map.geojson'


//mapboxgl.accessToken = mapboxToken
//const myPolyline = []
let myDivIcon = L.divIcon()
const panoIcon = L.icon({
    iconUrl: iconPaysage,
    iconSize: [20, 20],
})
const currentPositionIcon = L.icon({
    iconUrl: iconPosition,
    iconSize: [20, 20]
})





/* This code is needed to properly load the images in the Leaflet CSS */
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});


function LeafletMap(divRef) {



    
    const layerIgnPhotos = IgnLayer(IgnTypes.IgnPhotos)
    //console.log('loading ign :', IgnTypes.IgnPhotos);
    const layerIgnPlan = IgnLayer(IgnTypes.IgnPlan)
    const layerMapbox = mapboxLayer
    const layerMapBoxOutdoor = mapboxOutdoor
    const layerPov = L.layerGroup([])
    const layerMarket=L.layerGroup([])
    const layerGeoJson=L.layerGroup([])

    const map = L.map(divRef, {
        center: [42, 5],
        zoom: 10,
        //layers: [layerIgnPlan, layerIgnPhotos, layerMapbox,layerMapBoxOutdoor, layerPov]
        layers: [layerMapbox, layerPov,layerMarket]
        //layers: layerIgnPhotos
    })
    map.locate()
    //triggered when a location is found
    map.on('locationfound', (e) => {
        map.flyTo(e.latlng)
        L.marker(e.latlng, { icon: currentPositionIcon, title: "You are here" }).addTo(map);
    })

    
    const baseMaps = {
        "Photos IGN": layerIgnPhotos,
        "Plan IGN": layerIgnPlan,
        "Mapbox": layerMapbox,
        "Mapbox outdoor": layerMapBoxOutdoor,
    }

    const pov = { 
        "point of view": layerPov,
        "marketplace": layerMarket,
        "Circuits" : layerGeoJson
     }
    L.control.layers(baseMaps, pov).addTo(map)
    /*layer group for the markers*/

     //add a geojson layer it is a test
     const myLayer = L.geoJSON().addTo(layerGeoJson)
     myLayer.addData(Tour_du_ventoux)
     //L.geoJSON(Tour_du_ventoux).addTo(Map)

    /*add a marker for each photos in the photos folder, photos datas are stored in ExifDatas*/
    for (let img of ExifDatas) {
        let [lat, lon] = [img.latitude, img.longitude]
        //console.log("lat-long: ", lat, "-", lon);
        if (lat) {

            let markerOption = {
                title: img.filename,
                icon: panoIcon
            }

            let M = L.marker([lat, lon], markerOption).addTo(layerPov)
            //create popup for each marker showing the image
            let markerPopupContent = `<img width=400 src=${img.filename}>`
            let markerPopupOption = {
                maxWidth: 400,
                attribution: "photo perso"

            }
            M.bindPopup(markerPopupContent, markerPopupOption)
            //change the image in the 'pano' element to see the associated image
            M.on('mouseover',
                (event) => {
                    let el = document.getElementById('pano')
                    el.src = img.filename
                }

            )

        }
    }
    //instanciate a ballade
    const activeTrajet = new Ballade(map)

    //add a popup
    activeTrajet.track.bindPopup('<h1>popup</h1>')

    //create a button

    HandleClickOnMap(map, activeTrajet,layerMarket)

    return { map, activeTrajet }

}
export default LeafletMap