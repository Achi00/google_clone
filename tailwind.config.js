/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      dropShadow: {
        '3xl': '0 35px 35px rgba(0, 0, 0, 0.25)',
        '2xl': [
            '0 5px 10px rgba(0, 0, 0, 0.15)',
            '0 5px 10px rgba(0, 0, 0, 0.15)'
        ]
      },
      screens: {
        xs: '320px',
        sm: '480px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
    require('tailwindcss-multi-column')({
      columnCount: {
        sm: 1,  // 1 column on small screens
        md: 2,  // 2 columns on medium screens
        lg: 3,  // 3 columns on large screens
        xl: 4,  // 4 columns on extra-large screens
      },
    }),
  ],
}

