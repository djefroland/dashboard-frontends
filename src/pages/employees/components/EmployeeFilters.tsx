// src/pages/employees/components/EmployeeFilters.tsx
import { FormGroup, Select, Input, Button } from '@/components/ui'

interface EmployeeFiltersProps {
  filters: Record<string, any>
  onFiltersChange: (filters: Record<string, any>) => void
}

export function EmployeeFilters({ filters, onFiltersChange }: EmployeeFiltersProps) {
  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <h4 className="text-sm font-medium text-gray-900 mb-4">Filtres avancés</h4>
      
      <FormGroup direction="row" spacing="md">
        <div className="flex-1">
          <Select
            label="Type de contrat"
            value={filters.contractType || ''}
            onChange={(e) => onFiltersChange({ contractType: e.target.value || undefined })}
            options={[
              { value: '', label: 'Tous les contrats' },
              { value: 'CDI', label: 'CDI' },
              { value: 'CDD', label: 'CDD' },
              { value: 'STAGE', label: 'Stage' },
              { value: 'ALTERNANCE', label: 'Alternance' }
            ]}
          />
        </div>

        <div className="flex-1">
          <Select
            label="Rôle"
            value={filters.role || ''}
            onChange={(e) => onFiltersChange({ role: e.target.value || undefined })}
            options={[
              { value: '', label: 'Tous les rôles' },
              { value: 'DIRECTOR', label: 'Directeur' },
              { value: 'HR', label: 'RH' },
              { value: 'TEAM_LEADER', label: 'Team Leader' },
              { value: 'EMPLOYEE', label: 'Employé' },
              { value: 'INTERN', label: 'Stagiaire' }
            ]}
          />
        </div>

        <div className="flex-1">
          <Input
            label="Date d'embauche après"
            type="date"
            value={filters.hireDate || ''}
            onChange={(e) => onFiltersChange({ hireDate: e.target.value || undefined })}
          />
        </div>
      </FormGroup>

      <div className="mt-4 flex justify-end space-x-3">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => onFiltersChange({})}
        >
          Réinitialiser
        </Button>
      </div>
    </div>
  )
}