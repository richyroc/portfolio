const colors = require("tailwindcss/colors")

module.exports = {
  darkMode: "class",
  purge: ["./src/**/*.jsx", "./src/**/*.js"],
  theme: {
    container: {
      center: true,
      padding: "1.25rem",
    },
    fontFamily: {
      sans: ["Inter var", "system-ui", "sans-serif"],
    },
    extend: {
      colors: {
        primary: "#2273FF",
        dm: {
          100: "#000000",
          200: "#13151A",
          300: "#262B33",
          400: "#39404D",
          500: "#4D5666",
        },
      },
    },
  },
  variants: {
    opacity: ["responsive", "hover", "focus", "group-hover"],
    display: ["responsive", "hover", "focus", "last"],
  },
}
