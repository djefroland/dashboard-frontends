// src/pages/attendance/types.ts
export interface AttendanceStatus {
  id: number
  clockIn: string | null
  clockOut: string | null
  breakStart: string | null
  breakEnd: string | null
  isOnBreak: boolean
  status: 'PRESENT' | 'LATE' | 'REMOTE' | 'HALF_DAY' | 'TRAINING' | 'BUSINESS_TRIP'
  location: string
  isRemote: boolean
  notes?: string | undefined
}

// Utilitaires
export function getStatusLabel(status: string): string {
  const statusMap: Record<string, string> = {
    PRESENT: 'Présent',
    LATE: 'En retard',
    REMOTE: 'Télétravail',
    HALF_DAY: 'Demi-journée',
    TRAINING: 'Formation',
    BUSINESS_TRIP: 'Déplacement'
  }
  return statusMap[status] || status
}

export function getStatusVariant(status: string): 'success' | 'warning' | 'primary' | 'secondary' {
  const variantMap: Record<string, 'success' | 'warning' | 'primary' | 'secondary'> = {
    PRESENT: 'success',
    LATE: 'warning',
    REMOTE: 'primary',
    HALF_DAY: 'secondary',
    TRAINING: 'secondary',
    BUSINESS_TRIP: 'secondary'
  }
  return variantMap[status] || 'secondary'
}