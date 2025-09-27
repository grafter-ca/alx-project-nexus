// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}", // if using the new app router
  ],
  theme: {
    extend: {
      colors: {
        primary: "#10B981",        // Main green
        "primary-dark": "#059669", // Hover/active state
        background: "#F9FAFB",     // Page background
      },
    },
  },
  plugins: [require("daisyui")],
};
