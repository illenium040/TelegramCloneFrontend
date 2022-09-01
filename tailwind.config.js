/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'sidebar': '#293A4C',
        'sidebar-ico': '#8393A3',
        'sidebar-ico-focus': '#5EB5F7',
        'sidebar-focus': '#17212B',
        'sidebar-dark': '#0E1621',
        'side-chat-hover': '#F1F1F1',
        'side-gray': '#BBBBBB',
        'side-indicator-focus': '#C6E1F7'
      },
      gridTemplateColumns: {
        // Complex site-specific column configuration
        'side-container': '100px 1fr 3fr',
      }
    },
  },
  plugins: [
  ]
}
