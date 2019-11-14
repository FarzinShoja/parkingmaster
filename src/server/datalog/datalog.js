//
const mysqlconfig = require("../config.json");
const exp = require("express");
const router = exp.Router();
const mySql = require("mysql");
const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser());



//                  Parking Space Count
//===============================================================
const parkingDeck_Lots = 734;

let parkingDeck_Occupants = new Set();

router.get("/parkingDeck_Counter", (req, res) => {
  res.json({
    lots: parkingDeck_Lots - parkingDeck_Occupants.size
  });
  res.end();
});

//Create Simple fetch Request From The Database
router.get("/datalog", (req, res) => {
    //<---------------------- Edit listenning tag
    const connection = getConnection();
    const queryString = "SELECT * FROM DataLog";
  
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
  
  //                                        POST REQUEST TO STORE DATA TO DATABASE FOR RECORD KEEPING
  //===========================================================================================================================
  router.get("/logtagdata/:scannedTagID_loc", (req, res) => {
    var tagid_loc = req.params.scannedTagID_loc;
    console.log(tagid_loc);
    var parametersplit = new Array();
    parametersplit = tagid_loc.split("@");
    const tagID = parametersplit[0]; // <------------ When you send body JSON it needs to send this...
    const location = parametersplit[1];
    const queryString = "SELECT * FROM Vehicles WHERE TagNum = ? ";
    const connection = getConnection();
  
    connection.query(queryString, [tagID], (err, rows) => {
      if (err) {
        console.log("Failed at query #1 connectivity: " + err);
        res.statusCode = 500;
        return;
      } else if (rows.length < 1) {
        console.log("The Tag ID :" + tagID + " does NOT exist in the system");
        return;
      } else {
        // Location of the scan ....
        // This will be on the RaspberryPI code that calls this request or is attached to the verified system ID that can make the calls
  
        //  Current Date and Formatting it
        let dt = new Date();
        dt.toISOString().split("T")[0] + " " + dt.toTimeString().split(" ")[0];
  
        // Grabs the data needed from the database to store locally
        const dataHolder = rows.map(row => {
          return {
            v_ID: row.VehicleID,
            student_number: row.StudentID,
            tag_status: row.TagStatus
          };
        });
        const queryString2 =
          "INSERT INTO DataLog (VehicleID,StudentID,Location,DateLog,TagStatus) VALUES(?,?,?,?,?)";
        connection.query(
          queryString2,
          [
            parseInt(dataHolder[0].v_ID),
            parseInt(dataHolder[0].student_number),
            location,
            dt,
            dataHolder[0].tag_status
          ],
          err => {
            if (err) {
              console.log("Failed at #2 query: " + err);
              
              return;
            } else {
              // this keeps track of the available parking spots
              if (parkingDeck_Occupants.has(tagID)) {
                parkingDeck_Occupants.delete(tagID);
                console.log(parkingDeck_Occupants);
              } else {
                parkingDeck_Occupants.add(tagID);
                console.log(parkingDeck_Occupants);
              }
              console.log("Car scan was logged");
            }
          }
        );
      }
    });
    res.end();
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