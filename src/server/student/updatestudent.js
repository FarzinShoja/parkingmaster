//
const mysqlconfig = require("../config.json");
const exp = require("express");
const router = exp.Router();
const mySql = require("mysql");

//                                     Update Student Data
//=============================================================================================
router.put("/updatestudent", (req, res) => {
    const id = req.body.StudentID;
    const name = req.body.FirstName;
    const lastname = req.body.LastName;
    const vehicleid = req.body.VehicleID;
  
    const connection = getConnection();
    const queryString =
      "SELECT COUNT(*) AS count FROM Students WHERE StudentID = ?";
  
    connection.query(queryString, [id], (err, results) => {
      if (err) {
        console.log("Failed to connect to the Data Base");
        //need to look for proper error code
        return;
      } else {
        if (results[0].count < 1) {
          console.log(err + "This Student ID " + id + " Does not exist");
          res.statusCode = 404;
          res.json({
            errorCode: 404,
            message: "This Student ID " + id + " Does not exist",
            sqlError: err
          });
        } else {
          const queryString2 =
            "UPDATE Students SET FirstName=?, LastName=?, VehicleID=? WHERE StudentID = ?";
          connection.query(
            queryString2,
            [name, lastname, vehicleid, id],
            (err, results) => {
              if (err) {
                res.json({
                  errorCode: 404,
                  sqlError: err
                });
                console.log("Failed second query" + err);
                //need to look for proper error code
                return;
              } else {
                console.log(
                  "The Student With ID: " +
                    id +
                    " & First Name: " +
                    name +
                    " & Last Name of: " +
                    lastname +
                    " : " +
                    vehicleid +
                    " has been updated it to Students the table"
                );
                res.json({
                  errorCode: 200,
                  sqlError: err,
                  message:
                    "The Student With ID: " +
                    id +
                    " & First Name: " +
                    name +
                    " & Last Name of: " +
                    lastname +
                    " : " +
                    vehicleid +
                    " has been updated it to Students the table"
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