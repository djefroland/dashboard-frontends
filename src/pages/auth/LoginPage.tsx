// src/pages/auth/LoginPage.tsx
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'
import { Button, Input, Alert, Card, CardBody } from '@/components/ui'
import { EyeIcon, EyeSlashIcon, UserIcon, LockClosedIcon } from '@heroicons/react/24/outline'
import { toast } from 'react-hot-toast'

const loginSchema = z.object({
  identifier: z.string()
    .min(3, 'L\'identifiant doit contenir au moins 3 caractères')
    .max(100, 'L\'identifiant ne peut pas dépasser 100 caractères'),
  password: z.string()
    .min(6, 'Le mot de passe doit contenir au moins 6 caractères'),
  rememberMe: z.boolean().optional()
})

type LoginFormData = z.infer<typeof loginSchema>

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const { login, isLoading, error, isAuthenticated } = useAuthStore()
  const navigate = useNavigate()
  const location = useLocation()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      identifier: '',
      password: '',
      rememberMe: false
    }
  })

  // Redirection si déjà connecté
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard')
    }
  }, [isAuthenticated, navigate])

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login({
        identifier: data.identifier,
        password: data.password,
        rememberMe: data.rememberMe || false
      })
      navigate('/dashboard')
    } catch (error) {
      toast.error('Échec de la connexion')
    }
  }

  const from = (location.state as any)?.from?.pathname || '/dashboard'

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-primary-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-xl">RH</span>
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Connexion au Dashboard RH
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {from !== '/dashboard' && (
              <>Vous devez vous connecter pour accéder à <strong>{from}</strong></>
            )}
          </p>
        </div>

        {/* Form */}
        <Card className="shadow-xl">
          <CardBody className="p-8">
            {error && (
              <Alert variant="error" className="mb-6">
                {error}
              </Alert>
            )}

            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <Input
                label="Email ou nom d'utilisateur"
                type="text"
                placeholder="Entrez votre email ou nom d'utilisateur"
                leftIcon={<UserIcon className="h-5 w-5" />}
                error={errors.identifier?.message || ''}
                {...register('identifier')}
              />

              <div className="relative">
                <Input
                  label="Mot de passe"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Entrez votre mot de passe"
                  leftIcon={<LockClosedIcon className="h-5 w-5" />}
                  error={errors.password?.message || ''}
                  {...register('password')}
                />
                <button
                  type="button"
                  className="absolute right-3 top-[38px] text-gray-400 hover:text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              </div>

              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  {...register('rememberMe')}
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Se souvenir de moi
                </label>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                isLoading={isLoading || isSubmitting}
                loadingText="Connexion en cours..."
              >
                Se connecter
              </Button>
            </form>

            <div className="mt-6 text-center">
              <a
                href="/forgot-password"
                className="text-sm text-primary-600 hover:text-primary-500 font-medium"
              >
                Mot de passe oublié ?
              </a>
            </div>
          </CardBody>
        </Card>

        {/* Footer */}
        <div className="text-center text-xs text-gray-500">
          <p>Dashboard RH © 2024</p>
          <p>Plateforme de gestion des ressources humaines</p>
        </div>
      </div>
    </div>
  )
}