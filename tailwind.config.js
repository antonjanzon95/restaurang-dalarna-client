/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        primary: "#000",
      },
    },
    screens: {
      tablet: "640px",
      laptop: "1024px",
    },
  },
  plugins: [],
};
