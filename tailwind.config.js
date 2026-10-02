/** @type {import('tailwindcss').Config} */
export default {
  future: { hoverOnlyWhenSupported: true },
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#071925',
          900: '#081B28',
          850: '#0B2230',
          800: '#112C3E',
        },
        steel: { DEFAULT: '#31566D', grey: '#6E8798', light: '#9FB1BD' },
        gold: { DEFAULT: '#C99B47', soft: '#D8B062', glow: 'rgba(201, 155, 71, 0.2)' },
        ivory: { DEFAULT: '#F2F2EF', dark: '#E5E5E0' },
        offwhite: '#F2F2EF',
      },
      fontFamily: {
        display: ['Manrope', 'Inter', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      maxWidth: { container: '1360px' },
      borderRadius: { sm: '2px', DEFAULT: '4px', md: '6px' },
      transitionTimingFunction: { precise: 'cubic-bezier(0.22, 0.61, 0.36, 1)' },
    },
  },
  plugins: [],
};
