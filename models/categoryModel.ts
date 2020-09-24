import mongoose, { Document, model } from "mongoose";

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  type: { type: String, unique: true, required: true }
});

interface Category extends Document {
  type: string;
}

export default model<Category>("Category", CategorySchema);
