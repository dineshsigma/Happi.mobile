let axios = require('axios')
async function getEmployeeeDetails(branch_code) {
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
    let store_employee = response?.data?.Data.filter((item, index) => { return item.SLPR_STATUS == "Active" && item.BRANCH_NAME == branch_code });
    let store_sales_head = response?.data?.Data.filter((item, index) => { return item.SLPR_STATUS == "Active" && item.BRANCH_NAME == branch_code && item.SLPR_CATEGORY == "Store Head" });
    // console.log("store_sales_head", store_sales_head);
    // console.log("store_employee", store_employee)
    return { "store_employee": store_employee, "store_sales_head": store_sales_head }
}

getEmployeeeDetails('AMEERPET')