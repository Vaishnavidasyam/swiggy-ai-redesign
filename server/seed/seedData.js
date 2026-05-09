import mongoose from "mongoose";

import dotenv from "dotenv";

import Restaurant from "../models/Restaurant.js";

import MenuItem from "../models/MenuItem.js";

import connectDB from "../config/db.js";

dotenv.config();

await connectDB();

async function seed() {
  try {
    /* CLEAR OLD */

    await Restaurant.deleteMany();

    await MenuItem.deleteMany();

    /* RESTAURANTS */

    const restaurants = await Restaurant.insertMany([
      {
        name: "Spice Hub",

        cuisine: "Indian",

        rating: 4.5,

        deliveryTime: "30 mins",

        imageUrl:
          "https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=1200&auto=format&fit=crop",
      },

      {
        name: "Pizza Corner",

        cuisine: "Italian",

        rating: 4.3,

        deliveryTime: "25 mins",

        imageUrl:
          "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1200&auto=format&fit=crop",
      },

      {
        name: "Burger Kingdom",

        cuisine: "Burger",

        rating: 4.6,

        deliveryTime: "20 mins",

        imageUrl:
          "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1200&auto=format&fit=crop",
      },

      {
        name: "Sweet Cravings",

        cuisine: "Dessert",

        rating: 4.8,

        deliveryTime: "18 mins",

        imageUrl:
          "https://images.unsplash.com/photo-1551024506-0bccd828d307?q=80&w=1200&auto=format&fit=crop",
      },

      {
        name: "Healthy Bowl",

        cuisine: "Healthy",

        rating: 4.7,

        deliveryTime: "22 mins",

        imageUrl:
          "https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=1200&auto=format&fit=crop",
      },

      {
        name: "Noodle Nest",

        cuisine: "Chinese",

        rating: 4.4,

        deliveryTime: "28 mins",

        imageUrl:
          "https://images.unsplash.com/photo-1617093727343-374698b1b08d?q=80&w=1200&auto=format&fit=crop",
      },
    ]);

    /* MENU ITEMS */

    await MenuItem.insertMany([
      /* SPICE HUB */

      {
        restaurantId: restaurants[0]._id,

        name: "Chicken Biryani",

        description: "Spicy dum biryani with chicken",

        price: 250,

        imageUrl:
          "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?q=80&w=1200&auto=format&fit=crop",
      },

      {
        restaurantId: restaurants[0]._id,

        name: "Veg Biryani",

        description: "Fresh vegetable biryani",

        price: 180,

        imageUrl:
          "https://images.unsplash.com/photo-1642821373181-696a54913e93?q=80&w=1200&auto=format&fit=crop",
      },

      {
        restaurantId: restaurants[0]._id,

        name: "Raita",

        description: "Curd with onions and cucumber",

        price: 40,

        imageUrl: "/images/raita.jpg",
      },

      {
        restaurantId: restaurants[0]._id,

        name: "Gulab Jamun",

        description: "Soft milk dumplings in syrup",

        price: 80,

        imageUrl: "/images/gulab-jamun.jpg",
      },

      /* PIZZA CORNER */

      {
        restaurantId: restaurants[1]._id,

        name: "Margherita Pizza",

        description: "Classic cheese pizza",

        price: 299,

        imageUrl:
          "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?q=80&w=1200&auto=format&fit=crop",
      },

      {
        restaurantId: restaurants[1]._id,

        name: "Veggie Supreme",

        description: "Loaded vegetable pizza",

        price: 399,

        imageUrl:
          "https://images.unsplash.com/photo-1511689660979-10d2b1aada49?q=80&w=1200&auto=format&fit=crop",
      },

      {
        restaurantId: restaurants[1]._id,

        name: "Garlic Bread",

        description: "Crispy garlic bread",

        price: 149,

        imageUrl: "/images/garlic-bread.jpg",
      },

      /* BURGER KINGDOM */

      {
        restaurantId: restaurants[2]._id,

        name: "Classic Chicken Burger",

        description: "Juicy crispy chicken burger",

        price: 249,

        imageUrl:
          "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1200&auto=format&fit=crop",
      },

      {
        restaurantId: restaurants[2]._id,

        name: "Cheese Burger",

        description: "Loaded cheesy burger",

        price: 279,

        imageUrl:
          "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1200&auto=format&fit=crop",
      },

      {
        restaurantId: restaurants[2]._id,

        name: "French Fries",

        description: "Crispy salted fries",

        price: 129,

        imageUrl:
          "https://images.unsplash.com/photo-1576107232684-1279f390859f?q=80&w=1200&auto=format&fit=crop",
      },

      /* SWEET CRAVINGS */

      {
        restaurantId: restaurants[3]._id,

        name: "Chocolate Lava Cake",

        description: "Warm gooey chocolate cake",

        price: 199,

        imageUrl:
          "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=1200&auto=format&fit=crop",
      },

      {
        restaurantId: restaurants[3]._id,

        name: "Brownie Sundae",

        description: "Chocolate brownie with ice cream",

        price: 249,

        imageUrl:
          "https://images.unsplash.com/photo-1563805042-7684c019e1cb?q=80&w=1200&auto=format&fit=crop",
      },

      {
        restaurantId: restaurants[3]._id,

        name: "Ice Cream Bowl",

        description: "Mixed flavour ice cream",

        price: 159,

        imageUrl:
          "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?q=80&w=1200&auto=format&fit=crop",
      },

      /* HEALTHY BOWL */

      {
        restaurantId: restaurants[4]._id,

        name: "Avocado Salad",

        description: "Healthy avocado veggie salad",

        price: 320,

        imageUrl:
          "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=1200&auto=format&fit=crop",
      },

      {
        restaurantId: restaurants[4]._id,

        name: "Protein Bowl",

        description: "High protein chicken bowl",

        price: 399,

        imageUrl:
          "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1200&auto=format&fit=crop",
      },

      /* NOODLE NEST */

      {
        restaurantId: restaurants[5]._id,

        name: "Hakka Noodles",

        description: "Spicy chinese noodles",

        price: 220,

        imageUrl:
          "https://images.unsplash.com/photo-1617093727343-374698b1b08d?q=80&w=1200&auto=format&fit=crop",
      },

      {
        restaurantId: restaurants[5]._id,

        name: "Manchuria",

        description: "Crispy veg manchuria",

        price: 190,

        imageUrl: "/images/manchuria.jpg",
      },
    ]);

    console.log("✅ Premium Seed Data Added");

    process.exit();
  } catch (err) {
    console.log(err);

    process.exit(1);
  }
}

seed();
