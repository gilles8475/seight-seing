const {MongoClient} = require('mongodb')



 
// Replace the following with your Atlas connection string                                                                                                                                        
const url = "mongodb+srv://glou8475:poilaucul@cluster0.ccqkd.mongodb.net/panoramas?retryWrites=true&w=majority&useNewUrlParser=true&useUnifiedTopology=true";
const client = new MongoClient(url,{ useUnifiedTopology: true });

// The database to use

const dbName = "panoramas";

const storeInMongoAtlas=(objParam)=>{
   console.log('connecting Atlas database')
   MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db(dbName);
      
      dbo.collection("tracks").insertOne(objParam, function(err, res) {
        if (err) throw err;
        console.log("1 document inserted in atlas mongo batabase");
        db.close();
      })
    })
}                    



module.exports= {storeInMongoAtlas}
//run().catch(console.dir);