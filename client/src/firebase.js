import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBu7g8dqBY9mtsUjylXPgrD-AoM8P_cHe0",

  authDomain: "swiggy-ai-checkout.firebaseapp.com",

  projectId: "swiggy-ai-checkout",

  storageBucket: "swiggy-ai-checkout.firebasestorage.app",

  messagingSenderId: "778539853782",

  appId: "1:778539853782:web:944497d827ea039abfe677",
};

const app = initializeApp(firebaseConfig);

export default app;
