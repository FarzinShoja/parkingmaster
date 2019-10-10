//This Simple Code 


const exp = require('express');
const app = exp();
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: false}))
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
    res.end()
});



app.listen(port, hostname, () => {
    console.log('Server started on port ' + port)

})




// Nathan was HERE!!!!!!