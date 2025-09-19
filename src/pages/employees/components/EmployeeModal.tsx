// src/pages/employees/components/EmployeeModal.tsx
import { Modal, Badge, Button } from '@/components/ui'
import { 
  UserIcon, 
  EnvelopeIcon, 
  PhoneIcon, 
  CalendarDaysIcon,
  BuildingOfficeIcon,
  PencilIcon
} from '@heroicons/react/24/outline'
import { 
  type Employee,
  getRoleDisplayName,
  getContractTypeLabel,
  getStatusLabel,
  getStatusVariant
} from '../hooks/useEmployees'

interface EmployeeModalProps {
  employee: Employee | null
  isOpen: boolean
  onClose: () => void
  onUpdate?: () => void
}

export function EmployeeModal({ employee, isOpen, onClose }: EmployeeModalProps) {
  if (!employee) return null

  const handleEdit = () => {
    // Navigation vers la page d'édition
    window.location.href = `/employees/${employee.id}/edit`
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Profil de ${employee.fullName}`}
      size="lg"
      footer={
        <div className="flex justify-end space-x-3">
          <Button variant="secondary" onClick={onClose}>
            Fermer
          </Button>
          <Button variant="primary" leftIcon={<PencilIcon className="h-4 w-4" />} onClick={handleEdit}>
            Modifier
          </Button>
        </div>
      }
    >
      <div className="space-y-6">
        {/* En-tête profil */}
        <div className="flex items-center space-x-4">
          <div className="h-16 w-16 rounded-full bg-gray-300 flex items-center justify-center">
            {employee.avatar ? (
              <img
                className="h-16 w-16 rounded-full object-cover"
                src={employee.avatar}
                alt={employee.fullName}
              />
            ) : (
              <UserIcon className="h-10 w-10 text-gray-500" />
            )}
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900">{employee.fullName}</h3>
            <p className="text-sm text-gray-500">#{employee.employeeId}</p>
            <div className="flex items-center space-x-2 mt-1">
              <Badge variant={getStatusVariant(employee.status)}>
                {getStatusLabel(employee.status)}
              </Badge>
              <Badge variant="secondary">
                {getRoleDisplayName(employee.role)}
              </Badge>
            </div>
          </div>
        </div>

        {/* Informations de contact */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-gray-900">Contact</h4>
            
            <div className="flex items-center space-x-3">
              <EnvelopeIcon className="h-5 w-5 text-gray-400" />
              <span className="text-sm text-gray-900">{employee.email}</span>
            </div>
            
            {employee.phone && (
              <div className="flex items-center space-x-3">
                <PhoneIcon className="h-5 w-5 text-gray-400" />
                <span className="text-sm text-gray-900">{employee.phone}</span>
              </div>
            )}
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-medium text-gray-900">Poste</h4>
            
            <div className="flex items-center space-x-3">
              <BuildingOfficeIcon className="h-5 w-5 text-gray-400" />
              <div>
                <div className="text-sm text-gray-900">{employee.position}</div>
                <div className="text-xs text-gray-500">{employee.department}</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <CalendarDaysIcon className="h-5 w-5 text-gray-400" />
              <div>
                <div className="text-sm text-gray-900">
                  Embauché le {new Date(employee.hireDate).toLocaleDateString('fr-FR')}
                </div>
                <div className="text-xs text-gray-500">
                  {getContractTypeLabel(employee.contractType)}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Manager */}
        {employee.manager && (
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-2">Manager</h4>
            <div className="text-sm text-gray-900">{employee.manager}</div>
          </div>
        )}
      </div>
    </Modal>
  )
}