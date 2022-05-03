import PathProfil from "./PathProfil"
import L from 'leaflet'
import iconMarketPlace from '../../assets/tomato.png'

const marketIcon=L.icon({
    //icon for market place
    iconUrl: iconMarketPlace,
    iconeSize:[1,1],

})

function getElevation(lat, lng) {
    // Construct the API request to get elevation of a point
    // console.log(lat);
    // console.log(lng);
    //let querymapbox = 'https://api.mapbox.com/v4/mapbox.mapbox-terrain-v2/tilequery/' + lng + ',' + lat + '.json?layers=contour&limit=50&access_token=' + mapboxToken
    let query = `https://wxs.ign.fr/${IGNTOKEN}/alti/rest/elevation.json?lon=${lng}&lat=${lat}`



    fetch(query)
        .then(res => res.json())
        .then(res => console.log('alti IGN: ' + res.elevations[0].z))




}
const IGNTOKEN = 'choisirgeoportail'

const HandleClickOnMap = ((mapid,myTrajet,layerMarket) => {

    const handleClick = (e) => {
        

        let isCTRLKeyPressed = e.originalEvent.ctrlKey
        let isSHIFTKeyPressed = e.originalEvent.shiftKey

        let isRightButtonPressed = e.originalEvent.button == 2 ? true : false
        let lat = e.latlng.lat
        let long = e.latlng.lng
        //console.log(e.originalEvent.button);
        if (isSHIFTKeyPressed){
            //console.log(mapid)
            const newMark=L.marker([lat,long],{
                draggable:true,
                icon: marketIcon,

            })
            .addTo(layerMarket)
            const data={lat:lat,long:long}
            fetch('http://localhost:3000/1', {
                    method: 'POST',

                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json',

                    },

                }).then(data => data.text())
                    .then((txt) => { console.log(txt) })

        }
        

        if (isCTRLKeyPressed) {
            L.DomUtil.addClass(mapid._container,'crosshair-cursor-enabled'); //change cursor into a cross
            myTrajet.display()

            myTrajet.addpoint(e.latlng)





        }
        else if (isRightButtonPressed) {
            console.log("longueur du trajet: ", myTrajet.getLength())
            let myProfile = myTrajet.getVerticalProfil()
            myProfile.then(data => {
                /*création d'une vue qui affiche le profil alti du trajet
                 à l'aide de charte js*/
                PathProfil(data, "myChart", myTrajet)

                /*test de la methode getPointFromOdo de la classe ballade
                //on met un marker au milieu du trajet
                let middlePoint= myTrajet.getPointFromOdo(0*myTrajet.getLength()/1)
                const middleMarker= L.marker(middlePoint).addTo(map)*/
            })
            //myTrajet.getElevations()
        }

        else {


            let query = `https://wxs.ign.fr/${IGNTOKEN}/alti/rest/elevation.json?lon=${long}&lat=${lat}`


            getElevation(lat, long)

        }

    }

    mapid.on('mousedown', handleClick)



    // mapid.on('dblclick', (e) => {
    //     //insert un point sur le trajet
    //     myTrajet.insertpoint(e.layerPoint)



    // })
})
export default HandleClickOnMap