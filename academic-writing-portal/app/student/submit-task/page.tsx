import { Card } from "@/components/common/card";
import { PageHeader } from "@/components/common/page-header";

export default function SubmitTaskPage() {
  return (
    <div className="space-y-6 p-6">
      <PageHeader title="Submit a task" description="Provide task details for AI pricing and admin approval." />
      <Card title="Submission form" description="Form will match PRD fields and flow." />
    </div>
  );
}
