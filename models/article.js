var mongoose = require("mongoose");
var Schema = mongoose.Schema;
//save a reference to the schema constructor 
var Schema = mongoose.Schema;

//new userschema object
var ArticleSchema = new Schema({
    //title required and of type string 
    title: {
        type: String,
        required: true
    },
    //link is required and of type String 
    link: {
        type: String,
        required: true
    },
    //note is an object that stres a note id
    // ref property links the objectID to the Note model
    //allows us to populate the article with an associated note
	saved: {
		type: Boolean,
		default: false
	},

    note: [{
        type: Schema.Types.ObjectId,
        ref: "Note"
    }]
});


//creates model form above schema, using mongoose's model method
var Article = mongoose.model("Article", ArticleSchema);

//Export article model
module.exports = Article;