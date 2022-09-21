const mongoose = require("mongoose");

const NotesSchema = new mongoose.Schema({
  Heading: { type: String, required: true },
  Note: { type: String, required: true },
  Tag: { type: String, required: true },
  userId:{type:String,required:true},
  createdAt: { type: Date, default: Date.now },
});

const NotesModel = mongoose.model("user", NotesSchema);
module.exports = { NotesModel };
