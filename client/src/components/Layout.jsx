import useThemeStore from "../store/themeStore";

export default function Layout({ children }) {
  const { darkMode } = useThemeStore();

  return (
    <div
      className={`min-h-screen transition ${
        darkMode ? "bg-[#111827]" : "bg-[#f8f8f8]"
      }`}
    >
      <div
        className={`max-w-md mx-auto min-h-screen transition ${
          darkMode ? "bg-[#111827] text-white" : "bg-[#f8f8f8]"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
