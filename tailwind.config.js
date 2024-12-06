/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF8A3D',
          light: '#FFB07D',
          dark: '#E66A1D',
          5: 'rgba(255, 138, 61, 0.05)',
          10: 'rgba(255, 138, 61, 0.1)',
          20: 'rgba(255, 138, 61, 0.2)',
          30: 'rgba(255, 138, 61, 0.3)',
          40: 'rgba(255, 138, 61, 0.4)',
          50: 'rgba(255, 138, 61, 0.5)',
          60: 'rgba(255, 138, 61, 0.6)',
          70: 'rgba(255, 138, 61, 0.7)',
          80: 'rgba(255, 138, 61, 0.8)',
          90: 'rgba(255, 138, 61, 0.9)',
        },
        secondary: {
          DEFAULT: '#FFD700',
          light: '#FFE44D',
        },
        error: '#EF4444',
        success: '#22C55E',
        surface: '#FFFFFF',
        background: '#F8FAFC'
      },
      fontSize: {
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
      },
      animation: {
        'slide-up': 'slideUp 0.5s ease-out forwards',
        'fade-in': 'fadeIn 0.3s ease-out forwards',
        'scale-in': 'scaleIn 0.3s ease-out forwards',
        'pulse-once': 'pulse 0.3s ease-out',
      },
      keyframes: {
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}