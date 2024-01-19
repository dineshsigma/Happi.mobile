let express = require('express');
const mongo = require("./db");
const { rawListeners } = require('./discount_rules');
let app = express();
const TBL_APX_PRODUCTS = 'apx_product';
let ApxProductTb = null;



//-------------------------------------------get Brand names------------------------------------------//
app.get('/getBrandList', getBrandList);
async function getBrandList(req, res) {
    try {
        let db = await mongo.connect();
        ApxProductTb = await db.collection(TBL_APX_PRODUCTS);
        let apxData = await ApxProductTb.find({}, { projection: { "ITEM_NAME": 1, "BRAND_NAME": 1 } }).toArray();
        return res.json({
            status: true,
            data: apxData

        })

    }
    catch (error) {
        return res.json({
            status: false,
            message: error
        })
    }

}

//----------------------------------------Filter item_names passing brand_names -------------------------------------//
app.get('/getItemNames', getItemNames)
async function getItemNames(req, res) {
    try {
        const { brandName } = req.query;
        const db = await mongo.connect();
        ApxProductTb = await db.collection(TBL_APX_PRODUCTS);
        const apxData = await ApxProductTb.find({ BRAND_NAME: brandName }).toArray();
        res.json({ status: true, message: apxData });
    } catch (error) {
        res.json({ status: false, message: error });
    }
}

module.exports = app;





