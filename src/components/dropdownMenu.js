import tracks from '../../utils/tracks-records.json'
import Ballade from './Ballade';
//create a dropdown menu to access the recorded tracks
const  DropdownMenu =(trajet)=>{

    const dropDown = document.createElement('div')
    const txt = document.createTextNode('Select a track(mongo storage)')
    dropDown.appendChild(txt)
    dropDown.classList.add('dropdown')
    const dropDownContent = document.createElement('div')
    dropDownContent.classList.add('dropdowncontent')
    dropDown.appendChild(dropDownContent)
   
    
    for (let path of tracks){

        let menuItem=document.createElement('div')
        menuItem.innerHTML=path.title
        menuItem.id=path._id

        menuItem.onclick=(ev)=>{
            console.log(path.path);
            trajet.path=path.path
            trajet.title=path.title
            trajet.display()
        }

        dropDownContent.appendChild(menuItem)
        
    }
    return dropDown
}
export default DropdownMenu