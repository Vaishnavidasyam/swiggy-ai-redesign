/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      colors: {
        primary: "#ff5200",
        secondary: "#fc8019",
        dark: "#111827",
        light: "#f8f8f8",
      },

      boxShadow: {
        card: "0 4px 20px rgba(0,0,0,0.08)",
      },
    },
  },

  plugins: [],
};
