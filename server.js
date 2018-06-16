var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var method = require("method=override");
var cheerio = require("cheerio");
var request = require("request");

//connect to Mongo db
var  Note = require("./models/note")
var  Article = require("./models/article")
var databaseUrl = 'mongodb://localhost/mongoHeadlines';
var MONGODB_URI = process.env.MONGODB_URI

if (process.env.MONGODB_URI) {
    mongoose.connect(process.env.MONGODB_URI);
}
else {
    mongoose.connect(databaseUrl);
};
// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
var db = mongoose.connection;

db.on("error", function(error) {
    console.log("Mongoose Error:", error);
});

db.once("open", function() {
    console.log("Mongoose connection successful.");
});
//Initialize express
var app = express();
var port = process.env.PORT || 3000;



//configure middleware


app.use(logger("dev"));
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(method("_method"));



/* /scraping tools
//axios promised based library
var axios = require("axios");


//require all models
var db = require("./models");





//Routes

//GET route for scraping the echoJs website
app.get("/scrape", function (req, res) {
    //grab body of html with request
    axios.get("https://www.reddit.com/r/thewalkingdead/").then(function(response){
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
        db.Article.create(result)
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
    .then(function(dbArticle) {
       //send articles back to client
        res.json(dbArticle);
    })
    .catch(function(err) {
        //an error occurred, send it to the client
        res.json(err);
    });
});

//route for grabbing a specific article by id, populate with note
app.get("/article/:id", function(req, res) {
//using id passed in the id parameter, prepare a query that finds the matching ne in our 
    db.Article.findOne({ _id: req.params.id })
    //..populate all notes associated with it
    .populate("note")
    .then(function(dbArticle) {
        //we were able to successfully find an article with given id, send it back to the client
        res.json(dbArticle);
    })
    .catch(function(err) {
        //if an erro occurred, send it to client
        res.json(err);
    });
});

//route for saving/updating article's associated note
app.post("/article/:id", function(req,res) {
    //create new note and pass the req.body to entry
    db.Note.create(req.body)
        .then(function(dbNote) {
        return db.Article.findOneAndUpdate({_id: req.params.id}, { note: dbNote._id }, { new:true });
    })
    .catch(function(err) {
        //if an error occurred, send it to client
        res.json(err);
    });
});
//start server
app.listen(PORT, function() {
    console.log("App running on port" + PORT + "!");
});
*/