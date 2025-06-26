import { z } from "zod";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";

export const requestsSchema = z.object({
  id: z.number(),
  user: z.string().optional(),
  sender: z.string(),
  draft: z.string(),
  example: z.string().optional(),
  status: z.number(),
  sent_date: z.string(),
  updated_date: z.string(),
});

export type requestsEntry = z.infer<typeof requestsSchema>;

export const requestsData: requestsEntry[] = [
  {
    id: 1234567894,
    user: "Ali",
    sender: "QuickPay",
    draft: "Kod dlya polucheniya perevoda v QuickPay. Kod %d",
    status: 1,
    sent_date: "2025-06-09 16:19:00",
    updated_date: "2025-06-09 16:18:55",
    example: "Kod dlya polucheniya perevoda v QuickPay. Kod 1234"
  },
  {
    id: 1234567895,
    user: "Ali",
    sender: "QuickPay",
    draft: "Kod dlya zaversheniya registratsii v QuickPay. Sohranyayte v bezopasnosti. Kod %d",
    status: 1,
    sent_date: "2025-06-09 16:19:01",
    updated_date: "2025-06-09 16:18:56",
    example: "Kod dlya polucheniya perevoda v QuickPay. Kod 1234"
  },
  {
    id: 1234567896,
    user: "Ali",
    sender: "QuickPay",
    draft: "Kod dlya dobavleniya novogo ustroystva v QuickPay. Kod %d",
    status: 1,
    sent_date: "2025-06-09 16:19:02",
    updated_date: "2025-06-09 16:18:57",
    example: "Kod dlya polucheniya perevoda v QuickPay. Kod 1234"
  },
  {
    id: 1234567897,
    user: "Ali",
    sender: "QuickPay",
    draft: "Vash kod dlya podtverzhdeniya zaprosa na perevod v QuickPay. Kod %d",
    status: 1,
    sent_date: "2025-06-09 16:19:03",
    updated_date: "2025-06-09 16:18:58",
    example: "Kod dlya polucheniya perevoda v QuickPay. Kod 1234"
  },
  {
    id: 1234567898,
    user: "Ali",
    sender: "QuickPay",
    draft: "Kod dlya avtorizatsii v QuickPay. Soobshchite tolko esli uvereny. Kod %d",
    status: 1,
    sent_date: "2025-06-09 16:19:04",
    updated_date: "2025-06-09 16:18:59",
    example: "Kod dlya polucheniya perevoda v QuickPay. Kod 1234"
  },
  {
    id: 1234567899,
    user: "Ali",
    sender: "QuickPay",
    draft: "Podtverzhdenie transaktsii. Vvedite kod v prilozhenii QuickPay. Kod %d",
    status: 1,
    sent_date: "2025-06-09 16:19:05",
    updated_date: "2025-06-09 16:19:00",
    example: "Kod dlya polucheniya perevoda v QuickPay. Kod 1234"
  },
  {
    id: 1234567900,
    user: "Ali",
    sender: "QuickPay",
    draft: "Kod dlya aktivatsii novogo akkaunta QuickPay. Ne delites. Kod %d",
    status: 1,
    sent_date: "2025-06-09 16:19:06",
    updated_date: "2025-06-09 16:19:01",
    example: "Kod dlya polucheniya perevoda v QuickPay. Kod 1234"
  },
  {
    id: 1234567901,
    user: "Ali",
    sender: "QuickPay",
    draft: "Zashchitnyy kod dlya obnovleniya parolya v QuickPay. Kod %d",
    status: 1,
    sent_date: "2025-06-09 16:19:07",
    updated_date: "2025-06-09 16:19:02",
    example: "Kod dlya polucheniya perevoda v QuickPay. Kod 1234"
  },
  {
    id: 1234567902,
    user: "Ali",
    sender: "QuickPay",
    draft: "Vvedite etot kod dlya izmeneniya nastroek bezopasnosti QuickPay. Kod %d",
    status: 1,
    sent_date: "2025-06-09 16:19:08",
    updated_date: "2025-06-09 16:19:03",
    example: "Kod dlya polucheniya perevoda v QuickPay. Kod 1234"
  },
  {
    id: 1234567903,
    user: "Ali",
    sender: "QuickPay",
    draft: "Kod dostup k lichnomu kabinetu QuickPay. Nikomu ne peredayte. Kod %d",
    status: 1,
    sent_date: "2025-06-09 16:19:09",
    updated_date: "2025-06-09 16:19:04",
    example: "Kod dlya polucheniya perevoda v QuickPay. Kod 1234"
  },
];

export const requestsColumns: ColumnDef<requestsEntry>[] = [
  {
    accessorKey: "id",
    header: () => <div className="text-xs">ID</div>,
    cell: ({ row }) => <div className="text-[12px]">{row.original.id} </div>,
  },
  {
    accessorKey: "sender",
    header: () => <div className="text-xs">Отправитель</div>,
    cell: ({ row }) => (
      <div className="text-xs">
        {row.original.sender}
      </div>
    ),
  },
  {
    accessorKey: "draft",
    header: () => <div className="text-xs">Шаблон</div>,
    cell: ({ row }) => (
      <div className="text-xs">
        {row.original.draft}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: () => <div className="text-xs">Статус</div>,
    cell: ({ row }) => {
      const status = row.original.status === 1;
      return (
        <Badge
          variant="outline"
          className={`text-xs font-medium ${status
            ? "bg-green-100 text-green-700 dark:bg-green-800/20 dark:text-green-300"
            : "bg-red-100 text-red-700 dark:bg-red-800/20 dark:text-red-300"
            }`}
        >
          {status ? "Зарегистрировано" : "Ошибка"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "date",
    header: () => <div className="text-xs">Дата</div>,
    cell: ({ row }) => (
      <div className="text-xs space-y-1">
        <div>
          <span className="font-semibold">Дата отправки:</span> {row.original.sent_date}
        </div>
        <div>
          <span className="font-semibold">Дата обновления:</span> {row.original.updated_date}
        </div>
      </div>
    ),
  }

];