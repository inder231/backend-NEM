const express = require("express");
const { authentication } = require("../middlewares/authentication");
const { authorization } = require("../middlewares/authorization");
const { ProductModel } = require("../models/ProductModel");

const productRouter = express.Router();

productRouter.get("/products", authentication, async (req, res) => {
  try {
    const {email} = req.body;
    console.log(email);
    const products = await ProductModel.find({ email });
    return res.status(200).send({ success: true,products });
  } catch (error) {
    return res.status(500).send("Something went wrong!");
  }
});
productRouter.post(
  "/create",
  authentication,
  authorization(["seller"]),
  async (req, res) => {
    try {
      res.send("Added");
    } catch (error) {
      res.send(500).send("Something went wrong!");
    }
  }
);
productRouter.patch(
  "/product/:id",
  authentication,
  authorization(["seller", "admin"]),
  async (req, res) => {
    try {
      res.send("Updated");
    } catch (error) {
      res.send(500).send("Something went wrong!");
    }
  }
);
productRouter.delete(
  "/product/:id",
  authentication,
  authorization(["seller", "admin"]),
  async (req, res) => {
    try {
      res.send("Deleted");
    } catch (error) {
      res.send(500).send("Something went wrong!");
    }
  }
);
module.exports = { productRouter };
