const {MongoClient} = require('mongodb')



 
// Replace the following with your Atlas connection string                                                                                                                                        
const url = "mongodb://localhost:27017/"
const client = new MongoClient(url,{ useUnifiedTopology: true });
const storeInMongo=(objParam)=>{
   console.log('connecting local database')
   MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("panorama");
      
      dbo.collection("tracks").insertOne(objParam, function(err, res) {
        if (err) throw err;
        console.log("1 document inserted in local mongo database");
        db.close();
      })
    })
}

module.exports= {storeInMongo}
//run().catch(console.dir);