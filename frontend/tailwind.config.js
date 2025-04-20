// @codex
/**
 * Tailwind CSS configuration
 */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"] ,
  theme: {
    extend: {
      fontFamily: {
        sans: ["Roboto", "sans-serif"]
      },
      colors: {
        primary: '#1a73e8'
      }
    }
  },
  plugins: []
};
