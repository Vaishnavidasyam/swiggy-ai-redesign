import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import {
  TrendingUp,
  ShoppingBag,
  IndianRupee,
  Users,
  Sparkles,
} from "lucide-react";

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

const COLORS = ["#f97316", "#facc15", "#ef4444"];

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-[#f8f8f8] pb-20">
      {/* HEADER */}

      <div className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 p-6 rounded-b-[40px] text-white shadow-2xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-orange-100 text-sm">Admin Panel</p>

            <h1 className="text-4xl font-black mt-2">Dashboard</h1>
          </div>

          <div className="bg-white/20 h-16 w-16 rounded-3xl flex items-center justify-center backdrop-blur-lg">
            <Sparkles size={30} />
          </div>
        </div>

        {/* STATS */}

        <div className="grid grid-cols-2 gap-4 mt-8">
          <StatCard title="Revenue" value="₹24.5K" icon={<IndianRupee />} />

          <StatCard title="Orders" value="324" icon={<ShoppingBag />} />

          <StatCard title="Customers" value="1.2K" icon={<Users />} />

          <StatCard title="Growth" value="+18%" icon={<TrendingUp />} />
        </div>
      </div>

      {/* REVENUE */}

      <div className="px-4 mt-8">
        <div className="bg-white rounded-[32px] p-5 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-black">Revenue Analytics</h2>

              <p className="text-gray-500 text-sm mt-1">Weekly performance</p>
            </div>

            <div className="bg-orange-100 text-orange-600 px-4 py-2 rounded-2xl text-sm font-bold">
              +24%
            </div>
          </div>

          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData}>
                <XAxis dataKey="day" />

                <YAxis />

                <Tooltip />

                <Bar dataKey="revenue" radius={[10, 10, 0, 0]} fill="#f97316" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* ORDERS */}

      <div className="px-4 mt-8">
        <div className="bg-white rounded-[32px] p-5 shadow-xl">
          <h2 className="text-2xl font-black mb-6">Order Insights</h2>

          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={ordersData} dataKey="value" outerRadius={100} label>
                  {ordersData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index]} />
                  ))}
                </Pie>

                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* AI INSIGHTS */}

      <div className="px-4 mt-8">
        <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-[32px] p-6 text-white shadow-2xl">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles size={20} />

            <h2 className="font-black text-2xl">AI Insights</h2>
          </div>

          <div className="space-y-4 mt-5">
            <InsightCard text="Chicken Biryani demand increased by 34% this week 🔥" />

            <InsightCard text="Peak order time is between 7PM - 9PM ⏰" />

            <InsightCard text="UPI payments are converting 22% faster ⚡" />
          </div>
        </div>
      </div>

      {/* RECENT ORDERS */}

      <div className="px-4 mt-8">
        <h2 className="text-2xl font-black mb-5">Recent Orders</h2>

        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-3xl p-5 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-black">Order #{1000 + i}</h3>

                  <p className="text-sm text-gray-500 mt-1">3 Items • ₹540</p>
                </div>

                <div className="bg-green-100 text-green-600 px-4 py-2 rounded-2xl text-sm font-bold">
                  Delivered
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon }) {
  return (
    <div className="bg-white/15 backdrop-blur-lg rounded-3xl p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-orange-100 text-sm">{title}</p>

          <h2 className="text-2xl font-black mt-2">{value}</h2>
        </div>

        <div className="bg-white/20 h-12 w-12 rounded-2xl flex items-center justify-center">
          {icon}
        </div>
      </div>
    </div>
  );
}

function InsightCard({ text }) {
  return (
    <div className="bg-white/15 backdrop-blur-lg rounded-3xl p-4">
      <p className="text-sm leading-relaxed">{text}</p>
    </div>
  );
}
