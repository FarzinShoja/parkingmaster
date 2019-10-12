

const mysqlconfig = require('./config.json');
const exp = require('express');
const app = exp();
const mySql = require('mysql');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser());

const hostname = '' ;
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

//Create Simple fetch Request From The Database
app.get("/tags", (req, res) => {       //<---------------------- Edit listenning tag 
    const connection = getConnection();
    const queryString = "SELECT * FROM tags";
    
    connection.query(queryString, (err, rows) => {
        if(err){
            console.log(err + ": Faild to run query");
            //look for proper http code error 
            res.statusCode = 500;
            return;
        } else {
            res.json(rows);
        }
            res.end();
    });
})


//Create Simple fetch to get single tag id 
app.get("/tag/:tagid", (req, res) =>{
    const connection = getConnection();
    //Attaching 
    const id = req.params.tagid;

    const queryString = "SELECT * FROM tags WHERE tagid = ? ";

    connection.query(queryString, [id], (err, rows) => {

        if(err){
            console.log(err + ":Faild to get the Tag ID")
            //look for proper code error 
            res.statusCode = 500;
            return;
        } else if (rows.length < 1 ){
            console.log("the Tag ID oesn't exist");
            res.json({
                "message" : "The Tag: " + id + " does not exist in our database"
            });
            return;
        } else {
            const tagdata = rows.map(row => {
                //convert tags table to json file 
                return {
                    tagid:row.tagid,
                    name:row.name
                };
            });

            res.json(tagdata);
        }

    })

});


//Create new tag data
app.post("/addtagdata" , (req, res) => {
    const id = req.body.tagid;
    const name = req.body.name;
    
    const connection = getConnection();
    const queryString = "SELECT COUNT(*) AS count FROM tags WHERE tagid = ?"


    connection.query(queryString, [id], (err, results) => {
        
        if(err){
            console.log("Failed to connect to the server"); 
            //need to look for proper http error code
            return;
        } else {
            if(results[0].count > 0){
                console.log("Tagid already exist, try a different tag id");
                res.json({
                    "message" : "Tag id " + id +  " already exist, try a different tag id"
                });
            } else {
                const queryString2 = "INSERT INTO tags (tagid,name) VALUES(?,?)";
                connection.query(queryString2, [id, name] , (err, results) => {
                    if(err){
                        console.log("Failed second query" + err);
                        //need to look for proper error code
                        return;
                    } else {
                        console.log("The Data " + id + " :" + name + " has been added to the table");
                        res.json({
                            "message": "The Data " + id + " :" + name + " has been added to the table"
                        });
                        res.end();
                    }
                })
            }
        }
    })
})


//mySql Connection Pool 
const mySqlConnection = mySql.createPool(
    //Remote file for username config
    mysqlconfig
   );

function getConnection(){
    return mySqlConnection;
};
