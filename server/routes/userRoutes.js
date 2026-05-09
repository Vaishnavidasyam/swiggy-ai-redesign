import express from "express";
import Address from "../models/Address.js";

const router = express.Router();

// GET /api/user/addresses
router.get("/addresses", async (req, res) => {
  const addresses = await Address.find({ userId: req.user.id });
  res.json(addresses);
});

// POST /api/user/addresses
router.post("/addresses", async (req, res) => {
  const addr = new Address({ userId: req.user.id, ...req.body });
  await addr.save();
  res.status(201).json(addr);
});

export default router;
