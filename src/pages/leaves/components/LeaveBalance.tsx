// src/pages/leaves/components/LeaveBalance.tsx
import { Card, CardHeader, CardBody, Badge } from '@/components/ui'
import { CalendarDaysIcon } from '@heroicons/react/24/outline'

export function LeaveBalance() {
  // Données simulées - à remplacer par un appel API
  const balance = {
    annualLeave: {
      entitled: 25,
      taken: 12,
      remaining: 13,
      pending: 3
    },
    rtt: {
      entitled: 12,
      taken: 5,
      remaining: 7,
      pending: 0
    },
    sickLeave: {
      taken: 2
    },
    other: {
      taken: 1
    }
  }

  const getProgressPercentage = (taken: number, entitled: number) => {
    return Math.round((taken / entitled) * 100)
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center">
          <CalendarDaysIcon className="h-6 w-6 text-primary-600 mr-3" />
          <div>
            <h3 className="text-lg font-medium text-gray-900">Mon solde de congés</h3>
            <p className="text-sm text-gray-500">Année {new Date().getFullYear()}</p>
          </div>
        </div>
      </CardHeader>

      <CardBody>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Congés payés */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <h4 className="text-sm font-medium text-gray-900">Congés payés</h4>
              <Badge variant="secondary">{balance.annualLeave.remaining} jours restants</Badge>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Acquis: {balance.annualLeave.entitled} jours</span>
                <span>Pris: {balance.annualLeave.taken} jours</span>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-blue-600 h-3 rounded-full relative"
                  style={{ width: `${getProgressPercentage(balance.annualLeave.taken, balance.annualLeave.entitled)}%` }}
                >
                  {balance.annualLeave.pending > 0 && (
                    <div 
                      className="absolute top-0 right-0 h-3 bg-yellow-400 rounded-full"
                      style={{ width: `${getProgressPercentage(balance.annualLeave.pending, balance.annualLeave.entitled)}%` }}
                    />
                  )}
                </div>
              </div>

              {balance.annualLeave.pending > 0 && (
                <p className="text-xs text-yellow-600">
                  {balance.annualLeave.pending} jours en attente d'approbation
                </p>
              )}
            </div>
          </div>

          {/* RTT */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <h4 className="text-sm font-medium text-gray-900">RTT</h4>
              <Badge variant="secondary">{balance.rtt.remaining} jours restants</Badge>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Acquis: {balance.rtt.entitled} jours</span>
                <span>Pris: {balance.rtt.taken} jours</span>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-green-600 h-3 rounded-full"
                  style={{ width: `${getProgressPercentage(balance.rtt.taken, balance.rtt.entitled)}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Autres congés */}
        <div className="mt-6 pt-6 border-t">
          <h4 className="text-sm font-medium text-gray-900 mb-3">Autres absences cette année</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Congés maladie:</span>
              <span className="font-medium">{balance.sickLeave.taken} jours</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Autres congés:</span>
              <span className="font-medium">{balance.other.taken} jours</span>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}