import mongoose, { Document, model } from "mongoose";

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  // one to many/ one to one relationship. Each product will be attached
  // to a category with an objectId as the connection
  category: { type: Schema.Types.ObjectId, ref: "Category" },
  owner: { type: Schema.Types.ObjectId, ref: "Owner" },
  title: { type: String },
  description: String,
  photo: String,
  price: Number,
  stockQuantity: Number,
  rating: [Number]
});

export interface AProduct extends Document {
  category?: string;
  owner?: string;
  title: string;
  description?: string;
  photo: string;
  price: number;
  stockQuantity: number;
  rating?: number;
}

export default model<AProduct>("Product", ProductSchema);
