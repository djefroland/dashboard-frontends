// src/pages/attendance/components/AttendanceStats.tsx
import { Card, CardHeader, CardBody } from '@/components/ui'
import { CalendarDaysIcon } from '@heroicons/react/24/outline'

interface AttendanceStatsProps {
  weekStats: any
}

export function AttendanceStats({ weekStats }: AttendanceStatsProps) {
  if (!weekStats) return null

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center">
          <CalendarDaysIcon className="h-6 w-6 text-primary-600 mr-3" />
          <div>
            <h3 className="text-lg font-medium text-gray-900">Statistiques</h3>
            <p className="text-sm text-gray-500">Cette semaine</p>
          </div>
        </div>
      </CardHeader>

      <CardBody className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{weekStats.totalHours}h</div>
            <p className="text-sm text-gray-600">Heures travaillées</p>
          </div>
          
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{weekStats.daysPresent}/5</div>
            <p className="text-sm text-gray-600">Jours présents</p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Ponctualité</span>
            <span className="text-sm font-medium text-gray-900">{weekStats.punctualityRate}%</span>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-green-600 h-2 rounded-full" 
              style={{ width: `${weekStats.punctualityRate}%` }}
            />
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Heures supplémentaires</span>
            <span className="text-sm font-medium text-gray-900">{weekStats.overtimeHours}h</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Temps de pause</span>
            <span className="text-sm font-medium text-gray-900">{weekStats.breakTime}h</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Télétravail</span>
            <span className="text-sm font-medium text-gray-900">{weekStats.remoteDays} jours</span>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}