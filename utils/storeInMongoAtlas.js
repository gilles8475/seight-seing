const {MongoClient} = require('mongodb')
const {atlasMongoPass}=require('./atlasMongoPass')



 
// Replace the following with your Atlas connection string                                                                                                                                        
const url = `mongodb+srv://${atlasMongoPass.id}:${atlasMongoPass.password}@cluster0.ccqkd.mongodb.net/panoramas?retryWrites=true&w=majority&useNewUrlParser=true&useUnifiedTopology=true`;
const client = new MongoClient(url,{ useUnifiedTopology: true });

// The database to use

const dbName = "panoramas";

const storeInMongoAtlas=(objParam)=>{
   console.log('connecting Atlas database')
   MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db(dbName);
      const query={title:objParam.title}
      const update={$set:{path:objParam.path}}
      const option={upsert:true}
      
      dbo.collection("tracks").updateOne(query,update,option, function(err, res) {
        if (err) throw err;
        console.log("1 document inserted in atlas mongo batabase");
        db.close();
      })
    })
}                    



module.exports= {storeInMongoAtlas}
//run().catch(console.dir);