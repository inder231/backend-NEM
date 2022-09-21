const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  username: { type: String },
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user","seller","admin","superadmin"], default: "user" },
  createdAt: { type: Date, default: Date.now },
});

const UserModel = mongoose.model("user", UserSchema);
module.exports = { UserModel };
