const { getExifFromDir } = require('./getExif.js')
const fs = require('fs')
const path = require('path')
//this nodejs file will take all the photos in the dir indicated by the argument given in command line 
//and extract the gps coordinates with the getExifFronDir module
//it willl create a JSON file to be read later by leaflet to show the photos on a map 

const _arg = process.argv.slice(2)[0] //array of arguments passed on the command line
const arg = path.resolve(_arg)
//console.log('dirname :', path.resolve(arg));





const convertGeoRef = (({ GPSLatitude, GPSLongitude, GPSLatitudeRef, GPSLongitudeRef }) => {
    //convert coordinates from deg,min,sec to deg,xxxxx to be processed in leaflet
    try {
        let secOfLat = GPSLatitude[2] / 60
        let secOfLong = GPSLongitude[2] / 60
        let minOfLat = (secOfLat + GPSLatitude[1]) / 60
        let minOfLong = (secOfLong + GPSLongitude[1]) / 60

        let decimalLatitude = GPSLatitude[0] + minOfLat
        let decimalLongitude = GPSLongitude[0] + minOfLong

        decimalLatitude = GPSLatitudeRef == 'N' ? decimalLatitude : -decimalLatitude
        decimalLongitude = GPSLongitudeRef == 'E' ? decimalLongitude : -decimalLongitude
        //console.log({ decimalLatitude, decimalLongitude });
        return { decimalLatitude, decimalLongitude }
    } catch (error) {
        console.log('there is an error', error)
        return { undefined, undefined }

    }


})


getExifFromDir(arg).then(data => {

    const customData = []//to store only needed datas in the returned array
    const targetDir = '/photos/'//the dir where photos will be stored on server
    let dir = "./dist"+targetDir //just for creating the directory on line just below
    fs.mkdir(dir,{recursive:true},(err)=>{if (err) throw err;})
    for (item of data) {
        //console.log(item);

        let {
            gps: { GPSLatitude, GPSLongitude, GPSAltitude, GPSLatitudeRef, GPSLongitudeRef },
            exif: { CreateDate },
            filename
        } = item
        console.log(filename);
        let o = { filename, GPSLatitude, GPSLatitudeRef, GPSLongitude, GPSLongitudeRef, GPSAltitude, CreateDate }
        let { decimalLatitude: lat, decimalLongitude: long } = convertGeoRef(o)
        o = { ...o, latitude: lat, longitude: long, filename: targetDir + filename }
        if (lat) {//only photos with coordinates will be stored
            var completeFilename=arg+"/"+filename
            console.log(completeFilename);
            fs.copyFile(completeFilename,'./dist/photos/'+filename,(err) => {if (err) throw err;})
            customData.push(o)

        }


    }
    const customJsonData = JSON.stringify(customData)
    const jsonData = JSON.stringify(data)
    //extracted exif datas are stored in exifDataFile.json
    fs.open('exifdataFile.json', 'w+', (err, fd) => {
        fs.writeFile(fd, customJsonData, err => console.log(err))
    })
    //console.log(data)
})
