const {Router} = require('express');
const movies = Router();



movies.post("/create",(req,res)=>{
    console.log(req.body);
    res.send("Yes")
});
module.exports = movies;