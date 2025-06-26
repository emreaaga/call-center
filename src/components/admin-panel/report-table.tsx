// components/GroupedTable.jsx
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import React from "react";
import {
  ExternalLink,
  PrinterIcon,
} from "lucide-react";

export default function ReportTable() {
  const groups = [
    {
      title: "BRAND PAY (Muxiddin - Индекс ГАИ)",
      data: [
        { type: "Пополнение", quantity: 0, commission: "0.00 UZS", agentFee: "0.00 UZS", cash: "0.00 UZS" },
        { type: "Чаевые", quantity: 192, commission: "0.00 UZS", agentFee: "0.00 UZS", cash: "14 940 000,00 UZS" },
        { type: "Оплата", quantity: 3107, commission: "0.00 UZS", agentFee: "0.00 UZS", cash: "1 927 292 324,25 UZS" },
      ],
    },
    {
      title: "BRAND PAY (Muxiddin - Индекс ГАИ)",
      data: [
        { type: "Пополнение", quantity: 0, commission: "0.00 UZS", agentFee: "0.00 UZS", cash: "0.00 UZS" },
        { type: "Чаевые", quantity: 192, commission: "0.00 UZS", agentFee: "0.00 UZS", cash: "14 940 000,00 UZS" },
        { type: "Оплата", quantity: 3107, commission: "0.00 UZS", agentFee: "0.00 UZS", cash: "1 927 292 324,25 UZS" },
      ],
    },
  ];

  const handleOpenInNewWindow = () => {
    window.open(window.location.href, '_blank', 'noopener,noreferrer');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-end mb-4 space-x-4">
        <Button
          className="size-sm flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-[#374151] rounded-2xl"
          onClick={handleOpenInNewWindow}
        >
          <span>Открыть в окне</span>
          <ExternalLink />
        </Button>
        <Button
          className="flex items-center size-sm space-x-2 px-4 py-2 bg-[#2563EB] hover:bg-[#1E40AF] text-white rounded-2xl"
          onClick={handlePrint}
        >
          <span>Печать</span>
          <PrinterIcon />
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Услуга</TableHead>
            <TableHead>Количество</TableHead>
            <TableHead>Комиссия</TableHead>
            <TableHead>Агентское вознаграждение</TableHead>
            <TableHead>Сумма в кассе</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {groups.map((group, groupIndex) => (
  <React.Fragment key={groupIndex}>
    {groupIndex > 0 && (
      <tr>
        <td colSpan={5}>
          <div className="my-6 border-t border-gray-300" />
        </td>
      </tr>
    )}
    <TableRow>
      <TableCell colSpan={5} className="font-bold bg-gray-100">
        {group.title}
      </TableCell>
    </TableRow>
    {group.data.map((row, rowIndex) => (
      <TableRow key={rowIndex}>
        <TableCell>{row.type}</TableCell>
        <TableCell>{row.quantity}</TableCell>
        <TableCell>{row.commission}</TableCell>
        <TableCell>{row.agentFee}</TableCell>
        <TableCell>{row.cash}</TableCell>
      </TableRow>
    ))}
  </React.Fragment>
))}

        </TableBody>
      </Table>
    </div>
  );
}