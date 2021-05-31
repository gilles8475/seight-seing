
//import Mapboxmap from './components/mapbox';
import testCreateMap from './components/testCreateMap'
import LeafletMap from './components/LeafletMap'
import PathProfil from './components/PathProfil'
import './style.css'
import ExifDatas from '../exifdataFile.json'

function component() {

    const elem = document.createElement('div')
    elem.id = 'root'
    console.log(ExifDatas);
    // const imgContainer = document.createElement('div')
    
    // imgContainer.style.width = '200px'
    // imgContainer.style.height = '200px'
    
    
    // elem.appendChild(imgContainer)
    const image = document.createElement('img')
    image.id='pano'
    image.src = ExifDatas[0].filename
    image.width=600
    image.height=800
    image.style.objectFit='contain'

    elem.appendChild(image)

    // const m= testCreateMap("test")
    // testCreateMap('test2', 'dark')
    // testCreateMap('test3', 'sat')
    const map = LeafletMap('leaflet')
    //const myChart= PathProfil('myChart', '500px','500px')
    //elem.appendChild(map)
    //PathProfil('myChart').then(htmlElement => elem.appendChild(htmlElement) )
    //elem.appendChild(myProfile)
    // fetch('https://jsonplaceholder.typicode.com/posts/1')
    // .then(res=>res.json())
    // .then(data=>console.log(data))
    // const mapContainer = document.createElement('div');
    // mapContainer.id = 'mapbox'
    // mapContainer.style.height = '500px'

    // elem.appendChild(mapContainer)
    // //const element = document.createElement('div');
    // window.onload = () => {

    //     const myMapbox = Mapboxmap('mapbox')
    // }
    return elem


}

document.body.appendChild(component())