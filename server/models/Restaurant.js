import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema({
  name: String,
  area: String,
  cuisine: String,
  rating: Number,
  imageUrl: String,
});

export default mongoose.model("Restaurant", restaurantSchema);
