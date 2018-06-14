//dependencies
var cheerio = require("cheerio");
var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var path =require("path");
var logger= require("morgan");
var method = require("method-override");

//Mongoose
var Note = require("")


//initialize express

var app = express();

//public folder
app.use(express.static("public"));

//Database configuration
var databaseUrl = "scraper";
var collections = ["scrapedData"]; 

//mongojs coniguration to the db variable
var db = mongojs(databaseUrl, collections);
db.on("error", function(err){
    console.log("Database Error", err);

});

//main route
app.get("/", function(req, res){
    res.send("hello world")
});