// src/pages/attendance/components/TodayStatus.tsx
import { Card, Badge } from '@/components/ui'
import { 
  CheckCircleIcon, 
  ClockIcon, 
  ExclamationTriangleIcon,
  HomeIcon 
} from '@heroicons/react/24/outline'
import { getStatusLabel } from '../types.ts'

interface TodayStatusProps {
  currentStatus: any
  todayStats?: any
}

export function TodayStatus({ currentStatus }: TodayStatusProps) {
  const getStatusInfo = () => {
    if (!currentStatus?.clockIn) {
      return {
        icon: <ClockIcon className="h-8 w-8 text-gray-400" />,
        title: 'Pas encore pointé',
        description: 'Pointez votre arrivée pour commencer la journée',
        color: 'bg-gray-50'
      }
    }

    if (currentStatus.isOnBreak) {
      return {
        icon: <ExclamationTriangleIcon className="h-8 w-8 text-yellow-500" />,
        title: 'En pause',
        description: 'Pause commencée à ' + new Date(currentStatus.breakStart).toLocaleTimeString('fr-FR'),
        color: 'bg-yellow-50'
      }
    }

    if (currentStatus.clockOut) {
      return {
        icon: <CheckCircleIcon className="h-8 w-8 text-green-500" />,
        title: 'Journée terminée',
        description: 'Départ pointé à ' + new Date(currentStatus.clockOut).toLocaleTimeString('fr-FR'),
        color: 'bg-green-50'
      }
    }

    return {
      icon: <CheckCircleIcon className="h-8 w-8 text-blue-500" />,
      title: 'Au travail',
      description: 'Arrivée pointée à ' + new Date(currentStatus.clockIn).toLocaleTimeString('fr-FR'),
      color: 'bg-blue-50'
    }
  }

  const status = getStatusInfo()

  return (
    <Card className={`${status.color} border-0`}>
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {status.icon}
            <div>
              <h3 className="text-lg font-medium text-gray-900">{status.title}</h3>
              <p className="text-sm text-gray-600">{status.description}</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {currentStatus?.isRemote && (
              <Badge variant="primary" className="flex items-center">
                <HomeIcon className="h-3 w-3 mr-1" />
                Télétravail
              </Badge>
            )}
            
            {currentStatus?.status && (
              <Badge variant="secondary">
                {getStatusLabel(currentStatus.status)}
              </Badge>
            )}
          </div>
        </div>
      </div>
    </Card>
  )
}