import express from "express";

const router = express.Router();

/* AI FOOD ASSISTANT */

router.post("/recommend", async (req, res) => {
  try {
    const { query } = req.body;

    if (!query) {
      return res.status(400).json({
        success: false,

        message: "Query required",
      });
    }

    let aiResponse = "";

    /* SMART RESPONSES */

    const text = query.toLowerCase();

    if (text.includes("dessert") || text.includes("sweet")) {
      aiResponse = `
🍰 Late Night Dessert Picks

• Chocolate Lava Cake
• Brownie Sundae
• Gulab Jamun with Ice Cream

Perfect sweet cravings for binge watching 😋
        `;
    } else if (text.includes("healthy")) {
      aiResponse = `
🥗 Healthy Meal Suggestions

• Grilled Chicken Bowl
• Paneer Protein Wrap
• Fresh Green Salad

Healthy, tasty and protein rich 💪
        `;
    } else if (text.includes("spicy")) {
      aiResponse = `
🌶️ Spicy Indian Combos

• Hyderabadi Biryani
• Chicken 65
• Butter Naan + Paneer Tikka

Ultimate spicy comfort food 🔥
        `;
    } else if (text.includes("pizza")) {
      aiResponse = `
🍕 Pizza Recommendations

• Farmhouse Pizza
• Cheese Burst Pizza
• Garlic Bread Combo

Perfect for movie nights 🎬
        `;
    } else {
      aiResponse = `
🍔 Recommended For You

• Burger Combo
• Crispy Fries
• Chocolate Shake

Trending combo loved by users ❤️
        `;
    }

    res.json({
      success: true,

      response: aiResponse,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,

      message: "AI failed",
    });
  }
});

export default router;
