// src/pages/dashboard/components/QuickActions.tsx
import { Button } from '@/components/ui'
import { UserRole } from '@/types/auth.types'
import { 
  ClockIcon,
  CalendarDaysIcon,
  DocumentChartBarIcon,
  PlusIcon
} from '@heroicons/react/24/outline'

interface QuickActionsProps {
  userRole?: UserRole
}

export function QuickActions({ userRole }: QuickActionsProps) {
  const getQuickActions = () => {
    const commonActions = [
      {
        label: 'Pointer',
        icon: <ClockIcon className="h-5 w-5" />,
        href: '/attendance',
        variant: 'primary' as const
      },
      {
        label: 'Demander un congé',
        icon: <CalendarDaysIcon className="h-5 w-5" />,
        href: '/leaves/request',
        variant: 'secondary' as const
      }
    ]

    const managerActions = [
      {
        label: 'Ajouter employé',
        icon: <PlusIcon className="h-5 w-5" />,
        href: '/employees/create',
        variant: 'success' as const
      },
      {
        label: 'Générer rapport',
        icon: <DocumentChartBarIcon className="h-5 w-5" />,
        href: '/reports/create',
        variant: 'secondary' as const
      }
    ]

    if (userRole === UserRole.DIRECTOR || userRole === UserRole.HR) {
      return [...commonActions, ...managerActions]
    }

    if (userRole === UserRole.TEAM_LEADER) {
      return [...commonActions, managerActions[1]]
    }

    return commonActions
  }

  const actions = getQuickActions()

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">
        Actions rapides
      </h3>
      <div className="flex flex-wrap gap-3">
        {actions.map((action) => (
          <Button
            key={action.label}
            variant={action.variant}
            leftIcon={action.icon}
            onClick={() => window.location.href = action.href}
          >
            {action.label}
          </Button>
        ))}
      </div>
    </div>
  )
}