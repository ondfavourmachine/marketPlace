import mongoose, { Document, model } from "mongoose";

const Schema = mongoose.Schema;

const OwnerSchema = new Schema({
  name: { type: String },
  about: String,
  photo: String
});

interface Owner extends Document {
  name: string;
  about: string;
  photo: string;
}

export default model<Owner>("Owner", OwnerSchema);
