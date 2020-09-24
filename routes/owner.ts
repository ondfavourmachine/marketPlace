import express, { Request, Response } from "express";
import Owner from "../models/ownerModel";

const router = express.Router();

router.post("/owner", async (req: Request, res: Response) => {
  try {
    const owner = new Owner();
    const { name, about, photo } = req.body;

    owner.name = name;
    owner.about = about;
    owner.photo = photo;

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
});

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
