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


//                                     Insert Student Data
//=============================================================================================
router.post("/createstudent", (req, res) => {
  const id = req.body.StudentID;
  const name = req.body.FirstName;
  const lastname = req.body.LastName;

  const connection = getConnection();
  const queryString =
    "SELECT COUNT(*) AS count FROM Students WHERE StudentID = ?";

  connection.query(queryString, [id], (err, results) => {
    if (err) {
      console.log("Failed to connect to the Data Base");
      //need to look for proper error code
      return;
    } else {
      if (results[0].count > 0) {
        console.log(
          "Student ID  already exist, try using a different Student ID"
        );
        res.json({
          message:
            "Student ID " +
            id +
            " already exist, try using a different Student ID"
        });
      } else {
        const queryString2 =
          "INSERT INTO Students (StudentID,FirstName,LastName) VALUES(?,?,?)";
        connection.query(queryString2, [id, name, lastname], (err, results) => {
          if (err) {
            console.log("Failed second query" + err);
            res.sendStatus = 500;
            res.json({
              message: err
            });
            return;
          } else {
            console.log(
              "The Student With ID: " +
                id +
                " & First Name: " +
                name +
                " & Last Name of: " +
                lastname +
                " has been added to Students the table"
            );
            res.json({
              message:
                "The Student With ID: " +
                id +
                " & First Name: " +
                name +
                " & Last Name of: " +
                lastname +
                " has been added to Students table"
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
