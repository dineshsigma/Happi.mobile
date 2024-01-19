const { MongoClient } = require("mongodb");
let database = null;
let happi_discount_database = null;
const URI = process.env.MONGO_URL || "mongodb://happiprod:StOsWuq6tRuWuxl@happi-prod-db.iipl.app:27017/?authMechanism=DEFAULT&authSource=happi-ticket-mgmt";
const HappiDiscountURI = process.env.MONGO_URL || "mongodb://happiprod:StOsWuq6tRuWuxl@happi-prod-db.iipl.app:27017/?authMechanism=DEFAULT&authSource=happi-new-sls";
//######### HAPPI TICKET MANAGEMENT DATABASE CONNECTION #####################
exports.connect = async function () {
  if (database) {
    return database;
  }
  let client = new MongoClient(URI);
  await client.connect();
  database = client.db(process.env.MONGO_DB || "happi-ticket-mgmt");
  return database;
};
//########## HAPPI DISCOUNT DATABASE CONNECTION #######################
exports.happi_discount_connect = async function () {
  if (happi_discount_database) {
    return happi_discount_database;
  }
  let client = new MongoClient(HappiDiscountURI);
  await client.connect();
  happi_discount_database = client.db(process.env.MONGO_DB || "happi-new-sls");
  return happi_discount_database;
};
``