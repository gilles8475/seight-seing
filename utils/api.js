const express = require('express')
const fs=require('fs')
const {storeInMongo}=require('./storeMongo.js')
const {storeInMongoAtlas}=require('./storeInMongoAtlas.js')
const app = express()


const port = 3000
const obj={nom:'dupont',prenom:'gilles'}



app.use((req,res,next)=>{
  res.header("Access-Control-Allow-Origin","*")
  res.header("Access-Control-Allow-Headers","Origin,X-Requested-With,Content-Type,Accept")
  next()
})
app.use(express.json())

app.get('/', (req, res) => {
  console.log(req)
  
})
app.post('/update', (request, res) => {
  //console.log(console.dir)
  //store the track in the mongo atlas server and in local mongo db
  
  storeInMongoAtlas(request.body).then((data)=>{storeInMongo(request.body)})
  // fs.writeFile('tracks-record.json',JSON.stringify(request.body),function(err){
  //   if (err) throw err
  //   console.log('file updated')
  // })

  // let arr=[]
  // for (let i=0; i<255; i++){
  //    arr.push(i.toString(16))
  // }
  // console.log(arr)
  // const buf=Buffer.from("à")
  // console.log('buffer is:',buf)
  // let body = [];
  // request.on('data', (chunk) => {
  //   body.push(chunk);
  // }).on('end', () => {
  //   console.log(Buffer.concat(body))
  //   body = Buffer.concat(body).toString()
  //   res.send(buf.toString())

  //   // at this point, `body` has the entire request body stored in it as a string
  // })
  res.send(request.body)

})
app.delete('/', (req, res) => { res.send('recieved a delete request') })
app.listen(port, () => {
  console.log('app listening on port: ', port)
})