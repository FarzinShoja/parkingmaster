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
      res.statusCode = 500;
      return;
    } else if (rows.length < 1) {
      console.log("the Student ID doesn't exist");
      res.statusCode = 404;
      res.json({
        message: "The Student: " + id + " does not exist in our database"
      });
      return;
    } else {
      res.json(rows);
    }
  });
});


//          Get Vehicle by ID
//=================================================
app.get("/vehicles/:vID", (req, res) => {
  const connection = getConnection();
  //Attaching
  const id = req.params.sID;

  const queryString = "SELECT * FROM Vehicle WHERE VehicleID = ? ";

  connection.query(queryString, [id], (err, rows) => {
    if (err) {
      console.log(err + ":Faild to get the Student by ID");
      //look for proper code error
      res.statusCode = 500;
      return;
    } else if (rows.length < 1) {
      console.log("the Vehicle ID doesn't exist");
      res.statusCode = 404;
      res.json({
        message: "The Vehicle: " + id + " does not exist in our database"
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
app.get("/vehicles", (req, res) => {
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

//Create Simple fetch to get single tag number
app.get("/vehicles/bytagnum/:TagNum", (req, res) => {
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
app.get("/vehicles/bystudentid/:StudentID", (req, res) => {
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
        console.log("This Student ID " + id + " Does not exist");
        res.json({
          message: "This Student ID " + id + " Does not exist"
        });
      } else {
        const queryString2 =
          "UPDATE Students SET FirstName=?, LastName=?, VehicleID=? WHERE StudentID = ?";
        connection.query(
          queryString2,
          [name, lastname, vehicleid, id],
          (err, results) => {
            if (err) {
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

//                                     Insert Vehicle Data
//=============================================================================================
app.post("/createvehicle", (req, res) => {
  const id = req.body.StudentID;
  const make = req.body.Make;
  const model = req.body.Model;
  const year = req.body.Year;
  const licplate = req.body.LicencePlate;
  const tagnum = req.body.TagNum;
  const tagstatus = req.body.TagStatus;

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
        "INSERT INTO Vehicles (StudentID,Make,Model,Year,LicencePlate,TagNum,TagStatus) VALUES(?,?,?,?,?,?,?)";
      connection.query(
        queryString2,
        [id, make, model, year, licplate, tagnum, tagstatus],
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
                " " +
                tagstatus +
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
                " " +
                tagstatus +
                " has been added to the vehicle table"
            });
            res.end();
          }
        }
      );
    }
  });
});

//                                     Update Vehicle Data
//=============================================================================================
app.put("/updatevehicle", (req, res) => {
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
        res.json({
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

//                                     Delete Vehicle Data
//============================================================================================
app.delete("/delete/vehicledata/:VehicleID", (req, res) => {
  const id = req.params.VehicleID;
  const connection = getConnection();

  const queryString =
    "SELECT COUNT(*) AS count FROM Vehicles WHERE VehicleID = ?";

  connection.query(queryString, [id], (err, results) => {
    if (err) {
      console.log("Faild to the quary " + err);
      res.statusCode = 500;
      return;
    } else {
      if (results[0].count < 1) {
        console.log("This Student ID " + id + " Does not exist");
        res.json({
          message: "This Student ID " + id + " Does not exist"
        });
      } else {
        const queryString2 = "DELETE FROM Vehicles WHERE VehicleID = ?";
        connection.query(queryString2, [id], (err, fields) => {
          if (err) {
            console.log("Failed second query" + err);
            res.sendStatus = 500;
            return;
          } else {
            console.log("The Vehicle With ID: " + id + " Has been Delete It.");
            res.json({
              message: "The Vehicle With ID: " + id + " Has been Delete It."
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

      const queryString2 =
        "INSERT INTO DataLog (VehicleID,StudentID,Location,DateLog,TagStatus) VALUES(?,?,?,?,?)";
      connection.query(
        queryString2,
        [
          parseInt(dataHolder[0].v_ID),
          parseInt(dataHolder[0].student_number),
          location,
          dt,
          parseInt(dataHolder[0].tag_status)
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
