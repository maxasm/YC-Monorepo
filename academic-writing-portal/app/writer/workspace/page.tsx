import { Card } from "@/components/common/card";
import { PageHeader } from "@/components/common/page-header";

export default function WriterWorkspacePage() {
  return (
    <div className="space-y-6 p-6">
      <PageHeader title="Workspace" description="Execute assigned tasks with clarity and control." />
      <Card title="Workspace" description="Workspace tools will be implemented per PRD." />
    </div>
  );
}
