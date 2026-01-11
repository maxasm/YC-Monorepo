import { Card } from "@/components/common/card";
import { PageHeader } from "@/components/common/page-header";

export default function WriterDashboardPage() {
  return (
    <div className="space-y-6 p-6">
      <PageHeader title="Writer dashboard" description="View assigned tasks and deadlines." />
      <Card title="Assignments" description="Assigned task list will be implemented per PRD." />
    </div>
  );
}
