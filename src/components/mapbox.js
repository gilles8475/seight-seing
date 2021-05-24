import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';


const Mapboxmap = (divRef) => {


    
    const style = 'mapbox://styles/mapbox/outdoors-v11'
    
    mapboxgl.accessToken = 'pk.eyJ1IjoiZ2lsbGVzODQ3NSIsImEiOiJjazdmcmtuM2YwNWZrM2VuNjlrbnNldGI3In0.NVN_OrsfDaW6RfsQzwY4jg';
    
    const map = new mapboxgl.Map({
        container: divRef, // container ID
        style: style, // style URL
        center: [5.058, 44.14], // starting position [lng, lat]
        zoom: 15 // starting zoom
    })
    //map.on('click', e => console.log(e.lngLat) )
    
    map.addControl(new mapboxgl.GeolocateControl({
        positionOptions: {
            enableHighAccuracy: true
        },
        trackUserLocation: true
    }));
    
    var nav = new mapboxgl.NavigationControl();
    map.addControl(nav, 'top-left');
    
    return map



}
export default Mapboxmap