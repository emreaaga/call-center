'use client';

import { ContentLayout } from '@/components/admin-panel/content-layout';
import React from 'react';
import CampaignTable from '@/lib/campaigns-zod';

export default function SipPage() {
  return (
    <ContentLayout title="Список коллекций">
      <CampaignTable />
    </ContentLayout>
  );
}
