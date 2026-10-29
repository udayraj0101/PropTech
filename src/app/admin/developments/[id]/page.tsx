import AdminShell from "@/components/admin/AdminShell";
import ProjectDetail from "@/components/admin/dev-detail/ProjectDetail";

export const metadata = {
  title: "PROPTECH — Development Detail",
};

export default async function AdminDevelopmentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <AdminShell>
      <ProjectDetail id={id} />
    </AdminShell>
  );
}
