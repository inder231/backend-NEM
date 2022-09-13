const express = require('express');
const { TopicModel } = require('../Models/TopicModel');
const TopicRouter = express.Router();

TopicRouter.get("/",async (req, res) => {
    const data = await TopicModel.find();
  res.send(data);
});

TopicRouter.post("/addtopic",async (req,res)=>{
    const payload = req.body;
    const newTopic = new TopicModel(payload);
    await newTopic.save();
    res.send("Posted")
})

module.exports = {TopicRouter};