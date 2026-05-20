/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Steampunk vintage palette
        brass: {
          50: '#fdf8f0',
          100: '#f9ecd5',
          200: '#f0d4a0',
          300: '#e3b56b',
          400: '#d4a574',
          500: '#b87333',
          600: '#a05a25',
          700: '#7d441c',
          800: '#5a3015',
          900: '#3e2010',
        },
        copper: {
          400: '#cd7f32',
          500: '#b06028',
          600: '#8a4a1f',
        },
        parchment: {
          50: '#fdf9ec',
          100: '#f9f0d2',
          200: '#f4e8c1',
          300: '#e8d4a0',
          400: '#d4b870',
        },
        ink: {
          900: '#1a0f0a',
          800: '#2a1810',
          700: '#3e2c23',
          600: '#5a4030',
          500: '#704214',
        },
      },
      fontFamily: {
        display: ['"Cinzel"', 'serif'],
        serif: ['"Cormorant Garamond"', 'serif'],
        mono: ['"Special Elite"', 'monospace'],
      },
      backgroundImage: {
        'parchment-texture': "url('https://images.unsplash.com/photo-1524293581917-878a6d017c71?w=1200&q=60&auto=format')",
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      animation: {
        'gear-slow': 'spin 12s linear infinite',
        'gear-reverse': 'spin-reverse 16s linear infinite',
        'fade-in': 'fadeIn 1s ease-in forwards',
        'flicker': 'flicker 3s ease-in-out infinite',
      },
      keyframes: {
        'spin-reverse': {
          'from': { transform: 'rotate(360deg)' },
          'to': { transform: 'rotate(0deg)' },
        },
        fadeIn: {
          'from': { opacity: 0, transform: 'translateY(20px)' },
          'to': { opacity: 1, transform: 'translateY(0)' },
        },
        flicker: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.85 },
        }
      }
    },
  },
  plugins: [],
}
