const express = require("express");
const { MovieModal } = require("../db");
const router = express.Router();

router.get("/movies",async (req,res)=>{
  let {limit=10,page=1,category,q} = req.query;
  const limitRecords = parseInt(limit);
  const skip = (page-1)*limit;
  let query = {};
  if(q){
    query = {$text:{$search:q}};
  }
  if(category) query.category = category;
  try{
    const movies = await MovieModal.find(query).limit(limitRecords).skip(skip);
    res.json({page:page,limit:limitRecords,movies});
  }catch(err){
    res.status(400).json({message:err});
  }
})
router.post("/movies",async (req,res)=>{
  const {name,description,category,thumbnail} = req.body
  // console.log(name,description,category,thumbnail);
  const newMovie = new MovieModal({
    name,description,category,thumbnail
  })
  try{
    await newMovie.save();
    res.send("Movie Added")
  }catch(err){
    res.status(400);
  }
});
router.patch("/movies/:id",async (req,res)=>{
  let paramId = req.params.id;
  let name = req.body.name;
  try{
    const updateMovie = await MovieModal.updateOne({id:paramId},{name:name});
    // updateMovie.save();
    res.send(updateMovie);
  }catch(err){
    res.send("Error",err)
  }
})
router.delete("/movies/:id",async (req,res)=>{
  let paramId = req.params.id;
  try{
    const data = await MovieModal.deleteOne({id:paramId});
    res.send(data);
  }catch(err){
    res.send("Error",err)
  }
})
module.exports = router;
