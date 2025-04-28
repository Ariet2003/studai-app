/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#3B82F6",
          dark: "#1D4ED8",
        },
        background: {
          light: "#FFFFFF",
          dark: "#0A0F23",
        },
        card: {
          light: "#F8FAFC",
          dark: "#1E293B",
        },
      },
      container: {
        center: true,
        padding: "2rem",
      },
    },
  },
  plugins: [],
} 