import "use client";

import { useState } from "react";
import { Card } from "@/components/common/card";
import { PageHeader } from "@/components/common/page-header";
import { TaskCard } from "@/components/common/task-card";
import { EmptyState } from "@/components/common/empty-state";
import { Button } from "@/components/common/button";
import { Badge } from "@/components/common/badge";
import type { Task, EarningsSummary } from "@/types";

// Mock data for demo
const mockAssignedTasks: Task[] = [
  {
    id: "task-1",
    title: "Research Paper on Climate Change",
    subject: "Environmental Science",
    status: "in_progress",
    deadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    wordCount: 5000,
    academicLevel: "Masters",
    citationStyle: "APA",
    instructions: "Focus on recent climate policy changes and their impacts...",
    price: {
      currency: "USD",
      estimate: 150,
      final: 145,
    },
  },
  {
    id: "task-2",
    title: "Case Study Analysis",
    subject: "Business",
    status: "approved",
    deadline: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000).toISOString(),
    wordCount: 2500,
    academicLevel: "Undergraduate",
    citationStyle: "Harvard",
    instructions: "Analyze a Fortune 500 company's marketing strategy...",
    price: {
      currency: "USD",
      estimate: 95,
      final: 95,
    },
  },
];

const mockEarnings: EarningsSummary = {
  available: 320.5,
  pending: 145,
  lifetime: 2850,
  currency: "USD",
};

export default function WriterDashboardPage() {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const inProgressTasks = mockAssignedTasks.filter((t) => t.status === "in_progress");
  const approvedTasks = mockAssignedTasks.filter((t) => t.status === "approved");

  return (
    <div className="space-y-6 p-6">
      <PageHeader
        title="Writer Dashboard"
        description="Track your assigned tasks and earnings"
      />

      {/* Earnings summary */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card className="bg-emerald-50">
          <div className="text-center">
            <p className="text-sm text-slate-600">Available</p>
            <p className="mt-1 text-3xl font-bold text-emerald-700">
              {mockEarnings.currency} {mockEarnings.available.toFixed(2)}
            </p>
            <p className="mt-2 text-xs text-slate-600">Ready to withdraw</p>
          </div>
        </Card>
        <Card className="bg-amber-50">
          <div className="text-center">
            <p className="text-sm text-slate-600">Pending</p>
            <p className="mt-1 text-3xl font-bold text-amber-700">
              {mockEarnings.currency} {mockEarnings.pending.toFixed(2)}
            </p>
            <p className="mt-2 text-xs text-slate-600">Awaiting completion</p>
          </div>
        </Card>
        <Card className="bg-indigo-50">
          <div className="text-center">
            <p className="text-sm text-slate-600">Lifetime</p>
            <p className="mt-1 text-3xl font-bold text-indigo-700">
              {mockEarnings.currency} {mockEarnings.lifetime.toFixed(2)}
            </p>
            <p className="mt-2 text-xs text-slate-600">Total earned</p>
          </div>
        </Card>
      </div>

      {/* Tasks grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Task list */}
        <Card className="lg:col-span-1" title="Assigned Tasks">
          {mockAssignedTasks.length === 0 ? (
            <EmptyState title="No tasks assigned" description="Check back soon for new assignments." />
          ) : (
            <div className="space-y-2">
              {mockAssignedTasks.map((task) => (
                <button
                  key={task.id}
                  onClick={() => setSelectedTask(task)}
                  className={`w-full rounded-lg border px-3 py-2 text-left transition ${
                    selectedTask?.id === task.id
                      ? "border-indigo-500 bg-indigo-50"
                      : "border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-medium text-slate-900 line-clamp-1">{task.title}</span>
                    <Badge tone={task.status === "in_progress" ? "info" : "success"}>
                      {task.status === "in_progress" ? "In Progress" : "Approved"}
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-600">{task.wordCount.toLocaleString()} words</p>
                </button>
              ))}
            </div>
          )}
        </Card>

        {/* Task details */}
        <Card className="lg:col-span-2" title={selectedTask ? "Task Details" : "Select a task"}>
          {selectedTask ? (
            <div className="space-y-5">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">{selectedTask.title}</h3>
                <p className="mt-1 text-sm text-slate-600">{selectedTask.subject}</p>
              </div>

              <div className="grid grid-cols-3 gap-3 rounded-lg bg-slate-50 p-3 text-sm">
                <div>
                  <span className="text-slate-600">Level</span>
                  <div className="font-medium text-slate-900">{selectedTask.academicLevel}</div>
                </div>
                <div>
                  <span className="text-slate-600">Words</span>
                  <div className="font-medium text-slate-900">{selectedTask.wordCount.toLocaleString()}</div>
                </div>
                <div>
                  <span className="text-slate-600">Citation</span>
                  <div className="font-medium text-slate-900">{selectedTask.citationStyle}</div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-slate-900">Instructions</h4>
                <p className="mt-2 text-sm text-slate-700">{selectedTask.instructions}</p>
              </div>

              <div className="border-t border-slate-200 pt-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-700">Your Compensation</span>
                  <span className="text-xl font-bold text-indigo-700">
                    {selectedTask.price?.currency} {(selectedTask.price?.final || selectedTask.price?.estimate)?.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="primary" onClick={() => alert("Opening workspace...")}>
                  Open Workspace
                </Button>
                <Button variant="secondary">View Messages</Button>
              </div>
            </div>
          ) : (
            <EmptyState title="No task selected" description="Choose a task from the list to view details." />
          )}
        </Card>
      </div>
    </div>
  );
}
