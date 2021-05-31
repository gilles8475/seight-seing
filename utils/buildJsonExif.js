const { getExifFromDir } = require('./getExif.js')
const fs = require('fs')
const path = require('path')



const _arg = process.argv.slice(2)[0] //array of arguments passed on the command line
const arg = path.resolve(_arg)
console.log('dirname :', path.resolve(arg));





const convertGeoRef = (({ GPSLatitude, GPSLongitude, GPSLatitudeRef, GPSLongitudeRef }) => {
    //convert coordinates from deg,min,sec to deg,xxxxx to be processed in leaflet
    try {
        let secOfLat = GPSLatitude[2] / 60
        let secOfLong = GPSLongitude[2] / 60
        let minOfLat = secOfLat + GPSLatitude[1] / 60
        let minOfLong = secOfLong + GPSLongitude[1] / 60

        let decimalLatitude = GPSLatitude[0] + minOfLat
        let decimalLongitude = GPSLongitude[0] + minOfLong

        decimalLatitude = GPSLatitudeRef == 'N' ? decimalLatitude : -decimalLatitude
        decimalLongitude = GPSLongitudeRef == 'E' ? decimalLongitude : -decimalLongitude
        return { decimalLatitude, decimalLongitude }
    } catch (error) {
        console.log('there is an error', error)
        return {undefined,undefined}

    }


})


getExifFromDir(arg).then(data => {
    
    const customData = []//to store only needed datas in the returned array

    for (item of data) {

        let {
            gps: { GPSLatitude, GPSLongitude, GPSAltitude, GPSLatitudeRef, GPSLongitudeRef },
            exif: { CreateDate },
            filename
        } = item
        let o = { filename, GPSLatitude, GPSLatitudeRef, GPSLongitude, GPSLongitudeRef, GPSAltitude, CreateDate }
        let { decimalLatitude: lat, decimalLongitude: long } = convertGeoRef(o)
        o = { ...o, latitude: lat, longitude: long }
        customData.push(o)
        

    }
    const customJsonData = JSON.stringify(customData)
    const jsonData = JSON.stringify(data)
    //extracted exif datas are stored in exifDataFile.json
    fs.open('exifdataFile.json', 'w+', (err, fd) => {
        fs.writeFile(fd, customJsonData, err => console.log(err))
    })
    //console.log(data)
})
