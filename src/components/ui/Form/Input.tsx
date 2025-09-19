// src/components/ui/Form/Input.tsx
import { InputHTMLAttributes, forwardRef } from 'react'
import { clsx } from 'clsx'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  variant?: 'default' | 'filled' | 'flushed'
  isInvalid?: boolean
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  className,
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  variant = 'default',
  isInvalid,
  id,
  ...props
}, ref) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`
  const hasError = Boolean(error) || isInvalid

  const variantStyles = {
    default: 'border-gray-300 focus:border-primary-500 focus:ring-primary-500',
    filled: 'border-gray-200 bg-gray-50 focus:bg-white focus:border-primary-500 focus:ring-primary-500',
    flushed: 'border-0 border-b-2 border-gray-300 rounded-none focus:border-primary-500 focus:ring-0 px-0'
  }

  return (
    <div className="space-y-1">
      {label && (
        <label 
          htmlFor={inputId}
          className="block text-sm font-medium text-gray-700"
        >
          {label}
          {props.required && <span className="text-danger-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-400">{leftIcon}</span>
          </div>
        )}
        
        <input
          ref={ref}
          id={inputId}
          className={clsx(
            // Base styles
            'block w-full rounded-lg shadow-sm transition-colors duration-200 sm:text-sm',
            'placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-0',
            
            // Variant styles
            variantStyles[variant],
            
            // Icon padding
            leftIcon && 'pl-10',
            rightIcon && 'pr-10',
            
            // Error state
            hasError && 'border-danger-300 focus:border-danger-500 focus:ring-danger-500',
            
            // Disabled state
            props.disabled && 'bg-gray-50 text-gray-500 cursor-not-allowed',
            
            className
          )}
          {...props}
        />
        
        {rightIcon && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <span className="text-gray-400">{rightIcon}</span>
          </div>
        )}
      </div>
      
      {(error || helperText) && (
        <p className={clsx(
          'text-sm',
          error ? 'text-danger-600' : 'text-gray-500'
        )}>
          {error || helperText}
        </p>
      )}
    </div>
  )
})

Input.displayName = 'Input'