var mongoose = require("mongoose");

//save reference to schema construtor
var Schema = mongoose.Schema;

//using schema constructor, create a new NoteSchema object
//similar to sequelize model
var NoteSchema = new Schema ({
    //title is of type String
    title: String,
    //body is type String
    body: String
});
//creates model from above schema, using mongoose's model method
var Note = mongoose.model("Note", NoteSchema);

//export note model
module.exports = Note;