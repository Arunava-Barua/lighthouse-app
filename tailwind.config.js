/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./app/**/*.{js,ts,jsx,tsx,mdx}",
      "./pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./components/**/*.{js,ts,jsx,tsx,mdx}",
      "./sections/**/*.{js,ts,jsx,tsx,mdx}",
  
      // Or if using `src` directory:
      "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
      extend: {},
      // colors: {
      //   "custom-red-1": "#C3073F",
      //   "custom-red-2": "#950740",
      //   "custom-red-3": "#6F2232",
      //   "custom-black-1": "#1A1A1D",
      //   "custom-black-2": "#4E4E50",
      // },
    },
    plugins: [require("daisyui")],
  };
  