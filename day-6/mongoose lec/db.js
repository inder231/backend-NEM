const mongoose = require("mongoose");
const connection = mongoose.connect("mongodb://127.0.0.1:27017/practice");
// connect to database=======

// const connectDB = async () => {
  // console.log('from function');
  // Async - Await because it may take time to connect so that connection can only be made  properly;
  // const connection = await mongoose.connect("mongodb://127.0.0.1:27017/practice");
  // console.log(conn);
  // console.log("Connected to DB");
  // const results = await MarkModel.find();
  // console.log(results);
  /// CREATE OPERATION
  // insertMany or save
  //   const obj = {
  //     mark1: 88,
  //     mark2: 89,
  //     remarks: "Outstanding",
  //   };
  //   const new_marks = await MarkModel.insertMany([obj]);
  //   console.log(new_marks);
  // using save
  // const obj = new MarkModel({
    //   mark1: "45",
    //   mark2: 74,
    //   remarks: 2134214,
    // });
    // const new_mark = await obj.save().then(() => console.log("Document added"));
    // conn.disconnect();
    // };
    // connectDB();
    
    // 2. helps us with some structure - Model and Schema
    // Model - blueprint - a mold to create same structure again and again
    // mongoose.model(name:string,schema:{});
    // model name is singular e.g. mark,student,chair,body,
    
    const markSchema = mongoose.Schema({
      mark1: { type: Number, required: true },
      mark2: { type: Number, required: true },
      remarks: { type: String, required: true },
    });
    const MarkModel = mongoose.model("mark", markSchema);
    module.exports = {connection,MarkModel};
    
    // casting  -- converting
    // "24" -> Number("24");
