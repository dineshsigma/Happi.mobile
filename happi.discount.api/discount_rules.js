let express = require('express');
const mongo = require("./db");
let app = express();
let db = mongo.connect();
// let storeTB = db.collection("discount_rules");



//case-1
//discount category ---- gifts
// let discount_category="gifts";
// let gift_condition="single";
// let gift_condition_rule = [
//     {
//         "approval_authority": "",
//         "brand_name":"",
//         "item_name":""
//     },
//     {
//         "approval_authority": "",
//         "brand_name":"",
//         "item_name":""
//     },{
//         "approval_authority": "",
//         "brand_name":"",
//         "item_name":""
//     }
// ]


//case-2
//discount category ---- Cash Discount
// let discount_category = "Cash Discount";
// let discount_type = 'flat';
// let discount_condition_rule = [
//     {
//         "approval_authority": "",
//         "minimum_handset_price": "",
//         "miximum_handset_price": "",
//         "minimum_discount_price":"",
//         "miximum_discount_price":""
//     },
//     {
//         "approval_authority": "",
//         "minimum_handset_price": "",
//         "miximum_handset_price": "",
//         "minimum_discount_price":"",
//         "miximum_discount_price":""
//     },{
//         "approval_authority": "",
//         "minimum_handset_price": "",
//         "miximum_handset_price": "",
//         "minimum_discount_price":"",
//         "miximum_discount_price":""
//     }
// ]



//case-2.1
//discount category ---- Cash Discount
// let discount_category = "Cash Discount";
// let discount_type = 'percentage';
// let discount_condition_rule = [
//     {
//         "approval_authority": "",
//         "minimum_handset_price": "",
//         "miximum_handset_price": "",
//         "lower_percentage":"",
//         "upper_percentage":""
//     },
//     {
//         "approval_authority": "",
//         "minimum_handset_price": "",
//         "miximum_handset_price": "",
//         "lower_percentage":"",
//         "upper_percentage":""
//     },{
//         "approval_authority": "",
//         "minimum_handset_price": "",
//         "miximum_handset_price": "",
//         "lower_percentage":"",
//         "upper_percentage":""
//     }
// ]



//case-3 both gift+Cash discount
//discount category ---- Gift+Cash Discount
// let discount_category = "gifts+Cash Discount";
// let gift_condition = "single";
// let discount_type = 'flat';
// let discount_condition_rule = [
//     {
//         "approval_authority": "",
//         "minimum_handset_price": "",
//         "miximum_handset_price": "",
//         "minimum_discount_price": "",
//         "miximum_discount_price": ""
//     },
//     {
//         "approval_authority": "",
//         "minimum_handset_price": "",
//         "miximum_handset_price": "",
//         "minimum_discount_price": "",
//         "miximum_discount_price": ""
//     }, {
//         "approval_authority": "",
//         "minimum_handset_price": "",
//         "miximum_handset_price": "",
//         "minimum_discount_price": "",
//         "miximum_discount_price": ""
//     }
// ],
// let gift_condition_rule = [
//     {
//         "approval_authority": "",
//         "brand_name":"",
//         "item_name":""
//     },
//     {
//         "approval_authority": "",
//         "brand_name":"",
//         "item_name":""
//     },{
//         "approval_authority": "",
//         "brand_name":"",
//         "item_name":""
//     }
// ]



//case-4


//case-3 both gift+Cash discount
//discount category ---- Gift+Cash Discount
// let discount_category = "gifts or Cash Discount";
// let gift_condition = "single";
// let discount_type = 'flat';
// let discount_condition_rule = [
//     {
//         "approval_authority": "",
//         "minimum_handset_price": "",
//         "miximum_handset_price": "",
//         "minimum_discount_price": "",
//         "miximum_discount_price": ""
//     },
//     {
//         "approval_authority": "",
//         "minimum_handset_price": "",
//         "miximum_handset_price": "",
//         "minimum_discount_price": "",
//         "miximum_discount_price": ""
//     }, {
//         "approval_authority": "",
//         "minimum_handset_price": "",
//         "miximum_handset_price": "",
//         "minimum_discount_price": "",
//         "miximum_discount_price": ""
//     }
// ],
// let gift_condition_rule = [
//     {
//         "approval_authority": "",
//         "brand_name":"",
//         "item_name":""
//     },
//     {
//         "approval_authority": "",
//         "brand_name":"",
//         "item_name":""
//     },{
//         "approval_authority": "",
//         "brand_name":"",
//         "item_name":""
//     }
// ]


module.exports = app;





