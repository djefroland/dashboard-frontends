// src/components/ui/Table/Pagination.tsx
import { ReactNode } from 'react'

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
    <div className={`pagination-container ${className || ''}`}>
      {/* Info sur les éléments affichés */}
      <div className="pagination-info">
        {showTotal ? (
          <p className="pagination-total-text">
            {showTotal(total, [startItem, endItem])}
          </p>
        ) : (
          <p className="pagination-total-text">
            Affichage de <span className="font-semibold">{startItem}</span> à{' '}
            <span className="font-semibold">{endItem}</span> sur{' '}
            <span className="font-semibold">{total}</span> résultats
          </p>
        )}

        {showSizeChanger && (
          <div className="pagination-size-selector">
            <label className="pagination-select-label">Afficher :</label>
            <select
              value={pageSize}
              onChange={(e) => handlePageSizeChange(Number(e.target.value))}
              disabled={disabled}
              className="pagination-select"
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
        <div className="pagination-controls">
          {/* Bouton Précédent */}
          <button
            onClick={() => handlePageChange(current - 1)}
            disabled={current <= 1 || disabled}
            className={`pagination-button ${
              current <= 1 || disabled ? '' : ''
            }`}
          >
            Précédent
          </button>

          {/* Numéros de page */}
          <div className="pagination-buttons">
            {getPageNumbers().map((page, index) => (
              <button
                key={index}
                onClick={() => typeof page === 'number' && handlePageChange(page)}
                disabled={page === '...' || disabled}
                className={`pagination-button ${
                  page === current ? 'active' : ''
                } ${page === '...' ? 'ellipsis' : ''}`}
              >
                {page}
              </button>
            ))}
          </div>

          {/* Bouton Suivant */}
          <button
            onClick={() => handlePageChange(current + 1)}
            disabled={current >= totalPages || disabled}
            className="pagination-button"
          >
            Suivant
          </button>
        </div>
      )}
    </div>
  )
}