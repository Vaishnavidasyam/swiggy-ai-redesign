import { useState } from "react";

import { Sparkles, Send, Loader2, Bot } from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";

import api from "../api";

import VoiceSearch from "./VoiceSearch";

export default function AIFoodAssistant() {
  const [prompt, setPrompt] = useState("");

  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState([]);

  const [error, setError] = useState("");

  /* ASK AI */

  async function askAI() {
    if (!prompt.trim()) return;

    try {
      setLoading(true);

      setError("");

      /* USER */

      const userMessage = {
        type: "user",

        text: prompt,
      };

      setMessages((prev) => [...prev, userMessage]);

      /* API */

      const res = await api.post("/ai/recommend", {
        query: prompt,
      });

      /* AI */

      const aiMessage = {
        type: "ai",

        text: res.data.response,
      };

      setTimeout(() => {
        setMessages((prev) => [...prev, aiMessage]);

        setLoading(false);
      }, 1200);

      setPrompt("");
    } catch (err) {
      console.log(err);

      setLoading(false);

      setError("AI failed to respond");
    }
  }

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 30,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className="relative overflow-hidden rounded-[36px] p-[1px] mt-6 bg-gradient-to-br from-orange-400 via-red-500 to-pink-500 shadow-[0_20px_80px_rgba(255,90,31,0.25)]"
    >
      {/* INNER */}

      <div className="bg-white rounded-[36px] p-5 backdrop-blur-xl relative overflow-hidden">
        {/* GLOW */}

        <div className="absolute top-[-80px] right-[-60px] h-52 w-52 bg-orange-200 opacity-30 blur-3xl rounded-full" />

        {/* HEADER */}

        <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center gap-3">
            {/* ICON */}

            <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white shadow-lg">
              <Bot size={28} />
            </div>

            {/* TEXT */}

            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-black text-[24px]">AI Assistant</h2>

                {/* ONLINE */}

                <div className="flex items-center gap-1 bg-green-100 text-green-600 px-2 py-1 rounded-full text-[10px] font-bold">
                  <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                  LIVE
                </div>
              </div>

              <p className="text-sm text-gray-500 mt-1">
                Personalized food intelligence
              </p>
            </div>
          </div>

          {/* VOICE */}

          <VoiceSearch onResult={(text) => setPrompt(text)} />
        </div>

        {/* SEARCH BOX */}

        <div className="mt-6 relative z-10">
          <div className="bg-[#f8f8f8] border border-gray-200 rounded-[28px] px-5 py-4">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Ask AI for recommendations..."
              className="w-full bg-transparent outline-none resize-none min-h-[70px] text-[15px] text-gray-700"
            />
          </div>
        </div>

        {/* SUGGESTIONS */}

        <div className="flex gap-2 overflow-x-auto mt-4 pb-1 no-scrollbar">
          {[
            "Biryani 🔥",
            "Healthy 🥗",
            "Pizza 🍕",
            "Desserts 🍰",
            "Protein 💪",
            "Night cravings 🌙",
          ].map((item) => (
            <motion.button
              whileTap={{
                scale: 0.94,
              }}
              key={item}
              onClick={() => setPrompt(item)}
              className="min-w-fit bg-gradient-to-r from-orange-50 to-red-50 border border-orange-100 text-orange-600 px-4 py-2 rounded-full text-xs font-semibold"
            >
              {item}
            </motion.button>
          ))}
        </div>

        {/* BUTTON */}

        <motion.button
          whileTap={{
            scale: 0.97,
          }}
          whileHover={{
            scale: 1.01,
          }}
          onClick={askAI}
          disabled={loading}
          className="w-full mt-5 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white py-4 rounded-2xl font-bold shadow-xl flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" />
              Thinking...
            </>
          ) : (
            <>
              <Send size={18} />
              Ask AI Assistant
            </>
          )}
        </motion.button>

        {/* ERROR */}

        {error && (
          <div className="mt-4 bg-red-100 text-red-600 p-4 rounded-2xl text-sm font-medium">
            {error}
          </div>
        )}

        {/* CHATS */}

        <div className="mt-6 space-y-4 relative z-10">
          <AnimatePresence>
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{
                  opacity: 0,
                  y: 15,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                }}
              >
                {message.type === "user" ? (
                  /* USER */

                  <div className="flex justify-end">
                    <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-5 py-4 rounded-[26px] rounded-br-md max-w-[82%] shadow-lg">
                      <p className="text-sm leading-7">{message.text}</p>
                    </div>
                  </div>
                ) : (
                  /* AI */

                  <div className="flex justify-start">
                    <div className="bg-gradient-to-br from-white to-orange-50 border border-orange-100 px-5 py-5 rounded-[28px] rounded-bl-md max-w-[88%] shadow-md backdrop-blur-lg">
                      {/* TOP */}

                      <div className="flex items-center gap-3 mb-4">
                        <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white shadow-lg">
                          <Sparkles size={18} />
                        </div>

                        <div>
                          <h3 className="font-bold text-orange-600 text-sm">
                            AI Assistant
                          </h3>

                          <p className="text-[11px] text-gray-400">
                            Smart Recommendation Engine
                          </p>
                        </div>
                      </div>

                      {/* CONTENT */}

                      <p className="text-[15px] leading-8 whitespace-pre-wrap text-gray-700">
                        {message.text}
                      </p>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {/* TYPING */}

          {loading && (
            <div className="flex justify-start">
              <div className="bg-orange-50 border border-orange-100 px-5 py-4 rounded-2xl flex items-center gap-3 shadow-md">
                <div className="flex gap-1">
                  <div className="h-2 w-2 rounded-full bg-orange-500 animate-bounce" />

                  <div className="h-2 w-2 rounded-full bg-orange-500 animate-bounce delay-100" />

                  <div className="h-2 w-2 rounded-full bg-orange-500 animate-bounce delay-200" />
                </div>

                <p className="text-sm text-gray-500">AI is thinking...</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
