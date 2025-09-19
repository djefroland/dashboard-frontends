// src/components/ui/Table/Table.tsx
import { HTMLAttributes, ReactNode, useState } from 'react'
import { clsx } from 'clsx'
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/outline'

// Types pour les colonnes
export interface Column<T = any> {
  key: string
  title: string
  dataIndex?: keyof T
  render?: (value: any, record: T, index: number) => ReactNode
  sortable?: boolean
  width?: string | number
  align?: 'left' | 'center' | 'right'
  className?: string
}

// Types pour le tri
type SortDirection = 'asc' | 'desc' | null
interface SortConfig {
  key: string
  direction: SortDirection
}

// Props du composant Table
interface TableProps<T = any> extends Omit<HTMLAttributes<HTMLTableElement>, 'children'> {
  columns: Column<T>[]
  data: T[]
  loading?: boolean
  empty?: ReactNode
  bordered?: boolean
  striped?: boolean
  hoverable?: boolean
  compact?: boolean
  sortable?: boolean
  onSort?: (sortConfig: SortConfig) => void
  rowKey?: keyof T | ((record: T) => string | number)
  onRowClick?: (record: T, index: number) => void
  selectedRowKeys?: (string | number)[]
  onRowSelect?: (selectedKeys: (string | number)[]) => void
  selectable?: boolean
}

export function Table<T = any>({
  className,
  columns,
  data,
  loading = false,
  empty,
  bordered = false,
  striped = false,
  hoverable = true,
  compact = false,
  sortable = false,
  onSort,
  rowKey,
  onRowClick,
  selectedRowKeys = [],
  onRowSelect,
  selectable = false,
  ...props
}: TableProps<T>) {
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: '', direction: null })

  // Fonction pour obtenir la clé d'une ligne
  const getRowKey = (record: T, index: number): string | number => {
    if (typeof rowKey === 'function') {
      return rowKey(record)
    }
    if (rowKey && typeof rowKey === 'string') {
      return record[rowKey] as string | number || index
    }
    return index
  }

  // Fonction de tri
  const handleSort = (column: Column<T>) => {
    if (!column.sortable || !sortable) return

    let direction: SortDirection = 'asc'
    
    if (sortConfig.key === column.key) {
      if (sortConfig.direction === 'asc') {
        direction = 'desc'
      } else if (sortConfig.direction === 'desc') {
        direction = null
      }
    }

    const newSortConfig = { key: column.key, direction }
    setSortConfig(newSortConfig)
    onSort?.(newSortConfig)
  }

  // Fonction de sélection de ligne
  const handleRowSelect = (rowKey: string | number, checked: boolean) => {
    if (!onRowSelect) return

    const newSelectedKeys = checked
      ? [...selectedRowKeys, rowKey]
      : selectedRowKeys.filter(key => key !== rowKey)
    
    onRowSelect(newSelectedKeys)
  }

  // Sélection de toutes les lignes
  const handleSelectAll = (checked: boolean) => {
    if (!onRowSelect) return

    const allKeys = data.map((record, index) => getRowKey(record, index))
    onRowSelect(checked ? allKeys : [])
  }

  const isAllSelected = selectedRowKeys.length === data.length && data.length > 0
  const isIndeterminate = selectedRowKeys.length > 0 && selectedRowKeys.length < data.length

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="flex items-center space-x-3">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary-600"></div>
          <span className="text-gray-600">Chargement...</span>
        </div>
      </div>
    )
  }

  if (data.length === 0) {
    return (
      <div className="text-center py-12">
        {empty || (
          <div className="text-gray-500">
            <svg className="mx-auto h-12 w-12 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-gray-400">Aucun élément à afficher</p>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="overflow-hidden">
      <div className="overflow-x-auto">
        <table
          className={clsx(
            'min-w-full divide-y divide-gray-200',
            bordered && 'border border-gray-200',
            className
          )}
          {...props}
        >
          <thead className="bg-gray-50">
            <tr>
              {selectable && (
                <th className="w-4 px-6 py-3">
                  <input
                    type="checkbox"
                    checked={isAllSelected}
                    ref={input => {
                      if (input) input.indeterminate = isIndeterminate
                    }}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                </th>
              )}
              
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={clsx(
                    'px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider',
                    column.align === 'center' && 'text-center',
                    column.align === 'right' && 'text-right',
                    column.sortable && sortable && 'cursor-pointer hover:bg-gray-100 select-none',
                    column.className
                  )}
                  style={{ width: column.width }}
                  onClick={() => column.sortable && handleSort(column)}
                >
                  <div className={clsx(
                    'flex items-center',
                    column.align === 'center' && 'justify-center',
                    column.align === 'right' && 'justify-end'
                  )}>
                    <span>{column.title}</span>
                    
                    {column.sortable && sortable && (
                      <div className="ml-2 flex flex-col">
                        <ChevronUpIcon className={clsx(
                          'h-3 w-3',
                          sortConfig.key === column.key && sortConfig.direction === 'asc'
                            ? 'text-primary-600'
                            : 'text-gray-300'
                        )} />
                        <ChevronDownIcon className={clsx(
                          'h-3 w-3 -mt-1',
                          sortConfig.key === column.key && sortConfig.direction === 'desc'
                            ? 'text-primary-600'
                            : 'text-gray-300'
                        )} />
                      </div>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          
          <tbody className={clsx(
            'bg-white divide-y divide-gray-200',
            striped && '[&>tr:nth-child(odd)]:bg-gray-50'
          )}>
            {data.map((record, index) => {
              const key = getRowKey(record, index)
              const isSelected = selectedRowKeys.includes(key)
              
              return (
                <tr
                  key={key}
                  className={clsx(
                    hoverable && 'hover:bg-gray-50 transition-colors duration-150',
                    onRowClick && 'cursor-pointer',
                    isSelected && 'bg-primary-50',
                    compact ? 'h-12' : 'h-16'
                  )}
                  onClick={() => onRowClick?.(record, index)}
                >
                  {selectable && (
                    <td className="w-4 px-6 py-4">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={(e) => handleRowSelect(key, e.target.checked)}
                        onClick={(e) => e.stopPropagation()}
                        className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                    </td>
                  )}
                  
                  {columns.map((column) => {
                    const value = column.dataIndex ? record[column.dataIndex] : record
                    const cellContent = column.render 
                      ? column.render(value, record, index)
                      : String(value || '')

                    return (
                      <td
                        key={column.key}
                        className={clsx(
                          'px-6 py-4 whitespace-nowrap text-sm text-gray-900',
                          column.align === 'center' && 'text-center',
                          column.align === 'right' && 'text-right',
                          column.className
                        )}
                        style={{ width: column.width }}
                      >
                        {cellContent}
                      </td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}