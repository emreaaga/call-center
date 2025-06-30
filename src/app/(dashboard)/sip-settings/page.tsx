// pages/SipSettingsPage.tsx  (или app/... если у вас тоже App Router)

'use client'
import { useRouter } from 'next/navigation'
import { ContentLayout } from "@/components/admin-panel/content-layout"
import SettingsCard from "@/components/admin-panel/settings-card"
import SipTable, { SipActionRenderer } from "@/lib/sip-zod"
import EditIcon from "@/icons/incomingCalls/edit.svg"
import DeleteIcon from "@/icons/incomingCalls/delete.svg"
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip"
import { ConfirmDialog } from "@/components/admin-panel/confirm-dialog"

export default function SipSettingsPage() {
  const router = useRouter()

  const handleDelete = async (uuid: string) => {
    try {
      const res = await fetch(`/api/sip/${uuid}`, {
        method: 'DELETE',
        credentials: 'include', 
      })
      if (!res.ok) throw new Error(`Ошибка ${res.status}`)
      router.refresh()
    } catch (err) {
      console.error(err)
    }
  }

  const renderActions: SipActionRenderer = row => (
    <div className="flex space-x-3">
      <Tooltip>
        <TooltipTrigger asChild>
          <button onClick={() => console.log('Edit', row.uuid)}>
            <EditIcon className="h-5 w-5 text-muted-foreground hover:text-primary" />
          </button>
        </TooltipTrigger>
        <TooltipContent>Редактировать</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <ConfirmDialog
            title="Подтверждение"
            description={`Удалить SIP ${row.uuid}?`}
            onConfirm={() => handleDelete(row.uuid)}
            trigger={
              <button>
                <DeleteIcon className="h-5 w-5 text-muted-foreground hover:text-destructive" />
              </button>
            }
          />
        </TooltipTrigger>
        <TooltipContent>Удалить</TooltipContent>
      </Tooltip>
    </div>
  )

  return (
    <TooltipProvider>
      <ContentLayout title="SIP Настройки">
        <SettingsCard />
        <SipTable renderActionButton={renderActions} />
      </ContentLayout>
    </TooltipProvider>
  )
}
