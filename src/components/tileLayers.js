import L from 'leaflet'
import {mapboxToken} from '../../secret'

//couches du geoportail
const CLEFIGN = "choisirgeoportail"


const stylesMap = {
    streets: 'mapbox/streets-v11',
    outdoors: 'mapbox/outdoors-v11',
    light: 'mapbox/light-v10',
    dark: 'mapbox/dark-v10',
    sat: 'mapbox/satellite-v9',
    satstreets: 'mapbox/satellite-streets-v11',
    navday: 'mapbox/navigation-day-v1',
    navnight: 'mapbox/navigation-night-v1'

}

export const IgnTypes={
    IgnPlan:{
        techName:"GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2",
        format:"png"
    },
    //dronesRestrict:"TRANSPORTS.DRONES.RESTRICTIONS",//mache pas
    //IgnPhotos65:"ORTHOIMAGERY.ORTHOPHOTOS.1950-1965", //marche pas
    IgnPhotos:{
        techName:"ORTHOIMAGERY.ORTHOPHOTOS",
        format: "jpeg"
    }

}

export const IgnLayer = ({techName, format}) => L.tileLayer( 


    /*techName correspond au fond de carte fourni par le geoportail 
    la liste est consultable sur https://geoservices.ign.fr/documentation/donnees-ressources-wmts.html
    */
    `https://wxs.ign.fr/${CLEFIGN}/geoportail/wmts?&REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0&STYLE=normal&TILEMATRIXSET=PM&FORMAT=image/${format}&LAYER=${techName}&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}`,
    {
        minZoom: 0,
        maxZoom: 18,
        attribution: "IGN-F/Geoportail",
        tileSize: 256 // les tuiles du Géooportail font 256x256px
    }
)


//couche de mapbox attention de bien créer un fichier secret.js et d'y mettre l'access token à récupérer sur le site https://account.mapbox.com/
export const mapboxLayer = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: stylesMap.sat,
    tileSize: 512,
    zoomOffset: -1,
    accessToken: mapboxToken
})
