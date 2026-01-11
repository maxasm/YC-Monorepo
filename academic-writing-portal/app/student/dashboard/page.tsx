import { Card } from "@/components/common/card";
import { PageHeader } from "@/components/common/page-header";

export default function StudentDashboardPage() {
  return (
    <div className="space-y-6 p-6">
      <PageHeader title="Student dashboard" description="Track tasks, pricing, and statuses." />
      <Card title="Dashboard" description="Dashboard widgets will be added per PRD." />
    </div>
  );
}
