let express = require('express');
const mongo = require("../../db.js");
let logsService = require('../../logservice.js')
let app = express();
const { ObjectId } = require('mongodb');
const TBL_Employee_management = 'discount_employee_management';
const TBL_Discount_Manager_Rules = 'discount_manager_rules';
const TBL_Store_management = 'discount_store_management';
let Employee_managementTb = null;
let Store_managemetTb = null;
let Discount_ManagerRuleTb = null;

// ################  get list of manager Discount Rules 
app.get('/getManagerDiscountRules', getManagerDiscountRules);
async function getManagerDiscountRules(req, res) {
    try {
        let query = {}
        if (req.query.name != null && req.query.name != undefined && req.query.name != "null" && req.query.name != "") {
            query.rule_name = { $regex: req.query.name, $options: "si" }
            query.status = { $eq: JSON.parse(req.query.status) }
        }
        else {
            query.status = { $eq: JSON.parse(req.query.status) }
        }
        const db = await mongo.happi_discount_connect();
        Employee_managementTb = await db.collection(TBL_Employee_management);
        Store_managemetTb = await db.collection(TBL_Store_management);
        Discount_ManagerRuleTb = await db.collection(TBL_Discount_Manager_Rules);
        let manager_discount_rules_response = await Discount_ManagerRuleTb.aggregate([
            {
                $match: query
            },
            {
                $addFields: {
                    store: {
                        $map: {
                            input: "$store",
                            in: { $toObjectId: "$$this" },
                        },
                    },
                },
            },
            {
                $lookup: {
                    from: "discount_store_management",
                    localField: "store",
                    foreignField: "_id",
                    as: "storeoutput",
                },
            },
        ]
        ).sort({ "created_at": -1 }).toArray();
        return res.json({
            status: true,
            data: manager_discount_rules_response
        })
    }
    catch (error) {
        logsService.log('error', req, error + "")
        return res.json({
            status: false,
            message: "ERROR"
        })
    }
}
//edit rule 
app.put('/editRule', editRule);
async function editRule(req, res) {
    try {
        let data = req.body;
        let id = req.body.id
        const db = await mongo.happi_discount_connect();
        Discount_ManagerRuleTb = await db.collection(TBL_Discount_Manager_Rules);
        delete data.id;
        // console.log("data", data);
        // console.log("reqqq", id)
        await Discount_ManagerRuleTb.findOneAndUpdate({ "id": id }, { $set: data });
        return res.json({
            status: true,
            message: "Rule updated successfully"
        })

    }
    catch (error) {
        // console.log("error", error);
        logsService.log('error', req, error + "")
        return res.json({
            status: false,
            message: "ERROR"
        })
    }

}

//get managerRule by id 
app.get('/getManagerRuleById', getManagerRuleById);
async function getManagerRuleById(req, res) {
    try {
        const db = await mongo.happi_discount_connect();
        Discount_ManagerRuleTb = await db.collection(TBL_Discount_Manager_Rules);
        let ruleByIdResponse = await Discount_ManagerRuleTb.findOne({ "id": req.query.id }, { projection: { "cash_discount_flat": 1 } });
        return res.json({
            status: true,
            data: ruleByIdResponse
        })

    }
    catch (error) {
        // console.log("error", error);
        logsService.log('error', req, error + "")
        return res.json({
            status: false,
            message: "ERROR"
        })
    }
}

//check validation Rule name 
app.post('/checkValidationRuleName', checkValidationRuleName)
async function checkValidationRuleName(req, res) {
    try {
        const db = await mongo.happi_discount_connect();
        Discount_ManagerRuleTb = await db.collection(TBL_Discount_Manager_Rules);
        let unique_rule_name = req.body.rule_name?.trim().replace(/\s+/g, ' ').toLowerCase();
        let rulesResponse = await Discount_ManagerRuleTb.findOne({ "unique_rule_name": unique_rule_name });
        if (rulesResponse == null) {
            return res.json({
                status: true,
                message: "Success"
            })
        }
        else {
            return res.json({
                status: false,
                message: "Rule Name Already Exits"
            })
        }
    }
    catch (error) {
        // console.log("error", error);
        logsService.log('error', req, error + "")
        return res.json({
            status: false,
            message: "ERROR"
        })
    }

}
app.post("/updateCashDiscountFlat", updateCashDiscountFlat);
async function updateCashDiscountFlat(req, res) {
    // console.log("req.body", req.body)
    try {
        const id = req.body.id;
        const object = { ...req.body };
        // console.log("object", object);
        delete object.id;
        const db = await mongo.happi_discount_connect();
        ManagerDiscountTb = await db.collection(TBL_Discount_Manager_Rules);
        let updateResult;
        if (req.body.discount_type == "flat") {
            updateResult = await ManagerDiscountTb.updateOne(
                { id },
                { $push: { cash_discount_flat: object } }
            );

        }
        else if (req.body.discount_type == "percentage") {
            updateResult = await ManagerDiscountTb.updateOne(
                { id },
                { $push: { cash_discount_percentage: object } }
            );
        }

        if (updateResult.modifiedCount > 0) {
            res.json({ status: true, message: "Updated successfully" });
        } else {
            res.json({ status: false, message: "Document not found" });
        }
    } catch (error) {
        // console.log("error", error);
        logsService.log('error', req, error + "")
        res.json({ status: false, message: "error" })
    }
}

