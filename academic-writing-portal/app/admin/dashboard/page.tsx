import { Card } from "@/components/common/card";
import { PageHeader } from "@/components/common/page-header";

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6 p-6">
      <PageHeader title="Admin dashboard" description="Oversee queues, pricing, and allocations." />
      <Card title="Controls" description="Admin controls will be implemented per PRD." />
    </div>
  );
}
