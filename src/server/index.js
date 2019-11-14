//==============================================================
const mysqlconfig = require("./config.json");
const exp = require("express");
const app = exp();
const mySql = require("mysql");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser());

const hostname = "";
const port = 3000;




//**************** Student */

//**************** Vehicle */
const router = require('./Vehicle/vehicles.js');
const router1 = require('./Vehicle/createVehicles.js');
const router2 = require('./Vehicle/updatevehicle.js');
const router3 = require('./Vehicle/deletevehicle');

app.use(router);
app.use(router1);
app.use(router2);
app.use(router3);



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

//                  Parking Space Count
//===============================================================
const parkingDeck_Lots = 734;

let parkingDeck_Occupants = new Set();

app.get("/parkingDeck_Counter", (req, res) => {
  res.json({
    lots: parkingDeck_Lots - parkingDeck_Occupants.size
  });
  res.end();
});

app.get("/spacecounter/:id", (req, res) => {
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

//          Get Student by ID
//=================================================
app.get("/students/:sID", (req, res) => {
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

//Create Simple fetch Request From The Database
app.get("/students", (req, res) => {
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



//Create Simple fetch Request From The Database
app.get("/datalog", (req, res) => {
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


//                                     Insert Student Data
//=============================================================================================
app.post("/createstudent", (req, res) => {
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

//                                     Update Student Data
//=============================================================================================
app.put("/updatestudent", (req, res) => {
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

//                                     Delete Student Data
//============================================================================================
app.delete("/delete/studentdata/:StudentID", (req, res) => {
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



//                                        POST REQUEST TO STORE DATA TO DATABASE FOR RECORD KEEPING
//===========================================================================================================================
app.get("/logtagdata/:scannedTagID_loc", (req, res) => {
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

      console.log(dataHolder[0].v_ID);

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

//===========================================================================================================================

//mySql Connection Pool
const mySqlConnection = mySql.createPool(
  //Remote file for username config
  mysqlconfig
);

function getConnection() {
  return mySqlConnection;
}
