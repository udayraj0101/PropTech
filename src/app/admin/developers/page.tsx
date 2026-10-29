import AdminShell from "@/components/admin/AdminShell";
import DevelopersAdmin from "@/components/admin/DevelopersAdmin";

export const metadata = {
  title: "PROPTECH — Developer Management",
};

export default function AdminDevelopersPage() {
  return (
    <AdminShell>
      <DevelopersAdmin />
    </AdminShell>
  );
}
