const mysqlconfig = require("./config.json");
const exp = require("express");
const app = exp();
const mySql = require("mysql");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser());

const hostname = "";
const port = 3000;

//======================================================================
const validSystems = [1234, 5678, 9999];
//======================================================================

//This example of Get
app.get("/hello", (req, res) => {
  res.statusCode = 200;
  console.log("Requesting hello?");
  res.send("Hello");
});

//This is Post example
app.post("/createName", (req, res, err) => {
  res.statusCode = 200;
  console.log("Creating Name");
  console.log(req.body.name);
  const n = req.body.name;
  res.send("Hello" + " " + n);
  res.end();
});

app.listen(port, hostname, () => {
  console.log("Server started on port " + port);
});

//Create Simple fetch Request From The Database
app.get("/Vehicles", (req, res) => {
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

//Create Simple fetch to get single tag number
app.get("/Vehicles/:TagNum", (req, res) => {
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
      res.json({
        message: "The Tag: " + id + " does not exist in our database"
      });
      return;
    } else {
      const tagdata = rows.map(row => {
        //convert tags table to json file
        return {
          tagid: row.TagNum,
          studentid: row.StudentID
        };
      });

      res.json(tagdata);
    }
  });
});
//                                     Insert Student Data
//=============================================================================================
//
app.post("/createstudent", (req, res) => {
  const id = req.body.StudentID;
  const name = req.body.FirstName;
  const lastname = req.body.LastName;


  const connection = getConnection();
  const queryString = "SELECT COUNT(*) AS count FROM Students WHERE StudentID = ?";

  connection.query(queryString, [id], (err, results) => {
    if (err) {
      console.log("Failed to connect to the Data Base");
      //need to look for proper error code
      return;
    } else {
      if (results[0].count > 0) {
        console.log("Student ID  already exist, try using a different Student ID");
        res.json({
          message: "Student ID " + id + " already exist, try using a different Student ID"
        });
      } else {
        const queryString2 = "INSERT INTO Students (StudentID,FirstName,LastName) VALUES(?,?,?)";
        connection.query(queryString2, [id, name, lastname], (err, results) => {
          if (err) {
            console.log("Failed second query" + err);
            //need to look for proper error code
            return;
          } else {
            console.log(
              "The Student With ID: " + id + " & First Name: " + name + " & Last Name of: " + lastname 
              + " has been added to Students the table"
            );
            res.json({
              message:
              "The Student With ID: " + id + " & First Name: " + name + " & Last Name of: " + lastname 
              + " has been added to Students table"
            });
            res.end();
          }
        });
      }
    }
  });
});


//Create new Vehicle
//This Method Requires Edit 10/22/2019
app.post("/addtagdata", (req, res) => {
  const id = req.body.TagID;
  const name = req.body.name;

  const connection = getConnection();
  const queryString = "SELECT COUNT(*) AS count FROM Vehicles WHERE TagID = ?";

  connection.query(queryString, [id], (err, results) => {
    if (err) {
      console.log("Failed to connect to the Data Base");
      //need to look for proper error code
      return;
    } else {
      if (results[0].count > 0) {
        console.log("Tagid already exist, try a different tag id");
        res.json({
          message: "Tag id " + id + " already exist, try a different tag id"
        });
      } else {
        const queryString2 = "INSERT INTO tags (tagid,name) VALUES(?,?)";
        connection.query(queryString2, [id, name], (err, results) => {
          if (err) {
            console.log("Failed second query" + err);
            //need to look for proper error code
            return;
          } else {
            console.log(
              "The Data " + id + ":" + name + " has been added to the table"
            );
            res.json({
              message:
                "The Data " + id + ":" + name + " has been added to the table"
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
app.post("/logTagData/:systemID", (req, res) => {
  const sysID = parseInt(req.params.systemID);
  if (validSystems.includes(sysID)) {
    const tagID = req.body.TagNum;

    const queryString = "SELECT * FROM RegData WHERE tagnumber = ? ";
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
        const location = "Parking Deck";

        //  Current Date and Formatting it
        let dt = new Date();
        dt.toISOString().split("T")[0] + " " + dt.toTimeString().split(" ")[0];

        // Grabs the data needed from the database to store locally
        const regData = rows.map(row => {
          return {
            tag_number: row.TagNum,
            student_number: row.studentID,
            tag_status: row.TagStatus
          };
        });

        const queryString2 =
          "INSERT INTO logData (date_time,location,tag_num,student_num,reg_status) VALUES(?,?,?,?,?)";
        connection.query(
          queryString2,
          [
            dt,
            location,
            parseInt(regData[0].TagNum),
            parseInt(regData[0].studentID),
            parseInt(regData[0].TagStatus)
          ],
          err => {
            if (err) {
              console.log("Failed at #2 query: " + err);
              return;
            } else {
              console.log("Car scan was logged");
            }
          }
        );
      }
    });
    res.end();
  } else {
    console.log(
      "System with ID :" + req.params.systemID + " is NOT a valid system."
    );
    res.end();
  }
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
