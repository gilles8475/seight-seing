const deleteButton = (trajet) => {
    const bouton = document.createElement('button')

    bouton.innerHTML = "Delete track"
    bouton.onclick = () => {
        if (trajet.path[0]) {
            if (confirm("are you sure that you want \n to delete this track ?")) {

                const delData = { id: trajet.id }
                const JsonData = JSON.stringify(delData)
                console.log("Suppression du trajet : ", trajet.title)


                fetch('http://localhost:3000/', {
                    method: 'DELETE',

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
        //trajet.path=[]
    }
    return bouton
}
export default deleteButton