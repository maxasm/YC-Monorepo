import { Card } from "@/components/common/card";
import { PageHeader } from "@/components/common/page-header";

export default function AdminAnalyticsPage() {
  return (
    <div className="space-y-6 p-6">
      <PageHeader title="Analytics" description="Monitor revenue and task performance." />
      <Card title="Analytics" description="Charts will be implemented per PRD using Recharts." />
    </div>
  );
}
