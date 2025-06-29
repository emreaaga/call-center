'use client';

import { ContentLayout } from "@/components/admin-panel/content-layout";
import React from "react";
import SettingsCard from "@/components/admin-panel/settings-card";
import { IncomingCards } from "@/components/admin-panel/incoming-cards";
import { DataTable } from "@/components/admin-panel/data-table";
import type { ColumnDef } from "@tanstack/react-table";
import { z } from "zod";

interface IncomingCall {
  id: number;
  phone: string;
  client_name: string;
  start_date: string | null;
  recording_url: string | null;
}

interface IncomingResponse {
  calls: IncomingCall[];
  total: number;
  page: number;
  per_page: number;
}

// Zod-схема для одной записи
const IncomingCallSchema = z.object({
  id: z.number(),
  phone: z.string(),
  client_name: z.string(),
  start_date: z.string().nullable(),
  recording_url: z.string().nullable(),
});

// Zod-схема для всего ответа
const IncomingResponseSchema = z.object({
  calls: z.array(IncomingCallSchema),
  total: z.number(),
  page: z.number(),
  per_page: z.number(),
});

// Колонки для таблицы
const columns: ColumnDef<IncomingCall>[] = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "phone", header: "Телефон" },
  { accessorKey: "client_name", header: "Клиент" },
  {
    accessorKey: "start_date",
    header: "Дата",
    cell: info =>
      info.getValue()
        ? new Date(info.getValue() as string).toLocaleString()
        : "—",
  },
  {
    accessorKey: "recording_url",
    header: "Запись",
    cell: info => {
      const url = info.getValue() as string | null;
      return url ? (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          Просмотр
        </a>
      ) : (
        "—"
      );
    },
  },
];

export default function SettingsPage() {
  const [data, setData] = React.useState<IncomingCall[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    fetch("/api/calls/incoming?page=1&per_page=10", {
      credentials: "include",
      headers: { Accept: "application/json" },
    })
      .then(res => {
        if (!res.ok) throw new Error(`Ошибка ${res.status}`);
        return res.json();
      })
      .then(json => {
        const parsed = IncomingResponseSchema.safeParse(json);
        if (!parsed.success) {
          console.error(parsed.error);
          throw new Error("Неправильный формат ответа API");
        }
        setData(parsed.data.calls);
      })
      .catch(err => {
        console.error(err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <ContentLayout title="Статистика входящих звонков">
      <IncomingCards/>

      {/* Таблица снизу */}
      <div className="mt-6">
        {loading && <div>Загрузка входящих звонков…</div>}
        {error && <div className="text-red-600">Ошибка: {error}</div>}
        {!loading && !error && (
          <DataTable
            data={data}
            columns={columns}
            schema={IncomingCallSchema}
            getRowId={row => row.id.toString()}
          />
        )}
      </div>
    </ContentLayout>
  );
}
