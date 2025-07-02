'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { useSWRConfig } from 'swr';
import { ContentLayout } from '@/components/admin-panel/content-layout';
import SettingsCard from '@/components/admin-panel/settings-card';
import SipTable, { SipActionRenderer } from '@/lib/sip-zod';
import EditIcon from '@/icons/incomingCalls/edit.svg';
import DeleteIcon from '@/icons/incomingCalls/delete.svg';
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from '@/components/ui/tooltip';
import { ConfirmDialog } from '@/components/admin-panel/confirm-dialog';

export default function SipSettingsPage() {
  const router = useRouter();
  const { mutate } = useSWRConfig();  // <-- импортируем и получаем mutate

  const handleDelete = async (uuid: string) => {
    try {
      const res = await fetch('/api/sip/delete', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uuid }),
      });
      if (!res.ok) throw new Error(`Ошибка ${res.status}`);

      // инвалидируем SWR-кэш для списка SIP
      await mutate('/api/dashboard/get-sip');

      // Обновляем текущую страницу (необязательно, если только список поднимается)
      router.refresh();
    } catch (err) {
      console.error(err);
    }
  };

  const renderActions: SipActionRenderer = (row) => (
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
  );

  return (
    <TooltipProvider>
      <ContentLayout title="SIP Настройки">
        <SettingsCard />
        <SipTable renderActionButton={renderActions} />
      </ContentLayout>
    </TooltipProvider>
  );
}
