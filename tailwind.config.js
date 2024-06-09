/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        darkblue: "#2D53DA",
        lightblue: "#3E65F2",
        white: "#FFFFFF",
        lightgray: "#E8E7E7",
        contactgreen: "#1DCEF5",
        contactblue: "#1DCEF5",
      },
      boxShadow: {
        lightBox: " 0px 0px 35px rgba(0,0,0,0.1)",
      },
    },
  },
  plugins: [],
};
