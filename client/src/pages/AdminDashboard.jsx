// src/pages/AdminDashboard.jsx

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";

import {
  TrendingUp,
  ShoppingBag,
  IndianRupee,
  Users,
  Sparkles,
  ArrowUpRight,
  Clock3,
  Star,
  Flame,
  Activity,
  ChevronRight,
} from "lucide-react";

import { motion } from "framer-motion";

import useThemeStore from "../store/themeStore";

/* REVENUE */

const revenueData = [
  {
    day: "Mon",
    revenue: 1200,
  },

  {
    day: "Tue",
    revenue: 2100,
  },

  {
    day: "Wed",
    revenue: 1800,
  },

  {
    day: "Thu",
    revenue: 3200,
  },

  {
    day: "Fri",
    revenue: 4100,
  },

  {
    day: "Sat",
    revenue: 5300,
  },

  {
    day: "Sun",
    revenue: 6200,
  },
];

/* ORDERS */

const ordersData = [
  {
    name: "Completed",
    value: 74,
  },

  {
    name: "Pending",
    value: 18,
  },

  {
    name: "Cancelled",
    value: 8,
  },
];

/* USERS */

const customerGrowth = [
  {
    month: "Jan",
    users: 320,
  },

  {
    month: "Feb",
    users: 460,
  },

  {
    month: "Mar",
    users: 680,
  },

  {
    month: "Apr",
    users: 860,
  },

  {
    month: "May",
    users: 1100,
  },
];

const COLORS = ["#f97316", "#facc15", "#ef4444"];

