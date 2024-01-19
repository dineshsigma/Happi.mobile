let express = require("express");
let cors = require("cors");
let bodyParser = require("body-parser");
let app = express();
let port = 8033;
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);
app.options("*", cors());
//happi-ticket-management
let tickets = require("./ticket.js");
let users = require("./users.js");
let department = require("./department.js");
app.use("/tickets", tickets);
app.use("/users", users);
app.use("/department", department);
//discount APP Routers
let storescontroller = require("./happi.discount.api/controllers/storecontrollers");
let axp_productscontroller = require("./happi.discount.api/controllers/apx_productcontrollers");
let employee_management = require("./happi.discount.api/controllers/employee_management_controller");
let store_management = require("./happi.discount.api/controllers/store_management_controllers");
let maganer_rules = require("./happi.discount.api/controllers/manager_rulescontrollers");
let special_approver = require("./happi.discount.api/controllers/special_approver_controllers");
let discount = require("./happi.discount.api/controllers/discount_controllers");
let discount_users = require("./happi.discount.api/controllers/user_controllers");
let store_bucket = require("./happi.discount.api/controllers/storebucket");
let discountDashboard = require("./happi.discount.api/controllers/dashboard_controllers");
let cashDiscountReport = require("./happi.discount.api/controllers/reportcontrollers.js");
let adminReport = require("./happi.discount.api/controllers/admin_reports.js");
let employeeLogs = require("./employeelogs.js");
app.use("/api/store", storescontroller);
app.use("/api/apx_products", axp_productscontroller);
app.use("/api/employee", employee_management);
app.use("/api/storemanagement", store_management);
app.use("/api/managerrules", maganer_rules);
app.use("/api/specialapprover", special_approver);
app.use("/api/discount", discount);
app.use("/api/users", discount_users);
app.use("/api/bucket", store_bucket);
app.use("/api/dashboard", discountDashboard);
app.use("/api/employeeactivity", employeeLogs);
app.use("/api/cashdiscountreport", cashDiscountReport);
app.use("/api/adminReport", adminReport);
app.listen(port, function (err) {
  console.log(`server is running on ${port}`);
});
