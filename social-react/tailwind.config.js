/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#1fb6ff',
        'secondary': '#ffff00',
        'danger': '#FF0000',
      },
    },

  },
  plugins: [],
  corePlugins: {
    preflight: false,
  }
}
