/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      orange: "#FFCD11",
      darkgray: "#303841",
      lightgray: "#F5F5F5",
      gray: "#303841bf",
      black: "#000000",
      red: "#FF0000",
      blue: "#0000FF",
      green: "#00FF00",
    },
    extend: {
      backgroundImage: {
        registerbg: "url('../public/compactor.jpg')",
      },
    },
    screens: {
      mobile: "320px",
      tablet: "768px",
      laptop: "1024px",
      desktop: "1280px",
    },
  },
  plugins: [],
};
