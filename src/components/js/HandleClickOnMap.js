import PathProfil from "./PathProfil";

function getElevation(lat, lng) {
    // Construct the API request to get elevation of a point
    console.log(lat);
    console.log(lng);
    //let querymapbox = 'https://api.mapbox.com/v4/mapbox.mapbox-terrain-v2/tilequery/' + lng + ',' + lat + '.json?layers=contour&limit=50&access_token=' + mapboxToken
    let query = `https://wxs.ign.fr/${IGNTOKEN}/alti/rest/elevation.json?lon=${lng}&lat=${lat}`



    fetch(query)
        .then(res => res.json())
        .then(res => console.log('alti IGN: ' + res.elevations[0].z))




}
const IGNTOKEN = 'choisirgeoportail'
const HandleClickOnMap = ((mapid,myTrajet) => {

    const handleClick = (e) => {
        console.log('click on map')

        let isCTRLKeyPressed = e.originalEvent.ctrlKey

        let isRightButtonPressed = e.originalEvent.button == 2 ? true : false
        let lat = e.latlng.lat
        let long = e.latlng.lng
        //console.log(e.originalEvent.button);

        if (isCTRLKeyPressed) {
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



    mapid.on('dblclick', (e) => {
        //insert un point sur le trajet
        myTrajet.insertpoint(e.layerPoint)



    })
})
export default HandleClickOnMap