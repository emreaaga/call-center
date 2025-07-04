'use client';

import * as React from 'react';
import useSWR from 'swr';
import { DataTable } from '@/components/admin-panel/data-table';
import type { ColumnDef } from '@tanstack/react-table';
import { z } from 'zod';
import { format } from 'date-fns';

//
// 1) Zod-схема под нужные поля
//
export const CampaignEntrySchema = z.object({
  id:            z.number(),
  uuid:          z.string(),
  name:          z.string(),
  channel_count: z.number(),
  status_ru:     z.string(),
  sip_name:      z.string(),
  start_date:    z.string(),
  end_date:      z.string(),
});
export type CampaignEntry = z.infer<typeof CampaignEntrySchema>;

export const CampaignsResponseSchema = z.object({
  campaigns: z.array(CampaignEntrySchema),
  total:     z.number(),
  page:      z.number(),
  per_page:  z.number(),
});

function formatCustomDate(raw: string | null) {
  if (!raw) return '—';
  const date = new Date(raw);
  return isNaN(date.getTime()) ? '—' : date.toLocaleString();
}


const columns: ColumnDef<CampaignEntry>[] = [
  { accessorKey: 'id',            header: 'ID' },
  { accessorKey: 'name',          header: 'Название' },
  { accessorKey: 'sip_name',      header: 'SIP' },
  { accessorKey: 'channel_count', header: 'Каналы' },
  {
    accessorKey: 'status_ru',
    header: 'Статус',
    cell: ({ getValue }) => {
      const s = getValue<string>();
      const isActive = s === 'Активно' || s === 'Завершено';
      return (
        <span
          className={`inline-block px-2 py-1 text-sm rounded-lg ${
            isActive ? 'bg-[#E2FBE8] text-green-700' : 'bg-gray-100 text-gray-800'
          }`}
        >
          {s}
        </span>
      );
    },
  },
  {
    accessorKey: 'start_date',
    header: 'Начало',
    cell: ({ getValue }) => formatCustomDate(getValue<string>()),
  },
  {
    accessorKey: 'end_date',
    header: 'Окончание',
    cell: ({ getValue }) => formatCustomDate(getValue<string>()),
  },
];

const fetcher = async (url: string) => {
  const res = await fetch(url, {
    credentials: 'include',
    headers: { Accept: 'application/json' },
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`Ошибка ${res.status}`);
  const json = await res.json();
  return CampaignsResponseSchema.parse(json);
};

export type CampaignActionRenderer = (row: CampaignEntry) => JSX.Element;

export default function CampaignTable({
  renderActionButton,
}: {
  renderActionButton?: CampaignActionRenderer;
}) {
  const { data, error, isLoading } = useSWR(
    '/api/dashboard/get-campaigns',
    fetcher,
    { revalidateOnFocus: true, revalidateOnMount: true, dedupingInterval: 0 }
  );

  const loadingInitial = isLoading;
  const campaigns = data?.campaigns ?? [];

  return (
    <div className="mt-6">
      <DataTable<CampaignEntry, typeof CampaignEntrySchema>
        data={campaigns}
        columns={columns}
        schema={CampaignEntrySchema}
        getRowId={row => row.uuid}
        loading={loadingInitial}
        {...(renderActionButton ? { renderActionButton } : {})}
      />

      {error && (
        <div className="text-red-600 text-sm mt-2">
          Ошибка загрузки: {error.message}
        </div>
      )}
    </div>
  );
}
