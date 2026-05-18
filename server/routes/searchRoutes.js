import express from "express";

import { searchRestaurants } from "../controllers/searchController.js";

const router = express.Router();

router.get("/", searchRestaurants);

export default router;
