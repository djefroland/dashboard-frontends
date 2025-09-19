// src/pages/employees/hooks/useEmployees.ts
import { useState, useEffect } from 'react'

export interface Employee {
  id: number
  employeeId: string
  firstName: string
  lastName: string
  fullName: string
  email: string
  phone?: string
  role: 'DIRECTOR' | 'HR' | 'TEAM_LEADER' | 'EMPLOYEE' | 'INTERN'
  department: string
  position: string
  contractType: 'CDI' | 'CDD' | 'STAGE' | 'ALTERNANCE'
  status: 'ACTIVE' | 'INACTIVE' | 'ON_LEAVE' | 'TERMINATED'
  hireDate: string
  manager?: string
  avatar?: string
}

export function useEmployees() {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 20,
    total: 0
  })
  const [filters, setFilters] = useState<Record<string, any>>({})

  // Données simulées
  const mockEmployees: Employee[] = [
    {
      id: 1,
      employeeId: 'EMP001',
      firstName: 'Marie',
      lastName: 'Dubois',
      fullName: 'Marie Dubois',
      email: 'marie.dubois@company.com',
      phone: '06 12 34 56 78',
      role: 'EMPLOYEE',
      department: 'Informatique',
      position: 'Développeuse Senior',
      contractType: 'CDI',
      status: 'ACTIVE',
      hireDate: '2023-01-15',
      manager: 'Jean Martin'
    },
    {
      id: 2,
      employeeId: 'EMP002',
      firstName: 'Pierre',
      lastName: 'Durand',
      fullName: 'Pierre Durand',
      email: 'pierre.durand@company.com',
      role: 'TEAM_LEADER',
      department: 'Marketing',
      position: 'Chef de projet Marketing',
      contractType: 'CDI',
      status: 'ACTIVE',
      hireDate: '2022-03-20',
      manager: 'Sophie Leclerc'
    },
    {
      id: 3,
      employeeId: 'STG001',
      firstName: 'Julie',
      lastName: 'Moreau',
      fullName: 'Julie Moreau',
      email: 'julie.moreau@company.com',
      role: 'INTERN',
      department: 'Informatique',
      position: 'Stagiaire Développement',
      contractType: 'STAGE',
      status: 'ACTIVE',
      hireDate: '2024-09-01',
      manager: 'Marie Dubois'
    }
  ]

  useEffect(() => {
    const fetchEmployees = async () => {
      setIsLoading(true)
      
      // Simulation API call
      await new Promise(resolve => setTimeout(resolve, 800))
      
      setEmployees(mockEmployees)
      setPagination(prev => ({ ...prev, total: mockEmployees.length }))
      setIsLoading(false)
    }

    fetchEmployees()
  }, [filters])

  const updateFilters = (newFilters: Record<string, any>) => {
    setFilters(prev => ({ ...prev, ...newFilters }))
  }

  const refetch = () => {
    // Recharger les données
    setFilters(prev => ({ ...prev }))
  }

  return {
    employees,
    isLoading,
    pagination,
    filters,
    updateFilters,
    refetch
  }
}

// Utilitaires pour l'affichage
export function getRoleDisplayName(role: string): string {
  const roleMap: Record<string, string> = {
    DIRECTOR: 'Directeur',
    HR: 'RH',
    TEAM_LEADER: 'Team Leader',
    EMPLOYEE: 'Employé',
    INTERN: 'Stagiaire'
  }
  return roleMap[role] || role
}

export function getContractTypeLabel(type: string): string {
  const typeMap: Record<string, string> = {
    CDI: 'CDI',
    CDD: 'CDD',
    STAGE: 'Stage',
    ALTERNANCE: 'Alternance'
  }
  return typeMap[type] || type
}

export function getStatusLabel(status: string): string {
  const statusMap: Record<string, string> = {
    ACTIVE: 'Actif',
    INACTIVE: 'Inactif',
    ON_LEAVE: 'En congé',
    TERMINATED: 'Terminé'
  }
  return statusMap[status] || status
}

export function getStatusVariant(status: string): 'success' | 'warning' | 'danger' | 'secondary' {
  const variantMap: Record<string, 'success' | 'warning' | 'danger' | 'secondary'> = {
    ACTIVE: 'success',
    INACTIVE: 'secondary',
    ON_LEAVE: 'warning',
    TERMINATED: 'danger'
  }
  return variantMap[status] || 'secondary'
}