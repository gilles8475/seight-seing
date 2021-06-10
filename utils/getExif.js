const fs = require('fs')

const ExifImage = require('exif').ExifImage

async function readDir(dirname) {
    //prend en parametre un repertoire et retourne un tableau qui contient tous les fichiers
    //contenus dans ce répertoire
    let FILE_LIST_PROMISE = new Promise((res, err) => {
        fs.readdir(dirname, (err, files) => { res(files) })
    })
    var filesList = await FILE_LIST_PROMISE

    return filesList
}



async function getExifFromFile(filename) {
    //return exif data with node exif

    let res = new Promise((res, rej) => {

        try {
            new ExifImage({ image: filename }, function (error, exifData) {
                if (error) {
                    rej(error)

                    console.log('Erreur : ' + filename+' '+error.message);
                }
                else {
                    // Do something with your data!
                    //console.log(exifData);
                    res(exifData)

                }



            })
        } catch (error) {
            console.log('Error: ' + error.message)
            rej(error)

        }
    })

    const result = await res
    return result

}

async function getExifFromDir(dirname) {
    let result = {}
    let files = await readDir(dirname)
    //console.log(files);
    let tabExif = []
    for (f of files) {
        let filename = dirname + '/' + f
        //console.log(filename);

        let data = await getExifFromFile(filename)
        data = { ...data, filename: f };
        tabExif.push(data)
    }
    return tabExif


}




module.exports = { getExifFromDir }