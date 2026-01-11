import { Card } from "@/components/common/card";
import { PageHeader } from "@/components/common/page-header";

export default function StudentMessagesPage() {
  return (
    <div className="space-y-6 p-6">
      <PageHeader title="Messages" description="Communicate about assigned tasks." />
      <Card title="Messaging" description="Messaging UI will be implemented per PRD." />
    </div>
  );
}
