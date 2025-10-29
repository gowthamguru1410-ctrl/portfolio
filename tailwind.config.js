/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#667eea',
          600: '#5a67d8',
          700: '#4c51bf',
          800: '#434190',
          900: '#3c366b',
        },
        purple: {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#a855f7',
          600: '#764ba2',
          700: '#7e22ce',
          800: '#6b21a8',
          900: '#581c87',
        },
        pink: {
          50: '#fdf2f8',
          100: '#fce7f3',
          200: '#fbcfe8',
          300: '#f9a8d4',
          400: '#f472b6',
          500: '#f093fb',
          600: '#db2777',
          700: '#be185d',
          800: '#9d174d',
          900: '#831843',
        },
        dark: {
          base: '#0a0a0f',
          950: '#0f0f14',
          900: '#1a1a2e',
          800: '#16213e',
          700: '#0f3460',
        },
      },
      backgroundImage: {
        'primary-gradient': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'primary-gradient-hover': 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'cosmic-gradient': 'linear-gradient(135deg, #667eea 0%, #764ba2 40%, #f093fb 100%)',
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'subtle-md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'subtle-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'subtle-xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'glow': '0 0 30px rgba(102, 126, 234, 0.4)',
        'glow-lg': '0 0 60px rgba(102, 126, 234, 0.5)',
        'glow-purple': '0 0 50px rgba(118, 75, 162, 0.6)',
        'glow-pink': '0 0 50px rgba(240, 147, 251, 0.6)',
        'premium': '0 20px 60px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1) inset',
        'premium-lg': '0 40px 100px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.15) inset',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        display: ['Space Grotesk', 'Inter', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        heading: ['Space Grotesk', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Courier New', 'monospace'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1.5', letterSpacing: '0.005em' }],
        'sm': ['0.875rem', { lineHeight: '1.6', letterSpacing: '0em' }],
        'base': ['1rem', { lineHeight: '1.8', letterSpacing: '-0.011em' }],
        'lg': ['1.125rem', { lineHeight: '1.75', letterSpacing: '-0.015em' }],
        'xl': ['1.25rem', { lineHeight: '1.7', letterSpacing: '-0.02em' }],
        '2xl': ['1.5rem', { lineHeight: '1.6', letterSpacing: '-0.025em' }],
        '3xl': ['1.875rem', { lineHeight: '1.5', letterSpacing: '-0.03em' }],
        '4xl': ['2.25rem', { lineHeight: '1.4', letterSpacing: '-0.035em' }],
        '5xl': ['3rem', { lineHeight: '1.3', letterSpacing: '-0.04em' }],
        '6xl': ['3.75rem', { lineHeight: '1.2', letterSpacing: '-0.045em' }],
        '7xl': ['4.5rem', { lineHeight: '1.15', letterSpacing: '-0.05em' }],
        '8xl': ['6rem', { lineHeight: '1.1', letterSpacing: '-0.055em' }],
        '9xl': ['8rem', { lineHeight: '1.05', letterSpacing: '-0.06em' }],
      },
      letterSpacing: {
        tighter: '-0.05em',
        tight: '-0.025em',
        normal: '0',
        wide: '0.025em',
        wider: '0.05em',
        widest: '0.1em',
      },
      backdropBlur: {
        xs: '2px',
        sm: '4px',
        DEFAULT: '8px',
        md: '12px',
        lg: '16px',
        xl: '24px',
        '2xl': '40px',
        '3xl': '64px',
      },
      animation: {
        'gradient-x': 'gradient-x 15s ease infinite',
        'gradient-y': 'gradient-y 15s ease infinite',
        'gradient-xy': 'gradient-xy 15s ease infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'pulse-slow': 'pulse-slow 8s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 4s linear infinite',
        'glow-pulse': 'glow-pulse 4s ease-in-out infinite',
      },
      keyframes: {
        'gradient-x': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        },
        'gradient-y': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'center top'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'center bottom'
          },
        },
      },
      transitionTimingFunction: {
        'bounce-in': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      scale: {
        '102': '1.02',
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
    },
  },
  plugins: [],
}