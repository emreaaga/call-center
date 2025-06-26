import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Loader2Icon } from "lucide-react"
import { useState } from "react"
import { EyeIcon, EyeOffIcon } from 'lucide-react'


export interface LoginFormProps
  extends React.FormHTMLAttributes<HTMLFormElement> {
  loading?: boolean
}

export function LoginForm({
  className,
  loading = false,
  ...props
}: LoginFormProps) {
  const [visible, setVisible] = useState(false)
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-start gap-1 text-left">
        <h1 className="text-md font-bold">С Возвращением!</h1>
        <h2 className="text-md font-bold">Пожалуйста, ввойдите в Ваш аккаунт</h2>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="login">Логин</Label>
          <Input disabled={loading} className="rounded-xl" id="login" name="login" type="text" placeholder="Ваш логин" required />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="password">Пароль</Label>
          <Input disabled={loading} className="rounded-xl" id="password" name="password" placeholder="Введите пароль" type="password" required />
        </div>
        <Button
          type="submit"
          className="w-full rounded-2xl bg-[#2563EB] hover:bg-[#1E40AF]"
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2Icon className="animate-spin mr-2 h-4 w-4" />
              Входим…
            </>
          ) : (
            "Войти"
          )}
        </Button>
      </div>
      <div className="flex text-left text-sm space-x-2 items-center">
        <Checkbox id="remember" disabled={loading} />
        <Label htmlFor="remember">Запомнить меня</Label>
      </div>
    </form>
  )
}
