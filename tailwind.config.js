/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        theme: {
          bg: 'var(--bg)',
          elevated: 'var(--bg-elevated)',
          surface: 'var(--surface)',
          card: 'var(--surface-card)',
          hover: 'var(--surface-hover)',
          border: 'var(--border)',
          borderStrong: 'var(--border-strong)',
          text: 'var(--text)',
          muted: 'var(--text-muted)',
          subtle: 'var(--text-subtle)',
          accent: 'var(--accent)',
          accentContrast: 'var(--accent-contrast)',
          accentSoft: 'var(--accent-soft)',
        },
      },
    },
  },
  plugins: [],
}
