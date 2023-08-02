/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{tsx,jsx}', './public/index.html'],
  theme: {
    extend: {},
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  }
};
