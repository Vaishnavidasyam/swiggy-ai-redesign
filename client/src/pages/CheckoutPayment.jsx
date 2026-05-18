// src/pages/CheckoutPayment.jsx

import { useEffect, useState } from "react";

import {
  Smartphone,
  CreditCard,
  Banknote,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Clock3,
  CheckCircle2,
  X,
  WalletCards,
  Zap,
} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";

import { useNavigate } from "react-router-dom";

import useThemeStore from "../store/themeStore";

import { useCart } from "../context/CartContext";

export default function CheckoutPayment() {
  const navigate = useNavigate();

  const { darkMode } = useThemeStore();

  const {
    cartItems = [],
    subtotal = 0,
    taxes = 0,
    deliveryFee = 0,
    grandTotal = 0,
    clearCart,
  } = useCart();

  /* STATES */

  const [loading, setLoading] = useState(true);

  const [paymentMethod, setPaymentMethod] = useState(
    localStorage.getItem("lastPaymentMethod") || "UPI",
  );

  const [selectedTip, setSelectedTip] = useState(20);

  const [processing, setProcessing] = useState(false);

  const [showCardModal, setShowCardModal] = useState(false);

  const [showUpiModal, setShowUpiModal] = useState(false);

  const [selectedUpi, setSelectedUpi] = useState("Google Pay");

  /* CARD */

  const [cardData, setCardData] = useState({
    name: "Rahul Sharma",

    number: "4111 1111 1111 1111",

    expiry: "12/28",

    cvv: "123",
  });

  /* UPI APPS */

  const upiApps = [
    {
      name: "Google Pay",

      image: "https://cdn-icons-png.flaticon.com/512/6124/6124998.png",
    },

    {
      name: "PhonePe",

      image: "https://download.logo.wine/logo/PhonePe/PhonePe-Logo.wine.png",
    },

    {
      name: "Paytm",

      image: "https://download.logo.wine/logo/Paytm/Paytm-Logo.wine.png",
    },
  ];

  /* LOAD */

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 700);
  }, []);

  /* SAVE METHOD */

  useEffect(() => {
    localStorage.setItem("lastPaymentMethod", paymentMethod);
  }, [paymentMethod]);

  /* TOTAL */

  const finalTotal = grandTotal + selectedTip;

  /* EMPTY */

  if (!cartItems || cartItems.length === 0) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          darkMode ? "bg-[#0b1220] text-white" : "bg-[#f5f7fb] text-black"
        }`}
      >
        <div className="text-center">
          <div className="h-24 w-24 mx-auto rounded-full bg-gradient-to-r from-orange-500 to-pink-500 flex items-center justify-center text-white shadow-lg">
            <WalletCards size={40} />
          </div>

          <h1 className="text-4xl font-black mt-8">Cart Empty</h1>

          <p className="mt-3 text-gray-500">Add delicious food to continue</p>
        </div>
      </div>
    );
  }

  /* LOADING */

  if (loading) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          darkMode ? "bg-[#0b1220]" : "bg-[#f5f7fb]"
        }`}
      >
        <div className="h-16 w-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  /* PAYMENT FLOW */

  function handlePayment() {
    if (paymentMethod === "CARD") {
      setShowCardModal(true);

      return;
    }

    if (paymentMethod === "UPI") {
      setShowUpiModal(true);

      return;
    }

    processSuccess();
  }

  /* SUCCESS */

  function processSuccess() {
    setProcessing(true);

    /* CREATE ORDER */

    const latestOrder = {
      id: "#" + Math.random().toString(36).substring(2, 7).toUpperCase(),

      restaurant: cartItems[0]?.restaurant || "Swiggy AI",

      total: finalTotal,

      payment:
        paymentMethod === "UPI"
          ? selectedUpi
          : paymentMethod === "CARD"
            ? "Card Payment"
            : "Cash On Delivery",

      eta: "28-35 mins",

      rider: "Rahul Kumar",

      address: "Ameerpet, Hyderabad",

      createdAt: new Date().toISOString(),

      items: cartItems.map((item) => ({
        _id: item._id,

        name: item.name,

        qty: item.quantity || 1,

        quantity: item.quantity || 1,

        price: item.price,

        imageUrl: item.imageUrl,

        restaurant: item.restaurant,
      })),
    };

    /* SAVE */

    localStorage.setItem("latestOrder", JSON.stringify(latestOrder));

    /* OPTIONAL ORDER HISTORY */

    const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];

    localStorage.setItem(
      "orders",
      JSON.stringify([latestOrder, ...existingOrders]),
    );

    /* CLEAR CART */

    if (clearCart) {
      clearCart();
    }

    /* REDIRECT */

    setTimeout(() => {
      navigate("/orders");
    }, 2200);
  }

  /* CARD */

  function handleCardPay() {
    setShowCardModal(false);

    processSuccess();
  }

  /* UPI */

  function handleUpiPay() {
    setShowUpiModal(false);

    processSuccess();
  }

  return (
    <div
      className={`min-h-screen pb-[180px] transition-all duration-300 ${
        darkMode ? "bg-[#0b1220] text-white" : "bg-[#f5f7fb] text-black"
      }`}
    >
      {/* OVERLAY */}

      {processing && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 flex items-center justify-center">
          <div className="bg-white rounded-[30px] p-8 text-center shadow-2xl">
            <div className="h-16 w-16 mx-auto border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />

            <h2 className="text-2xl font-black mt-6">Processing Payment</h2>

            <p className="text-gray-500 mt-2">AI is confirming your order...</p>
          </div>
        </div>
      )}

      {/* CONTAINER */}

      <div className="max-w-[1450px] mx-auto px-4 md:px-6 xl:px-10">
        {/* HEADER */}

        <div
          className={`sticky top-0 z-30 pt-6 pb-5 backdrop-blur-xl ${
            darkMode ? "bg-[#0b1220]/90" : "bg-[#f5f7fb]/90"
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-500 font-bold text-sm">
                AI SECURE CHECKOUT
              </p>

              <h1 className="text-4xl md:text-5xl font-black mt-2">Payment</h1>

              <p
                className={`mt-3 text-sm ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Secure encrypted transaction
              </p>
            </div>

            <div className="h-16 w-16 rounded-3xl bg-gradient-to-r from-orange-500 to-pink-500 text-white flex items-center justify-center shadow-lg">
              <WalletCards size={28} />
            </div>
          </div>
        </div>

        {/* GRID */}

        <div className="grid xl:grid-cols-[1fr_420px] gap-8 mt-6">
          {/* LEFT */}

          <div className="space-y-6">
            {/* HERO */}

            <div className="relative overflow-hidden rounded-[36px] bg-gradient-to-br from-orange-500 via-[#ff6b57] to-pink-500 p-7 md:p-10 shadow-xl text-white">
              <div className="absolute -right-16 -top-16 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-lg px-4 py-2 rounded-full text-xs font-black">
                  <Zap size={14} />
                  AI Payment Assist
                </div>

                <h2 className="text-4xl md:text-6xl font-black leading-[1] mt-6">
                  Faster.
                  <br />
                  Smarter.
                  <br />
                  Secure.
                </h2>

                <p className="mt-5 max-w-xl text-orange-100 leading-7">
                  AI recommends the fastest and safest payment method based on
                  your checkout experience.
                </p>

                <div className="flex flex-wrap gap-4 mt-8">
                  <StatCard label="Success Rate" value="98%" />

                  <StatCard label="Avg Speed" value="2 sec" />

                  <StatCard label="Fraud Protection" value="100%" />
                </div>
              </div>
            </div>

            {/* ETA */}

            <div
              className={`rounded-[30px] p-6 border ${
                darkMode
                  ? "bg-[#151d2d] border-[#232c3f]"
                  : "bg-white border-gray-100"
              }`}
            >
              <div className="flex items-center gap-5">
                <div className="h-16 w-16 rounded-2xl bg-orange-100 text-orange-500 flex items-center justify-center">
                  <Clock3 size={28} />
                </div>

                <div>
                  <h2 className="text-2xl font-black">
                    Delivery in 28-35 mins
                  </h2>

                  <p
                    className={`mt-2 text-sm ${
                      darkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    AI optimized delivery route selected
                  </p>
                </div>
              </div>
            </div>

            {/* METHODS */}

            <div>
              <h2 className="text-3xl font-black">Payment Methods</h2>

              <div className="space-y-4 mt-5">
                <PaymentMethod
                  icon={<Smartphone />}
                  title="UPI Payment"
                  subtitle="Recommended for fastest checkout"
                  active={paymentMethod === "UPI"}
                  onClick={() => setPaymentMethod("UPI")}
                  darkMode={darkMode}
                />

                <PaymentMethod
                  icon={<CreditCard />}
                  title="Credit / Debit Card"
                  subtitle="Visa, Mastercard, Rupay"
                  active={paymentMethod === "CARD"}
                  onClick={() => setPaymentMethod("CARD")}
                  darkMode={darkMode}
                />

                <PaymentMethod
                  icon={<Banknote />}
                  title="Cash On Delivery"
                  subtitle="Pay after delivery"
                  active={paymentMethod === "COD"}
                  onClick={() => setPaymentMethod("COD")}
                  darkMode={darkMode}
                />
              </div>
            </div>

            {/* TIP */}

            <div
              className={`rounded-[30px] p-6 border ${
                darkMode
                  ? "bg-[#151d2d] border-[#232c3f]"
                  : "bg-white border-gray-100"
              }`}
            >
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-black">Add Delivery Tip</h2>

                <div className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-xs font-bold">
                  Optional
                </div>
              </div>

              <div className="flex flex-wrap gap-3 mt-5">
                {[0, 20, 40, 60, 100].map((tip) => (
                  <button
                    key={tip}
                    onClick={() => setSelectedTip(tip)}
                    className={`min-w-[90px] py-4 rounded-[20px] font-black transition-all duration-300 ${
                      selectedTip === tip
                        ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-lg"
                        : darkMode
                          ? "bg-[#20283b]"
                          : "bg-[#f4f6fb]"
                    }`}
                  >
                    {tip === 0 ? "No Tip" : `₹${tip}`}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT */}

          <div className="xl:sticky xl:top-32 h-fit">
            <div
              className={`rounded-[36px] overflow-hidden border shadow-sm ${
                darkMode
                  ? "bg-[#151d2d] border-[#232c3f]"
                  : "bg-white border-gray-100"
              }`}
            >
              {/* TOP */}

              <div className="p-6 border-b border-black/5">
                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 rounded-2xl bg-gradient-to-r from-orange-500 to-pink-500 text-white flex items-center justify-center">
                    <ShieldCheck size={22} />
                  </div>

                  <div>
                    <h2 className="font-black text-2xl">Secure Checkout</h2>

                    <p
                      className={`text-sm mt-1 ${
                        darkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      AI verified & encrypted
                    </p>
                  </div>
                </div>
              </div>

              {/* ITEMS */}

              <div className="p-6 space-y-4 max-h-[400px] overflow-y-auto">
                {cartItems.map((item) => (
                  <div
                    key={item._id}
                    className={`flex items-center gap-4 rounded-[24px] p-3 ${
                      darkMode ? "bg-[#20283b]" : "bg-[#f8fafc]"
                    }`}
                  >
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="h-16 w-16 rounded-2xl object-cover"
                    />

                    <div className="flex-1">
                      <h3 className="font-black text-sm">{item.name}</h3>

                      <p
                        className={`text-xs mt-1 ${
                          darkMode ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        Qty {item.quantity}
                      </p>
                    </div>

                    <h2 className="font-black">
                      ₹{item.price * item.quantity}
                    </h2>
                  </div>
                ))}
              </div>

              {/* BILL */}

              <div className="border-t border-black/5 p-6">
                <BillRow label="Items Total" value={`₹${subtotal}`} />

                <BillRow
                  label="Delivery Fee"
                  value={deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}
                  green={deliveryFee === 0}
                />

                <BillRow label="Taxes" value={`₹${taxes}`} />

                {selectedTip > 0 && (
                  <BillRow label="Delivery Tip" value={`₹${selectedTip}`} />
                )}

                <div className="border-t border-black/5 my-5" />

                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-xs text-gray-500">Final Amount</p>

                    <h2 className="text-3xl font-black mt-1">To Pay</h2>
                  </div>

                  <h2 className="text-[42px] font-black tracking-tight text-[#ff6b57]">
                    ₹{finalTotal}
                  </h2>
                </div>

                {/* FEATURES */}

                <div className="space-y-4 mt-8">
                  <FeatureRow
                    icon={<ShieldCheck size={18} />}
                    title="256-bit encrypted payments"
                  />

                  <FeatureRow
                    icon={<Sparkles size={18} />}
                    title="AI fraud detection enabled"
                  />

                  <FeatureRow
                    icon={<CheckCircle2 size={18} />}
                    title="Instant order confirmation"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PAY BAR */}

      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 w-full max-w-2xl px-4 z-50">
        <button
          disabled={processing}
          onClick={handlePayment}
          className="w-full rounded-[30px] px-6 py-5 bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-[0_15px_45px_rgba(255,120,100,0.35)]"
        >
          <div className="flex items-center justify-between">
            <div className="text-left">
              <p className="text-xs text-orange-100">Instant confirmation</p>

              <h2 className="text-3xl font-black mt-1">₹{finalTotal}</h2>
            </div>

            <div className="flex items-center gap-3 font-black text-lg">
              {processing ? (
                "Processing..."
              ) : (
                <>
                  Pay Now
                  <ArrowRight size={22} />
                </>
              )}
            </div>
          </div>
        </button>
      </div>

      {/* CARD MODAL */}

      <AnimatePresence>
        {showCardModal && (
          <ModalWrapper>
            <div
              className={`rounded-t-[40px] p-6 ${
                darkMode ? "bg-[#151d2d]" : "bg-white"
              }`}
            >
              <ModalHeader
                title="Card Details"
                subtitle="Secure mock payment"
                close={() => setShowCardModal(false)}
              />

              <div className="space-y-4 mt-7">
                <Input
                  placeholder="Card Holder Name"
                  value={cardData.name}
                  onChange={(e) =>
                    setCardData({
                      ...cardData,
                      name: e.target.value,
                    })
                  }
                  darkMode={darkMode}
                />

                <Input
                  placeholder="4111 1111 1111 1111"
                  value={cardData.number}
                  onChange={(e) =>
                    setCardData({
                      ...cardData,
                      number: e.target.value,
                    })
                  }
                  darkMode={darkMode}
                />

                <div className="grid grid-cols-2 gap-4">
                  <Input
                    placeholder="MM/YY"
                    value={cardData.expiry}
                    onChange={(e) =>
                      setCardData({
                        ...cardData,
                        expiry: e.target.value,
                      })
                    }
                    darkMode={darkMode}
                  />

                  <Input
                    placeholder="CVV"
                    value={cardData.cvv}
                    onChange={(e) =>
                      setCardData({
                        ...cardData,
                        cvv: e.target.value,
                      })
                    }
                    darkMode={darkMode}
                  />
                </div>

                <button
                  onClick={handleCardPay}
                  className="w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white py-5 rounded-[24px] font-black text-lg shadow-md"
                >
                  Pay ₹{finalTotal}
                </button>
              </div>
            </div>
          </ModalWrapper>
        )}
      </AnimatePresence>

      {/* UPI MODAL */}

      <AnimatePresence>
        {showUpiModal && (
          <ModalWrapper>
            <div
              className={`rounded-t-[40px] p-6 ${
                darkMode ? "bg-[#151d2d]" : "bg-white"
              }`}
            >
              <ModalHeader
                title="Choose UPI"
                subtitle="Fastest payment option"
                close={() => setShowUpiModal(false)}
              />

              <div className="space-y-4 mt-7">
                {upiApps.map((app) => (
                  <button
                    key={app.name}
                    onClick={() => setSelectedUpi(app.name)}
                    className={`w-full rounded-[24px] p-4 border flex items-center justify-between transition-all ${
                      selectedUpi === app.name
                        ? "border-orange-500 bg-orange-50"
                        : darkMode
                          ? "border-[#232c3f]"
                          : "border-gray-100"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={app.image}
                        alt={app.name}
                        className="h-12 w-12 object-contain"
                      />

                      <div className="text-left">
                        <h3 className="font-black">{app.name}</h3>

                        <p className="text-xs text-gray-500 mt-1">
                          Instant payment
                        </p>
                      </div>
                    </div>

                    {selectedUpi === app.name && (
                      <CheckCircle2 className="text-green-500" />
                    )}
                  </button>
                ))}

                <button
                  onClick={handleUpiPay}
                  className="w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white py-5 rounded-[24px] font-black text-lg shadow-md"
                >
                  Continue with {selectedUpi}
                </button>
              </div>
            </div>
          </ModalWrapper>
        )}
      </AnimatePresence>
    </div>
  );
}

/* STAT CARD */

function StatCard({ label, value }) {
  return (
    <div className="bg-white/15 backdrop-blur-lg px-5 py-4 rounded-2xl min-w-[120px]">
      <p className="text-orange-100 text-xs">{label}</p>

      <h3 className="font-black text-2xl mt-1">{value}</h3>
    </div>
  );
}

/* PAYMENT METHOD */

function PaymentMethod({ icon, title, subtitle, active, onClick, darkMode }) {
  return (
    <button
      onClick={onClick}
      className={`w-full rounded-[28px] p-5 border transition-all duration-300 ${
        active
          ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white border-transparent shadow-lg"
          : darkMode
            ? "bg-[#151d2d] border-[#232c3f]"
            : "bg-white border-gray-100"
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div
            className={`h-14 w-14 rounded-2xl flex items-center justify-center ${
              active ? "bg-white/20" : "bg-[#fff3ef] text-[#ff6b57]"
            }`}
          >
            {icon}
          </div>

          <div className="text-left">
            <h2 className="font-black text-lg">{title}</h2>

            <p
              className={`text-sm mt-1 ${
                active ? "text-white/90" : "text-gray-500"
              }`}
            >
              {subtitle}
            </p>
          </div>
        </div>

        <div
          className={`h-6 w-6 rounded-full border-2 flex items-center justify-center ${
            active ? "border-white" : "border-gray-300"
          }`}
        >
          {active && <div className="h-3 w-3 rounded-full bg-white" />}
        </div>
      </div>
    </button>
  );
}

/* BILL ROW */

function BillRow({ label, value, green }) {
  return (
    <div className="flex justify-between mb-4">
      <p className="text-gray-500">{label}</p>

      <p className={`font-bold ${green ? "text-green-500" : ""}`}>{value}</p>
    </div>
  );
}

/* FEATURE */

function FeatureRow({ icon, title }) {
  return (
    <div className="flex items-center gap-3">
      <div className="h-10 w-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center">
        {icon}
      </div>

      <p className="font-semibold text-sm">{title}</p>
    </div>
  );
}

/* INPUT */

function Input({ placeholder, value, onChange, darkMode }) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`w-full rounded-[22px] px-5 py-4 outline-none transition-all duration-300 focus:ring-2 focus:ring-orange-500/20 ${
        darkMode ? "bg-[#20283b] text-white" : "bg-[#f8fafc]"
      }`}
    />
  );
}

/* MODAL HEADER */

function ModalHeader({ title, subtitle, close }) {
  return (
    <>
      <div className="w-14 h-1.5 bg-gray-300 rounded-full mx-auto mb-6" />

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black">{title}</h2>

          <p className="text-sm text-gray-500 mt-2">{subtitle}</p>
        </div>

        <button
          onClick={close}
          className="h-11 w-11 rounded-2xl bg-[#f4f4f4] flex items-center justify-center"
        >
          <X size={20} />
        </button>
      </div>
    </>
  );
}

/* MODAL */

function ModalWrapper({ children }) {
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
      className="fixed inset-0 bg-black/40 z-[100] flex items-end justify-center px-3"
    >
      <motion.div
        initial={{
          y: 300,
        }}
        animate={{
          y: 0,
        }}
        exit={{
          y: 300,
        }}
        transition={{
          type: "spring",
          damping: 22,
        }}
        className="w-full max-w-md"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
