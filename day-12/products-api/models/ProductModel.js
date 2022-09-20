const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  rating: { type: Number,default:0 },
  email: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const ProductModel = mongoose.model("product", ProductSchema);
module.exports = { ProductModel };
