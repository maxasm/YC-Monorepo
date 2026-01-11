import { Card } from "@/components/common/card";
import { PageHeader } from "@/components/common/page-header";

export default function AdminTasksPage() {
  return (
    <div className="space-y-6 p-6">
      <PageHeader title="Tasks" description="Review submissions, approve pricing, and allocate writers." />
      <Card title="Task queue" description="Task management UI will be implemented per PRD." />
    </div>
  );
}
