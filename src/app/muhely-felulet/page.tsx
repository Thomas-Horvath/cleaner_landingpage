import type { Metadata } from "next";

import { AdminDashboardShell } from "@/components/admin/admin-dashboard-shell";

export const metadata: Metadata = {
  title: "Szolgáltatói felület",
  description: "Admin felület a foglalások áttekintéséhez.",
};

export default function WorkshopDashboardPage() {
  return <AdminDashboardShell />;
}
