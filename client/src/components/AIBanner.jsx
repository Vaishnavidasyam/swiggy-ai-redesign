import { Sparkles } from "lucide-react";

export default function AIBanner() {
  return (
    <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl p-5 text-white">
      <div className="flex items-center gap-2 mb-2">
        <Sparkles size={18} />

        <span className="font-semibold">AI Smart Recommendation</span>
      </div>

      <p className="text-sm text-orange-100">
        Based on your recent orders, we recommend spicy biryani combos 🔥
      </p>
    </div>
  );
}
