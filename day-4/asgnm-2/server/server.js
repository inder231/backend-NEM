const express = require("express");
const cors = require("cors")
const multer = require("multer");
const app = express();
app.use(
  cors({
    origin: "*",
  })
);
const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads");
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + "-" + Date.now() + ".jpg");
    },
  }),
}).single("user_file");

app.post("/upload", upload, (req, res) => {
    console.log(req.file);
  res.send("file uploaded");
});
app.listen(8000, () => {
  console.log("server on 8000");
});
