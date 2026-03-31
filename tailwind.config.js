/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        normal: "Archivo_400Regular",
        medium: "Archivo_500Medium",
        bold: "Archivo_700Bold",
      },
      colors: {
        brand: "#60A5FA",
        stroke: "#1E293b",
      },
    },
  },
  plugins: [],
};
