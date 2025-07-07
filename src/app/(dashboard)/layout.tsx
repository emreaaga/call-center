'use client'

import { Toaster } from "@/components/ui/sonner"
import AdminPanelLayout from '@/components/admin-panel/admin-panel-layout'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <AdminPanelLayout>{children} <Toaster closeButton richColors position="bottom-center" /></AdminPanelLayout>
}
