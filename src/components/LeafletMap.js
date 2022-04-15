import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import Ballade from './Ballade';
import PathProfil from './PathProfil';
import { IgnLayer, mapboxLayer, IgnTypes } from './tileLayers.js'
import ExifDatas from '../../exifdataFile.json'
import dropdown from './dropdownMenu'
//icone that will be displayed for markers
import iconPaysage from '../assets/icons8-alpes-80.png'
import iconPosition from '../assets/arrow4.png'


const IGNTOKEN = 'choisirgeoportail'
//mapboxgl.accessToken = mapboxToken
//const myPolyline = []
let myDivIcon = L.divIcon()
const panoIcon = L.icon({
    iconUrl: iconPaysage,
    iconSize: [20, 20],
})
const currentPositionIcon=L.icon({
    iconUrl: iconPosition,
    iconSize: [20,20]
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
    //this function is called in index.js to show a leaflet container

    let myPromise = new Promise((res, rej) => {
        //create the main container for the map

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
        map.on('locationfound', (e) => {
            map.flyTo(e.latlng)
            L.marker(e.latlng,{icon:currentPositionIcon,title:"You are here"}).addTo(map);
        })

        
        const baseMaps = {
            "Photos IGN": layerIgnPhotos,
            "Plan IGN": layerIgnPlan,
            "Mapbox": layerMapbox
        }

        const pov = { "point of view": layerPov }
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
                //create popup for each marker showing the image
                let markerPopupContent=`<img width=400 src=${img.filename}>`
                let markerPopupOption={
                    maxWidth:400,
                    attribution: "photo perso"
                    
                }
                M.bindPopup(markerPopupContent,markerPopupOption)
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
        
        //add a popup
        myTrajet.track.bindPopup('<h1>hello gilles</h1>')
        //create a button
        const menuContainer=document.createElement('div')//the container that contains the buttons
        menuContainer.classList.add('menuContainer')
        container.appendChild(menuContainer)
        
        const but=document.createElement('button')
        but.classList.add('button')
        but.innerHTML="Store track"
        but.onclick= ()=>{
            if (myTrajet.path[0]){
                let n=localStorage.length+1 //will serve as id of the trajet
                n="trackId"+n
                console.log(myTrajet.title);
                myTrajet.title=prompt("Enter a title for this track",myTrajet.title)
                
                const storeData= {title:myTrajet.title, path:myTrajet.path}
                const JsonData=JSON.stringify(storeData)
                console.log("la donnée à stocker est: ",JsonData)
                localStorage.setItem(n,JsonData)
                //window.location.reload()
                
                fetch('http://localhost:3000/update',{
                    method:'POST',

                    body:JsonData,
                    headers: {
                        'Content-Type': 'application/json',
                        
                    },
                    
                }).then(data=>data.json())
                .then((json)=>{console.log(json)})
               

            }else {
                alert('there is no trajet')
            }
        }
        menuContainer.appendChild(but)

        //this is a test of modular dropdown menu
        menuContainer.appendChild(dropdown(myTrajet))
        
        //create a menu with an item for each stored track
        const dropDown=document.createElement('div')
        const txt=document.createTextNode("Select a track \n (local storage)")
        dropDown.appendChild(txt)
        dropDown.classList.add('dropdown') //   applique le style css dropdown
        const dropDownContent=document.createElement('div')
        dropDownContent.classList.add('dropdowncontent')
        dropDown.appendChild(dropDownContent)
        menuContainer.appendChild(dropDown)

        let l=localStorage.length
        for (let i=0;i<l;i++){
            let name=localStorage.key(i)//return the key of the i-th element stored in the browser
            let item=JSON.parse(localStorage.getItem(name))
            let menuItem=document.createElement('div')
            menuItem.onclick= (event)=>{
                dropDownContent.style.display=""
                
                myTrajet.path=item.path
                myTrajet.title=item.title
                myTrajet.display()
            }
            menuItem.innerHTML=item.title
            menuItem.id="trackId"+(i+1)
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