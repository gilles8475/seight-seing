const {MongoClient} = require('mongodb')



 
// Replace the following with your Atlas connection string                                                                                                                                        
const url = "mongodb+srv://glou8475:poilaucul@cluster0.ccqkd.mongodb.net/panoramas?retryWrites=true&w=majority&useNewUrlParser=true&useUnifiedTopology=true";
const client = new MongoClient(url);

// The database to use

const dbName = "panoramas";

                      

async function storeInMongoAtlas(trackDocument) {

   try {

        await client.connect();

        console.log("Connected correctly to server Atlas");

        const db = client.db(dbName);

        // Use the collection "people"

        const col = db.collection("tracks");



        // Insert a single document, wait for promise so we can read it back

        const p = await col.insertOne(trackDocument);

        // Find one document

        const myDoc = await col.findOne();

        // Print to the console

        console.log(myDoc);

       } catch (err) {

        console.log("there is an atlas error: ",err.stack);

    }



    finally {
       console.log("closing connection")

       await client.close();

   }

}

module.exports= {storeInMongoAtlas}
//run().catch(console.dir);