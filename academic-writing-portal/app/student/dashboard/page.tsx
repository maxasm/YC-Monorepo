import "use client";

import { useState } from "react";
import { Card } from "@/components/common/card";
import { PageHeader } from "@/components/common/page-header";
import { EmptyState } from "@/components/common/empty-state";
import { TaskCard } from "@/components/common/task-card";
import { Button } from "@/components/common/button";
import { Tabs } from "@/components/common/tabs";
import Link from "next/link";
import type { Task } from "@/types";

// Mock data for demo; in production, fetch via API
const mockTasks: Task[] = [
  {
    id: "task-1",
    title: "Research Paper on Climate Change",
    subject: "Environmental Science",
    status: "in_progress",
    deadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    wordCount: 5000,
    academicLevel: "Masters",
    citationStyle: "APA",
    price: {
      currency: "USD",
      estimate: 150,
      adminApproved: 145,
      final: 145,
    },
  },
  {
    id: "task-2",
    title: "Essay on Shakespearean Tragedy",
    subject: "Literature",
    status: "completed",
    deadline: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    wordCount: 3000,
    academicLevel: "Undergraduate",
    citationStyle: "MLA",
    price: {
      currency: "USD",
      estimate: 80,
      adminApproved: 80,
      final: 80,
    },
  },
  {
    id: "task-3",
    title: "Case Study Analysis",
    subject: "Business",
    status: "awaiting_pricing",
    deadline: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    wordCount: 2500,
    academicLevel: "Undergraduate",
    citationStyle: "Harvard",
    price: {
      currency: "USD",
      estimate: 95,
    },
  },
];

export default function StudentDashboardPage() {
  const [activeTab, setActiveTab] = useState<string>("active");

  const activeTasks = mockTasks.filter(
    (t) => !["completed", "disputed"].includes(t.status) && new Date(t.deadline) > new Date()
  );
  const completedTasks = mockTasks.filter((t) => t.status === "completed");
  const disputedTasks = mockTasks.filter((t) => t.status === "disputed");

  const displayTasks = activeTab === "active" ? activeTasks : activeTab === "completed" ? completedTasks : disputedTasks;

  return (
    <div className="space-y-6 p-6">
      <PageHeader
        title="Student Dashboard"
        description="Track all your academic writing tasks"
        actions={
          <Link href="/student/submit-task">
            <Button variant="primary">+ New Task</Button>
          </Link>
        }
      />

      <Card title="Your Tasks" description="Manage submissions and track progress">
        <div className="space-y-5">
          <Tabs
            tabs={[
              { value: "active", label: "Active", badge: activeTasks.length > 0 ? activeTasks.length : undefined },
              { value: "completed", label: "Completed", badge: completedTasks.length > 0 ? completedTasks.length : undefined },
              { value: "disputed", label: "Issues", badge: disputedTasks.length > 0 ? disputedTasks.length : undefined },
            ]}
            active={activeTab}
            onChange={setActiveTab}
          />

          {displayTasks.length === 0 ? (
            <EmptyState
              title={
                activeTab === "active"
                  ? "No active tasks"
                  : activeTab === "completed"
                    ? "No completed tasks"
                    : "No disputes"
              }
              description="When you submit tasks, they'll appear here."
              action={
                activeTab === "active" ? (
                  <Link href="/student/submit-task">
                    <Button variant="secondary" size="sm">
                      Submit your first task
                    </Button>
                  </Link>
                ) : undefined
              }
            />
          ) : (
            <div className="grid gap-3">
              {displayTasks.map((task) => (
                <TaskCard key={task.id} task={task} href={`/student/tasks/${task.id}`} />
              ))}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
