import AdminShell from "@/components/admin/AdminShell";
import BrokersAdmin from "@/components/admin/BrokersAdmin";

export const metadata = {
  title: "PROPTECH — Broker Management",
};

export default function AdminBrokersPage() {
  return (
    <AdminShell>
      <BrokersAdmin />
    </AdminShell>
  );
}
