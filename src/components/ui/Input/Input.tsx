// src/components/ui/Input/Input.tsx - Version Révolutionnaire
import { InputHTMLAttributes, forwardRef, useState } from 'react'
import clsx from 'clsx'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  variant?: 'default' | 'filled' | 'glass'
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
  onFocus,
  onBlur,
  ...props
}, ref) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`
  const hasError = Boolean(error) || isInvalid
  const [isFocused, setIsFocused] = useState(false)

  const variantStyles = {
    default: 'border-2 border-secondary-200 bg-white focus:border-primary-500 focus:bg-white',
    filled: 'border-2 border-secondary-200 bg-secondary-50 focus:bg-white focus:border-primary-500',
    glass: 'border-2 border-white/40 bg-white/80 backdrop-blur-sm focus:bg-white focus:border-primary-500'
  }

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true)
    onFocus?.(e)
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false)
    onBlur?.(e)
  }

  return (
    <div className="space-y-2">
      {label && (
        <label 
          htmlFor={inputId}
          className={clsx(
            'block text-sm font-semibold transition-colors duration-300',
            isFocused ? 'text-primary-600' : 'text-secondary-700'
          )}
        >
          {label}
          {props.required && <span className="text-danger-500 ml-1">*</span>}
        </label>
      )}
      
      <div className={clsx(
        'relative transition-all duration-300',
        isFocused ? 'scale-105' : ''
      )}>
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <span className={clsx(
              'transition-colors duration-300',
              isFocused ? 'text-primary-500' : hasError ? 'text-danger-400' : 'text-secondary-400'
            )}>
              {leftIcon}
            </span>
          </div>
        )}
        
        <input
          ref={ref}
          id={inputId}
          className={clsx(
            // Base styles
            'block w-full rounded-2xl shadow-sm transition-all duration-300 sm:text-sm font-medium',
            'placeholder-secondary-400 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-primary-500/30',
            
            // Variant styles
            variantStyles[variant],
            
            // Icon padding
            leftIcon && 'pl-12',
            rightIcon && 'pr-12',
            !leftIcon && !rightIcon && 'px-4 py-3',
            (leftIcon || rightIcon) && 'py-3',
            
            // Error state
            hasError && 'border-danger-300 focus:border-danger-500 focus:ring-danger-500/30 bg-danger-50/50',
            
            // Disabled state
            props.disabled && 'bg-secondary-100 text-secondary-500 cursor-not-allowed opacity-60',
            
            className
          )}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        />
        
        {rightIcon && (
          <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
            <span className={clsx(
              'transition-colors duration-300',
              isFocused ? 'text-primary-500' : hasError ? 'text-danger-400' : 'text-secondary-400'
            )}>
              {rightIcon}
            </span>
          </div>
        )}
      </div>
      
      {(error || helperText) && (
        <p className={clsx(
          'text-sm font-medium transition-colors duration-300',
          error ? 'text-danger-600' : 'text-secondary-500'
        )}>
          {error || helperText}
        </p>
      )}
    </div>
  )
})

Input.displayName = 'Input'