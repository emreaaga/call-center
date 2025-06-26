'use client'

import { LoginForm } from "@/components/admin-panel/login-form"
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { login } from '@/hooks/auth'


export default function LoginPage() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const username = formData.get('login')?.toString()
    const password = formData.get('password')?.toString()

    if (!username || !password) {
      setError('Заполните все поля')
      setLoading(false)
      return
    }

    try {
      await login(username, password)
      router.replace('/')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="bg-muted relative hidden lg:block rounded-3xl">
        <img
          src="/left.svg"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex flex-1 items-center justify-center">
          <div className="flex flex-col">
            {error && (
              <div className="mb-2 text-red-600 font-medium">Ошибка авторизации</div>
            )}
            <LoginForm onSubmit={handleSubmit} loading={loading} />
          </div>
        </div>
      </div>
    </div>
  )
}
