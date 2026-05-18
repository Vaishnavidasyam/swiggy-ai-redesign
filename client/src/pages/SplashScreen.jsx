// src/pages/SplashScreen.jsx

import { motion } from "framer-motion";

import { useNavigate } from "react-router-dom";

import { Sparkles, ArrowRight, Star } from "lucide-react";

export default function SplashScreen() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#fff8f5] overflow-hidden relative flex items-center justify-center px-4 sm:px-6 lg:px-10">
      {/* BACKGROUND */}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,115,0,0.14),transparent_40%)]" />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,0,100,0.08),transparent_40%)]" />

      {/* MAIN CONTAINER */}

      <div className="relative z-10 w-full max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        {/* LEFT CONTENT */}

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
          }}
          className="text-center lg:text-left"
        >
          {/* BADGE */}

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-orange-100 shadow-sm">
            <Sparkles size={15} className="text-orange-500" />

            <span className="text-sm font-semibold text-gray-700">
              AI-Powered Food Discovery
            </span>
          </div>

          {/* TITLE */}

          <h1 className="mt-7 text-5xl sm:text-6xl xl:text-7xl font-black leading-[1.02] tracking-[-2px] text-[#111827]">
            Discover food
            <br />
            <span className="text-orange-500">you'll actually love.</span>
          </h1>

          {/* SUBTITLE */}

          <p className="mt-7 text-base sm:text-lg xl:text-xl leading-8 text-gray-600 max-w-2xl mx-auto lg:mx-0">
            Personalized restaurant recommendations, smarter ordering, and
            AI-powered discovery tailored to your taste and cravings.
          </p>

          {/* CTA */}

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            {/* PRIMARY */}

            <button
              onClick={() => navigate("/home")}
              className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-3"
            >
              Explore Food
              <ArrowRight size={20} />
            </button>

            {/* SECONDARY */}

            <button
              onClick={() => navigate("/auth")}
              className="bg-white border border-gray-200 text-gray-800 px-8 py-4 rounded-2xl font-semibold text-lg shadow-sm hover:bg-gray-50 transition-all duration-300"
            >
              Sign In
            </button>
          </div>

          {/* STATS */}

          <div className="mt-14 grid grid-cols-3 gap-4 max-w-xl mx-auto lg:mx-0">
            {/* CARD */}

            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
              <h2 className="text-2xl sm:text-3xl font-black text-[#111827]">
                10k+
              </h2>

              <p className="text-sm text-gray-500 mt-2">Restaurants</p>
            </div>

            {/* CARD */}

            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
              <h2 className="text-2xl sm:text-3xl font-black text-[#111827]">
                AI
              </h2>

              <p className="text-sm text-gray-500 mt-2">Personalized Feed</p>
            </div>

            {/* CARD */}

            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
              <h2 className="text-2xl sm:text-3xl font-black text-[#111827]">
                24/7
              </h2>

              <p className="text-sm text-gray-500 mt-2">Fast Delivery</p>
            </div>
          </div>
        </motion.div>

        {/* RIGHT SIDE */}

        <motion.div
          initial={{
            opacity: 0,
            scale: 0.94,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 0.7,
          }}
          className="relative hidden lg:flex justify-center"
        >
          {/* MAIN CARD */}

          <div className="relative bg-white rounded-[32px] p-5 shadow-2xl border border-gray-100 w-[480px]">
            {/* IMAGE */}

            <img
              src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200&auto=format&fit=crop"
              alt="Food"
              className="w-full h-[360px] object-cover rounded-[26px]"
            />

            {/* FLOATING CARD */}

            <div className="absolute bottom-10 left-[-35px] bg-white rounded-3xl p-5 shadow-xl border border-gray-100 w-[240px]">
              {/* TOP */}

              <div className="flex items-center gap-3">
                <div className="h-14 w-14 rounded-2xl bg-orange-100 flex items-center justify-center text-2xl">
                  🍔
                </div>

                <div>
                  <h3 className="font-black text-[#111827]">AI Recommended</h3>

                  <p className="text-sm text-gray-500 mt-1">
                    Based on your taste
                  </p>
                </div>
              </div>

              {/* RATING */}

              <div className="mt-5 flex items-center justify-between">
                <div className="flex items-center gap-1 text-orange-500">
                  <Star size={16} fill="currentColor" />

                  <Star size={16} fill="currentColor" />

                  <Star size={16} fill="currentColor" />

                  <Star size={16} fill="currentColor" />

                  <Star size={16} fill="currentColor" />
                </div>

                <span className="text-sm font-bold text-gray-700">4.9</span>
              </div>
            </div>

            {/* DELIVERY */}

            <div className="absolute top-8 right-[-20px] bg-gradient-to-r from-orange-500 to-pink-500 text-white px-5 py-3 rounded-2xl shadow-lg">
              <p className="text-sm font-bold">Fast Delivery ⚡</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
