// ==========================================
// FILE: src/pages/CheckoutPayment.jsx
// ==========================================

import { useEffect, useState } from "react";

import {
  Smartphone,
  CreditCard,
  Banknote,
  ArrowRight,
  Sparkles,
  BadgeCheck,
  X,
  Clock3,
} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";

import { useNavigate } from "react-router-dom";

import useThemeStore from "../store/themeStore";

import { useCart } from "../context/CartContext";

export default function CheckoutPayment() {
  const navigate = useNavigate();

  const { darkMode } = useThemeStore();

  const { cartItems, subtotal, taxes, deliveryFee, grandTotal } = useCart();

  /* STATES */

  const [loading, setLoading] = useState(true);

  const [paymentMethod, setPaymentMethod] = useState(
    localStorage.getItem("lastPaymentMethod") || "UPI",
  );

  const [selectedTip, setSelectedTip] = useState(20);

  const [processing, setProcessing] = useState(false);

  const [showCardModal, setShowCardModal] = useState(false);

  const [showUpiModal, setShowUpiModal] = useState(false);

  const [showUpiRedirect, setShowUpiRedirect] = useState(false);

  const [selectedUpi, setSelectedUpi] = useState("Google Pay");

  const [redirectingApp, setRedirectingApp] = useState("");

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

  /* SAVE */

  useEffect(() => {
    localStorage.setItem("lastPaymentMethod", paymentMethod);
  }, [paymentMethod]);

  /* TOTAL */

  const finalTotal = grandTotal + selectedTip;

  /* EMPTY */

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-black">
        Cart Empty
      </div>
    );
  }

  /* LOADING */

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="h-16 w-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  /* PAYMENT */

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

    setTimeout(() => {
      navigate("/orders");
    }, 2200);
  }

  /* CARD */

  function handleCardPay() {
    if (
      !cardData.name ||
      !cardData.number ||
      !cardData.expiry ||
      !cardData.cvv
    ) {
      alert("Please fill all fields");

      return;
    }

    setShowCardModal(false);

    processSuccess();
  }

  /* UPI */

  function handleUpiContinue() {
    setShowUpiModal(false);

    setRedirectingApp(selectedUpi);

    setShowUpiRedirect(true);

    setTimeout(() => {
      setShowUpiRedirect(false);

      processSuccess();
    }, 2500);
  }

  return (
    <div
      className={`min-h-screen pb-52 transition-all duration-300 ${
        darkMode ? "bg-[#0a101f] text-white" : "bg-[#f4f7fb] text-black"
      }`}
    >
      {/* PROCESSING */}

      {processing && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40" />
      )}

      {/* CONTAINER */}

      <div className="max-w-md mx-auto px-4">
        {/* HEADER */}

        <div className="pt-6">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-[38px] font-black leading-[1]">Checkout</h1>

              <p
                className={`text-sm mt-3 ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Secure payment & instant order confirmation
              </p>
            </div>

            <div className="h-14 w-14 rounded-2xl bg-gradient-to-r from-orange-500 to-pink-500 text-white flex items-center justify-center shadow-lg">
              <CreditCard size={24} />
            </div>
          </div>
        </div>

        {/* AI CARD */}

        <div className="mt-6 relative overflow-hidden bg-gradient-to-br from-[#ff6b57] via-[#ff7f50] to-[#ff4d8d] rounded-[34px] p-6 text-white shadow-[0_15px_50px_rgba(255,120,90,0.25)]">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-3xl" />

          <div className="relative z-10">
            <div className="flex items-center gap-2">
              <Sparkles size={18} />

              <span className="font-bold text-sm">AI Payment Assist</span>
            </div>

            <h2 className="text-3xl font-black mt-4 leading-tight">
              Faster.
              <br />
              Safer.
              <br />
              Smarter.
            </h2>

            <p className="text-sm mt-4 text-orange-100 leading-7">
              AI recommends UPI for instant payment confirmation and quicker
              delivery processing.
            </p>
          </div>
        </div>

        {/* ETA */}

        <div
          className={`mt-5 rounded-[32px] p-5 shadow-[0_10px_35px_rgba(0,0,0,0.04)] ${
            darkMode ? "bg-[#151b29]" : "bg-white"
          }`}
        >
          <div className="flex gap-4">
            <div className="h-14 w-14 rounded-2xl bg-orange-100 text-orange-500 flex items-center justify-center">
              <Clock3 size={24} />
            </div>

            <div>
              <h2 className="font-black text-lg">Delivering in 28-35 mins</h2>

              <p
                className={`text-sm mt-1 ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                AI optimized delivery route selected
              </p>
            </div>
          </div>
        </div>

        {/* PAYMENT METHODS */}

        <div className="mt-8">
          <h2 className="text-2xl font-black mb-5">Payment Methods</h2>

          <div className="space-y-4">
            <PaymentMethod
              icon={<Smartphone />}
              title="UPI Payment"
              subtitle="Recommended"
              active={paymentMethod === "UPI"}
              onClick={() => setPaymentMethod("UPI")}
              darkMode={darkMode}
            />

            <PaymentMethod
              icon={<CreditCard />}
              title="Credit / Debit Card"
              subtitle="Visa, Mastercard"
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
          className={`mt-8 rounded-[34px] p-5 ${
            darkMode ? "bg-[#151b29]" : "bg-white"
          }`}
        >
          <div className="flex items-center justify-between">
            <h2 className="font-black text-2xl">Delivery Tip</h2>

            <div className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-xs font-bold">
              Optional
            </div>
          </div>

          <div className="flex gap-3 mt-5 overflow-x-auto no-scrollbar">
            {[0, 20, 40, 60, 100].map((tip) => (
              <button
                key={tip}
                onClick={() => setSelectedTip(tip)}
                className={`min-w-[90px] rounded-[22px] py-4 px-4 font-black transition-all duration-300 active:scale-[0.98] ${
                  selectedTip === tip
                    ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-lg"
                    : darkMode
                      ? "bg-[#20283b]"
                      : "bg-[#f8fafc]"
                }`}
              >
                {tip === 0 ? "No Tip" : `₹${tip}`}
              </button>
            ))}
          </div>
        </div>

        {/* BILL */}

        <div
          className={`mt-8 rounded-[36px] p-6 shadow-[0_15px_40px_rgba(0,0,0,0.04)] ${
            darkMode ? "bg-[#151b29]" : "bg-white"
          }`}
        >
          <h2 className="font-black text-2xl">Bill Summary</h2>

          <div className="flex items-center gap-2 mt-3">
            <div className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-[10px] font-bold">
              Secure
            </div>

            <div className="bg-orange-100 text-orange-600 px-2 py-1 rounded-full text-[10px] font-bold">
              AI Verified
            </div>
          </div>

          <div className="mt-6">
            <BillRow label="Items Total" value={`₹${subtotal}`} />

            <BillRow
              label="Delivery Fee"
              value={deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}
              green={deliveryFee === 0}
            />

            <BillRow label="Taxes & Charges" value={`₹${taxes}`} />

            {selectedTip > 0 && (
              <BillRow label="Delivery Tip" value={`₹${selectedTip}`} />
            )}
          </div>

          <div className="border-t border-black/5 my-5" />

          <div className="flex justify-between items-end">
            <div>
              <p className="text-xs text-gray-500">Final Amount</p>

              <h2 className="font-black text-3xl mt-1">To Pay</h2>
            </div>

            <h2 className="font-black text-[42px] tracking-tight text-[#ff6b57]">
              ₹{finalTotal}
            </h2>
          </div>
        </div>
      </div>

      {/* PAY BAR */}

      <div className="fixed bottom-[92px] left-1/2 -translate-x-1/2 w-full max-w-md px-4 z-50">
        <button
          disabled={processing}
          onClick={handlePayment}
          className="w-full rounded-[32px] px-5 py-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-[0_20px_55px_rgba(255,120,90,0.30)] backdrop-blur-xl active:scale-[0.98] transition-all"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-orange-100">Instant confirmation</p>

              <h2 className="text-3xl font-black mt-1">₹{finalTotal}</h2>
            </div>

            <div className="flex items-center gap-2 font-black text-lg">
              {processing ? (
                <>Processing...</>
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
            <motion.div
              initial={{
                y: 100,
              }}
              animate={{
                y: 0,
              }}
              exit={{
                y: 100,
              }}
              className={`rounded-t-[40px] p-6 backdrop-blur-xl ${
                darkMode ? "bg-[#151b29]" : "bg-white"
              }`}
            >
              <div className="w-14 h-1.5 bg-gray-300 rounded-full mx-auto mb-6" />

              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-black">Card Details</h2>

                  <p className="text-sm text-gray-500 mt-2">
                    Mock payment gateway
                  </p>
                </div>

                <button
                  onClick={() => setShowCardModal(false)}
                  className="h-11 w-11 rounded-2xl bg-[#f4f4f4] flex items-center justify-center"
                >
                  <X size={20} />
                </button>
              </div>

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
                  className="w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white py-5 rounded-[24px] font-black text-lg shadow-xl active:scale-[0.98]"
                >
                  Pay ₹{finalTotal}
                </button>
              </div>
            </motion.div>
          </ModalWrapper>
        )}
      </AnimatePresence>

      {/* UPI MODAL */}

      <AnimatePresence>
        {showUpiModal && (
          <ModalWrapper>
            <motion.div
              initial={{
                y: 100,
                opacity: 0,
              }}
              animate={{
                y: 0,
                opacity: 1,
              }}
              exit={{
                y: 100,
                opacity: 0,
              }}
              className={`rounded-t-[40px] p-6 ${
                darkMode ? "bg-[#151b29]" : "bg-white"
              }`}
            >
              <div className="w-14 h-1.5 bg-gray-300 rounded-full mx-auto mb-6" />

              <div className="flex items-start justify-between">
                <div>
                  <h2 className="font-black text-3xl">Select UPI App</h2>

                  <p className="text-sm text-gray-500 mt-2">
                    Choose app to continue payment
                  </p>
                </div>

                <button
                  onClick={() => setShowUpiModal(false)}
                  className="h-11 w-11 rounded-2xl bg-[#f4f4f4] flex items-center justify-center"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-4 mt-7">
                {upiApps.map((app) => (
                  <motion.button
                    whileHover={{
                      scale: 1.02,
                    }}
                    whileTap={{
                      scale: 0.98,
                    }}
                    key={app.name}
                    onClick={() => setSelectedUpi(app.name)}
                    className={`w-full rounded-[30px] p-4 flex items-center gap-4 transition-all duration-300 ${
                      selectedUpi === app.name
                        ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-lg"
                        : darkMode
                          ? "bg-[#20283b]"
                          : "bg-[#f8fafc]"
                    }`}
                  >
                    <img
                      src={app.image}
                      alt={app.name}
                      className="h-14 w-14 object-contain bg-white rounded-[18px] p-2 shadow-sm"
                    />

                    <div className="flex-1 text-left">
                      <h2 className="font-black text-lg">{app.name}</h2>

                      <p className="text-xs mt-1 opacity-80">
                        Fast & Secure UPI Payment
                      </p>
                    </div>

                    {selectedUpi === app.name && <BadgeCheck size={24} />}
                  </motion.button>
                ))}
              </div>

              <button
                onClick={handleUpiContinue}
                className="w-full mt-7 bg-gradient-to-r from-orange-500 to-pink-500 text-white py-5 rounded-[24px] font-black text-lg shadow-xl active:scale-[0.98]"
              >
                Continue to {selectedUpi}
              </button>
            </motion.div>
          </ModalWrapper>
        )}
      </AnimatePresence>

      {/* REDIRECTING */}

      <AnimatePresence>
        {showUpiRedirect && (
          <ModalWrapper>
            <motion.div
              initial={{
                y: 100,
                opacity: 0,
              }}
              animate={{
                y: 0,
                opacity: 1,
              }}
              exit={{
                y: 100,
                opacity: 0,
              }}
              className={`rounded-t-[40px] p-7 ${
                darkMode ? "bg-[#151b29]" : "bg-white"
              }`}
            >
              <div className="w-14 h-1.5 bg-gray-300 rounded-full mx-auto mb-8" />

              <div className="flex justify-center">
                <motion.div
                  animate={{
                    scale: [1, 1.08, 1],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.2,
                  }}
                  className="h-24 w-24 rounded-[30px] bg-gradient-to-r from-orange-500 to-pink-500 flex items-center justify-center shadow-2xl"
                >
                  <Smartphone size={38} className="text-white" />
                </motion.div>
              </div>

              <div className="text-center mt-7">
                <h2 className="text-3xl font-black">Redirecting</h2>

                <p className="mt-4 text-sm leading-7 text-gray-500">
                  Opening{" "}
                  <span className="font-black text-[#ff6b57]">
                    {redirectingApp}
                  </span>{" "}
                  for secure UPI payment
                </p>
              </div>
            </motion.div>
          </ModalWrapper>
        )}
      </AnimatePresence>
    </div>
  );
}

/* PAYMENT METHOD */

function PaymentMethod({ icon, title, subtitle, active, onClick, darkMode }) {
  return (
    <button
      onClick={onClick}
      className={`w-full rounded-[32px] p-5 border transition-all duration-300 active:scale-[0.98] ${
        active
          ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-xl border-transparent"
          : darkMode
            ? "bg-[#151b29] border-white/5"
            : "bg-white border-black/5"
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex gap-4 items-center">
          <div
            className={`h-14 w-14 rounded-2xl flex items-center justify-center ${
              active ? "bg-white/20" : "bg-[#fff3ef] text-[#ff6b57]"
            }`}
          >
            {icon}
          </div>

          <div>
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
