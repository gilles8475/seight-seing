
import LeafletMap from './components/LeafletMap'
import './style.css'
import ExifDatas from '../exifdataFile.json'
import createContainer from './components/mainContainer'
import DropdownMenu from './components/dropdownMenu'
import recordButton from './components/js/recordButton'
import 'bootstrap'
//import 'bootstrap/dist/css/bootstrap.min.css'
import profileButton from './components/js/profileButton'

//import './scss/app.scss';

function component() {
    const idMapContainer = 'map'//the id of the div where leaflet will insert
    const ROOTCONTAINER = createContainer('div', 'root', 'row')
    const controlContainer = createContainer('div', 'control', 'col-sm-2')
    const BUTTONGROUP = createContainer('div', 'boutons', 'btn-group-vertical')
    const DisplayContainer = createContainer('div', 'display', 'col-sm-4')
    ROOTCONTAINER.appendChild(DisplayContainer)
    ROOTCONTAINER.appendChild(controlContainer)
    controlContainer.appendChild(BUTTONGROUP)

    const createMapContainer = new Promise((res, rej) => {
        const ctn = createContainer('div', idMapContainer, 'col-sm-6 map')
        //ctn.classList.add('map')
        ctn.addEventListener("contextmenu", ev => ev.preventDefault())//disable right click default behaviour
        ROOTCONTAINER.appendChild(ctn)
        res(ctn)
    })
    createMapContainer.then((el) => {
        const { map, activeTrajet } = LeafletMap(idMapContainer)
        return { map, activeTrajet }
    }).then(({ map, activeTrajet }) => {
        const button = recordButton(activeTrajet)
        button.classList.add('btn', 'btn-primary')
        BUTTONGROUP.appendChild(button)
        const profBut = profileButton(activeTrajet)
        profBut.classList.add('btn', 'btn-danger')
        BUTTONGROUP.appendChild(profBut)
        BUTTONGROUP.appendChild(DropdownMenu(map))
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

    return ROOTCONTAINER


}

document.body.appendChild(component())