import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  userId: String,
  label: String,
  addressLine: String,
  area: String,
  city: String,
  pincode: String,
});

export default mongoose.model("Address", addressSchema);
