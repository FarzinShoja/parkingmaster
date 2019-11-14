////==============================================================
const mysqlconfig = require("../config.json");
const exp = require("express");
const router = exp.Router();
const mySql = require("mysql");
const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());


// FIX for the CORS ERROR problem....
router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});


//                                     Update Vehicle Data
//=============================================================================================
router.put("/updatevehicle", (req, res) => {
    const vid = req.body.VehicleID;
    const make = req.body.Make;
    const model = req.body.Model;
    const year = req.body.Year;
    const licplate = req.body.LicencePlate;
    const tagnum = req.body.TagNum;
    const tagstatus = req.body.TagStatus;
  
    const connection = getConnection();
    const queryString =
      "SELECT COUNT(*) AS count FROM Vehicles WHERE VehicleID = ?";
  
    connection.query(queryString, [vid], (err, results) => {
      if (err) {
        console.log("Failed to connect to the Data Base");
        res.statusCode = 500;
        return;
      } else {
        if (results[0].count < 1) {
          console.log("This Vehicle ID: " + vid + " Does not exist");
          res.statusCode = 404;
          res.json({
            errorCode: 404,
            message: "This Vehicle ID: " + vid + " Does not exist"
          });
        } else {
          const queryString2 =
            "UPDATE Vehicles SET Make=?, Model=?, Year=?, LicencePlate=?, TagNum=?, TagStatus=? WHERE VehicleID= ?";
          connection.query(
            queryString2,
            [make, model, year, licplate, tagnum, tagstatus, vid],
            (err, results) => {
              if (err) {
                console.log("Failed second query" + err);
                res.statusCode = 500;
                return;
              } else {
                console.log(
                  "The Data " +
                    vid +
                    " " +
                    make +
                    " " +
                    model +
                    " " +
                    year +
                    " " +
                    licplate +
                    " " +
                    tagnum +
                    " " +
                    tagstatus +
                    " has been Updated it."
                );
                res.json({
                  message:
                    "The Data " +
                    vid +
                    " " +
                    make +
                    " " +
                    model +
                    " " +
                    year +
                    " " +
                    licplate +
                    " " +
                    tagnum +
                    " " +
                    tagstatus +
                    " has been updated it."
                });
                res.end();
              }
            }
          );
        }
      }
    });
  });  
  
//**********mySql Connection Pool*/
const mySqlConnection = mySql.createPool(
    //Remote file for username config
    mysqlconfig
  );
//
  function getConnection() {
    return mySqlConnection;
  }
  
  module.exports = router;