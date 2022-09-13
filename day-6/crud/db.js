const mongoose = require("mongoose");
const connection = mongoose.connect("mongodb://127.0.0.1:27017/practice");

const movieSchema = mongoose.Schema({
  name: { type: String, required: "This field is required"},
  description:{type:String,required:true},
  category:{type:Array,required:true},
  thumbnail:{type:String,required:true}
});
const MovieModal = mongoose.model("movie",movieSchema);
module.exports = { connection,MovieModal };
