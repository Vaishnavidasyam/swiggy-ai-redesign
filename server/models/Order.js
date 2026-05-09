import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    /* ORDER ITEMS */

    items: [
      {
        name: String,

        price: Number,

        quantity: Number,
      },
    ],

    /* TOTAL */

    total: {
      type: Number,

      required: true,
    },

    /* PAYMENT */

    paymentMethod: {
      type: String,

      default: "UPI",
    },

    paymentStatus: {
      type: String,

      default: "PENDING",
    },

    razorpayOrderId: {
      type: String,
    },

    /* ORDER STATUS */

    status: {
      type: String,

      default: "PLACED",
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Order", orderSchema);
