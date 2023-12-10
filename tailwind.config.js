/** @type {import('tailwindcss').Config} */
export default {
  content: ["index.html"],
  theme: {
    extend: {
      fontFamily: {
        Lexend: ["Lexend Deca", "sans-serif"],
        Marcellus: ["Marcellus", "sans-serif"],
      },
      dropShadow: {
        glow: [
          "0 0px 20px rgba(255,255, 255, 0.7)",
          "0 0px 65px rgba(255, 255,255, 0.5)",
        ],
      },
    },
  },
  plugins: [require("daisyui")],
}
