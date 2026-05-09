import axios from "axios";

const api = axios.create({
  baseURL: "https://swiggy-ai-redesign.onrender.com/api",
});

export default api;
