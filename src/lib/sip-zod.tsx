'use client';

import * as React from 'react';
import useSWR from 'swr';
import { DataTable } from '@/components/admin-panel/data-table';
import type { ColumnDef } from '@tanstack/react-table';
import { z } from 'zod';

export interface SipEntry {
  id: number;
  uuid: string;
  name: string;
  endpoint: string;
  username: string;
  channel_count: number;
  status_ru: string;
  created_at: string;
  updated_at: string;
}

export const SipEntrySchema = z.object({
  id: z.number(),
  uuid: z.string(),
  name: z.string(),
  endpoint: z.string(),
  username: z.string(),
  channel_count: z.number(),
  status_ru: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});
const SipResponseSchema = z.object({
  sips: z.array(SipEntrySchema),
  total: z.number(),
});

function formatCustomDate(raw: string | null) {
  if (!raw) return '—';
  const [d, t] = raw.split(' ');
  if (!d || !t) return '—';
  const [dd, mm, yyyy] = d.split('.').map(Number);
  const [hh, mi] = t.split(':').map(Number);
  const date = new Date(yyyy, mm - 1, dd, hh, mi);
  return isNaN(date.getTime()) ? '—' : date.toLocaleString();
}

const columns: ColumnDef<SipEntry>[] = [
  { accessorKey: 'id', header: 'ID' },
  { accessorKey: 'name', header: 'Имя' },
  { accessorKey: 'endpoint', header: 'Endpoint' },
  { accessorKey: 'username', header: 'Логин' },
  { accessorKey: 'channel_count', header: 'Каналы' },
  {
    accessorKey: 'status_ru',
    header: 'Статус',
    cell: ({ getValue }) => {
      const status = getValue<string>();
      const isActive = status === 'Активно';
      return (
        <span
          className={`inline-block px-2 py-1 text-sm rounded-lg ${
            isActive ? 'bg-[#E2FBE8] text-green-700' : 'bg-gray-100 text-gray-800'
          }`}
        >
          {status}
        </span>
      );
    },
  },
  {
    accessorKey: 'created_at',
    header: 'Создано',
    cell: ({ getValue }) => formatCustomDate(getValue<string>()),
  },
  {
    accessorKey: 'updated_at',
    header: 'Обновлено',
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
  return SipResponseSchema.parse(json);
};

export type SipActionRenderer = (row: SipEntry) => JSX.Element;

export default function SipTable({
  renderActionButton,
}: {
  renderActionButton?: SipActionRenderer;
}) {
  const { data, error, isLoading, isValidating, mutate } = useSWR(
    '/api/dashboard/get-sip',
    fetcher,
    {
      revalidateOnFocus: true,
      revalidateOnMount: true,
      dedupingInterval: 0,
    }
  );

  const loadingInitial = isLoading;
  const sips = data?.sips ?? [];

  return (
    <div className="mt-6">
      <DataTable<SipEntry, typeof SipEntrySchema>
        data={sips}
        columns={columns}
        schema={SipEntrySchema}
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
