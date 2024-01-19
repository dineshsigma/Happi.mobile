const { MongoClient } = require("mongodb");
let database = null;
const URI = process.env.MONGO_URL || "mongodb+srv://happidataproject:f1YcgVLKpRM6diuB@happidataprod.fs0ov.mongodb.net/?retryWrites=true&w=majority";
exports.connect = async function () {
    if (database) {
        return database;
    }
    let client = new MongoClient(URI);
    await client.connect();
    database = client.db(process.env.MONGO_DB || "happi-new-sls");
    return database;
};
``