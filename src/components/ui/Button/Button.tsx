// src/components/ui/Button/Button.tsx - Version Révolutionnaire
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
  primary: 'bg-primary-gradient hover:shadow-lg hover:scale-105 focus:ring-primary-500 text-white border-transparent relative overflow-hidden group',
  secondary: 'bg-white hover:bg-primary-50 focus:ring-primary-500 text-primary-600 border-2 border-primary-600 hover:border-primary-700 hover:text-primary-700 relative overflow-hidden group',
  success: 'bg-success-gradient hover:shadow-lg hover:scale-105 focus:ring-success-500 text-white border-transparent relative overflow-hidden group',
  warning: 'bg-warning-gradient hover:shadow-lg hover:scale-105 focus:ring-warning-500 text-white border-transparent relative overflow-hidden group',
  danger: 'bg-danger-gradient hover:shadow-lg hover:scale-105 focus:ring-danger-500 text-white border-transparent relative overflow-hidden group',
  ghost: 'bg-transparent hover:bg-secondary-100 focus:ring-primary-500 text-secondary-700 border-transparent hover:text-primary-600 relative overflow-hidden group',
  link: 'bg-transparent hover:underline focus:ring-primary-500 text-primary-600 border-transparent p-0 h-auto hover:text-primary-700'
}

const buttonSizes: Record<ButtonSize, string> = {
  xs: 'px-3 py-1.5 text-xs h-7 rounded-lg',
  sm: 'px-4 py-2 text-sm h-9 rounded-xl',
  md: 'px-6 py-3 text-sm h-11 rounded-xl',
  lg: 'px-8 py-3 text-base h-12 rounded-2xl',
  xl: 'px-10 py-4 text-lg h-14 rounded-2xl'
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
        'inline-flex items-center justify-center gap-2 font-semibold font-display transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 transform-gpu',
        
        // Variant styles
        buttonVariants[variant],
        
        // Size styles (skip for link variant)
        variant !== 'link' && buttonSizes[size],
        
        // Full width
        fullWidth && 'w-full',
        
        // Disabled state
        isDisabled && 'opacity-60 cursor-not-allowed hover:scale-100 hover:shadow-none',
        
        // Custom className
        className
      )}
      disabled={isDisabled}
      {...props}
    >
      {/* Shimmer effect for gradient buttons */}
      {(variant === 'primary' || variant === 'success' || variant === 'warning' || variant === 'danger') && !isDisabled && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
      )}
      
      {/* Hover overlay for secondary button */}
      {variant === 'secondary' && !isDisabled && (
        <div className="absolute inset-0 bg-primary-gradient opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
      )}
      
      <div className="relative flex items-center justify-center gap-2">
        {isLoading && (
          <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent" />
        )}
        
        {!isLoading && leftIcon && leftIcon}
        
        <span>{isLoading ? (loadingText || children) : children}</span>
        
        {!isLoading && rightIcon && rightIcon}
      </div>
    </button>
  )
})

Button.displayName = 'Button'