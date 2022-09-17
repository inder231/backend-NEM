const express = require("express");
const bcrypt = require("bcrypt");

const app = express();
app.use(express.json());

const users = [];

app.get("/users", (req, res) => {
  res.json(users);
});

app.post("/users",async (req,res)=>{
  const {name,password} = req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password,salt);
    console.log(hashedPass);
    res.send("added");
  } catch (error) {
    res.send("error")
  }
})

app.listen(8000, () => {
  console.log(`Server is running on http://localhost:8000`);
});
