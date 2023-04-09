/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

const newScreens = Object.entries(defaultTheme.screens).reduce(
  (breakpoints, [label, value]) => {
    if (label == "lg") {
      breakpoints["foo"] = "1000px";
    }
    breakpoints[label] = value;
    return breakpoints;
  },
  {}
);

module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: newScreens,
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}