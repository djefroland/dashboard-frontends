
import { HTMLAttributes, ReactNode } from 'react'

export interface Column<T = any> {
  key: string
  title: string
  dataIndex?: keyof T
  width?: string | number
  align?: 'left' | 'center' | 'right'
  sortable?: boolean
  className?: string
  render?: (value: any, record: T, index: number) => ReactNode
}



export interface TableProps<T = any> extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  columns: Column<T>[]
  data: T[]
  loading?: boolean
  striped?: boolean
  hoverable?: boolean
  sortable?: boolean
  selectable?: boolean
  selectedRowKeys?: string[]
  onSelectionChange?: (selectedRowKeys: string[]) => void
  rowKey?: keyof T | ((record: T, index: number) => string)
  onRowClick?: (record: T, index: number) => void
  compact?: boolean
  emptyText?: string
}

export function Table<T = any>({
  columns,
  data,
  loading = false,
  striped = false,
  hoverable = true,
  sortable = true,
  selectable = false,
  selectedRowKeys = [],
  onSelectionChange,
  rowKey,
  onRowClick,
  compact = false,
  emptyText = 'Aucune donn�e',
  className,
  ...props
}: TableProps<T>) {


  if (loading) {
    return (
      <div className="table-loading">
        <div className="table-loading-content">
          <div className="loading-spinner"></div>
          <span>Chargement...</span>
        </div>
      </div>
    )
  }

  if (data.length === 0) {
    return (
      <div className="table-loading">
        <div className="table-loading-content">
          <span>{emptyText}</span>
        </div>
      </div>
    )
  }

  return (
    <div className="table-container" {...props}>
      <table className="data-table">
        <thead className="table-header">
          <tr>
            {columns.map((column) => (
              <th key={column.key}>
                <span>{column.title}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="table-body">
          {data.map((record, index) => (
            <tr key={index}>
              {columns.map((column) => {
                const value = column.dataIndex ? record[column.dataIndex] : record
                const cellContent = column.render 
                  ? column.render(value, record, index)
                  : String(value || '')

                return (
                  <td key={column.key}>
                    {cellContent}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
