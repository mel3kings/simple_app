const {MongoClient, ObjectId} = require("mongodb");

const uri = "mongodb://root:example@mongo:27017";
const client = new MongoClient(uri);
const schemaName = "articles";

async function closeDatabase() {
    await client.close();
}

async function connectDatabase() {
    await client.connect();
    const database = client.db('local');
    return database.collection(schemaName)
}

async function getAllData() {
    try {
        const schema = await connectDatabase();
        const filter = {"data": {$exists: true}};
        const cursor = await schema.find(filter).project({
            "_id": 1,
            data: 1,
            tags: 1,
        }).toArray()
        const response = []
        await cursor.forEach(res => {
            response.push(res)
        });
        return response;
    } catch (e) {
        console.error(e);
        return {}
    }
}

async function getData(id) {
    try {
        const schema = await connectDatabase();
        const response = await schema.findOne({"_id": ObjectId(id)});
        console.log(response)
        return response;
    } catch (e) {
        console.error(e);
        return {}
    }
}

async function insertData(arr) {
    try {
        const response = mapArray(arr)
        await client.connect();
        const database = client.db('local');
        const schema = database.collection(schemaName)
        await schema.insertMany(response)
    } catch (e) {
        console.error(e);
    }
    return arr;
}

async function updateData(url, data, keyTopics, title) {
    try {
        const schema = await connectDatabase()
        const monitor = false;
        await schema.updateOne({
            url: url
        }, {
            $set: {"data": data, "topics": keyTopics, "monitor": monitor, "title": title}
        }, {upsert: true})
    } catch (e) {
        console.error(e);
    }
}


function mapArray(arr) {
    const total = []
    arr.map((value) => {
        total.push({url: value})
    })
    return total;
}


module.exports = {
    getData: getData,
    getAllData: getAllData,
    insertData: insertData,
    mapArray: mapArray,
}