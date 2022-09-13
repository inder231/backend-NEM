// driver
// 1. Connect db

const mongoose = require("mongoose");

await mongoose.connect("mongodb://localhost/my_database");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const BlogPost = new Schema({
  author: ObjectId,
  title: String,
  body: String,
  date: Date,
});

const Comment = new Schema({
    name:{type:String,default:"Krishna"},
    age:{type:Number,min:18,index:true},
    bio:{type:String,match:/[a-z]/},
    date:{type:Date,default:Date.now},
    buff:Buffer
})
// a setter
Comment.path('name').set(function(v){
    return capitalize(v);
})

// middleware
Comment.pre('save',function(next){
    notify(this.get('email'));
    next();
})
const myModel = mongoose.model("ModelName",mySchema);