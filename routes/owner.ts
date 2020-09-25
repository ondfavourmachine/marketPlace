import express, { Request, Response } from "express";
import Owner from "../models/ownerModel";
import upload from "../middlewares/upload-photo";

const router = express.Router();

router.post(
  "/owner",
  upload.single("photo"),
  async (req: Request, res: Response) => {
    try {
      const owner = new Owner();
      const { name, about } = req.body;

      owner.name = name;
      owner.about = about;
      owner.photo = req.file.location;

      await owner.save();

      res.status(200).json({
        success: true,
        message: "Successfully created an owner"
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }
);

router.get("/owners", async (req: Request, res: Response) => {
  try {
    let allOwners = await Owner.find();
    res.status(200).json({
      success: true,
      owners: allOwners
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

export default router;
