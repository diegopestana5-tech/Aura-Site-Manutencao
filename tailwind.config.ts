import type { Config } from 'tailwindcss';
export default {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: { extend: { colors: { aura: { cream: '#f9f5ef', sand: '#e9ddcd', taupe: '#9d8878', cocoa: '#563c30', ink: '#33251e' } } } },
  plugins: []
} satisfies Config;
