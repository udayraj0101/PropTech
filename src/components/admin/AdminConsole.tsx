import AdminShell from "./AdminShell";
import AdminOverview from "./AdminOverview";

export default function AdminConsole() {
  return (
    <AdminShell>
      <AdminOverview />
    </AdminShell>
  );
}
