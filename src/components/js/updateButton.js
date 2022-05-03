const updateButton = (trajet) => {
    const bouton=document.createElement('button')
    
    bouton.innerHTML = "Update track"
    bouton.onclick = () => {
        if (trajet.path[0]) {
            
            
            if (confirm("are you sure that you want \n to update this track ?")) {

                const storeData = { id: trajet.id, title: trajet.title, path: trajet.path }
                const JsonData = JSON.stringify(storeData)
                console.log("la donnée à stocker est: ", JsonData)
                
    
                fetch('http://localhost:3000/', {
                    method: 'PATCH',
    
                    body: JsonData,
                    headers: {
                        'Content-Type': 'application/json',
    
                    },
    
                }).then(data => data.text())
                    .then((txt) => { console.log(txt) })
            }



        } else {
            alert('there is no track')
        }
        
    }
    return bouton
}
export default updateButton