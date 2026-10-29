import BrokerShell from "@/components/broker/BrokerShell";
import ProjectDetail from "@/components/admin/dev-detail/ProjectDetail";

export const metadata = {
  title: "PROPTECH — Development Detail",
};

export default async function BrokerDevelopmentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <BrokerShell>
      <ProjectDetail
        id={id}
        backHref="/workspace/developments"
        modellerBase="/workspace/modeller"
      />
    </BrokerShell>
  );
}
