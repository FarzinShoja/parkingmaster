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


//Create Simple fetch Request From The Database
router.get("/vehicles", (req, res) => {
  //<---------------------- Edit listenning tag
  const connection = getConnection();
  const queryString = "SELECT * FROM Vehicles";

  connection.query(queryString, (err, rows) => {
    if (err) {
      console.log(err + ": Faild to run query");
      //look for proper http code error
      res.statusCode = 500;
      return;
    } else {
      res.json(rows);
    }
    res.end();
  });
});

//          Get Vehicle by ID
//=================================================
router.get("/vehicles/:vID", (req, res) => {
  const connection = getConnection();
  //Attaching
  const id = req.params.vID;

  const queryString = "SELECT * FROM Vehicles WHERE VehicleID = ? ";

  connection.query(queryString, [id], (err, rows) => {
    if (err) {
      console.log(err + ":Faild to get the Vehicle by ID");
      //look for proper code error
      res.statusCode = 404;
      return;
    } else if (rows.length < 1) {
      console.log("the Vehicle ID doesn't exist");
      res.statusCode = 404;
      res.json({
        errorCode: 404,
        message: "The Vehicle: " + id + " does not exist in our database"
      });
      return;
    } else {
      res.json(rows);
    }
  });
});

//Create Simple fetch to get single tag number
router.get("/vehicles/bytagnum/:TagNum", (req, res) => {
  const connection = getConnection();
  //Attaching
  const id = req.params.TagNum;

  const queryString = "SELECT * FROM Vehicles WHERE TagNum = ? ";

  connection.query(queryString, [id], (err, rows) => {
    if (err) {
      console.log(err + ":Faild to get the Tag Number");
      //look for proper code error
      res.statusCode = 500;
      return;
    } else if (rows.length < 1) {
      console.log("the Tag Number doesn't exist");
      res.statusCode = 404;
      res.json({
        message: "The Tag: " + id + " does not exist in our database"
      });
      return;
    } else {
      res.json(rows);
    }
  });
});

//                          Create Simple fetch to get vehicle information
//=================================================================================================
router.get("/vehicles/bystudentid/:StudentID", (req, res) => {
  const connection = getConnection();
  //Attaching
  const id = req.params.StudentID;

  const queryString = "SELECT * FROM Vehicles WHERE StudentID = ? ";

  connection.query(queryString, [id], (err, rows) => {
    if (err) {
      console.log(err + ":Faild to connect to database");
      //look for proper code error
      res.statusCode = 500;
      return;
    } else if (rows.length < 1) {
      console.log("the Student ID: " + id + "doesn't exist");
      res.statusCode = 404;
      res.json({
        message: "The Student ID: " + id + " does not exist in our database"
      });
      return;
    } else {
      res.json(rows);
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
