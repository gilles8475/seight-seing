const tracks = require('./tracks-records.json')
const express = require('express')
const fs = require('fs')
//const {storeInMongo}=require('./storeMongo.js')
//const {storeInMongoAtlas}=require('./storeInMongoAtlas.js')
const app = express()


const port = 3000




app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept")
  next()
})
app.use(express.json())

app.get('/', (req, res) => {
  console.log("recieved a get request:")
  console.log(req)

})
app.post('/update', (request, res) => {
  console.log("recieved a post request");

  res.send(tracks)

})
app.delete('/', (req, res) => { res.send('recieved a delete request') })
app.listen(port, () => {
  console.log('app listening on port: ', port)
})