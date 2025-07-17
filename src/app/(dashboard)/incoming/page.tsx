'use client';

import * as React from 'react';
import useSWR from 'swr';
import { ContentLayout } from '@/components/admin-panel/content-layout';
import { IncomingCards } from '@/components/admin-panel/incoming-cards';
import { DataTable } from '@/components/admin-panel/data-table';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from '@/components/ui/select';
import { SearchIcon, Play, Pause } from 'lucide-react';
import type { ColumnDef } from '@tanstack/react-table';
import { z } from 'zod';
import AudioPlayer from '@/components/admin-panel/audio-player';

interface IncomingCall {
  id: number;
  phone: string;
  client_name: string;
  start_date: string | null;
  recording_url: string | null;
}

const IncomingCallSchema = z.object({
  id: z.number(),
  phone: z.string(),
  client_name: z.string(),
  start_date: z.string().nullable(),
  recording_url: z.string().nullable(),
});

const IncomingPageSchema = z.object({
  calls: z.array(IncomingCallSchema),
  total: z.number(),
  page: z.number(),
  per_page: z.number(),
});


const columns: ColumnDef<IncomingCall>[] = [
  { accessorKey: 'id', header: 'ID' },
  { accessorKey: 'phone', header: 'Телефон' },
  { accessorKey: 'client_name', header: 'Клиент' },
  {
    accessorKey: 'start_date',
    header: 'Дата',
    cell: info => {
      const dateValue = info.getValue() as string | null;
      return dateValue ?? '—';
    },
  },
  {
    accessorKey: 'recording_url',
    header: 'Запись',
    cell: info => {
      const url = info.getValue() as string | null;
      return url ? <AudioPlayer src={url} /> : '—';
    },
  },
];

const fetcher = async (url: string) => {
  const res = await fetch(url, {
    credentials: 'include',
    headers: { Accept: 'application/json' },
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`Ошибка ${res.status}`);
  return IncomingPageSchema.parse(await res.json());
};

export default function SettingsPage() {
  const { data, error, isLoading } = useSWR(
    '/api/calls/incoming?page=1&per_page=10',
    fetcher,
    { revalidateOnFocus: true, revalidateOnMount: true, dedupingInterval: 0 }
  );

  const calls = data?.calls ?? [];

  return (
    <ContentLayout title="Статистика входящих звонков">
      <IncomingCards />

      <div className="flex items-center gap-4 mt-6 mb-4">
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Поиск по телефону"
            className="pl-10 w-60 rounded-2xl"
          />
        </div>
        <Select>
          <SelectTrigger className="w-48 rounded-2xl">
            <SelectValue placeholder="Статус" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Статусы</SelectLabel>
              <SelectItem value="all">Все</SelectItem>
              <SelectItem value="answered">Отвеченные</SelectItem>
              <SelectItem value="missed">Пропущенные</SelectItem>
              <SelectItem value="pending">В ожидании</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <DataTable<IncomingCall, typeof IncomingCallSchema>
        data={calls}
        columns={columns}
        schema={IncomingCallSchema}
        getRowId={row => row.id.toString()}
        loading={isLoading}
      />

      {error && (
        <div className="text-red-600 text-sm mt-2">{error.message}</div>
      )}
    </ContentLayout>
  );
}
