import express from "express";

const app = express();

import bodyParser from "body-parser";

import request from "request";

import https from "https";


app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static("public"));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
})

app.post("/",function(req,res){
    const fname =  req.body.firstName;
    const sname =  req.body.secondName;
    const Email =  req.body.eMail;

    const data = {
        members : [
            {
                email_address: Email,
                status: "subscribed",
                merge_fields:{
                    FNAME: fname,
                    LNAME: sname,
                }
            }
        ]
    }

    const jsondata = JSON.stringify(data);
    const url = 'https://us21.api.mailchimp.com/3.0/lists/4bc010af40';
    const Option = {
        method: "POST",
        auth: "gpratap608:c7cc4c0292b4b02b410b5a88447af028-us21",
    }

    const request = https.request(url,Option,function(response){
        response.on("data",function(data){
            if (response.statusCode === 200){
                res.sendFile(__dirname+"/success.html");
            }else{
                res.sendFile(__dirname+"/failure.html");
            }


            console.log(JSON.parse(data));
        })
    
    })
    
    request.write(jsondata);
    request.end();
})
app.listen(3000,function(){
    console.log("Server Started At Port 3000");
})


//c7cc4c0292b4b02b410b5a88447af028-us21
//4bc010af40