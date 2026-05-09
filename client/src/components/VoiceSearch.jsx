import { useState } from "react";

import { Mic, MicOff } from "lucide-react";

import { motion } from "framer-motion";

export default function VoiceSearch({ onResult }) {
  const [listening, setListening] = useState(false);

  /* START VOICE */

  function startListening() {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Voice search not supported in this browser");

      return;
    }

    const recognition = new window.webkitSpeechRecognition();

    recognition.continuous = false;

    recognition.lang = "en-US";

    recognition.interimResults = false;

    recognition.start();

    setListening(true);

    /* RESULT */

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;

      console.log(transcript);

      if (onResult) {
        onResult(transcript);
      }

      setListening(false);
    };

    /* ERROR */

    recognition.onerror = () => {
      setListening(false);
    };

    /* END */

    recognition.onend = () => {
      setListening(false);
    };
  }

  return (
    <motion.button
      whileTap={{
        scale: 0.92,
      }}
      onClick={startListening}
      className={`h-14 w-14 rounded-2xl flex items-center justify-center shadow-lg transition-all ${
        listening
          ? "bg-red-500 text-white animate-pulse"
          : "bg-gradient-to-r from-orange-500 to-red-500 text-white"
      }`}
    >
      {listening ? <MicOff size={24} /> : <Mic size={24} />}
    </motion.button>
  );
}
