"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { DataTable } from "@/components/admin-panel/data-table";
import { detailSchema, detailColumns } from "@/lib/detail-table-config";
import { z } from "zod";

export default function RequestDetailsPage() {
    const [detailData, setDetailData] = useState<z.infer<typeof detailSchema>[]>([]);
    const searchParams = useSearchParams();
    const rowId = searchParams.get("id");
    console.log("detailData", detailData);

    useEffect(() => {
        const stored = localStorage.getItem("selectedRequest");
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                const validation = z.array(detailSchema).safeParse([parsed]);
                if (validation.success) {
                    setDetailData(validation.data);
                    localStorage.removeItem("tableFilters");
                } else {
                    console.error("Ошибка валидации данных:", validation.error);
                }
            } catch (error) {
                console.error("Ошибка при чтении localStorage:", error);
            }
        }
    }, []);

    return (
        <ContentLayout title={`Детали запроса #${rowId}`}>
            <DataTable
                data={detailData}
                columns={detailColumns}
                schema={detailSchema}
                getRowId={(row) => row.id.toString()}
                twoColumnsMode
            />

        </ContentLayout>
    );
}
