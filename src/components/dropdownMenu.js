import tracks from '../../utils/tracks-records.json'
import Ballade from './Ballade'
import calculProfile from './js/calculProfile'


//create a dropdown menu to access the recorded tracks
//this dropdown menu is created from data coming from the tracks-records.json file
const  DropdownMenu =(map,trajet)=>{

    //const trace=new Ballade(map) //instantiate a void Ballade
    //creation d'un menu déroulant bootstrap 5
    const divMenu=document.createElement('div')
    divMenu.classList.add('btn-group')
    
    const dropDown = document.createElement('button')
    dropDown.classList.add('btn','btn-primary','dropdown-toggle','row')
    
    dropDown.setAttribute('type','button')
    dropDown.setAttribute('data-bs-toggle','dropdown')
    
    const txt = document.createTextNode('Select a track')
    dropDown.appendChild(txt)
    divMenu.appendChild(dropDown)

    
    const dropDownContent = document.createElement('ul')
    dropDownContent.classList.add('dropdown-menu')
    divMenu.appendChild(dropDownContent)
   
    
    for (let path of tracks){
        //for each records in tracks-record.json create an item menu
        //this is done accordingly to bootstrap 5 rules for a drop down menu
        let _li=document.createElement('li')
        let menuItem=document.createElement('a')
        menuItem.classList.add('dropdown-item')
        
        menuItem.innerHTML=path.title
        menuItem.id=path._id
        _li.appendChild(menuItem)
        menuItem.onclick=(ev)=>{
            console.log(path.path);
            trajet.path=path.path
            trajet.title=path.title
            trajet.id = path.id //this property is not part of the class and his only used for update purpose
            console.log(trajet.id);
            trajet.display()
            calculProfile(trajet)
            const bound = trajet.track.getBounds()//rectangular limits of the trajet
            map.flyToBounds(bound)//center map on the track
        }

        dropDownContent.appendChild(_li)
        
    }
    return divMenu
}
export default DropdownMenu