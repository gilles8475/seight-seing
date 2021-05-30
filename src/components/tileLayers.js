import L from 'leaflet'

//couches du geoportail
const CLEFIGN = "choisirgeoportail"
const mapboxAccessToken = 'pk.eyJ1IjoiZ2lsbGVzODQ3NSIsImEiOiJjazdmcmtuM2YwNWZrM2VuNjlrbnNldGI3In0.NVN_OrsfDaW6RfsQzwY4jg';

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

export const mapboxLayer = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/outdoors-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: mapboxAccessToken
})
