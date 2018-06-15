//dependencies
var express = require("express");
var mongojs = require("mongojs");

//mongoose

//require request and cheerio
var request = require("request");
var cheerio = require("cheerio");

//intialize express
var app = express();

//database configuration 
var databaseUrl = "scrapper";
var collection = ["scrapedData"];

//hook mongojs configuration to the db variable
var db = mongojs(databaseUrl, collection);
db.on("error", function (error) {
    console.log("Database Error:", error);
});

//main route 
app.get("/", function (req, res) {
    res.send("Hello World");
});

//Route 1
//retreives  data
app.get("/all", function (req, res) {
    db.scrapedData.find({}, function (err, found) {
        if (err) {

        }

        else {
            res.json(found);
        }
    });
});

//rout 2
//server scrape data from site your choce and save it to mongodb

app.get("/scrape", function (req, res) {

    request("https://www.reddit.com/r/thewalkingdead/", function (error, response, html) {
        var $ = cheerio.load(html); 

        $('a').each(function (i, element) {
            var headline = $(element).children('h2').text();
             var link = $(element).attr("href");
            
            if (headline && link) {
                db.scrapedData.save({
                    headline: headline,
                    link: link

                },
                    function (error, saved) {
                        if (error) {
                            console.log(error);
                        }
                        else {
                            console.log(saved);
                        }

                    });

            }
        });
    });

    res.send("Scrape complete");
});




app.listen(3000, function () {
    console.log("App running on port 3000!");
});