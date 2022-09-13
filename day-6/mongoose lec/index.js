const express = require("express");
const {connection,MarkModel} = require("./db");
const app = express();
app.use(express.json());


app.get("/",(req,res)=>{
res.send("Homepage");
})


app.get("/marks",async (req,res)=>{
    const result = await MarkModel.find();
res.send(result);
})

app.post("/addmarks",async(req,res)=>{
    const {mark1,mark2,remarks} = req.body;
    const new_mark = new MarkModel(mark1,mark2,remarks);
    new_mark.save();
    res.send("Added");
})



app.get("/students",(req,res)=>{
    res.send("students")
})
app.listen(8000, async()=>{
    try{
        await connection;
        console.log("Connected successfully")
    }
    catch(err){
        console.log("Connecting to db error")
    }
    console.log("Running on 8000")
})