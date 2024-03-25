/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    backgroundImage: {
      'hero-pattern': "url('https://img.freepik.com/free-photo/office-table-with-cup-coffee-keyboard-notepad_1220-4618.jpg?w=1380&t=st=1711283700~exp=1711284300~hmac=da4c1768856ac96e24726a7113477f450ce986eed314c50b8542cd57e989afa1')",
    }
  },
  plugins: [],
}