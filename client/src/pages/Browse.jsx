import { Search } from "lucide-react";

import useThemeStore from "../store/themeStore";

export default function Browse() {
  const { darkMode } = useThemeStore();

  return (
    <div
      className={`min-h-screen px-4 pt-6 pb-40 ${
        darkMode ? "bg-[#0f1420] text-white" : "bg-[#f5f7fb] text-black"
      }`}
    >
      {/* HEADER */}

      <div className="flex items-center gap-3 mb-6">
        <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-orange-500 to-pink-500 text-white flex items-center justify-center shadow-lg">
          <Search size={24} />
        </div>

        <div>
          <h1 className="text-[28px] font-black">Browse Food</h1>

          <p
            className={`text-sm ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            Explore restaurants & dishes
          </p>
        </div>
      </div>

      {/* SEARCH */}

      <div
        className={`rounded-[28px] p-5 shadow-lg ${
          darkMode ? "bg-[#171c28]" : "bg-white"
        }`}
      >
        <input
          type="text"
          placeholder="Search food, restaurants..."
          className={`w-full bg-transparent outline-none text-lg ${
            darkMode ? "placeholder:text-gray-500" : "placeholder:text-gray-400"
          }`}
        />
      </div>
    </div>
  );
}
