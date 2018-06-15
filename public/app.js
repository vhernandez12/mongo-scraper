//grab articles as json 
$.getJSON("/article", function (data) {
    //for each one
    for (var i = 0; i < data.length; i++) {
        //display information on page
        $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");

    }
});

//whenever someone clicks a p tag
$(document).on("click", "p", function () {
    //empty notes from note section
    $("#notes").empty();
    //save id from the p tag
    var thisId = $(this).attr("data-id");

    //ajax call for the article
    $.ajax({
        method: "GET",
        url: "/artice/" + thisId
    })
        //adds note information to the page 
        .then(function (data) {
            console.log(data);
            //title of article 
            $("#notes").append("<h2>" + data.title + "</h2>");
            //input ot enter new title
            $("#notes").append("<input id='titleinput' name='title' >");
            //textarea to add a new note body
            $("#notes").append("<textarea id= 'bodyinput' name='title' >");
            //button to submit a new note, with the id of the article saved to it
            $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");

            //there's a note in the article 
            if (data.note) {
                //place title of the note in the title input
                $("#titleinput").val(data.note.title);
                //place body of note in body textarea
                $("bodyinput").val(data.note.body);
            }
        });
});

//when click save note button 
$(document).on("click", "#savenote", function () {
    //grab id associated with the article from the submit button 
    var thisId = $(this).attr("data-id");

    // run POST request to change the note, using what's entered in the inputs
    $.ajax({
        method: "POST",
        url: "/article/" + thisId,
        data: {
            //value taken from title input
            title: $("#titleinput").val(),
            //value taken from note textarea
            body: $("#bodyinput").val()
        }
    })
        .then(function (data) {
            //log the response
            console.log(data);
            //empty notes section 
            $("#notes").empty();
        });
    //remove values entered in the input and textarea for note entry
    $("#titleinput").val("");
    $("#bodyinput").val("");
});
