import tracks from '../../utils/tracks-records.json'
import Ballade from './Ballade'
import calculProfile from './js/calculProfile'

//create a dropdown menu to access the recorded tracks
//this dropdown menu is created from data coming from the tracks-records.json file
const  DropdownMenu =(map)=>{

    const trace=new Ballade(map) //instantiate a void Ballade
    const dropDown = document.createElement('div')
    const txt = document.createTextNode('Select a track')
    dropDown.appendChild(txt)
    dropDown.classList.add('dropdown')
    const dropDownContent = document.createElement('div')
    dropDownContent.classList.add('dropdowncontent')
    dropDown.appendChild(dropDownContent)
   
    
    for (let path of tracks){
        //for each records in tracks-record.json create an item menu
        let menuItem=document.createElement('div')
        menuItem.innerHTML=path.title
        menuItem.id=path._id

        menuItem.onclick=(ev)=>{
            console.log(path.path);
            trace.path=path.path
            trace.title=path.title
            trace.display()
            calculProfile(trace)
            map.flyTo(trace.path[0])//center map on first point of 
        }

        dropDownContent.appendChild(menuItem)
        
    }
    return dropDown
}
export default DropdownMenu