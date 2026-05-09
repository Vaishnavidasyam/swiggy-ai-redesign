import { useState } from "react";

import api from "../api";

import { Sparkles, Send } from "lucide-react";

export default function AIChat() {
  const [query, setQuery] = useState("");

  const [loading, setLoading] = useState(false);

  const [response, setResponse] = useState("");

  async function askAI() {
    if (!query) return;

    try {
      setLoading(true);

      const res = await api.post("/ai/recommend", {
        query,
      });

      setResponse(res.data.response);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white rounded-3xl shadow-xl p-5">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="text-orange-500" />

        <h2 className="font-bold text-xl">AI Food Assistant</h2>
      </div>

      <textarea
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Ask AI what to eat..."
        className="w-full border border-gray-200 rounded-2xl p-4 outline-none min-h-[120px]"
      />

      <button
        onClick={askAI}
        className="mt-4 bg-orange-500 text-white px-6 py-3 rounded-2xl flex items-center gap-2"
      >
        <Send size={18} />
        Ask AI
      </button>

      {loading && <p className="mt-4 text-gray-500">AI thinking...</p>}

      {response && (
        <div className="mt-5 bg-orange-50 rounded-2xl p-4">
          <p className="text-gray-700 whitespace-pre-wrap">{response}</p>
        </div>
      )}
    </div>
  );
}
