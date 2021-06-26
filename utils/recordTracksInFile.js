const fs = require('fs')
const { atlasMongoPass } = require('./atlasMongoPass')
const { MongoClient } = require('mongodb')

const uri = `mongodb+srv://${atlasMongoPass.id}:${atlasMongoPass.password}@cluster0.ccqkd.mongodb.net/panoramas?retryWrites=true&w=majority&useNewUrlParser=true&useUnifiedTopology=true`;

const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

async function run() {
    const resultTab = []
    try {
        await client.connect();
        const database = client.db('panoramas');
        const collect = database.collection('tracks')

        //const query = { title: 'Back to the Future' };
        const tracks = collect.find();
        if ((await tracks.count()) === 0) {
            console.log("no document found");
        }
        await tracks.forEach(item => {
            console.log(item)
            resultTab.push(item)
        })

    } finally {
        // Ensures that the client will close when you finish/error

        await client.close();
        return resultTab
    }
}
run().then(res => {
    console.log(JSON.stringify(res))
    fs.writeFile('utils/tracks-records.json', JSON.stringify(res), err => {
        if (err) throw err
        console.log('file tracks-records.json created')
    }
    )
})
    .catch(console.dir);