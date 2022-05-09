const IGNTOKEN = 'choisirgeoportail'
async function getElevation(lat, lng) {
    // Construct the API request to get elevation of a point
    // console.log(lat);
    // console.log(lng);
    //let querymapbox = 'https://api.mapbox.com/v4/mapbox.mapbox-terrain-v2/tilequery/' + lng + ',' + lat + '.json?layers=contour&limit=50&access_token=' + mapboxToken
    let query = `https://wxs.ign.fr/${IGNTOKEN}/alti/rest/elevation.json?lon=${lng}&lat=${lat}`



    const z = await fetch(query).then(res => res.json())
    return z
        




}

export default getElevation