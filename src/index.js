
//import Mapboxmap from './components/mapbox';
//import testCreateMap from './components/testCreateMap'
import LeafletMap from './components/LeafletMap'
import PathProfil from './components/PathProfil'
import './style.css'
import ExifDatas from '../exifdataFile.json'


function component() {
    const mapContainer=document.createElement('div')
    mapContainer.id="mapContainer"
    mapContainer.classList.add('mapContainer')
    const elem = document.createElement('div')
    elem.id = 'root'
    elem.appendChild(mapContainer)
    
    const image = document.createElement('img')
    image.classList.add('pano')
    image.id='pano'
    image.src = ExifDatas[0].filename
    
    elem.appendChild(image)

    // const inputList=document.createElement('input')
    // inputList.setAttribute("list","tracks")
    
    // elem.appendChild(inputList)

    // const listTracks=document.createElement('DATALIST')
    // listTracks.setAttribute("id","tracks")
    // const item1=document.createElement("option")
    // item1.setAttribute("value","option1")
    // listTracks.appendChild(item1)
    // elem.appendChild(listTracks)


    const map = LeafletMap('leaflet')
    

    return elem


}

document.body.appendChild(component())