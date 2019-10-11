

const mysqlconfig = require('./config.json');
const exp = require('express');
const app = exp();
const mySql = require('mysql');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser());

const hostname = '127.0.0.1';
const port = 3000;



//This example of Get 
app.get("/hello", (req, res) => { 
    res.statusCode = 200;
    console.log("Requesting hello?");
    res.send("Hello")

});

//This is Post example
app.post("/createName", (req, res, err) => {
    res.statusCode = 200;
    console.log("Creating Name");
    console.log(req.body.name)
    const n = req.body.name;
    res.send("Hello" + " " + n);
    res.end();
});



app.listen(port, hostname, () => {
    console.log('Server started on port ' + port)

})

//Create Simple Pull Request From The Database
app.get("/tags", (req, res) => {
    const connection = getConnection();
    const queryString = "SELECT * FROM Student";
    
    connection.query(queryString, (err, rows) => {
        if(err){
            console.log(err + ": Faild to run query");
            res.statusCode = 500;
            return;
        }
        else {
            // res.send("hfhfhf");
            res.json(rows);
        }
            res.end();
    });
})


//mySql Connection Pool 
const mySqlConnection = mySql.createPool(
    mysqlconfig
   );

function getConnection(){
    return mySqlConnection;
};

