//
const mysqlconfig = require("../config.json");
const exp = require("express");
const router = exp.Router();
const mySql = require("mysql");


//Create Simple fetch Request From The Database
router.get("/students", (req, res) => {
    //<---------------------- Edit listenning tag
    const connection = getConnection();
    const queryString = "SELECT * FROM Students";
  
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
  

//          Get Student by ID
//=================================================
router.get("/students/:sID", (req, res) => {
    const connection = getConnection();
    //Attaching
    const id = req.params.sID;
  
    const queryString = "SELECT * FROM Students WHERE StudentID = ? ";
  
    connection.query(queryString, [id], (err, rows) => {
      if (err) {
        console.log(err + ":Faild to get the Student by ID");
        //look for proper code error
        res.statusCode = 404;
        return;
      } else if (rows.length < 1) {
        console.log("the Student ID doesn't exist");
        res.statusCode = 404;
        res.json({
          errorCode: 404,
          message: "The Student: " + id + " does not exist in our database"
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