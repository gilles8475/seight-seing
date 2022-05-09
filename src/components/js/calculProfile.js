import PathProfil from "./PathProfil"

/*calcul et affiche le profil altimétrique d'un itinéraire
*/
const calculProfile = (trajet,sampling)=>{
    let myProfile = trajet.getVerticalProfil(sampling)
    myProfile.then(data => {
        /*création d'une vue qui affiche le profil alti du trajet
         à l'aide de charte js*/
        PathProfil(data, "myChart", trajet)

        /*test de la methode getPointFromOdo de la classe ballade
        //on met un marker au milieu du trajet
        let middlePoint= myTrajet.getPointFromOdo(0*myTrajet.getLength()/1)
        const middleMarker= L.marker(middlePoint).addTo(map)*/
    })
}
export default calculProfile