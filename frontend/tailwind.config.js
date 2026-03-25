/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#312521", // Deep Wood Brown
        "header-cocoa": "#443630", // Dark Cocoa Brown
        "copper-accent": "#785443", // Copper Brown
        "background-light": "#DBD9D7", // Soft Light Gray
        "background-dark": "#1b1817",
      },
      fontFamily: {
        "display": ["var(--font-manrope)", "sans-serif"]
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "full": "9999px"
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries')
  ],
}
