// src/pages/leaves/LeavesOverview.tsx
import { useNavigate } from 'react-router-dom'
import { PageHeader } from '@/components/layout'
import { Button } from '@/components/ui'
import { CheckCircleIcon, PlusIcon, ClockIcon, CalendarDaysIcon } from '@heroicons/react/24/outline'
import { LeaveBalance } from './components/LeaveBalance'
import { LeavesList } from './components/LeavesList'

export default function LeavesOverview() {
  const navigate = useNavigate()
  // TODO: Remplacer par la vérification des rôles appropriée une fois le store disponible
  const isManager = true // Temporaire

  return (
    <>
      <PageHeader
        title="Gestion des Congés"
        subtitle="Demandes, soldes et approbations"
        actions={
          <div className="flex space-x-3">
            {isManager && (
              <Button
                variant="secondary"
                leftIcon={<CheckCircleIcon className="h-4 w-4" />}
                onClick={() => navigate('/leaves/approval')}
              >
                Approbations
              </Button>
            )}
            <Button
              variant="primary"
              leftIcon={<PlusIcon className="h-4 w-4" />}
              onClick={() => navigate('/leaves/request')}
            >
              Nouvelle demande
            </Button>
          </div>
        }
      />

      <div className="space-y-8">
        {/* Solde de congés */}
        <LeaveBalance />

        {/* Statistiques rapides pour managers */}
        {isManager && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
              <div className="flex items-center">
                <ClockIcon className="h-8 w-8 text-yellow-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-yellow-900">En attente</p>
                  <p className="text-2xl font-bold text-yellow-700">7</p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 p-6 rounded-lg border border-green-200">
              <div className="flex items-center">
                <CheckCircleIcon className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-green-900">Approuvées</p>
                  <p className="text-2xl font-bold text-green-700">23</p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <div className="flex items-center">
                <CalendarDaysIcon className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-blue-900">À venir</p>
                  <p className="text-2xl font-bold text-blue-700">5</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Liste des demandes */}
        <LeavesList />
      </div>
    </>
  )
}