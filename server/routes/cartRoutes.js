import express from "express";

import Cart from "../models/Cart.js";

import MenuItem from "../models/MenuItem.js";

const router = express.Router();

/* DEMO USER */

const DEMO_USER_ID = "demo-user-001";

/* CLEAN INVALID ITEMS */

function cleanCartItems(items = []) {
  return items.filter((item) => item.menuItemId);
}

/* GET CART */

router.get("/", async (req, res) => {
  try {
    let cart = await Cart.findOne({
      userId: DEMO_USER_ID,
    }).populate("items.menuItemId");

    if (!cart) {
      cart = await Cart.create({
        userId: DEMO_USER_ID,

        items: [],
      });
    }

    cart.items = cleanCartItems(cart.items);

    await cart.save();

    res.json(cart);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Failed to fetch cart",
    });
  }
});

/* ADD */

router.post("/add", async (req, res) => {
  try {
    const { menuItemId, quantity } = req.body;

    const menuItem = await MenuItem.findById(menuItemId);

    if (!menuItem) {
      return res.status(404).json({
        message: "Menu item not found",
      });
    }

    let cart = await Cart.findOne({
      userId: DEMO_USER_ID,
    });

    if (!cart) {
      cart = await Cart.create({
        userId: DEMO_USER_ID,

        items: [],
      });
    }

    const existing = cart.items.find(
      (item) => item.menuItemId.toString() === menuItemId,
    );

    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.items.push({
        menuItemId,

        quantity,
      });
    }

    await cart.save();

    const updated = await Cart.findById(cart._id).populate("items.menuItemId");

    res.json(updated);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Failed to add item",
    });
  }
});

/* UPDATE */

router.put("/update", async (req, res) => {
  try {
    const { menuItemId, quantity } = req.body;

    const cart = await Cart.findOne({
      userId: DEMO_USER_ID,
    });

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found",
      });
    }

    const item = cart.items.find((i) => i.menuItemId.toString() === menuItemId);

    if (item) {
      item.quantity = quantity;
    }

    await cart.save();

    const updated = await Cart.findById(cart._id).populate("items.menuItemId");

    res.json(updated);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Failed to update cart",
    });
  }
});

/* DELETE ITEM */

router.delete("/:menuItemId", async (req, res) => {
  try {
    const cart = await Cart.findOne({
      userId: DEMO_USER_ID,
    });

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found",
      });
    }

    cart.items = cart.items.filter(
      (item) => item.menuItemId.toString() !== req.params.menuItemId,
    );

    await cart.save();

    const updated = await Cart.findById(cart._id).populate("items.menuItemId");

    res.json(updated);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Failed to delete item",
    });
  }
});

/* CLEAR CART */

router.delete("/clear", async (req, res) => {
  try {
    const cart = await Cart.findOne({
      userId: DEMO_USER_ID,
    });

    if (!cart) {
      return res.json({
        success: true,
      });
    }

    cart.items = [];

    await cart.save();

    res.json({
      success: true,

      message: "Cart cleared",
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Failed to clear cart",
    });
  }
});

export default router;
