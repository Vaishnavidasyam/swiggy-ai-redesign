import { useState } from "react";

import { Sparkles, Mic, X, Send } from "lucide-react";

import { motion } from "framer-motion";

import api from "../api";

export default function AIFloatingAssistant() {
  const [open, setOpen] = useState(false);

  const [prompt, setPrompt] = useState("");

  const [reply, setReply] = useState("");

  const [loading, setLoading] = useState(false);

  async function askAI() {
    if (!prompt.trim()) return;

    try {
      setLoading(true);

      const res = await api.post("/ai/recommend", {
        query: prompt,
      });

      setReply(res.data.response);

      setLoading(false);
    } catch (err) {
      console.log(err);

      setLoading(false);
    }
  }

  return (
    <>
      {/* CLOSED BAR */}

      {!open && (
        <motion.div
          initial={{
            y: 100,
            opacity: 0,
          }}
          animate={{
            y: 0,
            opacity: 1,
          }}
          onClick={() => setOpen(true)}
          className="bg-white/90 backdrop-blur-xl border border-white shadow-[0_10px_50px_rgba(0,0,0,0.12)] rounded-3xl px-5 py-4 flex items-center justify-between cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-orange-500 to-pink-500 h-12 w-12 rounded-2xl flex items-center justify-center text-white">
              <Sparkles size={20} />
            </div>

            <div>
              <h3 className="font-bold">Ask AI</h3>

              <p className="text-sm text-gray-500">Food recommendations</p>
            </div>
          </div>

          <div className="bg-orange-100 h-11 w-11 rounded-2xl flex items-center justify-center text-orange-500">
            <Mic size={20} />
          </div>
        </motion.div>
      )}

      {/* OPEN PANEL */}

      {open && (
        <motion.div
          initial={{
            y: 100,
            opacity: 0,
          }}
          animate={{
            y: 0,
            opacity: 1,
          }}
          className="bg-white rounded-[34px] shadow-[0_20px_80px_rgba(0,0,0,0.18)] overflow-hidden border border-gray-100"
        >
          {/* TOP */}

          <div className="p-5 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-orange-500 to-pink-500 h-12 w-12 rounded-2xl flex items-center justify-center text-white">
                <Sparkles />
              </div>

              <div>
                <h2 className="font-black text-xl">AI Assistant</h2>

                <p className="text-sm text-gray-500">Smart food engine</p>
              </div>
            </div>

            <button
              onClick={() => setOpen(false)}
              className="h-10 w-10 rounded-xl bg-gray-100 flex items-center justify-center"
            >
              <X size={18} />
            </button>
          </div>

          {/* BODY */}

          <div className="p-5">
            <div className="bg-[#f7f7f7] rounded-3xl p-4">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Ask AI what to eat..."
                className="w-full bg-transparent outline-none resize-none min-h-[80px]"
              />
            </div>

            {/* SUGGESTIONS */}

            <div className="flex gap-2 overflow-x-auto mt-4 pb-1">
              {["Biryani 🔥", "Pizza 🍕", "Healthy 🥗", "Dessert 🍰"].map(
                (item) => (
                  <button
                    key={item}
                    onClick={() => setPrompt(item)}
                    className="bg-orange-50 text-orange-600 px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap"
                  >
                    {item}
                  </button>
                ),
              )}
            </div>

            {/* BUTTON */}

            <button
              onClick={askAI}
              className="w-full mt-5 bg-gradient-to-r from-orange-500 to-pink-500 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2"
            >
              <Send size={18} />

              {loading ? "Thinking..." : "Ask AI"}
            </button>

            {/* RESPONSE */}

            {reply && (
              <div className="mt-5 bg-gradient-to-br from-orange-50 to-pink-50 border border-orange-100 rounded-3xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="text-orange-500" />

                  <h3 className="font-bold text-orange-600">
                    AI Recommendation
                  </h3>
                </div>

                <p className="leading-8 text-gray-700 whitespace-pre-wrap">
                  {reply}
                </p>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </>
  );
}
