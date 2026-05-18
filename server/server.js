import dotenv from "dotenv";

dotenv.config();

import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import searchRoutes from "./routes/searchRoutes.js";
import connectDB from "./config/db.js";

import restaurantRoutes from "./routes/restaurantRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import checkoutRoutes from "./routes/checkoutRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();

const server = http.createServer(app);

/* SOCKET.IO */

const io = new Server(server, {
  cors: {
    origin: ["https://swiggy-ai-redesign.vercel.app", "http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  },
});

/* DATABASE */

connectDB();

/* CORS */

app.use(
  cors({
    origin: ["https://swiggy-ai-redesign.vercel.app", "http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

/* MIDDLEWARE */

app.use(express.json());

/* TEST ROUTE */

app.get("/", (req, res) => {
  res.json({
    message: "Swiggy AI Backend Running 🚀",
  });
});

/* SOCKET EVENTS */

io.on("connection", (socket) => {
  console.log("User connected");

  socket.on("join-order-room", (orderId) => {
    socket.join(orderId);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

/* API ROUTES */

app.use("/api/restaurants", restaurantRoutes);

app.use("/api/cart", cartRoutes);

app.use("/api/checkout", checkoutRoutes);

app.use("/api/orders", orderRoutes);

app.use("/api/user", userRoutes);

app.use("/api/ai", aiRoutes);

app.use("/api/auth", authRoutes);
app.use("/api/search", searchRoutes);

/* LIVE ORDER STATUS DEMO */

/* LIVE ORDER STATUS DEMO */

const statuses = [
  "Order Placed ✅",

  "Preparing Food 🍳",

  "Rider Assigned 🛵",

  "Picked Up 📦",

  "Near You 📍",

  "Delivered 🎉",
];

let currentStatus = 0;

setInterval(() => {
  io.emit("order-status-update", {
    status: statuses[currentStatus],
  });

  currentStatus = (currentStatus + 1) % statuses.length;
}, 5000);

/* PORT */

const PORT = process.env.PORT || 5000;

/* START SERVER */

server.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
