import "use client";

import { Card } from "@/components/common/card";
import { PageHeader } from "@/components/common/page-header";
import { Badge } from "@/components/common/badge";
import { Table } from "@/components/common/table";
import type { Task, TableColumn } from "@/types";

// Mock metrics
const metrics = [
  { label: "Active Tasks", value: 12, trend: "+2 this week" },
  { label: "Completed Tasks", value: 48, trend: "+8 this week" },
  { label: "Platform Revenue", value: "$3,850", trend: "+12% MoM" },
  { label: "Avg Writer Earnings", value: "$145", trend: "per task" },
];

const recentTasks: Task[] = [
  {
    id: "task-1",
    title: "Research Paper on Climate Change",
    subject: "Environmental Science",
    status: "in_progress",
    deadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    wordCount: 5000,
    academicLevel: "Masters",
    citationStyle: "APA",
    price: { currency: "USD", estimate: 150, adminApproved: 145, final: 145 },
  },
  {
    id: "task-2",
    title: "Case Study Analysis",
    subject: "Business",
    status: "awaiting_revisions",
    deadline: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    wordCount: 2500,
    academicLevel: "Undergraduate",
    citationStyle: "Harvard",
    price: { currency: "USD", estimate: 95, adminApproved: 95, final: 95 },
  },
  {
    id: "task-3",
    title: "Essay on Shakespearean Tragedy",
    subject: "Literature",
    status: "completed",
    deadline: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    wordCount: 3000,
    academicLevel: "Undergraduate",
    citationStyle: "MLA",
    price: { currency: "USD", estimate: 80, adminApproved: 80, final: 80 },
  },
];

const columns: TableColumn<Task>[] = [
  {
    key: "title",
    header: "Task",
    render: (task) => (
      <div>
        <p className="font-medium text-slate-900">{task.title}</p>
        <p className="text-xs text-slate-500">{task.subject}</p>
      </div>
    ),
  },
  {
    key: "status",
    header: "Status",
    render: (task) => {
      const tones: Record<string, "info" | "warning" | "success" | "danger" | "muted"> = {
        in_progress: "info",
        awaiting_revisions: "warning",
        completed: "success",
      };
      return <Badge tone={tones[task.status] || "muted"}>{task.status.replace(/_/g, " ")}</Badge>;
    },
  },
  {
    key: "wordCount",
    header: "Words",
    render: (task) => <span>{task.wordCount.toLocaleString()}</span>,
  },
  {
    key: "deadline",
    header: "Deadline",
    render: (task) => <span>{new Date(task.deadline).toLocaleDateString()}</span>,
  },
  {
    key: "price",
    header: "Price",
    render: (task) => (
      <span className="font-medium text-indigo-700">
        {task.price?.currency} {task.price?.final || task.price?.estimate}
      </span>
    ),
  },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6 p-6">
      <PageHeader
        title="Admin Dashboard"
        description="Overview of platform activity, revenue, and task management"
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => (
          <Card key={metric.label} className="bg-gradient-to-br from-indigo-50 to-blue-50">
            <div>
              <p className="text-sm font-medium text-slate-600">{metric.label}</p>
              <p className="mt-2 text-3xl font-bold text-slate-900">{metric.value}</p>
              <p className="mt-1 text-xs text-slate-500">{metric.trend}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <Card title="Recent Tasks" description="Last 30 days of platform activity">
        <Table
          data={recentTasks}
          columns={columns}
          emptyState={<p className="text-sm text-slate-600">No recent tasks</p>}
        />
      </Card>

      {/* Action Links */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card className="border-indigo-200 bg-indigo-50">
          <div>
            <h3 className="font-semibold text-indigo-900">Pending Approvals</h3>
            <p className="mt-1 text-sm text-indigo-800">3 tasks awaiting review</p>
            <a href="/admin/tasks" className="mt-3 inline-block text-sm font-medium text-indigo-600 hover:text-indigo-700">
              Review Queue →
            </a>
          </div>
        </Card>

        <Card className="border-emerald-200 bg-emerald-50">
          <div>
            <h3 className="font-semibold text-emerald-900">Revenue</h3>
            <p className="mt-1 text-sm text-emerald-800">Monthly revenue: $3,850</p>
            <a href="/admin/analytics" className="mt-3 inline-block text-sm font-medium text-emerald-600 hover:text-emerald-700">
              View Analytics →
            </a>
          </div>
        </Card>

        <Card className="border-amber-200 bg-amber-50">
          <div>
            <h3 className="font-semibold text-amber-900">Disputes</h3>
            <p className="mt-1 text-sm text-amber-800">0 active disputes</p>
            <a href="/admin/disputes" className="mt-3 inline-block text-sm font-medium text-amber-600 hover:text-amber-700">
              View Disputes →
            </a>
          </div>
        </Card>
      </div>
    </div>
  );
}
