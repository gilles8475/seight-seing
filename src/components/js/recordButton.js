const recordButton = (trajet) => {
    const bouton=document.createElement('button')
    
    bouton.innerHTML = "Store track"
    bouton.onclick = () => {
        if (trajet.path[0]) {
            let n = localStorage.length + 1 //will serve as id of the trajet
            n = "trackId" + n
            console.log(trajet.title);
            trajet.title = prompt("Enter a title for this track", trajet.title)

            const storeData = { title: trajet.title, path: trajet.path }
            const JsonData = JSON.stringify(storeData)
            console.log("la donnée à stocker est: ", JsonData)
            localStorage.setItem(n, JsonData)
            //window.location.reload()

            fetch('http://localhost:3000/update', {
                method: 'POST',

                body: JsonData,
                headers: {
                    'Content-Type': 'application/json',

                },

            }).then(data => data.json())
                .then((json) => { console.log(json) })


        } else {
            alert('there is no trajet')
        }
    }
    return bouton
}
export default recordButton