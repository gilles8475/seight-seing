import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
//import mapboxgl from 'mapbox-gl';
import Ballade from './Ballade';
import PathProfil from './PathProfil';
import { IgnLayer, mapboxLayer, IgnTypes } from './tileLayers.js'
import ExifDatas from '../../exifdataFile.json'
import { mapboxToken } from '../../secret'

//icone that will be displayed for markers
import iconPaysage from '../assets/icons8-alpes-80.png'


const IGNTOKEN = 'choisirgeoportail'
//mapboxgl.accessToken = mapboxToken
//const myPolyline = []
let myDivIcon = L.divIcon()
const panoIcon = L.icon({
    iconUrl: iconPaysage,
    iconSize: [20, 20],


})





/* This code is needed to properly load the images in the Leaflet CSS */
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

function getElevation(lat, lng) {
    // Construct the API request to get elevation of a point
    console.log(lat);
    console.log(lng);
    //let querymapbox = 'https://api.mapbox.com/v4/mapbox.mapbox-terrain-v2/tilequery/' + lng + ',' + lat + '.json?layers=contour&limit=50&access_token=' + mapboxToken
    let query = `https://wxs.ign.fr/${IGNTOKEN}/alti/rest/elevation.json?lon=${lng}&lat=${lat}`



    fetch(query)
        .then(res => res.json())
        .then(res => console.log('alti IGN: ' + res.elevations[0].z))




}



function LeafletMap(divRef) {
    //console.log(mapstyle)
    //const style = 'mapbox://styles/mapbox/outdoors-v11'
    //const style= stylesMap[mapstyle]
    //const style = stylesMap.outdoors




    let myPromise = new Promise((res, rej) => {

        const elem = document.createElement('div')
        elem.id = divRef
        elem.classList.add('map')
        
        //prevent navigator context menu to open on right click
        elem.addEventListener("contextmenu", event => event.preventDefault())


        res(elem)

    })

    myPromise.then((el) => {
        const container = document.getElementById('mapContainer')
        container.appendChild(el)

        const layerIgnPhotos = IgnLayer(IgnTypes.IgnPhotos)
        //console.log('loading ign :', IgnTypes.IgnPhotos);
        const layerIgnPlan = IgnLayer(IgnTypes.IgnPlan)
        const layerMapbox = mapboxLayer
        const layerPov = L.layerGroup([])

        const map = L.map(el.id, {
            center: [42, 5],
            zoom: 10,
            layers: [layerIgnPlan, layerIgnPhotos, layerMapbox, layerPov]
        })
        const home = map.locate()
        //triggered when a location is found
        map.on('locationfound', (e) => map.panTo(e.latlng))

        
        const baseMaps = {
            "Photos IGN": layerIgnPhotos,
            "Plan IGN": layerIgnPlan,
            "Mapbox": layerMapbox
        }

        const pov = { "pointof view": layerPov }
        L.control.layers(baseMaps, pov).addTo(map)
        /*layer group for the markers*/



        /*add a marker for each photos in the photos folder, photos datas are stored in ExifDatas*/
        for (let img of ExifDatas) {
            let [lat, lon] = [img.latitude, img.longitude]
            //console.log("lat-long: ", lat, "-", lon);
            if (lat) {

                let markerOption = {
                    title: img.filename,
                    icon:panoIcon
                }

                let M = L.marker([lat, lon], markerOption).addTo(layerPov)
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
        const myTrajet = new Ballade(map)
        //create a button
        const menuContainer=document.createElement('div')
        menuContainer.classList.add('menuContainer')
        container.appendChild(menuContainer)
        const but=document.createElement('button')
        but.classList.add('button')
        but.innerHTML="Store track"
        but.onclick= ()=>{
            if (myTrajet.path[0]){
                let n=localStorage.length+1 //will serve as id of the trajet
                n="track"+n
                myTrajet.title=prompt("Enter a title for this track")
                const storeData= {title:myTrajet.title, path:myTrajet.path}
                
                localStorage.setItem(n,JSON.stringify(storeData))

            }else {
                alert('there is no trajet')
            }
        }
        menuContainer.appendChild(but)

        //-------------test local storage storage
            const x=JSON.parse(localStorage.getItem("track1"))
            
            myTrajet.path=x.path
            myTrajet.display()
        //--------------------------------------
        //create a menu with an item for each stored track
        const dropDown=document.createElement('div')
        const txt=document.createTextNode('Select a track')
        dropDown.appendChild(txt)
        dropDown.classList.add('dropdown')
        const dropDownContent=document.createElement('div')
        dropDownContent.classList.add('dropdowncontent')
        dropDown.appendChild(dropDownContent)
        menuContainer.appendChild(dropDown)
        let l=localStorage.length
        for (let i=0;i<l;i++){
            let name=localStorage.key(i)//return the key of the i-th element stored in the browser
            let item=JSON.parse(localStorage.getItem(name))
            let menuItem=document.createElement('div')
            menuItem.innerHTML=item.title
            console.log("creating :",item.title )
            dropDownContent.appendChild(menuItem)
        }

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
                    PathProfil(data, "myChart",myTrajet)

                    /*test de la methode getPointFromOdo de la classe ballade
                    //on met un marker au milieu du trajet
                    let middlePoint= myTrajet.getPointFromOdo(0*myTrajet.getLength()/1)
                    const middleMarker= L.marker(middlePoint).addTo(map)*/
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
            //insert un point sur le trajet
            myTrajet.insertpoint(e.layerPoint)



        })




        return el
    })
}
export default LeafletMap