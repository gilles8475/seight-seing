import tracks from '../../utils/tracks-records.json'

//create a dropdown menu to access the recorded tracks
//this dropdown menu is created from data coming from the tracks-records.json file
const  DropdownMenu =(trajet)=>{

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
            trajet.path=path.path
            trajet.title=path.title
            trajet.display()
        }

        dropDownContent.appendChild(menuItem)
        
    }
    return dropDown
}
export default DropdownMenu