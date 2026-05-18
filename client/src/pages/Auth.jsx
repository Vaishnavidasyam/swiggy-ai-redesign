// src/pages/Auth.jsx

import { useState } from "react";

import {
  Mail,
  Lock,
  User,
  ArrowRight,
  Sparkles,
  Eye,
  EyeOff,
  ShieldCheck,
  Star,
} from "lucide-react";

import { motion } from "framer-motion";

import api from "../api";

import toast from "react-hot-toast";

import useThemeStore from "../store/themeStore";

export default function Auth() {
  const { darkMode } = useThemeStore();

  const [isLogin, setIsLogin] = useState(true);

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  /* SUBMIT */

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);

      const endpoint = isLogin ? "/auth/login" : "/auth/register";

      const res = await api.post(endpoint, form);

      localStorage.setItem("token", res.data.token);

      toast.success(
        isLogin ? "Login successful" : "Account created successfully",
      );

      setTimeout(() => {
        window.location.href = "/home";
      }, 1000);
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  /* DEMO LOGIN */

  async function fillTestUser() {
    try {
      setLoading(true);

      const demoData = {
        name: "Vaishnavi",
        email: "demo@foodai.com",
        password: "123456",
      };

      /* AUTO FILL */

      setForm(demoData);

      /* DELAY */

      setTimeout(async () => {
        try {
          /* LOGIN */

          const res = await api.post("/auth/login", {
            email: demoData.email,

            password: demoData.password,
          });

          /* TOKEN */

          localStorage.setItem("token", res.data.token);

          /* SUCCESS */

          toast.success("Welcome back 👋");

          /* NAVIGATE */

          setTimeout(() => {
            window.location.href = "/home";
          }, 800);
        } catch (err) {
          toast.error("Demo login failed");
        } finally {
          setLoading(false);
        }
      }, 700);
    } catch (err) {
      setLoading(false);
    }
  }

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-4 py-6 overflow-hidden transition-all duration-500 ${
        darkMode
          ? "bg-gradient-to-br from-[#071120] via-[#0b1220] to-[#111827] text-white"
          : "bg-gradient-to-br from-[#fff8f5] via-[#ffffff] to-[#f5f7fb] text-black"
      }`}
    >
      {/* BG BLUR */}

      <div className="absolute top-[-120px] left-[-120px] h-[320px] w-[320px] rounded-full bg-orange-500/20 blur-3xl" />

      <div className="absolute bottom-[-120px] right-[-120px] h-[320px] w-[320px] rounded-full bg-pink-500/20 blur-3xl" />

      {/* CONTAINER */}

      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.45,
        }}
        className={`relative w-full max-w-[1120px] rounded-[36px] overflow-hidden border backdrop-blur-2xl shadow-[0_30px_80px_rgba(0,0,0,0.12)] ${
          darkMode
            ? "bg-white/[0.04] border-white/[0.06]"
            : "bg-white/80 border-white"
        }`}
      >
        {/* GRID */}

        <div className="grid lg:grid-cols-[1fr_460px]">
          {/* LEFT */}

          <div className="relative hidden lg:flex flex-col justify-between overflow-hidden bg-gradient-to-br from-orange-500 via-[#ff6b57] to-pink-500 p-10 text-white">
            {/* GLOW */}

            <div className="absolute -top-24 -right-24 h-[320px] w-[320px] rounded-full bg-white/10 blur-3xl" />

            {/* TOP */}

            <div className="relative z-10">
              {/* BADGE */}

              <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-xl px-4 py-2 rounded-full text-xs font-black tracking-wide">
                <Sparkles size={14} />
                AI FOOD EXPERIENCE
              </div>

              {/* TITLE */}

              <h1 className="text-[58px] font-black leading-[0.92] tracking-[-2px] mt-8">
                Smart
                <br />
                Food
                <br />
                Delivery
              </h1>

              {/* SUB */}

              <p className="text-orange-50/90 text-sm leading-8 mt-6 max-w-[340px]">
                AI-powered food discovery, lightning-fast delivery & premium
                dining experience.
              </p>

              {/* STATS */}

              <div className="grid grid-cols-3 gap-3 mt-10">
                <StatCard title="500+" subtitle="Restaurants" />

                <StatCard title="98%" subtitle="AI Match" />

                <StatCard title="20m" subtitle="Delivery" />
              </div>
            </div>

            {/* REVIEW */}

            <div className="relative z-10 rounded-[28px] bg-white/15 backdrop-blur-xl border border-white/10 p-5">
              <div className="flex items-center gap-4">
                {/* IMAGE */}

                <img
                  src="https://i.pravatar.cc/100?img=32"
                  alt="User"
                  className="h-14 w-14 rounded-2xl object-cover border border-white/20"
                />

                {/* INFO */}

                <div>
                  <h3 className="font-black text-lg">Loved by foodies</h3>

                  <p className="text-orange-100 text-sm mt-1">
                    Personalized meals for every craving
                  </p>
                </div>
              </div>

              {/* STARS */}

              <div className="flex items-center gap-1 mt-5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} size={14} fill="white" />
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT */}

          <div className="p-5 md:p-8 lg:p-10">
            {/* HEADER */}

            <div>
              {/* TAG */}

              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white px-4 py-2 rounded-full text-[11px] font-black tracking-wide shadow-lg">
                <ShieldCheck size={13} />
                SECURE ACCESS
              </div>

              {/* TITLE */}

              <h2 className="text-[34px] md:text-[42px] font-black leading-[1] tracking-[-1px] mt-5">
                {isLogin ? "Welcome Back 👋" : "Create Account"}
              </h2>

              {/* SUB */}

              <p
                className={`text-sm leading-7 mt-4 max-w-sm ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                {isLogin
                  ? "Login to continue your premium food ordering experience."
                  : "Join now for personalized AI-powered food discovery."}
              </p>
            </div>

            {/* DEMO BUTTON */}

            <motion.button
              whileTap={{
                scale: 0.98,
              }}
              onClick={fillTestUser}
              disabled={loading}
              className="mt-6 w-full rounded-[24px] bg-gradient-to-r from-orange-500 via-[#ff6b57] to-pink-500 text-white p-4 shadow-[0_15px_40px_rgba(255,120,90,0.22)]"
            >
              <div className="flex items-center justify-between">
                {/* LEFT */}

                <div className="text-left">
                  <p className="text-[11px] text-orange-100 font-bold tracking-wide">
                    QUICK ACCESS
                  </p>

                  <h2 className="text-lg font-black mt-1">
                    Explore Demo Experience
                  </h2>
                </div>

                {/* RIGHT */}

                <div className="h-11 w-11 rounded-2xl bg-white/20 flex items-center justify-center">
                  <ArrowRight size={18} />
                </div>
              </div>
            </motion.button>

            {/* FORM */}

            <form onSubmit={handleSubmit} className="space-y-4 mt-7">
              {/* NAME */}

              {!isLogin && (
                <Input
                  icon={<User size={18} />}
                  type="text"
                  placeholder="Full Name"
                  value={form.name}
                  onChange={(e) =>
                    setForm({
                      ...form,

                      name: e.target.value,
                    })
                  }
                  darkMode={darkMode}
                />
              )}

              {/* EMAIL */}

              <Input
                icon={<Mail size={18} />}
                type="email"
                placeholder="Email Address"
                value={form.email}
                onChange={(e) =>
                  setForm({
                    ...form,

                    email: e.target.value,
                  })
                }
                darkMode={darkMode}
              />

              {/* PASSWORD */}

              <Input
                icon={<Lock size={18} />}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={form.password}
                onChange={(e) =>
                  setForm({
                    ...form,

                    password: e.target.value,
                  })
                }
                darkMode={darkMode}
                rightIcon={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                }
              />

              {/* FORGOT */}

              {isLogin && (
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="text-sm text-[#ff6b57] font-bold"
                  >
                    Forgot Password?
                  </button>
                </div>
              )}

              {/* SUBMIT */}

              <motion.button
                whileTap={{
                  scale: 0.98,
                }}
                disabled={loading}
                className="w-full bg-gradient-to-r from-orange-500 via-[#ff6b57] to-pink-500 text-white py-4 rounded-[24px] font-black shadow-[0_15px_40px_rgba(255,120,90,0.25)] flex items-center justify-center gap-2 mt-2"
              >
                {loading ? (
                  <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    {isLogin ? "Login" : "Create Account"}

                    <ArrowRight size={18} />
                  </>
                )}
              </motion.button>
            </form>

            {/* DIVIDER */}

            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 h-[1px] bg-black/5" />

              <span
                className={`text-xs ${
                  darkMode ? "text-gray-500" : "text-gray-400"
                }`}
              >
                OR CONTINUE WITH
              </span>

              <div className="flex-1 h-[1px] bg-black/5" />
            </div>

            {/* GOOGLE */}

            <button
              className={`w-full rounded-[24px] py-4 font-black border shadow-sm transition-all duration-300 ${
                darkMode
                  ? "bg-white/[0.03] border-white/[0.06]"
                  : "bg-white border-gray-100"
              }`}
            >
              Continue with Google
            </button>

            {/* SWITCH */}

            <div className="text-center mt-6">
              <p
                className={`text-sm ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                {isLogin
                  ? "Don't have an account?"
                  : "Already have an account?"}
              </p>

              <button
                onClick={() => setIsLogin(!isLogin)}
                className="mt-2 text-[#ff6b57] font-black"
              >
                {isLogin ? "Create new account" : "Login instead"}
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* INPUT */

function Input({
  icon,
  type,
  placeholder,
  value,
  onChange,
  darkMode,
  rightIcon,
}) {
  return (
    <div
      className={`rounded-[22px] px-4 py-4 flex items-center gap-3 border transition-all duration-300 focus-within:ring-2 focus-within:ring-orange-500/20 ${
        darkMode
          ? "bg-white/[0.03] border-white/[0.06]"
          : "bg-[#f8fafc] border-gray-100"
      }`}
    >
      {/* ICON */}

      <div className="text-[#ff6b57]">{icon}</div>

      {/* INPUT */}

      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`flex-1 bg-transparent outline-none text-sm ${
          darkMode ? "placeholder:text-gray-500" : "placeholder:text-gray-400"
        }`}
      />

      {/* RIGHT */}

      {rightIcon}
    </div>
  );
}

/* STAT */

function StatCard({ title, subtitle }) {
  return (
    <div className="rounded-[24px] bg-white/15 backdrop-blur-xl border border-white/10 p-4">
      <h2 className="text-2xl font-black">{title}</h2>

      <p className="text-orange-100 text-xs mt-1">{subtitle}</p>
    </div>
  );
}
