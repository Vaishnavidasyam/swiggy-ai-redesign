import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: String,

      required: true,
    },

    items: [
      {
        menuItemId: {
          type: mongoose.Schema.Types.ObjectId,

          ref: "MenuItem",

          required: true,
        },

        quantity: {
          type: Number,

          default: 1,
        },
      },
    ],
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Cart", cartSchema);
