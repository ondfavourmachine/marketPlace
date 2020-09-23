import express, { Request, Response } from "express"; // new module es6 method
import Product from "../models/productsModel";

// const router = require('express').Router() old, commonjs method
const router = express.Router();
// Create a post request
router.post("/products", async (req: Request, res: Response) => {
  try {
    // Note that this can be done this way:
    // const product = new Product({
    //     category: req.body.category
    // });
    const { title, description, photo, stockQuantity } = req.body;

    const product = new Product({
      category: req.body.category
    });
    product.title = title;
    product.description = description;
    product.photo = photo;
    product.stockQuantity = stockQuantity;

    await product.save();
    res.status(200).json({
      status: true,
      message: "Successfully saved"
    });
  } catch (e) {
    res.status(500).json({
      status: false,
      message: "Error! Could not save the product"
    });
  }
});




// Get request  for all Products

// Get request for a Single Product

// Put request to update a single product

// Delete request - delete a single product

// export router

export default router;
