/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        'primary': {
          DEFAULT: '#4CAF50', // Green
          'dark': '#45a049',  // Dark Green
          'light': '#e0f2e1', // Light Green
        },
        // Neutral Colors
        'neutral': {
          'light': '#f9f9f9',  // Light Gray
          'medium': '#dddddd', // Medium Gray
          'dark': '#666666',   // Dark Gray
          'darker': '#333333', // Very Dark Gray
        },
        // Accent Colors
        'gold': '#FFD700',
        'platinum': '#E5E4E2',
        'alert': '#ff6b6b',    // Alert Red
        'warning': '#ffc107',  // Warning Yellow
        // Extended Green Colors for Gradients
        'green': {
          400: '#34D399',
          500: '#10B981',
          600: '#059669',
          700: '#047857',
          800: '#065F46',
          900: '#064E3B',
          950: '#022c22'
        }
      },
      fontFamily: {
        sans: ['Arial', 'Helvetica', 'sans-serif'],
      },
      fontSize: {
        'xs': '0.75rem',     // 12px
        'sm': '0.875rem',    // 14px
        'base': '1rem',      // 16px
        'lg': '1.125rem',    // 18px
        'xl': '1.25rem',     // 20px
        '2xl': '1.5rem',     // 24px
        '3xl': '1.75rem',    // 28px
        '4xl': '2.25rem',    // 36px
      },
      fontWeight: {
        'light': 300,
        'normal': 400,
        'medium': 500,
        'bold': 700,
      },
      lineHeight: {
        'tight': 1.2,    // Headings
        'normal': 1.6,   // Body text
        'button': 1.4,   // Buttons
      },
      borderRadius: {
        'none': '0',
        'sm': '0.125rem',    // 2px
        DEFAULT: '0.25rem',  // 4px
        'md': '0.375rem',    // 6px
        'lg': '0.5rem',      // 8px
        'xl': '1rem',        // 16px
        'full': '9999px',
      },
      boxShadow: {
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        DEFAULT: '0 2px 10px rgba(0, 0, 0, 0.1)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
      spacing: {
        'xs': '5px',
        'sm': '10px',
        'md': '15px',
        'lg': '20px',
        'xl': '30px',
        '2xl': '40px',
        '3xl': '60px',
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
        },
      },
    },
    screens: {
      'xs': '375px',
      'sm': '576px',
      'md': '768px',
      'lg': '992px',
      'xl': '1200px',
      '2xl': '1400px',
    },
  },
  plugins: [],
};
