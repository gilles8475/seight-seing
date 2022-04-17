
import LeafletMap from './components/LeafletMap'
import './style.css'
import ExifDatas from '../exifdataFile.json'
import createContainer from './components/mainContainer'
import DropdownMenu from './components/dropdownMenu'
//import 'bootstrap'
//import './scss/app.scss';

function component() {
    const idMapContainer='map'//the id of the div where leaflet will insert
    const ROOTCONTAINER=createContainer('div','root','root')
    const controlContainer=createContainer('div','control','control')
    //create the container that will include the map
    const DisplayContainer=createContainer('div','display','display')
    ROOTCONTAINER.appendChild(DisplayContainer)
    ROOTCONTAINER.appendChild(controlContainer)
    const createMapContainer= new Promise((res,rej) => {
        const ctn=createContainer('div' ,idMapContainer,'map')
        //ctn.classList.add('map')
        ctn.addEventListener("contextmenu",ev=>ev.preventDefault())//disable right click default behaviour
        ROOTCONTAINER.appendChild(ctn)
        res(ctn)
    })
    createMapContainer.then((el) => {
        const map = LeafletMap(idMapContainer)
        return map
    }).then((map)=>{
        controlContainer.appendChild(DropdownMenu(map))
        //il faut passer map en parametre au menu pour que les selection du menu s'affiche sur map
    })
    
    const image = document.createElement('img')
    image.classList.add('pano')
    image.id='pano'
    image.src = ExifDatas[0].filename
    
    DisplayContainer.appendChild(image)
    
    
    // mapDiv.appendChild(image)
    // LeafletMap('leaflet')

    //mapDiv.appendChild(MAP)
    
    return ROOTCONTAINER


}

document.body.appendChild(component())