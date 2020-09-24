import express, { Response, Request } from "express";
import Category from "../models/categoryModel";

// get instance of router from express
const router = express.Router();

router.post("/categories", async (req: Request, res: Response) => {
  try {
    const category = new Category();
    const { type } = req.body;
    category.type = type;

    // save the category document
    category.save();

    // send a response back
    res.status(200).json({
      success: true,
      message: "Successfully created a new Category!"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Get all Categories
// in mongoDb we use an empty find on the document to fetch all documents
// in the collection.

router.get("/categories", async (req: Request, res: Response) => {
  try {
    // get all documents
    let allCategories = await Category.find();

    // send a response back
    res.status(200).json({
      success: true,
      categories: allCategories
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

export default router;
