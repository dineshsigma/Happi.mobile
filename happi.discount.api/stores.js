let express = require('express');
const mongo = require("./db");
let app = express();
const TBL_STORE = 'stores';
let StoreTb = null;
//------------------------------------------------------get All Stores Lists---------------------------------------//
app.get('/getStoreList', getStoreList)
async function getStoreList(req, res) {
    try {
        let db = await mongo.connect();
        StoreTb = await db.collection(TBL_STORE);
        let storeData = await StoreTb.find({}).toArray();
        return res.json({
            status: true,
            data: storeData
        })
    }
    catch (error) {
        return res.json({
            status: false,
            message: error
        })
    }
}

module.exports = app;





