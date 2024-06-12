const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req,res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/",function(req, res){

    const fname = req.body.Fname;
    const lname = req.body.Lname;
    const email = req.body.Email;


const data = {
    members:[
        {
            email_address: email,
            status:"subscribed",
            merge_fields:{
                FNAME:fname,
                LNAME:lname
            }
        }
    ]
};

var jsonData = JSON.stringify(data)

const url ="https://us14.api.mailchimp.com/3.0/lists/65dddd8311";

const option = {
    method: "POST",
    auth: "piyumi:be67aa3bebf76a1b8b538d10f9e6ff64-us14"
}

const request = https.request(url,option,function(response){
    // response.on("data",function(data){
    //     console.log(JSON.parse(data));
    //})

    if (response.statusCode === 200){
        res.sendFile(__dirname + "/success.html");
    }else{
        res.sendFile(__dirname + "/failure.html");
    }
})


app.post("/failure",function(req,res){
    res.redirect("/")
})
request.write(jsonData);
request.end();



});


app.listen(3000,function(){
    console.log("Server is running on port 3000");
});


//API key be67aa3bebf76a1b8b538d10f9e6ff64-us14
//65dddd8311

