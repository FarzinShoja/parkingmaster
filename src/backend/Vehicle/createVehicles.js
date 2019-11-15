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

//                                     Insert Vehicle Data
//=============================================================================================
router.post("/createvehicle", (req, res) => {
    const id = req.body.StudentID;
    const make = req.body.Make;
    const model = req.body.Model;
    const year = req.body.Year;
    const licplate = req.body.LicencePlate;
    const tagnum = req.body.TagNum;
  
    const connection = getConnection();
    //=== Verify if the Student ID exist before adding data to Vehicle Table
    const queryString = "SELECT * FROM Students WHERE StudentID = ?";
  
    connection.query(queryString, [id], (err, rows) => {
      if (err) {
        console.log("Failed at query One connectivity: " + err);
        res.statusCode = 500;
        res.json({
          message: err
        });
        return;
      } else if (rows.length < 1) {
        console.log(
          "The Student ID : " + id + " Does Not exist in the system" + err
        );
        res.json({
          message: "This Student ID " + id + " does not exist "
        });
        return;
      } else {
        const queryString2 =
          "INSERT INTO Vehicles (StudentID,Make,Model,Year,LicencePlate,TagNum) VALUES(?,?,?,?,?,?)";
        connection.query(
          queryString2,
          [id, make, model, year, licplate, tagnum],
          (err, results) => {
            if (err) {
              console.log("Failed The Second query" + err);
              res.json({
                message: "Failed The Second query" + err
              });
              return;
            } else {
              console.log(
                "The Data " +
                  id +
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
                  " has been added to the vehicle table"
              );
              res.json({
                message:
                  "The Data " +
                  id +
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
                  " has been added to the vehicle table"
              });
              res.end();
            }
          }
        );
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