const {Router} = require('express');
const { IaModel } = require('../Models/IasModel');
const IaRouter = Router();

IaRouter.get("/",(req,res)=>{
    res.send("IA'S")
})
IaRouter.post("/addIA",async(req,res)=>{
    const payload = req.body;
    const newIA = new IaModel(payload);
    await newIA.save();
    res.send("IA added")
})
module.exports = {IaRouter};