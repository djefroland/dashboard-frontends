// tailwind.config.js - Configuration Révolutionnaire
import defaultTheme from 'tailwindcss/defaultTheme'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Couleurs révolutionnaires
      colors: {
        primary: {
          50: '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#0066FF', // Notre bleu principal
          600: '#0052CC',
          700: '#1D4ED8',
          800: '#1E3A8A',
          900: '#1E40AF',
          950: '#172554',
        },
        secondary: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
        },
        accent: {
          50: '#ECFEFF',
          100: '#CFFAFE',
          200: '#A5F3FC',
          300: '#67E8F9',
          400: '#22D3EE',
          500: '#06B6D4',
          600: '#0891B2',
          700: '#0E7490',
          800: '#155E75',
          900: '#164E63',
        },
        success: {
          50: '#ECFDF5',
          100: '#D1FAE5',
          200: '#A7F3D0',
          300: '#6EE7B7',
          400: '#34D399',
          500: '#10B981',
          600: '#059669',
          700: '#047857',
          800: '#065F46',
          900: '#064E3B',
        },
        warning: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706',
          700: '#B45309',
          800: '#92400E',
          900: '#78350F',
        },
        danger: {
          50: '#FEF2F2',
          100: '#FEE2E2',
          200: '#FECACA',
          300: '#FCA5A5',
          400: '#F87171',
          500: '#EF4444',
          600: '#DC2626',
          700: '#B91C1C',
          800: '#991B1B',
          900: '#7F1D1D',
        },
      },
      
      // Typographie révolutionnaire
      fontFamily: {
        sans: ['Inter', 'system-ui', ...defaultTheme.fontFamily.sans],
        display: ['Poppins', 'system-ui', ...defaultTheme.fontFamily.sans],
        mono: ['JetBrains Mono', ...defaultTheme.fontFamily.mono],
      },
      
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '0.75rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '3.5rem' }],
        '6xl': ['3.75rem', { lineHeight: '4rem' }],
        '7xl': ['4.5rem', { lineHeight: '5rem' }],
        '8xl': ['6rem', { lineHeight: '6.5rem' }],
        '9xl': ['8rem', { lineHeight: '8.5rem' }],
      },
      
      // Spacing révolutionnaire
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '96': '24rem',
        '104': '26rem',
        '112': '28rem',
        '128': '32rem',
      },
      
      // Border radius révolutionnaire
      borderRadius: {
        'none': '0',
        'sm': '0.375rem',
        DEFAULT: '0.5rem',
        'md': '0.75rem',
        'lg': '1rem',
        'xl': '1.5rem',
        '2xl': '2rem',
        '3xl': '3rem',
        'full': '9999px',
      },
      
      // Box shadow révolutionnaire
      boxShadow: {
        'sm': '0 1px 3px 0 rgba(0, 102, 255, 0.1), 0 1px 2px 0 rgba(0, 102, 255, 0.06)',
        DEFAULT: '0 4px 6px -1px rgba(0, 102, 255, 0.1), 0 2px 4px -1px rgba(0, 102, 255, 0.06)',
        'md': '0 4px 6px -1px rgba(0, 102, 255, 0.1), 0 2px 4px -1px rgba(0, 102, 255, 0.06)',
        'lg': '0 10px 15px -3px rgba(0, 102, 255, 0.1), 0 4px 6px -2px rgba(0, 102, 255, 0.05)',
        'xl': '0 20px 25px -5px rgba(0, 102, 255, 0.1), 0 10px 10px -5px rgba(0, 102, 255, 0.04)',
        '2xl': '0 25px 50px -12px rgba(0, 102, 255, 0.25)',
        'inner': 'inset 0 2px 4px 0 rgba(0, 102, 255, 0.06)',
        'glow': '0 0 20px rgba(0, 102, 255, 0.3)',
        'glow-lg': '0 0 40px rgba(0, 102, 255, 0.4)',
      },
      
      // Gradients révolutionnaires
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'primary-gradient': 'linear-gradient(135deg, #0066FF 0%, #00A3FF 100%)',
        'secondary-gradient': 'linear-gradient(135deg, #1E3A8A 0%, #3B82F6 100%)',
        'success-gradient': 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
        'warning-gradient': 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
        'danger-gradient': 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.1) 100%)',
        'hero-gradient': 'linear-gradient(135deg, #0066FF 0%, #00A3FF 50%, #06B6D4 100%)',
      },
      
      // Animations révolutionnaires
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'pulse-fast': 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'slide-in': 'slideIn 0.5s ease-out',
        'slide-in-left': 'slideInLeft 0.5s ease-out',
        'slide-in-right': 'slideInRight 0.5s ease-out',
        'fade-in': 'fadeIn 0.3s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(0, 102, 255, 0.3)' },
          '100%': { boxShadow: '0 0 30px rgba(0, 102, 255, 0.6)' },
        },
      },
      
      // Transitions révolutionnaires
      transitionDuration: {
        '0': '0ms',
        '75': '75ms',
        '100': '100ms',
        '150': '150ms',
        '200': '200ms',
        '300': '300ms',
        '500': '500ms',
        '700': '700ms',
        '1000': '1000ms',
        '2000': '2000ms',
      },
      
      // Backdrop filters
      backdropBlur: {
        'xs': '2px',
        'sm': '4px',
        DEFAULT: '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '24px',
        '2xl': '40px',
        '3xl': '64px',
      },
      
      // Z-index
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
      
      // Aspect ratios
      aspectRatio: {
        '4/3': '4 / 3',
        '3/2': '3 / 2',
        '2/3': '2 / 3',
        '9/16': '9 / 16',
      },
      
      // Container
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
          '2xl': '6rem',
        },
      },
    },
  },
  plugins: [
    // Plugin pour les utilitaires personnalisés
    function({ addUtilities, addComponents, theme }) {
      // Utilitaires de glassmorphism
      addUtilities({
        '.glass': {
          background: 'rgba(255, 255, 255, 0.25)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.18)',
        },
        '.glass-dark': {
          background: 'rgba(15, 23, 42, 0.8)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        },
        '.text-gradient': {
          background: 'linear-gradient(135deg, #0066FF 0%, #00A3FF 100%)',
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
          'background-clip': 'text',
        },
        '.hover-lift': {
          transition: 'transform 0.25s ease-in-out, box-shadow 0.25s ease-in-out',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 20px 25px -5px rgba(0, 102, 255, 0.1), 0 10px 10px -5px rgba(0, 102, 255, 0.04)',
          },
        },
        '.hover-scale': {
          transition: 'transform 0.25s ease-in-out',
          '&:hover': {
            transform: 'scale(1.05)',
          },
        },
        '.hover-glow': {
          transition: 'box-shadow 0.25s ease-in-out',
          '&:hover': {
            boxShadow: '0 0 20px rgba(0, 102, 255, 0.4)',
          },
        },
      })
      
      // Composants personnalisés
      addComponents({
        '.btn-revolutionary': {
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem',
          padding: '0.75rem 1.5rem',
          fontFamily: theme('fontFamily.display'),
          fontSize: '0.875rem',
          fontWeight: '500',
          borderRadius: theme('borderRadius.lg'),
          border: 'none',
          transition: 'all 0.25s ease-in-out',
          cursor: 'pointer',
          position: 'relative',
          overflow: 'hidden',
          
          '&::before': {
            content: '""',
            position: 'absolute',
            top: '0',
            left: '-100%',
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
            transition: 'left 0.35s ease-in-out',
            zIndex: '1',
          },
          
          '&:hover::before': {
            left: '100%',
          },
          
          '&:focus': {
            outline: 'none',
            boxShadow: '0 0 0 3px rgba(0, 102, 255, 0.3)',
          },
          
          '&:disabled': {
            opacity: '0.6',
            cursor: 'not-allowed',
            transform: 'none',
          },
          
          '&.btn-primary': {
            background: 'linear-gradient(135deg, #0066FF 0%, #00A3FF 100%)',
            color: 'white',
            boxShadow: theme('boxShadow.md'),
            
            '&:hover:not(:disabled)': {
              transform: 'translateY(-2px)',
              boxShadow: theme('boxShadow.lg'),
            },
          },
          
          '&.btn-secondary': {
            background: 'white',
            color: theme('colors.primary.600'),
            border: `2px solid ${theme('colors.primary.600')}`,
            boxShadow: theme('boxShadow.sm'),
            
            '&:hover:not(:disabled)': {
              background: theme('colors.primary.600'),
              color: 'white',
              transform: 'translateY(-2px)',
              boxShadow: theme('boxShadow.md'),
            },
          },
        },
        
        '.card-revolutionary': {
          background: 'white',
          borderRadius: theme('borderRadius.xl'),
          boxShadow: theme('boxShadow.md'),
          border: `1px solid ${theme('colors.secondary.200')}`,
          overflow: 'hidden',
          transition: 'all 0.25s ease-in-out',
          position: 'relative',
          
          '&::before': {
            content: '""',
            position: 'absolute',
            top: '0',
            left: '0',
            right: '0',
            height: '4px',
            background: 'linear-gradient(135deg, #0066FF 0%, #00A3FF 100%)',
          },
          
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: theme('boxShadow.xl'),
          },
        },
        
        '.input-revolutionary': {
          width: '100%',
          padding: '0.75rem 1rem',
          border: `2px solid ${theme('colors.secondary.200')}`,
          borderRadius: theme('borderRadius.lg'),
          fontSize: '0.875rem',
          transition: 'all 0.25s ease-in-out',
          background: 'white',
          
          '&:focus': {
            outline: 'none',
            borderColor: theme('colors.primary.500'),
            boxShadow: '0 0 0 3px rgba(0, 102, 255, 0.1)',
            transform: 'translateY(-1px)',
          },
          
          '&::placeholder': {
            color: theme('colors.secondary.400'),
          },
        },
      })
    },
  ],
}0: '#7f1d1d',
        },
      },
    },
  },
  plugins: [],
}
   900: '#7f1d1d',
        },
      },
    },
  },
  plugins: [],
}