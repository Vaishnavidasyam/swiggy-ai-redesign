import Razorpay from "razorpay";

function getRazorpayInstance() {
  return new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,

    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });
}

export default getRazorpayInstance;
