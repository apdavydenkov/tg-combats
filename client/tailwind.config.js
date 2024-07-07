module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'tg-theme-bg': 'var(--tg-theme-bg-color)',
        'tg-theme-text': 'var(--tg-theme-text-color)',
        'tg-theme-hint': 'var(--tg-theme-hint-color)',
        'tg-theme-link': 'var(--tg-theme-link-color)',
        'tg-theme-button': 'var(--tg-theme-button-color)',
        'tg-theme-button-text': 'var(--tg-theme-button-text-color)',
      },
    },
  },
  plugins: [],
}