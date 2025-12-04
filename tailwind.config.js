/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#F7F7F8",
        card: "#FFFFFF",
        text: "#1A1A1A",
        primary: "#F97316",
      },
      borderRadius: {
        full: "9999px",
      },
    },
  },
  plugins: [],
};
