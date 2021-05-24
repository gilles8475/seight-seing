import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';

const stylesMap = {
    streets: 'mapbox://styles/mapbox/streets-v11',
    outdoors: 'mapbox://styles/mapbox/outdoors-v11',
    light: 'mapbox://styles/mapbox/light-v10',
    dark: 'mapbox://styles/mapbox/dark-v10',
    sat: 'mapbox://styles/mapbox/satellite-v9',
    satstreets: 'mapbox://styles/mapbox/satellite-streets-v11',
    navday: 'mapbox://styles/mapbox/navigation-day-v1',
    navnight: 'mapbox://styles/mapbox/navigation-night-v1'

}

function testCreateMap(divRef, mapstyle = 'outdoors') {
    console.log(mapstyle)
    //const style = 'mapbox://styles/mapbox/outdoors-v11'
     const style= stylesMap[mapstyle]
    //const style = stylesMap.outdoors

    mapboxgl.accessToken = 'pk.eyJ1IjoiZ2lsbGVzODQ3NSIsImEiOiJjazdmcmtuM2YwNWZrM2VuNjlrbnNldGI3In0.NVN_OrsfDaW6RfsQzwY4jg';


    let myPromise = new Promise((res, rej) => {
        const elem = document.createElement('div')
        elem.id = divRef
        elem.style.height = '300px'
        document.body.appendChild(elem)

        res(elem)

    })

    myPromise.then((el) => {

        const map = new mapboxgl.Map({
            container: divRef, // container ID
            style: style, // style URL
            center: [5.058, 44.14], // starting position [lng, lat]
            zoom: 15 // starting zoom
        })
        var nav = new mapboxgl.NavigationControl();
        map.addControl(nav, 'top-left');

        return map
    })









    // const style = 'mapbox://styles/mapbox/outdoors-v11'

    // mapboxgl.accessToken = 'pk.eyJ1IjoiZ2lsbGVzODQ3NSIsImEiOiJjazdmcmtuM2YwNWZrM2VuNjlrbnNldGI3In0.NVN_OrsfDaW6RfsQzwY4jg';


    // //map.on('click', e => console.log(e.lngLat) )

    // map.addControl(new mapboxgl.GeolocateControl({
    //     positionOptions: {
    //         enableHighAccuracy: true
    //     },
    //     trackUserLocation: true
    // }));


}
export default testCreateMap