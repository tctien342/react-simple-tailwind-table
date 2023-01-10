/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/components/**/*.tsx'],
  theme: {
    extend: {},
  },
  safelist: [{ pattern: /rounded-./ }],
  plugins: [],
};
