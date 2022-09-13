const mongoose = require("mongoose");
require("dotenv").config();
const connection = mongoose.connect(process.env.DATABASE_ACCESS);
module.exports = { connection };