export default function AdminDashboard() {
  const { darkMode } = useThemeStore();

  return (
    <div
      className={`min-h-screen pb-32 transition-all duration-500 ${
        darkMode
          ? "bg-gradient-to-br from-[#071120] via-[#0b1220] to-[#111827] text-white"
          : "bg-gradient-to-br from-[#fff8f5] via-[#ffffff] to-[#f5f7fb] text-black"
      }`}
    >
      {/* CONTAINER */}

      <div className="w-full max-w-[1450px] mx-auto px-4 md:px-6 xl:px-8">
        {/* HERO */}

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="relative overflow-hidden rounded-[34px] bg-gradient-to-br from-orange-500 via-[#ff6b57] to-pink-500 p-5 md:p-7 mt-5 shadow-[0_25px_60px_rgba(255,120,90,0.22)]"
        >
          {/* BG */}

          <div className="absolute -top-24 -right-24 h-[280px] w-[280px] rounded-full bg-white/10 blur-3xl" />

          {/* CONTENT */}

          <div className="relative z-10 flex flex-col xl:flex-row xl:items-center xl:justify-between gap-8">
            {/* LEFT */}

            <div>
              {/* TAG */}

              <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-xl px-4 py-2 rounded-full text-white text-xs font-black tracking-wide">
                <Sparkles size={14} />
                AI BUSINESS INSIGHTS
              </div>

              {/* TITLE */}

              <h1 className="text-[36px] md:text-[54px] font-black leading-[0.95] tracking-[-2px] text-white mt-6">
                Admin
                <br />
                Dashboard
              </h1>

              {/* SUB */}

              <p className="text-orange-100 text-sm md:text-base leading-7 mt-5 max-w-2xl">
                Track orders, customer growth, revenue analytics and AI-powered
                restaurant performance insights.
              </p>
            </div>

            {/* RIGHT */}

            <div className="grid grid-cols-2 gap-4 max-w-[420px]">
              <HeroMiniCard
                title="Revenue"
                value="₹24.5K"
                icon={<IndianRupee size={18} />}
              />

              <HeroMiniCard
                title="Orders"
                value="324"
                icon={<ShoppingBag size={18} />}
              />

              <HeroMiniCard
                title="Customers"
                value="1.2K"
                icon={<Users size={18} />}
              />

              <HeroMiniCard
                title="Growth"
                value="+18%"
                icon={<TrendingUp size={18} />}
              />
            </div>
          </div>
        </motion.div>

        {/* ANALYTICS */}

        <div className="grid grid-cols-1 xl:grid-cols-[1.3fr_0.7fr] gap-5 mt-6">
          {/* REVENUE */}

          <DashboardCard
            title="Revenue Analytics"
            subtitle="Weekly performance overview"
            darkMode={darkMode}
            badge="+24%"
          >
            <div className="h-[260px] mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient
                      id="colorRevenue"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#f97316" stopOpacity={0.5} />

                      <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                    </linearGradient>
                  </defs>

                  <XAxis dataKey="day" stroke="#9ca3af" />

                  <Tooltip />

                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#f97316"
                    strokeWidth={4}
                    fillOpacity={1}
                    fill="url(#colorRevenue)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </DashboardCard>

          {/* ORDERS */}

          <DashboardCard
            title="Order Insights"
            subtitle="Live order distribution"
            darkMode={darkMode}
            badge="Healthy"
            green
          >
            <div className="h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={ordersData}
                    dataKey="value"
                    outerRadius={90}
                    innerRadius={55}
                    paddingAngle={4}
                  >
                    {ordersData.map((entry, index) => (
                      <Cell key={index} fill={COLORS[index]} />
                    ))}
                  </Pie>

                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* LEGEND */}

            <div className="flex justify-center gap-4 flex-wrap -mt-3">
              {ordersData.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{
                      backgroundColor: COLORS[index],
                    }}
                  />

                  <span
                    className={`text-sm ${
                      darkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          </DashboardCard>
        </div>

        {/* SECOND ROW */}

        <div className="grid grid-cols-1 xl:grid-cols-[0.75fr_1.25fr] gap-5 mt-5">
          {/* AI INSIGHTS */}

          <div className="rounded-[30px] bg-gradient-to-br from-orange-500 via-[#ff6b57] to-pink-500 p-5 md:p-6 text-white shadow-[0_20px_50px_rgba(255,120,90,0.2)]">
            {/* TOP */}

            <div className="flex items-center gap-2">
              <Sparkles size={18} />

              <h2 className="text-2xl font-black">AI Insights</h2>
            </div>

            {/* SUB */}

            <p className="text-orange-100 text-sm leading-7 mt-3">
              AI-generated trends & customer behavior analysis.
            </p>

            {/* INSIGHTS */}

            <div className="space-y-4 mt-6">
              <InsightCard
                icon={<Flame size={18} />}
                text="Chicken Biryani demand increased by 34% this week."
              />

              <InsightCard
                icon={<Clock3 size={18} />}
                text="Peak order time is between 7PM - 9PM."
              />

              <InsightCard
                icon={<Activity size={18} />}
                text="UPI payments are converting 22% faster."
              />
            </div>
          </div>

          {/* CUSTOMER GROWTH */}

          <DashboardCard
            title="Customer Growth"
            subtitle="Monthly user acquisition"
            darkMode={darkMode}
            badge="+12%"
          >
            <div className="h-[320px] mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={customerGrowth}>
                  <XAxis dataKey="month" stroke="#9ca3af" />

                  <Tooltip />

                  <Bar dataKey="users" fill="#f97316" radius={[12, 12, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </DashboardCard>
        </div>

        {/* RECENT ORDERS */}

        <div className="mt-6">
          {/* TOP */}

          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-2xl md:text-3xl font-black">Recent Orders</h2>

              <p
                className={`text-sm mt-2 ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Latest completed orders
              </p>
            </div>

            <button className="text-[#ff6b57] font-black text-sm flex items-center gap-1">
              View All
              <ChevronRight size={16} />
            </button>
          </div>

          {/* GRID */}

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                whileHover={{
                  y: -4,
                }}
                className={`rounded-[28px] p-5 border transition-all duration-300 ${
                  darkMode
                    ? "bg-white/[0.04] border-white/[0.06]"
                    : "bg-white border-gray-100"
                }`}
              >
                {/* TOP */}

                <div className="flex items-start justify-between">
                  {/* LEFT */}

                  <div>
                    <h3 className="text-xl font-black">Order #{1000 + i}</h3>

                    <p
                      className={`text-sm mt-2 ${
                        darkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      3 Items • ₹540
                    </p>
                  </div>

                  {/* STATUS */}

                  <div className="bg-green-100 text-green-600 px-3 py-2 rounded-xl text-xs font-black">
                    Delivered
                  </div>
                </div>

                {/* USER */}

                <div className="flex items-center gap-4 mt-6">
                  <img
                    src={`https://i.pravatar.cc/100?img=${10 + i}`}
                    alt="User"
                    className="h-12 w-12 rounded-2xl object-cover"
                  />

                  <div>
                    <h3 className="font-black">
                      Customer
                      {i}
                    </h3>

                    <p
                      className={`text-xs mt-1 ${
                        darkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      Paid via UPI
                    </p>
                  </div>
                </div>

                {/* FOOTER */}

                <div className="flex items-center justify-between mt-6 pt-5 border-t border-black/5">
                  <div>
                    <p className="text-xs text-gray-500">Delivery</p>

                    <h3 className="font-black mt-1">24 mins</h3>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">Rating</p>

                    <div className="flex items-center gap-1 mt-1">
                      <Star
                        size={14}
                        fill="#f97316"
                        className="text-[#f97316]"
                      />

                      <span className="font-black">4.9</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* DASHBOARD CARD */

function DashboardCard({ title, subtitle, badge, children, darkMode, green }) {
  return (
    <div
      className={`rounded-[30px] p-5 md:p-6 border shadow-sm ${
        darkMode
          ? "bg-white/[0.04] border-white/[0.06]"
          : "bg-white border-gray-100"
      }`}
    >
      {/* TOP */}

      <div className="flex items-start justify-between gap-4">
        {/* LEFT */}

        <div>
          <h2 className="text-2xl font-black">{title}</h2>

          <p
            className={`text-sm mt-2 ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            {subtitle}
          </p>
        </div>

        {/* BADGE */}

        <div
          className={`px-4 py-2 rounded-2xl text-sm font-black flex items-center gap-1 ${
            green
              ? "bg-green-100 text-green-600"
              : "bg-orange-100 text-orange-600"
          }`}
        >
          {badge}

          {!green && <ArrowUpRight size={15} />}
        </div>
      </div>

      {/* CONTENT */}

      {children}
    </div>
  );
}

/* MINI HERO CARD */

function HeroMiniCard({ title, value, icon }) {
  return (
    <div className="rounded-[24px] bg-white/15 backdrop-blur-xl border border-white/10 p-4">
      <div className="flex items-center justify-between">
        {/* TEXT */}

        <div>
          <p className="text-orange-100 text-xs">{title}</p>

          <h2 className="text-2xl font-black mt-2 text-white">{value}</h2>
        </div>

        {/* ICON */}

        <div className="h-11 w-11 rounded-2xl bg-white/15 flex items-center justify-center text-white">
          {icon}
        </div>
      </div>
    </div>
  );
}

/* INSIGHT CARD */

function InsightCard({ icon, text }) {
  return (
    <div className="rounded-[24px] bg-white/10 backdrop-blur-xl border border-white/10 p-4">
      <div className="flex items-start gap-3">
        {/* ICON */}

        <div className="h-11 w-11 rounded-2xl bg-white/15 flex items-center justify-center">
          {icon}
        </div>

        {/* TEXT */}

        <p className="text-sm leading-7 text-white/95">{text}</p>
      </div>
    </div>
  );
}
