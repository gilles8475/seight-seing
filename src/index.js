
//import Mapboxmap from './components/mapbox';
import testCreateMap from './components/testCreateMap'
import LeafletMap from './components/LeafletMap'
import PathProfil from './components/PathProfil'

function component() {
    
    const elem= document.createElement('div')
    // const m= testCreateMap("test")
    // testCreateMap('test2', 'dark')
    // testCreateMap('test3', 'sat')
    const map= LeafletMap('leaflet')
    //elem.appendChild(map)
    const myProfile = PathProfil('myChart')
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

component()