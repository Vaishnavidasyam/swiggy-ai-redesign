// src/pages/Welcome.jsx

import { motion } from "framer-motion";

import { ArrowRight, Sparkles, Star } from "lucide-react";

import { Link } from "react-router-dom";

export default function Welcome() {
  return (
    <div className="min-h-screen overflow-hidden bg-gradient-to-br from-[#fff8f5] via-[#fffaf7] to-[#ffe9e2]">
      {/* CONTAINER */}

      <div className="w-full max-w-[1400px] mx-auto min-h-screen flex items-center px-5 sm:px-8 lg:px-16 py-10">
        {/* GRID */}

        <div className="grid lg:grid-cols-2 gap-14 items-center w-full">
          {/* LEFT */}

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
              duration: 0.7,
            }}
            className="order-2 lg:order-1"
          >
            {/* BADGE */}

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-orange-100 shadow-sm text-[#111827] text-xs sm:text-sm font-semibold">
              <Sparkles size={16} className="text-orange-500" />
              AI-Powered Food Discovery
            </div>

            {/* HEADING */}

            <h1 className="mt-6 text-[54px] leading-[0.95] tracking-[-3px] font-black text-[#0f172a] sm:text-[72px] lg:text-[88px]">
              Discover food
              <br />
              <span className="bg-gradient-to-r from-orange-500 via-[#ff6b57] to-pink-500 bg-clip-text text-transparent">
                you'll actually
              </span>
              <br />
              love.
            </h1>

            {/* DESC */}

            <p className="mt-6 max-w-xl text-[17px] sm:text-[19px] leading-8 text-gray-600">
              Personalized restaurant recommendations, smarter ordering, and
              AI-powered discovery tailored to your taste and cravings.
            </p>

            {/* BUTTONS */}

            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              {/* EXPLORE */}

              <Link to="/home">
                <button className="w-full sm:w-auto h-[62px] px-8 rounded-[22px] bg-gradient-to-r from-orange-500 to-pink-500 text-white font-black text-lg shadow-[0_10px_30px_rgba(255,110,80,0.3)] hover:scale-[1.02] transition-all duration-300">
                  <div className="flex items-center justify-center gap-3">
                    Explore Food
                    <ArrowRight size={22} />
                  </div>
                </button>
              </Link>

              {/* SIGN IN */}

              <Link to="/auth">
                <button className="w-full sm:w-auto h-[62px] px-8 rounded-[22px] bg-white border border-gray-200 text-[#111827] font-black text-lg shadow-sm hover:bg-gray-50 transition-all duration-300">
                  Sign In
                </button>
              </Link>
            </div>

            {/* STATS */}

            <div className="grid grid-cols-3 gap-3 sm:gap-5 mt-10">
              <StatCard title="10k+" subtitle="Restaurants" />

              <StatCard title="AI" subtitle="Personalized Feed" />

              <StatCard title="24/7" subtitle="Fast Delivery" />
            </div>
          </motion.div>

          {/* RIGHT */}

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.9,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 0.7,
            }}
            className="relative order-1 lg:order-2 hidden md:flex justify-center"
          >
            {/* MAIN CARD */}

            <div className="relative">
              {/* BG CARD */}

              <div className="absolute inset-0 translate-x-5 translate-y-5 rounded-[42px] bg-white/70 blur-xl" />

              {/* IMAGE CARD */}

              <div className="relative bg-white p-5 rounded-[42px] shadow-[0_20px_80px_rgba(0,0,0,0.08)]">
                <img
                  src="https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop"
                  alt="Food"
                  className="w-full max-w-[560px] h-[500px] object-cover rounded-[34px]"
                />

                {/* FAST DELIVERY */}

                <div className="absolute top-10 right-0 translate-x-10 bg-gradient-to-r from-orange-500 to-pink-500 text-white px-6 py-4 rounded-[20px] shadow-xl">
                  <div className="flex items-center gap-2 font-black">
                    Fast Delivery ⚡
                  </div>
                </div>

                {/* AI CARD */}

                <div className="absolute -left-10 bottom-10 bg-white rounded-[28px] p-5 shadow-[0_15px_40px_rgba(0,0,0,0.08)] w-[280px]">
                  <div className="flex items-start gap-4">
                    <div className="h-14 w-14 rounded-2xl bg-[#fff2e9] flex items-center justify-center text-2xl">
                      🍔
                    </div>

                    <div>
                      <h3 className="font-black text-xl text-[#111827]">
                        AI Recommended
                      </h3>

                      <p className="text-sm text-gray-500 mt-1">
                        Based on your taste
                      </p>
                    </div>
                  </div>

                  {/* RATING */}

                  <div className="flex items-center justify-between mt-5">
                    <div className="flex items-center gap-1 text-orange-500">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star key={i} size={16} fill="currentColor" />
                      ))}
                    </div>

                    <h3 className="font-black text-[#111827]">4.9</h3>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

/* STAT CARD */

function StatCard({ title, subtitle }) {
  return (
    <div className="rounded-[24px] bg-white border border-gray-100 shadow-sm px-4 py-5 sm:p-6">
      <h2 className="text-2xl sm:text-4xl font-black text-[#0f172a]">
        {title}
      </h2>

      <p className="text-gray-500 text-sm sm:text-base mt-2 leading-6">
        {subtitle}
      </p>
    </div>
  );
}
