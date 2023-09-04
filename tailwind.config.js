/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        "primary-red":"#F31928",
        "secondary-red":"#BE2A34",
        "primary-white": "#F9F8F8",
        "primary-grey": "#D8D8D9",
        "muted-red": "#E38E7F",
        "muted-brown": "#B5754F",
        "neon-red" : "#FE0819",
        "secondary-tan": "#EBBA9A"
      },
      fontFamily: {
        main: ['--font-nunito-sans']
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
  ]
}
