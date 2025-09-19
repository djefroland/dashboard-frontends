// src/pages/leaves/components/LeavesList.tsx
import { useState } from 'react'
import { Card, CardHeader, CardBody, Table, Badge, Button, Select } from '@/components/ui'
import { EyeIcon } from '@heroicons/react/24/outline'
import { type TableColumn, getLeaveTypeLabel, getLeaveStatusLabel, getLeaveStatusVariant } from '../utils'

interface LeaveRequest {
  id: number
  startDate: string
  endDate: string
  totalDays: number
  type: string
  reason: string
  status: 'PENDING' | 'MANAGER_APPROVED' | 'HR_APPROVED' | 'APPROVED' | 'REJECTED' | 'CANCELLED'
  submittedDate: string
  approver?: string
  comments?: string
}

export function LeavesList() {
  const [statusFilter, setStatusFilter] = useState('')
  const [typeFilter, setTypeFilter] = useState('')

  // Données simulées
  const leaveRequests: LeaveRequest[] = [
    {
      id: 1,
      startDate: '2024-02-15',
      endDate: '2024-02-19',
      totalDays: 5,
      type: 'ANNUAL_LEAVE',
      reason: 'Vacances familiales',
      status: 'APPROVED',
      submittedDate: '2024-01-20',
      approver: 'Jean Martin'
    },
    {
      id: 2,
      startDate: '2024-03-10',
      endDate: '2024-03-10',
      totalDays: 1,
      type: 'RTT',
      reason: 'Pont du weekend',
      status: 'PENDING',
      submittedDate: '2024-01-19'
    },
    {
      id: 3,
      startDate: '2024-01-15',
      endDate: '2024-01-16',
      totalDays: 2,
      type: 'SICK_LEAVE',
      reason: 'Grippe',
      status: 'APPROVED',
      submittedDate: '2024-01-15',
      approver: 'Sophie Leclerc',
      comments: 'Certificat médical fourni'
    }
  ]

  const columns: TableColumn<LeaveRequest>[] = [
    {
      key: 'period',
      title: 'Période',
      render: (_: any, record: LeaveRequest) => (
        <div>
          <div className="font-medium text-gray-900">
            {new Date(record.startDate).toLocaleDateString('fr-FR')}
            {record.startDate !== record.endDate && (
              <span> au {new Date(record.endDate).toLocaleDateString('fr-FR')}</span>
            )}
          </div>
          <div className="text-sm text-gray-500">
            {record.totalDays} jour{record.totalDays > 1 ? 's' : ''}
          </div>
        </div>
      )
    },
    {
      key: 'type',
      title: 'Type',
      dataIndex: 'type',
      render: (type: string) => (
        <Badge variant="secondary">
          {getLeaveTypeLabel(type)}
        </Badge>
      )
    },
    {
      key: 'reason',
      title: 'Motif',
      dataIndex: 'reason',
      render: (reason: string) => (
        <span className="text-sm text-gray-700 max-w-xs truncate">
          {reason}
        </span>
      )
    },
    {
      key: 'status',
      title: 'Statut',
      dataIndex: 'status',
      render: (status: string) => (
        <Badge variant={getLeaveStatusVariant(status)}>
          {getLeaveStatusLabel(status)}
        </Badge>
      )
    },
    {
      key: 'submitted',
      title: 'Demandé le',
      dataIndex: 'submittedDate',
      render: (date: string) => new Date(date).toLocaleDateString('fr-FR')
    },
    {
      key: 'approver',
      title: 'Approbateur',
      dataIndex: 'approver',
      render: (approver: string | undefined) => approver || '-'
    },
    {
      key: 'actions',
      title: 'Actions',
      width: 100,
      render: (_: any, record: LeaveRequest) => (
        <Button
          size="sm"
          variant="ghost"
          leftIcon={<EyeIcon className="h-4 w-4" />}
          onClick={() => console.log('View details', record.id)}
        >
          Détails
        </Button>
      )
    }
  ]

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium text-gray-900">Mes demandes de congés</h3>
            <p className="text-sm text-gray-500">Historique de vos demandes</p>
          </div>

          <div className="flex space-x-3">
            <Select
              placeholder="Type"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              options={[
                { value: '', label: 'Tous types' },
                { value: 'ANNUAL_LEAVE', label: 'Congés payés' },
                { value: 'RTT', label: 'RTT' },
                { value: 'SICK_LEAVE', label: 'Maladie' },
                { value: 'FAMILY_EVENT', label: 'Événement familial' }
              ]}
            />

            <Select
              placeholder="Statut"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              options={[
                { value: '', label: 'Tous statuts' },
                { value: 'PENDING', label: 'En attente' },
                { value: 'APPROVED', label: 'Approuvé' },
                { value: 'REJECTED', label: 'Rejeté' }
              ]}
            />
          </div>
        </div>
      </CardHeader>

      <CardBody>
        <Table
          columns={columns}
          data={leaveRequests}
          rowKey="id"
          compact
        />
      </CardBody>
    </Card>
  )
}