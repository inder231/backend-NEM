const express = require("express");
const { authentication } = require("../middlewares/authentication");
const { authorization } = require("../middlewares/authorization");
const { ProductModel } = require("../models/ProductModel");

const productRouter = express.Router();

productRouter.get("/products", authentication, async (req, res) => {
  try {
    const { email } = req.body;
    const { limit = 5, page = 1, category, q } = req.query;
    const limitProducts = parseInt(limit);
    const skip = (page - 1) * limitProducts;
    let query = {};
    if (q) {
      query = { $text: { $search: q } };
    }
    if (category) query.category = category;

    const products = await ProductModel.find({ $and: [{ email }, query] }).limit(limit).skip(skip);
    return res
      .status(200)
      .send({ success: true, page: page, limit: limitProducts, products });
  } catch (error) {
    return res.status(500).send("Something went wrong!"+error);
  }
});
productRouter.post(
  "/product/create",
  authentication,
  authorization(["seller"]),
  async (req, res) => {
    try {
      const { email } = req.body;
      const new_product = await new ProductModel({ ...req.body, email });
      await new_product.save();
      return res.send("Added");
    } catch (error) {
      res.status(500).send("Error" + " " + error);
    }
  }
);
productRouter.patch(
  "/product/:id",
  authentication,
  authorization(["seller", "admin"]),
  async (req, res) => {
    try {
      const { email } = req.body;
      let product = await ProductModel.findOne({
        $and: [{ _id: req.params.id }, { email }],
      });
      if (!product) {
        return res.status(404).send("Product not found");
      }
      product = await ProductModel.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      });
      return res.status(201).send({
        success: true,
        message: "Product updated successfully.",
        product,
      });
    } catch (error) {
      return res.status(500).send("Error" + " " + error);
    }
  }
);
productRouter.delete(
  "/product/:id",
  authentication,
  authorization(["seller", "admin"]),
  async (req, res) => {
    try {
      const { email } = req.body;
      let product = await ProductModel.findOne({
        $and: [{ _id: req.params.id }, { email }],
      });
      if (!product) {
        return res.status(404).send("Product not found");
      }
      await ProductModel.findByIdAndDelete(req.params.id);
      return res.send({ success: true, message: "Product deleted successfully." });
    } catch (error) {
      return res.status(500).send("Something went wrong!" + error);
    }
  }
);
module.exports = { productRouter };
