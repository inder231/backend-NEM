const mongoose = require("mongoose");
const UserSchema = mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
});
const LogInModel = mongoose.model("user", UserSchema);
module.exports = LogInModel;
