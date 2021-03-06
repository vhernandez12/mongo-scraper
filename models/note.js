var mongoose = require("mongoose");
var Schema = mongoose.Schema;
//save reference to schema construtor
var Schema = mongoose.Schema;

//using schema constructor, create a new NoteSchema object
//similar to sequelize model
var NoteSchema = new Schema ({
   body: {
       type: String
   },
   article: {
        type: Schema.Types.ObjectId,
        ref: "Article"
    }
});

//creates model from above schema, using mongoose's model method
var Note = mongoose.model("Note", NoteSchema);

//export note model
module.exports = Note;