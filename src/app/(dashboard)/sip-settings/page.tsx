'use client';

import * as React from 'react';
import { useSWRConfig } from 'swr';
import { ContentLayout } from '@/components/admin-panel/content-layout';
import SettingsCard from '@/components/admin-panel/settings-card';
import SipTable, { SipActionRenderer } from '@/lib/sip-zod';
import EditIcon from '@/icons/incomingCalls/edit.svg';
import DeleteIcon from '@/icons/incomingCalls/delete.svg';
import { EditSipDialog } from '@/components/admin-panel/edit-sip-dialog'
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from '@/components/ui/tooltip';
import { ConfirmDialog } from '@/components/admin-panel/confirm-dialog';

export default function SipSettingsPage() {
  const renderActions: SipActionRenderer = (row) => (
    <div className="flex space-x-3">
      <Tooltip>
        <TooltipTrigger asChild>
          <EditSipDialog sipUuid={row.uuid} trigger={
            <button>
              <EditIcon className="h-5 w-5 text-muted-foreground hover:text-primary" />
            </button>
          } />
        </TooltipTrigger>
        <TooltipContent>Редактировать</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <ConfirmDialog
            title="Подтверждение"
            description={`Удалить SIP ${row.name}?`}
            sipUuid={row.uuid}
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
