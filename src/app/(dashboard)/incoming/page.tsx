'use client';

import { ContentLayout } from "@/components/admin-panel/content-layout";
import React from "react";
import { IncomingCards } from "@/components/admin-panel/incoming-cards";
import { DataTable } from "@/components/admin-panel/data-table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "@/components/ui/select";
import { SearchIcon } from "lucide-react";
import type { ColumnDef } from "@tanstack/react-table";
import { z } from "zod";

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
        const parsed = z
          .object({
            calls: z.array(IncomingCallSchema),
            total: z.number(),
            page: z.number(),
            per_page: z.number(),
          })
          .safeParse(json);
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
              <SelectLabel>Статусы (заглушка)</SelectLabel>
              <SelectItem value="all">Все</SelectItem>
              <SelectItem value="answered">Отвеченные</SelectItem>
              <SelectItem value="missed">Пропущенные</SelectItem>
              <SelectItem value="pending">В ожидании</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div>
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
