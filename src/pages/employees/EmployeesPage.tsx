// src/pages/employees/EmployeesPage.tsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PageHeader } from '@/components/layout'
import { Button, Card, Table, Input, Select, Badge, Loading, Pagination } from '@/components/ui'
import { PlusIcon, MagnifyingGlassIcon, FunnelIcon, UserIcon } from '@heroicons/react/24/outline'
import { EmployeeFilters } from './components/EmployeeFilters'
import { EmployeeModal } from './components/EmployeeModal'
import { 
  useEmployees, 
  type Employee, 
  getRoleDisplayName, 
  getContractTypeLabel, 
  getStatusLabel, 
  getStatusVariant 
} from './hooks/useEmployees'

type TableColumn<T> = {
  key: string
  title: string
  dataIndex?: keyof T
  width?: number
  sortable?: boolean
  render?: (value: any, record: T) => React.ReactNode
}

export default function EmployeesPage() {
  const navigate = useNavigate()
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  
  const {
    employees,
    isLoading,
    pagination,
    filters,
    updateFilters,
    refetch
  } = useEmployees()

  const columns: TableColumn<Employee>[] = [
    {
      key: 'avatar',
      title: '',
      width: 60,
      render: (_: any, record: Employee) => (
        <div className="flex-shrink-0 h-10 w-10">
          {record.avatar ? (
            <img
              className="h-10 w-10 rounded-full object-cover"
              src={record.avatar}
              alt={record.fullName}
            />
          ) : (
            <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
              <UserIcon className="h-6 w-6 text-gray-500" />
            </div>
          )}
        </div>
      )
    },
    {
      key: 'employee',
      title: 'Employé',
      dataIndex: 'fullName',
      sortable: true,
      render: (_: any, record: Employee) => (
        <div>
          <div className="font-medium text-gray-900">{record.fullName}</div>
          <div className="text-sm text-gray-500">#{record.employeeId}</div>
          <div className="text-sm text-gray-500">{record.email}</div>
        </div>
      )
    },
    {
      key: 'role',
      title: 'Rôle',
      dataIndex: 'role',
      render: (role: string) => <Badge variant="secondary">{getRoleDisplayName(role)}</Badge>
    },
    {
      key: 'department',
      title: 'Département',
      dataIndex: 'department'
    },
    {
      key: 'position',
      title: 'Poste',
      dataIndex: 'position'
    },
    {
      key: 'contractType',
      title: 'Contrat',
      dataIndex: 'contractType',
      render: (type: string) => <Badge variant="secondary">{getContractTypeLabel(type)}</Badge>
    },
    {
      key: 'status',
      title: 'Statut',
      dataIndex: 'status',
      render: (status: string) => (
        <Badge 
          variant={getStatusVariant(status)}
        >
          {getStatusLabel(status)}
        </Badge>
      )
    },
    {
      key: 'hireDate',
      title: 'Embauché le',
      dataIndex: 'hireDate',
      render: (date: string) => new Date(date).toLocaleDateString('fr-FR')
    },
    {
      key: 'actions',
      title: 'Actions',
      width: 100,
      render: (_: any, record: Employee) => (
        <div className="flex space-x-2">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => handleViewEmployee(record)}
          >
            Voir
          </Button>
        </div>
      )
    }
  ]

  const handleViewEmployee = (employee: Employee) => {
    setSelectedEmployee(employee)
    setIsModalOpen(true)
  }

  const handleCreateEmployee = () => {
    navigate('/employees/create')
  }

  if (isLoading && !employees.length) {
    return <Loading text="Chargement des employés..." />
  }

  return (
    <>
      <PageHeader
        title="Gestion des Employés"
        subtitle={`${pagination.total} employé${pagination.total > 1 ? 's' : ''}`}
        actions={
          <div className="flex space-x-3">
            <Button
              variant="secondary"
              leftIcon={<FunnelIcon className="h-4 w-4" />}
              onClick={() => setShowFilters(!showFilters)}
            >
              Filtres
            </Button>
            <Button
              variant="primary"
              leftIcon={<PlusIcon className="h-4 w-4" />}
              onClick={handleCreateEmployee}
            >
              Nouvel employé
            </Button>
          </div>
        }
      />

      <div className="space-y-6">
        {/* Barre de recherche et filtres */}
        <Card className="p-4">
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
              <div className="flex-1 max-w-lg">
                <Input
                  placeholder="Rechercher par nom, email ou ID..."
                  leftIcon={<MagnifyingGlassIcon className="h-5 w-5" />}
                  value={filters.search || ''}
                  onChange={(e) => updateFilters({ search: e.target.value })}
                />
              </div>

              <div className="flex space-x-3">
                <Select
                  placeholder="Département"
                  value={filters.department || ''}
                  onChange={(e) => updateFilters({ department: e.target.value || undefined })}
                  options={[
                    { value: '', label: 'Tous les départements' },
                    { value: 'IT', label: 'Informatique' },
                    { value: 'HR', label: 'Ressources Humaines' },
                    { value: 'MARKETING', label: 'Marketing' },
                    { value: 'SALES', label: 'Commercial' }
                  ]}
                />

                <Select
                  placeholder="Statut"
                  value={filters.status || ''}
                  onChange={(e) => updateFilters({ status: e.target.value || undefined })}
                  options={[
                    { value: '', label: 'Tous les statuts' },
                    { value: 'ACTIVE', label: 'Actif' },
                    { value: 'INACTIVE', label: 'Inactif' },
                    { value: 'ON_LEAVE', label: 'En congé' },
                    { value: 'TERMINATED', label: 'Terminé' }
                  ]}
                />
              </div>
            </div>

            {showFilters && (
              <EmployeeFilters
                filters={filters}
                onFiltersChange={updateFilters}
              />
            )}
          </div>
        </Card>

        {/* Tableau des employés */}
        <Card>
          <Table
            columns={columns}
            data={employees}
            loading={isLoading}
            rowKey="id"
            sortable
            onRowClick={handleViewEmployee}
            hoverable
          />

          <Pagination
            current={pagination.page}
            total={pagination.total}
            pageSize={pagination.pageSize}
            onChange={(page, size) => updateFilters({ page, pageSize: size })}
            showSizeChanger
          />
        </Card>
      </div>

      {/* Modal détails employé */}
      <EmployeeModal
        employee={selectedEmployee}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setSelectedEmployee(null)
        }}
        onUpdate={refetch}
      />
    </>
  )
}