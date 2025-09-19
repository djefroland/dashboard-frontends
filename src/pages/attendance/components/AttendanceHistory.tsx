// src/pages/attendance/components/AttendanceHistory.tsx
import { useState } from 'react'
import { Card, CardHeader, CardBody, Table, Badge, Input, Select } from '@/components/ui'
import { CalendarDaysIcon } from '@heroicons/react/24/outline'
import { getStatusLabel, getStatusVariant } from '../types.ts'

type TableColumn<T> = {
  key: string
  title: string
  dataIndex?: keyof T
  render?: (value: any, record: T) => React.ReactNode
}

interface AttendanceRecord {
  id: number
  date: string
  clockIn: string | null
  clockOut: string | null
  breakTime: string
  totalHours: string
  status: string
  location: string
  isRemote: boolean
  notes?: string
}

export function AttendanceHistory() {
  const [dateFilter, setDateFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')

  // Données simulées
  const attendanceHistory: AttendanceRecord[] = [
    {
      id: 1,
      date: '2024-01-19',
      clockIn: '09:00',
      clockOut: '18:00',
      breakTime: '1h00',
      totalHours: '8h00',
      status: 'PRESENT',
      location: 'Bureau',
      isRemote: false
    },
    {
      id: 2,
      date: '2024-01-18',
      clockIn: '09:15',
      clockOut: '18:15',
      breakTime: '1h15',
      totalHours: '7h45',
      status: 'LATE',
      location: 'Bureau',
      isRemote: false,
      notes: 'Retard transport'
    },
    {
      id: 3,
      date: '2024-01-17',
      clockIn: '09:00',
      clockOut: '17:30',
      breakTime: '0h45',
      totalHours: '7h45',
      status: 'REMOTE',
      location: 'Domicile',
      isRemote: true
    }
  ]

  const columns: TableColumn<AttendanceRecord>[] = [
    {
      key: 'date',
      title: 'Date',
      dataIndex: 'date',
      render: (date: string) => new Date(date).toLocaleDateString('fr-FR', {
        weekday: 'short',
        day: '2-digit',
        month: '2-digit'
      })
    },
    {
      key: 'clockIn',
      title: 'Arrivée',
      dataIndex: 'clockIn',
      render: (time: string | null) => time || '-'
    },
    {
      key: 'clockOut',
      title: 'Départ',
      dataIndex: 'clockOut',
      render: (time: string | null) => time || '-'
    },
    {
      key: 'totalHours',
      title: 'Temps travaillé',
      dataIndex: 'totalHours'
    },
    {
      key: 'breakTime',
      title: 'Pause',
      dataIndex: 'breakTime'
    },
    {
      key: 'status',
      title: 'Statut',
      dataIndex: 'status',
      render: (status: string) => (
        <Badge variant={getStatusVariant(status)}>
          {getStatusLabel(status)}
        </Badge>
      )
    },
    {
      key: 'location',
      title: 'Lieu',
      dataIndex: 'location',
      render: (location: string, record: AttendanceRecord) => (
        <div className="flex items-center">
          <span>{location}</span>
          {record.isRemote && (
            <Badge variant="primary" size="sm" className="ml-2">Remote</Badge>
          )}
        </div>
      )
    },
    {
      key: 'notes',
      title: 'Notes',
      dataIndex: 'notes',
      render: (notes: string | undefined) => notes ? (
        <span className="text-sm text-gray-600 truncate">{notes}</span>
      ) : '-'
    }
  ]

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <CalendarDaysIcon className="h-6 w-6 text-primary-600 mr-3" />
            <div>
              <h3 className="text-lg font-medium text-gray-900">Historique des présences</h3>
              <p className="text-sm text-gray-500">Vos pointages des derniers jours</p>
            </div>
          </div>

          <div className="flex space-x-3">
            <Input
              placeholder="Filtrer par date"
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="w-40"
            />
            
            <Select
              placeholder="Statut"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              options={[
                { value: '', label: 'Tous' },
                { value: 'PRESENT', label: 'Présent' },
                { value: 'LATE', label: 'En retard' },
                { value: 'REMOTE', label: 'Télétravail' },
                { value: 'HALF_DAY', label: 'Demi-journée' }
              ]}
            />
          </div>
        </div>
      </CardHeader>

      <CardBody>
        <Table
          columns={columns}
          data={attendanceHistory}
          rowKey="id"
          compact
        />
      </CardBody>
    </Card>
  )
}