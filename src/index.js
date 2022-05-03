
import LeafletMap from './components/LeafletMap'
import './style.css'
import ExifDatas from '../exifdataFile.json'
import createContainer from './components/mainContainer'
import DropdownMenu from './components/dropdownMenu'
import recordButton from './components/js/recordButton'
import clearTrackButton from './components/js/clearTrackButton'
import 'bootstrap'
//import 'bootstrap/dist/css/bootstrap.min.css'
import profileButton from './components/js/profileButton'
import updateButton from './components/js/updateButton'
import deleteButton from './components/js/deleteButton'

//import './scss/app.scss';

function component() {
    const idMapContainer = 'map'//the id of the div where leaflet will insert
    const MAINCONTAINER=createContainer('div','main','container-fluid')
    const ROOTCONTAINER = createContainer('div', 'root', 'row')
    const SUBROOTCONTAINER=createContainer('div','subroot','col-sm-7')
    const ROWSUBROOTCONTAINER=createContainer('div','','row')
    SUBROOTCONTAINER.appendChild(ROWSUBROOTCONTAINER)

    const controlContainer = createContainer('div', 'control', 'col-sm-1')
    const BUTTONGROUP = createContainer('div', 'boutons', 'btn-group-vertical col-sm-2')
    const DisplayContainer = createContainer('div', 'display', 'col-sm-5')
    //ROOTCONTAINER.appendChild(DisplayContainer)
    //ROOTCONTAINER.appendChild(controlContainer)
    //controlContainer.appendChild(BUTTONGROUP)

    const createMapContainer = new Promise((res, rej) => {
        const mapContainer = createContainer('div', idMapContainer, 'map col')
        //mapContainer.classList.add('map')
        mapContainer.addEventListener("contextmenu", ev => ev.preventDefault())//disable right click default behaviour
        ROWSUBROOTCONTAINER.appendChild(mapContainer)
        
        res(mapContainer)
    })
    createMapContainer.then((mapContainer) => {
        const { map, activeTrajet } = LeafletMap(idMapContainer)
        return { map, activeTrajet, mapContainer }
    }).then(({ map, activeTrajet, mapContainer }) => {
        
        //ROOTCONTAINER.appendChild(controlContainer)
        ROOTCONTAINER.appendChild(DisplayContainer)
        //SUBROOTCONTAINER.appendChild(BUTTONGROUP)
        ROWSUBROOTCONTAINER.insertBefore(BUTTONGROUP,mapContainer)


        const recBut = recordButton(activeTrajet)
        recBut.classList.add('btn', 'btn-primary')

        const updateBut = updateButton(activeTrajet)
        updateBut.classList.add('btn', 'btn-success')


        const profBut = profileButton(activeTrajet)
        profBut.classList.add('btn', 'btn-danger')

        const clearBut = clearTrackButton(activeTrajet)
        clearBut.classList.add('btn', 'btn-warning')

        const delBut = deleteButton(activeTrajet)
        delBut.classList.add('btn', 'btn-warning')

        BUTTONGROUP.appendChild(recBut)
        BUTTONGROUP.appendChild(updateBut)
        BUTTONGROUP.appendChild(delBut)
        BUTTONGROUP.appendChild(clearBut)
        BUTTONGROUP.appendChild(profBut)
        const menuTracksButton =DropdownMenu(map, activeTrajet)
        menuTracksButton.classList.add('btn-primary')
        BUTTONGROUP.appendChild(menuTracksButton)
        //il faut passer map en parametre au menu pour que les selection du menu s'affiche sur map
    })

    const image = document.createElement('img')
    image.classList.add('img-fluid')
    image.id = 'pano'
    image.src = ExifDatas[0].filename

    DisplayContainer.appendChild(image)


    // mapDiv.appendChild(image)
    // LeafletMap('leaflet')

    //mapDiv.appendChild(MAP)
    ROOTCONTAINER.appendChild(SUBROOTCONTAINER)
    MAINCONTAINER.appendChild(ROOTCONTAINER)
    
    return MAINCONTAINER


}

document.body.appendChild(component())