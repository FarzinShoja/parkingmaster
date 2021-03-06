////==============================================================
const mysqlconfig = require("../config.json");
const exp = require("express");
const cors = require('cors');
const router = exp.Router();
const mySql = require("mysql");
const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

// FIX for the CORS ERROR problem....
router.use(cors());

//                                     Delete Student Data
//============================================================================================
router.delete("/delete/studentdata/:StudentID", (req, res) => {
    const id = req.params.StudentID;
    const connection = getConnection();
  
    const queryString =
      "SELECT COUNT(*) AS count FROM Students WHERE StudentID = ?";
  
    connection.query(queryString, [id], (err, results) => {
      if (err) {
        console.log("Faild to the quary " + err);
        res.sendStatus = 500;
        return;
      } else {
        if (results[0].count < 1) {
          console.log("This Student ID " + id + " Does not exist");
          res.json({
            message: "This Student ID " + id + " Does not exist"
          });
        } else {
          const queryString2 = "DELETE FROM Students WHERE StudentID = ?";
          connection.query(queryString2, [id], (err, fields) => {
            if (err) {
              console.log("Failed second query" + err);
              res.sendStatus = 500;
              return;
            } else {
              console.log("The Student With ID: " + id + " Has been Delete It.");
              res.json({
                message: "The Student With ID: " + id + " Has been Delete It."
              });
              res.end();
            }
          });
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