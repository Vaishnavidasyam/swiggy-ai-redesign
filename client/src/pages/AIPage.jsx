import AIFoodAssistant from "../components/AIFoodAssistant";

import useThemeStore from "../store/themeStore";

export default function AIPage() {
  const { darkMode } = useThemeStore();

  return (
    <div
      className={`min-h-screen px-4 pt-5 pb-40 ${
        darkMode ? "bg-[#0f1420]" : "bg-[#f5f7fb]"
      }`}
    >
      <AIFoodAssistant />
    </div>
  );
}
