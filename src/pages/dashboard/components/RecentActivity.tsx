// src/pages/dashboard/components/RecentActivity.tsx
import { Card, CardHeader, CardBody } from '@/components/ui'

export function RecentActivity() {
  const activities = [
    {
      id: 1,
      type: 'clock-in',
      user: 'Marie Dubois',
      message: 'a pointé son arrivée',
      time: '09:15',
      color: 'text-green-600'
    },
    {
      id: 2,
      type: 'leave-request',
      user: 'Jean Martin',
      message: 'a demandé un congé',
      time: '08:45',
      color: 'text-blue-600'
    },
    {
      id: 3,
      type: 'late',
      user: 'Sophie Leclerc',
      message: 'est en retard',
      time: '09:30',
      color: 'text-yellow-600'
    },
    {
      id: 4,
      type: 'clock-out',
      user: 'Pierre Durand',
      message: 'a pointé sa sortie',
      time: '17:45',
      color: 'text-gray-600'
    }
  ]

  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-medium text-gray-900">
          Activité récente
        </h3>
      </CardHeader>
      <CardBody>
        <div className="flow-root">
          <ul className="-my-5 divide-y divide-gray-200">
            {activities.map((activity) => (
              <li key={activity.id} className="py-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                      <span className="text-xs font-medium text-gray-600">
                        {activity.user[0]}
                      </span>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900">
                      <span className="font-medium">{activity.user}</span>
                      {' '}
                      <span className={activity.color}>{activity.message}</span>
                    </p>
                    <p className="text-sm text-gray-500">
                      {activity.time}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </CardBody>
    </Card>
  )
}