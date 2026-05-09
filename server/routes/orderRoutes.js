import express from "express";

import Cart from "../models/Cart.js";

import Order from "../models/Order.js";

import getRazorpayInstance from "../config/razorpay.js";

const router = express.Router();

/* CREATE ORDER */

router.post("/", async (req, res) => {
  try {
    const { paymentMethod } = req.body;

    /* FIND CART */

    const cart = await Cart.findOne().populate("items.menuItemId");

    /* EMPTY CART */

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        message: "Cart empty",
      });
    }

    /* TOTALS */

    const subtotal = cart.items.reduce(
      (acc, item) => acc + item.menuItemId.price * item.quantity,
      0,
    );

    const tax = Math.round(subtotal * 0.05);

    const deliveryFee = subtotal > 500 ? 0 : 40;

    const total = subtotal + tax + deliveryFee;

    /* RAZORPAY */

    const razorpay = getRazorpayInstance();

    const razorpayOrder = await razorpay.orders.create({
      amount: total * 100,

      currency: "INR",

      receipt: `receipt_${Date.now()}`,
    });

    /* CREATE ORDER */

    const order = await Order.create({
      items: cart.items.map((item) => ({
        name: item.menuItemId.name,

        price: item.menuItemId.price,

        quantity: item.quantity,
      })),

      total,

      paymentMethod,

      razorpayOrderId: razorpayOrder.id,

      status: "Preparing",
    });

    /* OPTIONAL:
       CLEAR CART AFTER ORDER
    */

    cart.items = [];

    await cart.save();

    /* RESPONSE */

    res.json({
      ...order.toObject(),

      razorpayOrder,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Order creation failed",
    });
  }
});

/* GET SINGLE ORDER */

router.get("/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.json(order);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Failed to fetch order",
    });
  }
});

/* ORDER HISTORY */

router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().sort({
      createdAt: -1,
    });

    res.json(orders);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Failed to fetch orders",
    });
  }
});

export default router;