//##############3validation for rules#####################################//
app.post('/validateRules', validateRules);
async function validateRules(req, res) {
    try {
        // console.log(req.body)
        const db = await mongo.happi_discount_connect();
        Discount_ManagerRuleTb = await db.collection(TBL_Discount_Manager_Rules);
        let type;
        if (req.body.discount_type == "flat") type = "percentage"
        if (req.body.discount_type == "percentage") type = "flat"
        // console.log("type", type)
        let rulesResponse = await Discount_ManagerRuleTb.aggregate([
            {
                $match: {
                    "store": {
                        $in: req.body.store
                    },
                    "brand": {
                        $in: req.body.brand
                    },
                    "model": {
                        $in: req.body.model
                    },
                    "discount_type": {
                        $eq: type
                    }
                }
            }
        ]).toArray();
        // console.log("rulesResponse", rulesResponse)
        const filteredData = rulesResponse.filter(item => {
            const itemFromDate = new Date(item.fromdate);
            const itemToDate = new Date(item.to_date);
            const filterFromDate = new Date(req.body.fromdate);
            const filterToDate = new Date(req.body.to_date);

            if (itemFromDate <= filterToDate && itemToDate >= filterFromDate) {
                return true;
            } else {
                return false;
            }
        });
        // console.log(filteredData);
        if (filteredData.length > 0) {
            return res.json({
                status: false,
                message: "Already Rule is created"
            })
        }
        else {
            return res.json({
                status: true,
                message: "Success"
            })

        }
    }
    catch (error) {
        //console.log("error", error);
        logsService.log('error', req, error + "")
        return res.json({
            status: false,
            message: "ERROR"
        })
    }
}
app.post('/editRuleArray', editRuleArray);
async function editRuleArray(req, res) {
    try {
        // console.log("req.body", req.body)
        const db = await mongo.happi_discount_connect();
        Discount_ManagerRuleTb = await db.collection(TBL_Discount_Manager_Rules);
        let response = await Discount_ManagerRuleTb.findOne({ "id": req.body.id });
        let data;
        if (req.body.discount_type == "flat") {
            data = response?.cash_discount_flat
            for (const objToUpdate of req.body.update_rule_flat) {
                const index = data.findIndex(item => item.flat_id === objToUpdate.flat_id);
                if (index !== -1) {
                    data[index] = { ...data[index], ...objToUpdate };
                }
                else {
                    data[index] = { ...data[index] };
                }
            }
            await Discount_ManagerRuleTb.findOneAndUpdate({ "id": req.body.id }, { $set: { "cash_discount_flat": data } });
        }
        else if (req.body.discount_type == "percentage") {
            data = response?.cash_discount_percentage
            for (const objToUpdate of req.body.update_rule_percentage) {
                const index = data.findIndex(item => item.percentage_id === objToUpdate.percentage_id);
                if (index !== -1) {
                    data[index] = { ...data[index], ...objToUpdate };
                }
                else {
                    data[index] = { ...data[index] };
                }
            }
            await Discount_ManagerRuleTb.findOneAndUpdate({ "id": req.body.id }, { $set: { "cash_discount_percentage": data } });
        }
        return res.json({
            status: true,
            message: "Rule Updated Successfully"
        })
    }
    catch (error) {
        // console.log("error", error)
        logsService.log('error', req, error + "")
        return res.json({
            status: false,
            message: "Error"
        })
    }
}

module.exports = app;

