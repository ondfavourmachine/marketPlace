import express, { Request, Response } from "express"; // new module es6 method
import Product, { AProduct } from "../models/productsModel";
import upload from "../middlewares/upload-photo";

// const router = require('express').Router() old, commonjs method
const router = express.Router();
// Create a post request
router.post(
  "/products",
  upload.single("photo"),
  async (req: Request, res: Response) => {
    try {
      // Note that this can be done this way:
      // const product = new Product({
      //     category: req.body.category
      // });
      const { title, description, stockQuantity } = req.body;
      const product = new Product({
        category: req.body.category
      });
      product.title = title;
      product.description = description;
      product.photo = req.file["location"];
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
  }
);

// Get request  for all Products
router.get("/product/all", async (req: Request, res: Response) => {
  try {
    let allProducts = await Product.find();
    res.status(200).json({
      success: true,
      allProducts: allProducts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Get request for a Single Product
router.get("/product/:id", async (req: Request, res: Response) => {
  try {
    let allProducts = await Product.findOne({ _id: req.params.id });
    res.status(200).json({
      success: true,
      allProducts: allProducts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Put request to update a single product
router.put(
  "/product/modify/:id",
  upload.single("photo"),
  async (req: Request, res: Response) => {
    const {
      title,
      description,
      categoryID,
      ownerID,
      price,
      stockQuantity,
      rating
    } = req.body;
    const objToSet: Record<string, any> = {
      title,
      description,
      categoryID,
      ownerID,
      price,
      stockQuantity,
      rating,
      photo: req.file ? req.file.location : undefined
    };

    for (let key in objToSet) {
      if (!objToSet[key]) {
        delete objToSet[key];
      }
      if (!objToSet.hasOwnProperty(key)) {
        delete objToSet[key];
      }
    }
    try {
      // upsert = true, will create the document if it doesnt exists
      let product = await Product.findOneAndUpdate(
        { _id: req.params.id },
        {
          $set: objToSet
        },
        { upsert: true }
      );
      res.status(200).json({
        success: true,
        updatedProduct: product
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }
);

// Delete request - delete a single product

router.delete("/products/remove/:id", async (req: Request, res: Response) => {
  try {
    const deletedProduct = await Product.findOneAndDelete({
      _id: req.params.id
    });
    if (deletedProduct) {
      res.status(200).json({
        success: true,
        deletedProduct
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Nothing to delete"
      });
    }
  } catch (error) {
    res.status(500).json({
      success: true,
      error: error.message
    });
  }
});

// export router

export default router;
