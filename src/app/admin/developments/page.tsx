import AdminShell from "@/components/admin/AdminShell";
import DevelopmentsAdmin from "@/components/admin/DevelopmentsAdmin";

export const metadata = {
  title: "PROPTECH — Development Management",
};

export default function AdminDevelopmentsPage() {
  return (
    <AdminShell>
      <DevelopmentsAdmin />
    </AdminShell>
  );
}
