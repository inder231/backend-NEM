const express = require('express');

const productsRouter = express.Router();
productsRouter.get("/",(req,res)=>{
    res.send("Welcome to productsRouter page!")
})

productsRouter.post("/adddetails",(req,res)=>{

})
module.exports = productsRouter;



