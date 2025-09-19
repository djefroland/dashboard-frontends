// src/components/ui/Form/Textarea.tsx
import { forwardRef, TextareaHTMLAttributes } from 'react'
import { clsx } from 'clsx'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  helperText?: string
  rows?: number
  resize?: boolean
  isInvalid?: boolean
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({
  className,
  label,
  error,
  helperText,
  rows = 4,
  resize = true,
  isInvalid,
  id,
  ...props
}, ref) => {
  const textareaId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`
  const hasError = Boolean(error) || isInvalid

  return (
    <div className="space-y-1">
      {label && (
        <label 
          htmlFor={textareaId}
          className="block text-sm font-medium text-gray-700"
        >
          {label}
          {props.required && <span className="text-danger-500 ml-1">*</span>}
        </label>
      )}
      
      <textarea
        ref={ref}
        id={textareaId}
        rows={rows}
        className={clsx(
          // Base styles
          'block w-full rounded-lg border shadow-sm transition-colors duration-200 sm:text-sm',
          'placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-0',
          'border-gray-300 focus:border-primary-500 focus:ring-primary-500',
          
          // Resize
          resize ? 'resize-y' : 'resize-none',
          
          // Error state
          hasError && 'border-danger-300 focus:border-danger-500 focus:ring-danger-500',
          
          // Disabled state
          props.disabled && 'bg-gray-50 text-gray-500 cursor-not-allowed',
          
          className
        )}
        {...props}
      />
      
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

Textarea.displayName = 'Textarea'