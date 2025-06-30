'use client';

import { ContentLayout } from "@/components/admin-panel/content-layout";
import React from "react";
import SipTable from "@/lib/sip-zod";

export default function SipPage() {


  return (
    <ContentLayout title="Список коллекций">
      <SipTable/>
    </ContentLayout>
  );
}
