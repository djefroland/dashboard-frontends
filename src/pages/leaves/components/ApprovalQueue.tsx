// src/pages/leaves/components/ApprovalQueue.tsx
import { useState } from 'react'
import { PageHeader } from '@/components/layout'
import { Card, CardHeader, CardBody, Table, Badge, Button, Modal, Textarea } from '@/components/ui'
import { CheckIcon, XMarkIcon, EyeIcon } from '@heroicons/react/24/outline'
import { type TableColumn, getLeaveTypeLabel } from '../utils'

interface PendingLeaveRequest {
  id: number
  employeeName: string
  employeeId: string
  startDate: string
  endDate: string
  totalDays: number
  type: string
  reason: string
  status: string
  submittedDate: string
  requiresManagerApproval: boolean
  requiresHrApproval: boolean
  requiresDirectorApproval: boolean
}

export function ApprovalQueue() {
  const [selectedRequest, setSelectedRequest] = useState<PendingLeaveRequest | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [approvalComments, setApprovalComments] = useState('')

  // Données simulées de demandes en attente
  const pendingRequests: PendingLeaveRequest[] = [
    {
      id: 1,
      employeeName: 'Marie Dubois',
      employeeId: 'EMP001',
      startDate: '2024-02-20',
      endDate: '2024-02-24',
      totalDays: 5,
      type: 'ANNUAL_LEAVE',
      reason: 'Vacances familiales - voyage prévu depuis longtemps',
      status: 'PENDING',
      submittedDate: '2024-01-25',
      requiresManagerApproval: true,
      requiresHrApproval: true,
      requiresDirectorApproval: false
    },
    {
      id: 2,
      employeeName: 'Pierre Durand',
      employeeId: 'EMP002',
      startDate: '2024-03-01',
      endDate: '2024-03-01',
      totalDays: 1,
      type: 'RTT',
      reason: 'Rendez-vous médical',
      status: 'PENDING',
      submittedDate: '2024-01-26',
      requiresManagerApproval: true,
      requiresHrApproval: false,
      requiresDirectorApproval: false
    }
  ]

  const columns: TableColumn<PendingLeaveRequest>[] = [
    {
      key: 'employee',
      title: 'Employé',
      render: (_, record) => (
        <div>
          <div className="font-medium text-gray-900">{record.employeeName}</div>
          <div className="text-sm text-gray-500">#{record.employeeId}</div>
        </div>
      )
    },
    {
      key: 'period',
      title: 'Période',
      render: (_, record) => (
        <div>
          <div className="text-sm">
            {new Date(record.startDate).toLocaleDateString('fr-FR')}
            {record.startDate !== record.endDate && (
              <span> au {new Date(record.endDate).toLocaleDateString('fr-FR')}</span>
            )}
          </div>
          <div className="text-xs text-gray-500">{record.totalDays} jour{record.totalDays > 1 ? 's' : ''}</div>
        </div>
      )
    },
    {
      key: 'type',
      title: 'Type',
      dataIndex: 'type',
      render: (type) => (
        <Badge variant="secondary">{getLeaveTypeLabel(type)}</Badge>
      )
    },
    {
      key: 'reason',
      title: 'Motif',
      dataIndex: 'reason',
      render: (reason) => (
        <span className="text-sm text-gray-700 max-w-xs truncate block">
          {reason}
        </span>
      )
    },
    {
      key: 'submitted',
      title: 'Demandé le',
      dataIndex: 'submittedDate',
      render: (date) => (
        <span className="text-sm">
          {new Date(date).toLocaleDateString('fr-FR')}
        </span>
      )
    },
    {
      key: 'actions',
      title: 'Actions',
      width: 150,
      render: (_, record) => (
        <div className="flex space-x-1">
          <Button
            size="sm"
            variant="ghost"
            leftIcon={<EyeIcon className="h-3 w-3" />}
            onClick={() => handleViewRequest(record)}
          >
            Voir
          </Button>
          <Button
            size="sm"
            variant="success"
            leftIcon={<CheckIcon className="h-3 w-3" />}
            onClick={() => handleApprove(record)}
          >
            Approuver
          </Button>
          <Button
            size="sm"
            variant="danger"
            leftIcon={<XMarkIcon className="h-3 w-3" />}
            onClick={() => handleReject(record)}
          >
            Rejeter
          </Button>
        </div>
      )
    }
  ]

  const handleViewRequest = (request: PendingLeaveRequest) => {
    setSelectedRequest(request)
    setIsModalOpen(true)
  }

  const handleApprove = async (request: PendingLeaveRequest) => {
    // Logique d'approbation
    console.log('Approve request', request.id)
  }

  const handleReject = async (request: PendingLeaveRequest) => {
    // Logique de rejet
    console.log('Reject request', request.id)
  }

  return (
    <>
      <PageHeader
        title="File d'attente des approbations"
        subtitle={`${pendingRequests.length} demande${pendingRequests.length > 1 ? 's' : ''} en attente`}
      />

      <Card>
        <CardHeader>
          <h3 className="text-lg font-medium text-gray-900">
            Demandes nécessitant votre approbation
          </h3>
        </CardHeader>

        <CardBody>
          <Table
            columns={columns}
            data={pendingRequests}
            rowKey="id"
            compact
          />
        </CardBody>
      </Card>

      {/* Modal de détails */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={`Demande de ${selectedRequest?.employeeName}`}
        size="lg"
      >
        {selectedRequest && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Période:</span>
                <div className="font-medium">
                  Du {new Date(selectedRequest.startDate).toLocaleDateString('fr-FR')} 
                  au {new Date(selectedRequest.endDate).toLocaleDateString('fr-FR')}
                </div>
              </div>
              <div>
                <span className="text-gray-600">Durée:</span>
                <div className="font-medium">{selectedRequest.totalDays} jour{selectedRequest.totalDays > 1 ? 's' : ''}</div>
              </div>
              <div>
                <span className="text-gray-600">Type:</span>
                <div className="font-medium">{getLeaveTypeLabel(selectedRequest.type)}</div>
              </div>
              <div>
                <span className="text-gray-600">Soumis le:</span>
                <div className="font-medium">{new Date(selectedRequest.submittedDate).toLocaleDateString('fr-FR')}</div>
              </div>
            </div>

            <div>
              <span className="text-gray-600">Motif:</span>
              <div className="mt-1 p-3 bg-gray-50 rounded text-sm">
                {selectedRequest.reason}
              </div>
            </div>

            <Textarea
              label="Commentaires d'approbation (optionnel)"
              placeholder="Ajoutez vos commentaires..."
              value={approvalComments}
              onChange={(e) => setApprovalComments(e.target.value)}
              rows={3}
            />

            <div className="flex justify-end space-x-3">
              <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
                Fermer
              </Button>
              <Button 
                variant="danger" 
                leftIcon={<XMarkIcon className="h-4 w-4" />}
                onClick={() => handleReject(selectedRequest)}
              >
                Rejeter
              </Button>
              <Button 
                variant="success" 
                leftIcon={<CheckIcon className="h-4 w-4" />}
                onClick={() => handleApprove(selectedRequest)}
              >
                Approuver
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </>
  )
}

