import Restaurant from "../models/Restaurant.js";

export const searchRestaurants = async (req, res) => {
  try {
    const query = req.query.q;

    if (!query) {
      return res.json([]);
    }

    const restaurants = await Restaurant.find({
      $or: [
        {
          name: {
            $regex: query,
            $options: "i",
          },
        },

        {
          cuisine: {
            $regex: query,
            $options: "i",
          },
        },
      ],
    });

    res.json(restaurants);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Search failed",
    });
  }
};
