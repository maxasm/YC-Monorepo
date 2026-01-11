import { Card } from "@/components/common/card";
import { PageHeader } from "@/components/common/page-header";

export default function LoginPage() {
  return (
    <div className="space-y-6 p-6">
      <PageHeader title="Log in" description="Access your academic writing workspace." />
      <Card title="Authentication" description="Auth form will be implemented per PRD." />
    </div>
  );
}
