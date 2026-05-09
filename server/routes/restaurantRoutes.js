import express from "express";
import Restaurant from "../models/Restaurant.js";
import MenuItem from "../models/MenuItem.js";

const router = express.Router();

// GET /api/restaurants
router.get("/", async (req, res) => {
  const restaurants = await Restaurant.find();
  res.json(restaurants);
});

// GET /api/restaurants/:id/menu
router.get("/:id/menu", async (req, res) => {
  const items = await MenuItem.find({ restaurantId: req.params.id });
  res.json(items);
});

export default router;
