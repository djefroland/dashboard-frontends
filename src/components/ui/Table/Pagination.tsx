// src/components/ui/Table/Pagination.tsx
import { ReactNode } from 'react'
import { clsx } from 'clsx'

interface PaginationProps {
  current: number
  total: number
  pageSize: number
  onChange: (page: number, size: number) => void
  showSizeChanger?: boolean
  showTotal?: (total: number, range: [number, number]) => ReactNode
  pageSizeOptions?: string[]
  disabled?: boolean
  className?: string
}

export const Pagination = ({
  current,
  total,
  pageSize,
  onChange,
  showSizeChanger = true,
  showTotal,
  pageSizeOptions = ['10', '20', '50', '100'],
  disabled = false,
  className
}: PaginationProps) => {
  const totalPages = Math.ceil(total / pageSize)
  const startItem = (current - 1) * pageSize + 1
  const endItem = Math.min(current * pageSize, total)

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages || disabled) return
    onChange(page, pageSize)
  }

  const handlePageSizeChange = (size: number) => {
    if (disabled) return
    const newPage = Math.min(current, Math.ceil(total / size))
    onChange(newPage, size)
  }

  // Générer les numéros de page à afficher
  const getPageNumbers = () => {
    const pages: (number | string)[] = []
    const showPages = 7 // Nombre maximum de pages à afficher

    if (totalPages <= showPages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      pages.push(1)

      if (current <= 4) {
        for (let i = 2; i <= 5; i++) {
          pages.push(i)
        }
        pages.push('...')
        pages.push(totalPages)
      } else if (current >= totalPages - 3) {
        pages.push('...')
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i)
        }
      } else {
        pages.push('...')
        for (let i = current - 1; i <= current + 1; i++) {
          pages.push(i)
        }
        pages.push('...')
        pages.push(totalPages)
      }
    }

    return pages
  }

  if (totalPages <= 1 && !showSizeChanger) {
    return null
  }

  return (
    <div className={clsx(
      'flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200',
      className
    )}>
      {/* Info sur les éléments affichés */}
      <div className="flex items-center space-x-4">
        {showTotal ? (
          <p className="text-sm text-gray-700">
            {showTotal(total, [startItem, endItem])}
          </p>
        ) : (
          <p className="text-sm text-gray-700">
            Affichage de <span className="font-medium">{startItem}</span> à{' '}
            <span className="font-medium">{endItem}</span> sur{' '}
            <span className="font-medium">{total}</span> résultats
          </p>
        )}

        {showSizeChanger && (
          <div className="flex items-center space-x-2">
            <label className="text-sm text-gray-700">Afficher :</label>
            <select
              value={pageSize}
              onChange={(e) => handlePageSizeChange(Number(e.target.value))}
              disabled={disabled}
              className="rounded border-gray-300 text-sm focus:border-primary-500 focus:ring-primary-500 disabled:opacity-50"
            >
              {pageSizeOptions.map(size => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Navigation des pages */}
      {totalPages > 1 && (
        <div className="flex items-center space-x-2">
          {/* Bouton Précédent */}
          <button
            onClick={() => handlePageChange(current - 1)}
            disabled={current <= 1 || disabled}
            className={clsx(
              'px-3 py-1 rounded border text-sm font-medium transition-colors',
              current <= 1 || disabled
                ? 'text-gray-400 border-gray-200 cursor-not-allowed'
                : 'text-gray-700 border-gray-300 hover:bg-gray-50'
            )}
          >
            Précédent
          </button>

          {/* Numéros de page */}
          <div className="flex items-center space-x-1">
            {getPageNumbers().map((page, index) => (
              <button
                key={index}
                onClick={() => typeof page === 'number' && handlePageChange(page)}
                disabled={page === '...' || disabled}
                className={clsx(
                  'w-8 h-8 rounded text-sm font-medium transition-colors',
                  page === current
                    ? 'bg-primary-600 text-white'
                    : page === '...'
                    ? 'text-gray-400 cursor-default'
                    : 'text-gray-700 hover:bg-gray-50',
                  disabled && 'opacity-50'
                )}
              >
                {page}
              </button>
            ))}
          </div>

          {/* Bouton Suivant */}
          <button
            onClick={() => handlePageChange(current + 1)}
            disabled={current >= totalPages || disabled}
            className={clsx(
              'px-3 py-1 rounded border text-sm font-medium transition-colors',
              current >= totalPages || disabled
                ? 'text-gray-400 border-gray-200 cursor-not-allowed'
                : 'text-gray-700 border-gray-300 hover:bg-gray-50'
            )}
          >
            Suivant
          </button>
        </div>
      )}
    </div>
  )
}