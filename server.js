var express = require('express');

var app = express();

var cloudinary = require('cloudinary');

debugger;

cloudinary.config({ 
  cloud_name: 'dwsdfzgln', 
  api_key: '246523723274956', 
  api_secret: 'k4pFBzcPv8eNppLFkldf2oBLzAE' 
});

app.get('*', function (req, res) {
   debugger;                
       res.send("hello"); //fdf
       return req.next();
         
   //cloudinary.uploader.upload("bomb_pic.png", function(err, result) {    
     //console.log(result);
   //});
       
});


app.listen(3000);  

