import express from "express";
import Cart from "../models/Cart.js";
import MenuItem from "../models/MenuItem.js";

const router = express.Router();

// GET /api/checkout/recommendations
router.get("/recommendations", async (req, res) => {
  const cart = await Cart.findOne({ userId: req.user.id }).populate(
    "items.menuItemId",
  );
  if (!cart || cart.items.length === 0) return res.json([]);

  const mainCategories = cart.items.map((i) => i.menuItemId.category);
  const mainCat = mainCategories[0];

  let suggestions = [];
  if (mainCat === "Biryani") {
    suggestions = await MenuItem.find({
      category: { $in: ["Raita", "Dessert", "Beverage"] },
    }).limit(4);
  } else if (mainCat === "Pizza") {
    suggestions = await MenuItem.find({
      category: { $in: ["Sides", "Beverage"] },
    }).limit(4);
  } else {
    suggestions = await MenuItem.find({
      category: { $in: ["Dessert", "Beverage"] },
    }).limit(4);
  }

  const result = suggestions.map((s) => ({
    id: s._id,
    name: s.name,
    price: s.price,
    reason: "Popular with your current order",
  }));

  res.json(result);
});

// GET /api/checkout/offer
router.get("/offer", async (req, res) => {
  const cart = await Cart.findOne({ userId: req.user.id }).populate(
    "items.menuItemId",
  );
  if (!cart || cart.items.length === 0) {
    return res.json({ promoCode: null, message: "" });
  }

  let subtotal = 0;
  for (const item of cart.items) {
    subtotal += item.menuItemId.price * item.quantity;
  }

  const promoCode = "NEW100";
  const minAmount = 500;
  const savings = 100;

  if (subtotal >= minAmount) {
    return res.json({
      promoCode,
      minAmount,
      missingAmount: 0,
      savings,
      message: `You are saving ₹${savings} with ${promoCode}`,
    });
  }

  const missingAmount = minAmount - subtotal;
  res.json({
    promoCode,
    minAmount,
    missingAmount,
    savings,
    message: `Add ₹${missingAmount} more to save ₹${savings} with ${promoCode}`,
  });
});

export default router;
