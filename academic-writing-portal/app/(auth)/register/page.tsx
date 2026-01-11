import { Card } from "@/components/common/card";
import { PageHeader } from "@/components/common/page-header";

export default function RegisterPage() {
  return (
    <div className="space-y-6 p-6">
      <PageHeader title="Create account" description="Set up your role-based access." />
      <Card title="Registration" description="Registration form will follow the PRD." />
    </div>
  );
}
