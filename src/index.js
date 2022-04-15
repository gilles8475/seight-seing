
import LeafletMap from './components/LeafletMap'
import './style.css'
import ExifDatas from '../exifdataFile.json'


function component() {
    //create the container that will include the map
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

    LeafletMap('leaflet')
    

    return elem


}

document.body.appendChild(component())