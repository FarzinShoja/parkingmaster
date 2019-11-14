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


router.get("/spacecounter/:id", (req, res) => {
    const connection = getConnection();
    //Attaching
    const id = req.params.id;
  
    const queryString = "SELECT * FROM SpaceCounter WHERE ID = ? ";
  
    connection.query(queryString, [id], (err, rows) => {
      if (err) {
        console.log(err + ":Faild to get the ID");
        //look for proper code error
        res.statusCode = 500;
        return;
      } else if (rows.length < 1) {
        console.log("the ID doesn't exist");
        res.statusCode = 404;
        res.json({
          message: "The ID: " + id + " does not exist in our database"
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