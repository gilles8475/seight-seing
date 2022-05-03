const tracks = require('./tracks-records.json')
const express = require('express')
const fs = require('fs')
const randomString = require('./generateString')
//const {storeInMongo}=require('./storeMongo.js')
//const {storeInMongoAtlas}=require('./storeInMongoAtlas.js')
const app = express()


const port = 3000




app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept")
  res.header("Access-Control-Allow-Methods", "POST,GET,PATCH,OPTION,DELETE")
  next()
})
app.use(express.json())

app.get('/', (req, res) => {
  console.log("recieved a get request:")
  console.log(req)
  res.end("salut")

})

app.post('/', (req, res) => {
  console.log("recieved a post request");
  let recievedData = req.body
  recievedData.id = randomString(20)
  tracks.push(recievedData)

  fs.writeFile('./utils/tracks-records.json', JSON.stringify(tracks), (err) => {
    if (err) throw err
    console.log("a new tracks with id %s has been recorded", recievedData.id);
  })


})
app.delete('/', (req, res) => {

  console.log('recieved a delete request')
  const deleteTracks = tracks.findIndex((value, index, array) => {
    //search for the index of the track to delete
    return value.id == req.body.id
  })
  const name = tracks[deleteTracks].title
  tracks.splice(deleteTracks,1)
  fs.writeFile('./utils/tracks-records.json', JSON.stringify(tracks), (err) => {
    if (err) throw err
    
    res.end(name+" has been deleted")

    
  })

})

app.patch('/', (req, res) => {
  //use for changing a tracks
  console.log("recieved a patch request")
  //console.log(req.body)
  const updateTracks = tracks.findIndex((value, index, array) => {
    //search for the index of the track to update
    return value.id == req.body.id
  })
  tracks[updateTracks].path = req.body.path
  fs.writeFile('./utils/tracks-records.json', JSON.stringify(tracks), (err) => {
    if (err) throw err
    
    res.end("tracks updated")
    
  })
})

app.post('/1/',(req,res) => {
  console.log('recieved a post request: '+ req.body.lat)
  res.end('data recieved')
})

app.listen(port, () => {
  console.log('app listening on port: ', port)
})