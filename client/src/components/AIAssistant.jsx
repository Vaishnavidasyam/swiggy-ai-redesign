import { Sparkles } from "lucide-react";

import { motion } from "framer-motion";

export default function AIAssistant() {
  return (
    <motion.button
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-24 right-5 z-50 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full px-5 py-4 shadow-2xl flex items-center gap-2"
    >
      <Sparkles size={18} />

      <span className="font-semibold">AI Assistant</span>
    </motion.button>
  );
}
