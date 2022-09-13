const express = require('express');
const cors = require('cors')
const {connection,MovieModal} = require("./db");
const movieRouter  = require("./routes/movie");
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/",movieRouter);

app.get("/",(req,res)=>{
    res.send("CRUD");
});
// app.get("/movies",async (req,res)=>{
//     const results = await MovieModal.find();
//     console.log(results);
//     res.send(results)
// })


app.listen(8000, async ()=>{
    try{
        await connection;
        console.log("Connected to database : 200,running on 8000")
    }catch(err){
        console.log("Error in connecting to database")
    }
})
