//grabs articles a a json
$.getJSON("/articles"), function(data) {
//for each one
for (var i = 0; i < data.length; i++) {
    //diplay the info on page 
    $("#articles").append("<p data-id=" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
    }
});