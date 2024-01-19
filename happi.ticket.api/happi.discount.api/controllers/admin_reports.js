let express = require("express");
const mongo = require("../../db.js");
let logsService = require("../../logservice.js");
let jsonParser = require("../../modules/jsonparser");
let app = express();
const TBL_Save_Discount = "save_discount";
let SaveDiscountTb = null;
//###################### IN ADMIN THERE IS A REPORT ICON IN THAT ICON THERE I WILL BE A MANAGER
//###################### REPORT .IN THAT REPORT  FILTER WITH STORE NAME , BRAND,Model  WISE REPORTS #############
app.get("/adminManagerReports", adminManagerReports);
async function adminManagerReports(req, res) {
  try {
    let data = req.query;
    const db = await mongo.happi_discount_connect();
    SaveDiscountTb = await db.collection(TBL_Save_Discount);
    let query = {};
    let fromdate = new Date(data.fromdate);
    let todate = new Date(data.todate);
    todate.setDate(todate.getDate() + 1);
    fromdate.setHours(0, 0, 0, 0);
    todate.setHours(0, 0, 0, 0);
    query.created_at = {
      $gte: fromdate.toISOString(),
      $lte: todate.toISOString(),
    };
    if (data.filter_by == "store") {
      query.store_name = data.store_name;
    } else if (data.filter_by == "brand") {
      query.brand = data.brand;
    } else if (data.filter_by == "Approver") {
      query.cash_approver_name = data.cash_approver_name;
    }
    if (data.report == "view") {
      let managerReportsView = await SaveDiscountTb.find(query).toArray();
      return res.json({
        status: true,
        data: managerReportsView,
      });
    } else {
      let managerReportsView = await SaveDiscountTb.find(query).toArray();
      if (managerReportsView.length > 0) {
        await jsonParser.DownloadCSV(managerReportsView, res);
      } else {
        return res.json({
          status: false,
          message: "NO DATA FOUND",
        });
      }
    }
  } catch (error) {
    console.log("error", error);
    return res.json({
      status: false,
      message: "ERROR",
    });
  }
}


//HEIRARCHY FOR REPOSRTS THIS FUNCTION GET STORE WISE REPORT 
//WHICH HAS STATUS IS APPROVED COUNT AND HANDSET PRICE
app.get("/storeReports", storeReports);
async function storeReports(req, res) {
  try {
    const db = await mongo.happi_discount_connect();
    SaveDiscountTb = await db.collection(TBL_Save_Discount);
    let storesReportResponse = await SaveDiscountTb.aggregate([
      {
        $group: {
          _id: "$store_name",
          total_count: { $sum: 1 },
          Approved: {
            $sum: {
              $cond: {
                if: {
                  $and: [{ $eq: ["$status", "Approved"] }],
                },
                then: 1,
                else: 0,
              },
            },
          },
          total_price: {
            $sum: {
              $cond: {
                if: { $eq: ["$status", "Approved"] },
                then: "$total_price",
                else: 0,
              },
            },
          },
          discount_price: {
            $sum: {
              $cond: {
                if: { $eq: ["$status", "Approved"] },
                then: "$discount_price",
                else: 0,
              },
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          store_name: "$_id",
          total_count: 1,
          total_price: 1,
          discount_price: 1,
          Approved: 1,
          discount_percentage: {
            $cond: {
              if: { $eq: ["$total_price", 0] },
              then: 0,
              else: {
                $multiply: [
                  {
                    $divide: ["$discount_price", "$total_price"],
                  },
                  100,
                ],
              },
            },
          },
        },
      },
    ]).toArray();
    return res.json({
      status: true,
      data: storesReportResponse,
    });
  } catch (error) {
    console.log("Error", error);
    return res.json({
      status: false,
      message: "ERROR",
    });
  }
}

app.get("/brandReports", brandReports);
async function brandReports(req, res) {
  try {
    const db = await mongo.happi_discount_connect();
    SaveDiscountTb = await db.collection(TBL_Save_Discount);
    let brandReportResponse = await SaveDiscountTb.aggregate([
      {
        $match: {
          store_name: { $eq: req.query.store_name },
          "status":{$eq:"Approved"}
        },
      },
      {
        $group: {
          _id: "$brand",
          total_count: { $sum: 1 },
          Approved: {
            $sum: {
              $cond: {
                if: {
                  $and: [{ $eq: ["$status", "Approved"] }],
                },
                then: 1,
                else: 0,
              },
            },
          },
          total_price: {
            $sum: {
              $cond: {
                if: { $eq: ["$status", "Approved"] },
                then: "$total_price",
                else: 0,
              },
            },
          },
          discount_price: {
            $sum: {
              $cond: {
                if: { $eq: ["$status", "Approved"] },
                then: "$discount_price",
                else: 0,
              },
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          brand: "$_id",
          total_count: 1,
          total_price: 1,
          discount_price: 1,
          Approved: 1,
          discount_percentage: {
            $cond: {
              if: { $eq: ["$total_price", 0] },
              then: 0,
              else: {
                $multiply: [
                  {
                    $divide: ["$discount_price", "$total_price"],
                  },
                  100,
                ],
              },
            },
          },
        },
      },
    ]).toArray();
    return res.json({
      status: true,
      data: brandReportResponse,
    });
  } catch (error) {
    console.log("error", error);
    return res.json({
      status: false,
      message: "ERRRO",
    });
  }
}

app.get("/modelReport", modelReport);
async function modelReport(req, res) {
  try {
    const db = await mongo.happi_discount_connect();
    SaveDiscountTb = await db.collection(TBL_Save_Discount);
    let modelReportResponse = await SaveDiscountTb.aggregate([
      {
        $match: {
          store_name: { $eq: req.query.store_name },
          brand: { $eq: req.query.brand },
          "status":{$eq:"Approved"}
        },
      },
      {
        $group: {
          _id: "$model",
          total_count: { $sum: 1 },
          Approved: {
            $sum: {
              $cond: {
                if: {
                  $and: [{ $eq: ["$status", "Approved"] }],
                },
                then: 1,
                else: 0,
              },
            },
          },
          total_price: {
            $sum: {
              $cond: {
                if: { $eq: ["$status", "Approved"] },
                then: "$total_price",
                else: 0,
              },
            },
          },
          discount_price: {
            $sum: {
              $cond: {
                if: { $eq: ["$status", "Approved"] },
                then: "$discount_price",
                else: 0,
              },
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          model: "$_id",
          total_count: 1,
          total_price: 1,
          discount_price: 1,
          Approved: 1,
          discount_percentage: {
            $cond: {
              if: { $eq: ["$total_price", 0] },
              then: 0,
              else: {
                $multiply: [
                  {
                    $divide: ["$discount_price", "$total_price"],
                  },
                  100,
                ],
              },
            },
          },
        },
      },
    ]).toArray();
    return res.json({
      status: true,
      data: modelReportResponse,
    });
  } catch (error) {
    console.log("error", error);
    return res.json({
      status: false,
      message: "ERROR",
    });
  }
}

module.exports = app;
