import type { Metadata } from "next";

import { AdminLoginShell } from "@/components/admin/admin-login-shell";

export const metadata: Metadata = {
  title: "Belépés",
  description: "Diszkrét belépési oldal a szolgáltatói felülethez.",
};

export default function WorkshopLoginPage() {
  return <AdminLoginShell />;
}
