//==============================================================
const mysqlconfig = require("./config.json");
const exp = require("express");
const app = exp();
const mySql = require("mysql");
// const bodyParser = require("body-parser");
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser());

const hostname = "";
const port = 3000;

// FIX for the CORS ERROR problem....
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

app.listen(port, hostname, () => {
  console.log("Server started on port " + port);
});

//**************** Student */

const srouter = require("./student/student.js");
const srouter1 = require("./student/createsudent.js");
const srouter2 = require("./student/updatestudent.js");
const srouter3 = require("./student/updatestudent.js");

app.use(srouter);
app.use(srouter1);
app.use(srouter2);
app.use(srouter3);

//**************** Vehicle */
const vrouter = require("./vehicle/vehicles.js");
const vrouter1 = require("./vehicle/createVehicles.js");
const vrouter2 = require("./vehicle/updatevehicle.js");
const vrouter3 = require("./vehicle/deletevehicle");

app.use(vrouter);
app.use(vrouter1);
app.use(vrouter2);
app.use(vrouter3);

//**************** Datalog */
const drouter = require("./datalog/datalog.js");

app.use(drouter);

//===========================================================================================================================

//mySql Connection Pool
const mySqlConnection = mySql.createPool(
  //Remote file for username config
  mysqlconfig
);

function getConnection() {
  return mySqlConnection;
}
