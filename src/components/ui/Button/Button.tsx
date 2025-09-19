// src/components/ui/Button/Button.tsx
import { ButtonHTMLAttributes, forwardRef } from 'react'
import { clsx } from 'clsx'

type ButtonVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'ghost' | 'link'
type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  isLoading?: boolean
  loadingText?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  fullWidth?: boolean
}

const buttonVariants: Record<ButtonVariant, string> = {
  primary: 'bg-primary-600 hover:bg-primary-700 focus:ring-primary-500 text-white border-transparent',
  secondary: 'bg-white hover:bg-gray-50 focus:ring-primary-500 text-gray-700 border-gray-300',
  success: 'bg-success-600 hover:bg-success-700 focus:ring-success-500 text-white border-transparent',
  warning: 'bg-warning-600 hover:bg-warning-700 focus:ring-warning-500 text-white border-transparent',
  danger: 'bg-danger-600 hover:bg-danger-700 focus:ring-danger-500 text-white border-transparent',
  ghost: 'bg-transparent hover:bg-gray-100 focus:ring-primary-500 text-gray-700 border-transparent',
  link: 'bg-transparent hover:underline focus:ring-primary-500 text-primary-600 border-transparent p-0 h-auto'
}

const buttonSizes: Record<ButtonSize, string> = {
  xs: 'px-2.5 py-1.5 text-xs h-7',
  sm: 'px-3 py-2 text-sm h-9',
  md: 'px-4 py-2 text-sm h-10',
  lg: 'px-4 py-2 text-base h-11',
  xl: 'px-6 py-3 text-base h-12'
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  className,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  loadingText,
  leftIcon,
  rightIcon,
  fullWidth = false,
  disabled,
  children,
  ...props
}, ref) => {
  const isDisabled = disabled || isLoading

  return (
    <button
      ref={ref}
      className={clsx(
        // Base styles
        'inline-flex items-center justify-center rounded-lg border font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2',
        
        // Variant styles
        buttonVariants[variant],
        
        // Size styles (skip for link variant)
        variant !== 'link' && buttonSizes[size],
        
        // Full width
        fullWidth && 'w-full',
        
        // Disabled state
        isDisabled && 'opacity-50 cursor-not-allowed',
        
        // Custom className
        className
      )}
      disabled={isDisabled}
      {...props}
    >
      {isLoading && (
        <svg 
          className="animate-spin -ml-1 mr-2 h-4 w-4" 
          fill="none" 
          viewBox="0 0 24 24"
        >
          <circle 
            className="opacity-25" 
            cx="12" 
            cy="12" 
            r="10" 
            stroke="currentColor" 
            strokeWidth="4"
          />
          <path 
            className="opacity-75" 
            fill="currentColor" 
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      
      {!isLoading && leftIcon && (
        <span className="mr-2">{leftIcon}</span>
      )}
      
      {isLoading ? (loadingText || children) : children}
      
      {!isLoading && rightIcon && (
        <span className="ml-2">{rightIcon}</span>
      )}
    </button>
  )
})

Button.displayName = 'Button'