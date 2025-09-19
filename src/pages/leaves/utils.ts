// src/pages/leaves/utils.ts

// Utilitaires pour les types de congés
export function getLeaveTypeLabel(type: string): string {
  const typeMap: Record<string, string> = {
    ANNUAL_LEAVE: 'Congés payés',
    RTT: 'RTT',
    SICK_LEAVE: 'Maladie',
    FAMILY_EVENT: 'Événement familial',
    MATERNITY_LEAVE: 'Maternité',
    PATERNITY_LEAVE: 'Paternité',
    UNPAID_LEAVE: 'Sans solde',
    OTHER: 'Autre'
  }
  return typeMap[type] || type
}

// Utilitaires pour les statuts de congés
export function getLeaveStatusLabel(status: string): string {
  const statusMap: Record<string, string> = {
    PENDING: 'En attente',
    MANAGER_APPROVED: 'Approuvé manager',
    HR_APPROVED: 'Approuvé RH',
    APPROVED: 'Approuvé',
    REJECTED: 'Rejeté',
    CANCELLED: 'Annulé'
  }
  return statusMap[status] || status
}

export function getLeaveStatusVariant(status: string): 'success' | 'warning' | 'danger' | 'primary' | 'secondary' {
  const variantMap: Record<string, 'success' | 'warning' | 'danger' | 'primary' | 'secondary'> = {
    PENDING: 'warning',
    MANAGER_APPROVED: 'primary',
    HR_APPROVED: 'primary',
    APPROVED: 'success',
    REJECTED: 'danger',
    CANCELLED: 'secondary'
  }
  return variantMap[status] || 'secondary'
}

// Type pour les colonnes de table
export type TableColumn<T> = {
  key: string
  title: string
  dataIndex?: keyof T
  width?: number
  render?: (value: any, record: T) => React.ReactNode
}