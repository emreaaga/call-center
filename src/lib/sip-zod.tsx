"use client";

import * as React from "react";
import { DataTable } from "@/components/admin-panel/data-table";
import type { ColumnDef } from "@tanstack/react-table";
import { z } from "zod";

// 1) Описание записи
interface SipEntry {
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

// 2) Схемы Zod
const SipEntrySchema = z.object({
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
  if (!raw) return "—";
  const [d, t] = raw.split(" ");
  if (!d || !t) return "—";
  const [dd, mm, yyyy] = d.split(".").map(Number);
  const [hh, mi] = t.split(":").map(Number);
  const date = new Date(yyyy, mm - 1, dd, hh, mi);
  return isNaN(date.getTime()) ? "—" : date.toLocaleString();
}

// 4) Колонки таблицы
const columns: ColumnDef<SipEntry>[] = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "name", header: "Имя" },
  { accessorKey: "endpoint", header: "Endpoint" },
  { accessorKey: "username", header: "Логин" },
  { accessorKey: "channel_count", header: "Каналы" },
  {
  accessorKey: "status_ru",
  header: "Статус",
  cell: ({ getValue }) => {
    const status = getValue() as string;
    const isActive = status === "Активно";
    return (
      <span
        className={`inline-block px-2 py-1 text-sm rounded-lg ${
          isActive ? "bg-[#E2FBE8] text-green-700" : "bg-gray-100 text-gray-800"
        }`}
      >
        {status}
      </span>
    );
  },
},
  {
    accessorKey: "created_at",
    header: "Создано",
    cell: ({ getValue }) => formatCustomDate(getValue() as string),
  },
  {
    accessorKey: "updated_at",
    header: "Обновлено",
    cell: ({ getValue }) => formatCustomDate(getValue() as string),
  },
];

export type SipActionRenderer = (row: SipEntry) => JSX.Element;

export default function SipTable({
  renderActionButton,
}: {
  renderActionButton?: SipActionRenderer;
}) {
  const [data, setData] = React.useState<SipEntry[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    fetch("/api/dashboard/get-sip", {
      credentials: "include",
      headers: { Accept: "application/json" },
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Ошибка ${res.status}`);
        return res.json();
      })
      .then((json) => {
        const parsed = SipResponseSchema.safeParse(json);
        if (!parsed.success) {
          console.error(parsed.error);
          throw new Error("Неправильный формат ответа API");
        }
        setData(parsed.data.sips);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Загрузка SIP-коннектов…</div>;
  if (error) return <div className="text-red-600">Ошибка: {error}</div>;

  return (
    <div className="mt-6">
      <DataTable
        data={data}
        columns={columns}
        schema={SipEntrySchema}
        getRowId={(row) => row.uuid.toString()}
        {...(renderActionButton
          ? { renderActionButton }
          : {})}
      />
    </div>
  );
}
