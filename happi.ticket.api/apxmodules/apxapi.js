
let axios = require('axios');
let date = new Date();
let getYear = date.getFullYear().toString();
let month = date.getMonth() + 1;
if (month.toString().length > 1) {
    month = month.toString();
}
else {
    month = '0' + month;
}

let day = date.getDate();
if (day.toString().length > 1) {
    day = day.toString();
}
else {
    day = '0' + day;
}
let dateInput = getYear + month + day;
async function getPriceFromPriceTemplate(ItemCode) {
    console.log("ItemCode", ItemCode)
    let getPriceconfig = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `http://183.82.44.213/api/apxapi/GetPriceFromPriceTemplate?CompanyCode=HM&PriceTemplate=ECOMMERCE&PriceEffetiveFrom=${dateInput}&ItemCode=${ItemCode}`,
        headers: {
            'UserId': 'WEBSITE',
            'SecurityCode': '3489-7629-9163-3979'
        }
    };
    let priceResponse = await axios(getPriceconfig);
    //console.log("priceResponse", priceResponse);
    return priceResponse?.data?.Table;

}

async function getBranchInfoDetails() {
    let getBranchConfig = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'http://183.82.44.213/api/apxapi/GetBranchInfo?CompanyCode=HM&BranchCity=0&BranchPinCode=0&BranchState=0&StoreOpenStartDate=0&StoreOpenEndDate=0&ModifiedOnStartDate=0&ModifiedOnEndDate=0&Status=All',
        headers: {
            'UserId': 'WEBSITE',
            'SecurityCode': '3489-7629-9163-3979'
        }
    };
    let BranchResponse = await axios(getBranchConfig);
    //console.log("BranchResponse", BranchResponse)
    return BranchResponse?.data?.Data

}

async function getEmployeeeDetails() {
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'http://183.82.44.213/api/apxapi/GetSalespersonMasterInfo?CompanyCode=HM',
        headers: {
            'UserId': 'WEBSITE',
            'SecurityCode': '3489-7629-9163-3979'
        }
    };
    let response = await axios(config);
    return response?.data?.Data

}
module.exports.getPriceFromPriceTemplate = getPriceFromPriceTemplate
module.exports.getBranchInfoDetails = getBranchInfoDetails
module.exports.getEmployeeeDetails = getEmployeeeDetails