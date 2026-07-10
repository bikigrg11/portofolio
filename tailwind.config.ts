import type { Config } from 'tailwindcss'
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#05070d', bg2: '#0a0f1a', fg: '#e6edf7',
        muted: '#7d8aa3', accent: '#22e6d6', accent2: '#3b82f6',
      },
      fontFamily: { sans: ['"SF Pro Display"', 'system-ui', 'sans-serif'] },
    },
  },
  plugins: [],
} satisfies Config
