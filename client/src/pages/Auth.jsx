import { useState } from "react";

import api from "../api";

import toast from "react-hot-toast";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const endpoint = isLogin ? "/auth/login" : "/auth/register";

      const res = await api.post(endpoint, form);

      localStorage.setItem("token", res.data.token);

      toast.success(isLogin ? "Login successful" : "Account created");

      window.location.href = "/";
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-md rounded-[32px] p-8 shadow-2xl">
        <h1 className="text-3xl font-black text-center">
          {isLogin ? "Welcome Back 👋" : "Create Account"}
        </h1>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          {!isLogin && (
            <input
              type="text"
              placeholder="Name"
              value={form.name}
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value,
                })
              }
              className="w-full border border-gray-200 rounded-2xl px-4 py-4 outline-none"
            />
          )}

          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) =>
              setForm({
                ...form,
                email: e.target.value,
              })
            }
            className="w-full border border-gray-200 rounded-2xl px-4 py-4 outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) =>
              setForm({
                ...form,
                password: e.target.value,
              })
            }
            className="w-full border border-gray-200 rounded-2xl px-4 py-4 outline-none"
          />

          <button className="w-full bg-orange-500 text-white py-4 rounded-2xl font-bold">
            {isLogin ? "Login" : "Create Account"}
          </button>
        </form>

        <button
          onClick={() => setIsLogin(!isLogin)}
          className="mt-5 text-orange-500 text-sm font-medium w-full"
        >
          {isLogin ? "Create new account" : "Already have account?"}
        </button>
      </div>
    </div>
  );
}
