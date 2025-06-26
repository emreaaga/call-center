"use client";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import React from "react";
import SettingsCard from "@/components/admin-panel/settings-card";

export default function SettingsPage() {


  return (
    <ContentLayout title="Настройка WebHook">
      <SettingsCard/>
    </ContentLayout>
  );
}
