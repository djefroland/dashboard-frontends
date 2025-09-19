// src/pages/leaves/components/LeaveRequestForm.tsx
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useNavigate } from 'react-router-dom'
import { PageHeader } from '@/components/layout'
import { Card, CardHeader, CardBody, Button, Input, Select, Textarea, Alert } from '@/components/ui'
import { CalendarDaysIcon, ArrowLeftIcon } from '@heroicons/react/24/outline'
import { toast } from 'react-hot-toast'

const leaveRequestSchema = z.object({
  leaveType: z.string().min(1, 'Le type de congé est requis'),
  startDate: z.string().min(1, 'La date de début est requise'),
  endDate: z.string().min(1, 'La date de fin est requise'),
  reason: z.string().min(10, 'Veuillez préciser le motif (min. 10 caractères)'),
  emergencyContact: z.string().optional(),
  replacementPerson: z.string().optional(),
  handoverNotes: z.string().optional(),
  isUrgent: z.boolean().optional()
}).refine((data) => new Date(data.endDate) >= new Date(data.startDate), {
  message: 'La date de fin doit être postérieure à la date de début',
  path: ['endDate']
})

type LeaveRequestFormData = z.infer<typeof leaveRequestSchema>

export function LeaveRequestForm() {
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [calculatedDays, setCalculatedDays] = useState(0)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<LeaveRequestFormData>({
    resolver: zodResolver(leaveRequestSchema)
  })

  const startDate = watch('startDate')
  const endDate = watch('endDate')

  // Calculer le nombre de jours
  useEffect(() => {
    if (startDate && endDate) {
      const start = new Date(startDate)
      const end = new Date(endDate)
      const diffTime = Math.abs(end.getTime() - start.getTime())
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1
      
      // Exclure les weekends (approximation)
      const workingDays = Math.max(1, Math.round(diffDays * 5/7))
      setCalculatedDays(workingDays)
    }
  }, [startDate, endDate])

  const onSubmit = async (data: LeaveRequestFormData) => {
    setIsSubmitting(true)
    
    try {
      // Simulation API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      console.log('Demande de congé:', { ...data, totalDays: calculatedDays })
      
      toast.success('Demande de congé soumise avec succès!')
      navigate('/leaves')
    } catch (error) {
      toast.error('Erreur lors de la soumission')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <PageHeader
        title="Nouvelle demande de congé"
        actions={
          <Button
            variant="secondary"
            leftIcon={<ArrowLeftIcon className="h-4 w-4" />}
            onClick={() => navigate('/leaves')}
          >
            Retour
          </Button>
        }
      />

      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <div className="flex items-center">
              <CalendarDaysIcon className="h-6 w-6 text-primary-600 mr-3" />
              <div>
                <h3 className="text-lg font-medium text-gray-900">Formulaire de demande</h3>
                <p className="text-sm text-gray-500">Remplissez tous les champs requis</p>
              </div>
            </div>
          </CardHeader>

          <CardBody>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Type de congé */}
              <Select
                label="Type de congé"
                {...(errors.leaveType?.message ? { error: errors.leaveType.message } : {})}
                required
                {...register('leaveType')}
                options={[
                  { value: '', label: 'Sélectionnez un type', disabled: true },
                  { value: 'ANNUAL_LEAVE', label: 'Congés payés' },
                  { value: 'RTT', label: 'RTT' },
                  { value: 'SICK_LEAVE', label: 'Congé maladie' },
                  { value: 'FAMILY_EVENT', label: 'Événement familial' },
                  { value: 'MATERNITY_LEAVE', label: 'Congé maternité' },
                  { value: 'PATERNITY_LEAVE', label: 'Congé paternité' },
                  { value: 'UNPAID_LEAVE', label: 'Congé sans solde' },
                  { value: 'OTHER', label: 'Autre' }
                ]}
              />

              {/* Période */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Date de début"
                  type="date"
                  required
                  {...(errors.startDate?.message ? { error: errors.startDate.message } : {})}
                  min={new Date().toISOString().split('T')[0]}
                  {...register('startDate')}
                />

                <Input
                  label="Date de fin"
                  type="date"
                  required
                  {...(errors.endDate?.message ? { error: errors.endDate.message } : {})}
                  min={startDate}
                  {...register('endDate')}
                />
              </div>

              {/* Durée calculée */}
              {calculatedDays > 0 && (
                <Alert variant="info">
                  <strong>Durée estimée:</strong> {calculatedDays} jour{calculatedDays > 1 ? 's' : ''} ouvré{calculatedDays > 1 ? 's' : ''}
                  <br />
                  <small>Date de retour prévue: {endDate ? new Date(new Date(endDate).getTime() + 24*60*60*1000).toLocaleDateString('fr-FR') : '-'}</small>
                </Alert>
              )}

              {/* Motif */}
              <Textarea
                label="Motif de la demande"
                placeholder="Expliquez brièvement la raison de votre demande..."
                required
                rows={3}
                {...(errors.reason?.message ? { error: errors.reason.message } : {})}
                {...register('reason')}
              />

              {/* Contact d'urgence */}
              <Input
                label="Contact d'urgence (optionnel)"
                placeholder="Nom et téléphone de la personne à contacter"
                {...register('emergencyContact')}
              />

              {/* Remplaçant */}
              <Input
                label="Personne de remplacement (optionnel)"
                placeholder="Nom du collègue qui vous remplacera"
                {...register('replacementPerson')}
              />

              {/* Notes de passation */}
              <Textarea
                label="Notes de passation (optionnel)"
                placeholder="Instructions pour votre remplaçant, dossiers en cours..."
                rows={3}
                {...register('handoverNotes')}
              />

              {/* Urgence */}
              <div className="flex items-center">
                <input
                  id="isUrgent"
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  {...register('isUrgent')}
                />
                <label htmlFor="isUrgent" className="ml-2 block text-sm text-gray-700">
                  Demande urgente (nécessite une approbation rapide)
                </label>
              </div>

              {/* Actions */}
              <div className="flex justify-end space-x-3 pt-6 border-t">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => navigate('/leaves')}
                >
                  Annuler
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  isLoading={isSubmitting}
                  loadingText="Soumission..."
                >
                  Soumettre la demande
                </Button>
              </div>
            </form>
          </CardBody>
        </Card>
      </div>
    </>
  )
}