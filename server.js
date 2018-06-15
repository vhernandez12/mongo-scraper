import { mongo } from "mongoose";

var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

//scraping tools
//axios promised based library
var axios = require("axios");
var cheerio = require("cheerio");

//require all models
var db = require("./models");

var PORT = 3000;

//Initialize express
var app = express();

//configure middleware

//morgan logger for logging requests
app.use(logger("dev"));
//body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: true }));
//use express.static to serve the public folder as static directory
app.use(express.static("public"));

//connect to Mongo db
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

//Routes

//GET route for scraping the echoJs website
app.get("/scrape", function (req, res) {
    //load into cheerio and save it to $ for shorthand selector
    var $ = cheerio.load(response.data);

    //grab every h2 within an a tag
    $("a h2").each(function (i, element) {
        //save empty result object
        var result = {};

        //add text and href of every link, saved as properties of the result object
        result.title = $(this)
            .children("h2")
            .text();
        result.link = $(this)
            .attr("href")
        //create new article using the 'result' object built from scraping 
        db.Article.creat(result)
            .then(function (dbArticle) {
                //view added result in the console
                console.log(dbArticle)
            })
            .catch(function (err) {
                //if an error occurred, send it to the client
                return res.json(err);
            });
    });
      //send message to client 
      res.send("Scrape Complete");
    });
});

//route for getting articles from the db
app.get("/article", function(req, res) {
    //grab every document in articles collection 
    db.Article.find({})
        .then(function(dbArticle) 
    
});

