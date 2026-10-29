import AdminShell from "@/components/admin/AdminShell";
import MapExplorer from "@/components/map/MapExplorer";

export const metadata = {
  title: "PROPTECH — Admin Console — Development Map",
};

export default function AdminMapPage() {
  return (
    <AdminShell bleed>
      <MapExplorer />
    </AdminShell>
  );
}
