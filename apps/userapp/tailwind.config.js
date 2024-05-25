/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,tsx,ts}", "../../packages/ui/src/**/*.{tsx,ts,js,jsx}"],
  darkMode: 'selector',
  theme: {
    extend: {},
    screens: {
      'xxs': '160px',
      // => @media (min-width: 160px) { ... }
      'xs': '320px',
      // => @media (min-width: 320px) { ... }
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    }
  },
  plugins: [],
}