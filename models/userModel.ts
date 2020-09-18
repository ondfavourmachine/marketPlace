import mongoose, { model, Document } from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: String,
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  // this is the way to do relational mapping
  // this means that there is a one to one relationship btw the
  // address table and a user in the user table
  // also each address will be linked to a user by a unique id which also be
  // its primary key.
  address: { type: Schema.Types.ObjectId, ref: "Address" }
});

interface AUser extends Document {
  name: string;
  email: string;
  password?: string;
  // leave the company field out
  // gender: Gender;
  // friends: Types.Array<string>;
  // creditCards?: Types.Map<string>;
}

export default model<AUser>("User", UserSchema);
