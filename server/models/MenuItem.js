import mongoose from "mongoose";

const menuItemSchema = new mongoose.Schema({
  restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant" },
  name: String,
  description: String,
  price: Number,
  veg: Boolean,
  category: String,
  imageUrl: String,
});

export default mongoose.model("MenuItem", menuItemSchema);
