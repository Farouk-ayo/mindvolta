/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        sans: ["DMSans_400Regular"],
        medium: ["DMSans_500Medium"],
        bold: ["DMSans_700Bold"],
        // alegreya: ["Alegreya_400Regular"],
        // alegreyaBold: ["Alegreya_700Bold"],
        // alegreyaSans: ["AlegreyaSans_400Regular"],
        epilogue: ["Epilogue_400Regular"],
      },
      fontSize: {
        base: 18,
        lg: 20,
        xl: 24,
      },
      colors: {
        primary: "#FFB810",
        secondary: "#006C2D",
      },
    },
  },
  plugins: [],
};
