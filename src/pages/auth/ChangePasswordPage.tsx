// src/pages/auth/ChangePasswordPage.tsx
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useAuthStore } from '@/store/authStore'
import { Button, Input, Alert, Card, CardHeader, CardBody } from '@/components/ui'
import { PageHeader } from '@/components/layout'
import { LockClosedIcon, CheckCircleIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import { toast } from 'react-hot-toast'
import { useState } from 'react'

const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'L\'ancien mot de passe est requis'),
  newPassword: z.string()
    .min(8, 'Le nouveau mot de passe doit contenir au moins 8 caractères')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, 
      'Le mot de passe doit contenir : 1 majuscule, 1 minuscule, 1 chiffre, 1 caractère spécial'),
  confirmPassword: z.string().min(1, 'La confirmation est requise')
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: 'Les mots de passe ne correspondent pas',
  path: ['confirmPassword']
})

type ChangePasswordFormData = z.infer<typeof changePasswordSchema>

export default function ChangePasswordPage() {
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  })
  const [success, setSuccess] = useState(false)
  const { changePassword, isLoading, user } = useAuthStore()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch
  } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema)
  })

  const newPassword = watch('newPassword')
  
  // Validation visuelle du mot de passe
  const passwordRequirements = [
    { test: /.{8,}/, label: 'Au moins 8 caractères' },
    { test: /[A-Z]/, label: 'Une majuscule' },
    { test: /[a-z]/, label: 'Une minuscule' },
    { test: /\d/, label: 'Un chiffre' },
    { test: /[@$!%*?&]/, label: 'Un caractère spécial' }
  ]

  const onSubmit = async (data: ChangePasswordFormData) => {
    try {
      await changePassword({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
        confirmPassword: data.confirmPassword
      })
      
      setSuccess(true)
      reset()
      toast.success('Mot de passe modifié avec succès!')
    } catch (error) {
      toast.error('Erreur lors du changement de mot de passe')
    }
  }

  const togglePasswordVisibility = (field: keyof typeof showPasswords) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }))
  }

  return (
    <>
      <PageHeader 
        title="Changer le mot de passe"
        subtitle={`Modifier le mot de passe pour ${user?.fullName}`}
        breadcrumbs={[
          { label: 'Profil', href: '/profile' },
          { label: 'Changer le mot de passe' }
        ]}
      />

      <div className="max-w-2xl mx-auto">
        {success && (
          <Alert 
            variant="success" 
            title="Mot de passe modifié!"
            className="mb-6"
          >
            <div className="flex items-center">
              <CheckCircleIcon className="h-5 w-5 mr-2" />
              Votre mot de passe a été mis à jour avec succès.
            </div>
          </Alert>
        )}

        <Card>
          <CardHeader>
            <div className="flex items-center">
              <LockClosedIcon className="h-6 w-6 text-primary-600 mr-3" />
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  Modification du mot de passe
                </h3>
                <p className="text-sm text-gray-500">
                  Assurez-vous d'utiliser un mot de passe sécurisé
                </p>
              </div>
            </div>
          </CardHeader>

          <CardBody className="space-y-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <Input
                label="Mot de passe actuel"
                type={showPasswords.current ? 'text' : 'password'}
                placeholder="Entrez votre mot de passe actuel"
                error={errors.currentPassword?.message || ''}
                rightIcon={
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility('current')}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    {showPasswords.current ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                  </button>
                }
                {...register('currentPassword')}
              />

              <div className="space-y-4">
                <Input
                  label="Nouveau mot de passe"
                  type={showPasswords.new ? 'text' : 'password'}
                  placeholder="Entrez votre nouveau mot de passe"
                  error={errors.newPassword?.message || ''}
                  rightIcon={
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility('new')}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      {showPasswords.new ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                    </button>
                  }
                  {...register('newPassword')}
                />

                {/* Indicateur de force du mot de passe */}
                {newPassword && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm font-medium text-gray-700 mb-2">
                      Exigences du mot de passe :
                    </p>
                    <ul className="space-y-1">
                      {passwordRequirements.map((req, index) => {
                        const isValid = req.test.test(newPassword)
                        return (
                          <li
                            key={index}
                            className={`text-sm flex items-center ${
                              isValid ? 'text-green-600' : 'text-gray-500'
                            }`}
                          >
                            <div className={`w-4 h-4 rounded-full mr-2 flex items-center justify-center ${
                              isValid ? 'bg-green-100' : 'bg-gray-100'
                            }`}>
                              {isValid && <CheckCircleIcon className="w-3 h-3" />}
                            </div>
                            {req.label}
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                )}
              </div>

              <Input
                label="Confirmer le nouveau mot de passe"
                type={showPasswords.confirm ? 'text' : 'password'}
                placeholder="Confirmez votre nouveau mot de passe"
                error={errors.confirmPassword?.message || ''}
                rightIcon={
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility('confirm')}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    {showPasswords.confirm ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                  </button>
                }
                {...register('confirmPassword')}
              />

              <div className="flex justify-end space-x-3 pt-6 border-t">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => reset()}
                >
                  Annuler
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  isLoading={isLoading || isSubmitting}
                  loadingText="Modification..."
                >
                  Modifier le mot de passe
                </Button>
              </div>
            </form>
          </CardBody>
        </Card>
      </div>
    </>
  )
}