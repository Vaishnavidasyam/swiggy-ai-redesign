// src/socket.js

import { io } from "socket.io-client";

const URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000"
    : "https://swiggy-ai-redesign.onrender.com";

const socket = io(URL, {
  transports: ["websocket"],
});

export default socket;
