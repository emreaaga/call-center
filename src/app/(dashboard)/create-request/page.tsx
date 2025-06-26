"use client";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import React from "react";
import CreateRequestCard from "@/components/admin-panel/create-request-card";

export default function CreatRequestPage() {

  return (
    <ContentLayout title="Добавление шаблона">
      <CreateRequestCard/>
    </ContentLayout>
  );
}
