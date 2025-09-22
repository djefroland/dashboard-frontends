// src/components/ui/Modal/Modal.tsx
import { ReactNode, useEffect } from 'react'
import { XMarkIcon } from '@heroicons/react/24/outline'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  showCloseButton?: boolean
  closeOnOverlayClick?: boolean
  footer?: ReactNode
}

export const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  showCloseButton = true,
  closeOnOverlayClick = true,
  footer
}: ModalProps) => {
  const sizeStyles: Record<string, React.CSSProperties> = {
    sm: { maxWidth: '384px' },
    md: { maxWidth: '512px' },
    lg: { maxWidth: '672px' },
    xl: { maxWidth: '896px' },
    full: { maxWidth: '1280px' }
  }

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && closeOnOverlayClick) {
      onClose()
    }
  }

  return (
    <>
      {/* Backdrop */}
      <div className="modal-backdrop" onClick={handleBackdropClick} />
      
      {/* Modal */}
      <div className="modal-container">
        <div className="modal-wrapper" onClick={handleBackdropClick}>
          <div 
            className="modal-panel" 
            style={sizeStyles[size]}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            {(title || showCloseButton) && (
              <div className="modal-header p-6">
                {title && (
                  <h2 className="modal-title">{title}</h2>
                )}
                
                {showCloseButton && (
                  <button onClick={onClose} className="modal-close-button">
                    <XMarkIcon className="h-5 w-5 text-gray-400" />
                  </button>
                )}
              </div>
            )}

            {/* Content */}
            <div className="p-6">
              {children}
            </div>

            {/* Footer */}
            {footer && (
              <div className="modal-footer p-6">
                {footer}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}