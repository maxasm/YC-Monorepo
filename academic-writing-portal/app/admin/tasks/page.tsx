import "use client";

import { useState } from "react";
import { Card } from "@/components/common/card";
import { PageHeader } from "@/components/common/page-header";
import { Badge } from "@/components/common/badge";
import { Button } from "@/components/common/button";
import { ConfirmModal } from "@/components/common/confirm-modal";
import { PriceBreakdownView } from "@/components/common/price-breakdown";
import { Table } from "@/components/common/table";
import type { Task } from "@/types";

// Mock data for demo
const mockPendingTasks: Task[] = [
  {
    id: "task-pending-1",
    title: "Research Paper on Climate Change",
    subject: "Environmental Science",
    status: "pending_review",
    deadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    wordCount: 5000,
    academicLevel: "Masters",
    citationStyle: "APA",
    studentId: "student-1",
    price: {
      currency: "USD",
      estimate: 150,
    },
  },
  {
    id: "task-pending-2",
    title: "Case Study Analysis",
    subject: "Business",
    status: "awaiting_pricing",
    deadline: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000).toISOString(),
    wordCount: 2500,
    academicLevel: "Undergraduate",
    citationStyle: "Harvard",
    studentId: "student-2",
    price: {
      currency: "USD",
      estimate: 95,
    },
  },
  {
    id: "task-pending-3",
    title: "Essay on Shakespearean Tragedy",
    subject: "Literature",
    status: "pending_review",
    deadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    wordCount: 3000,
    academicLevel: "Undergraduate",
    citationStyle: "MLA",
    studentId: "student-3",
    price: {
      currency: "USD",
      estimate: 80,
    },
  },
];

export default function AdminTasksPage() {
  const [tasks, setTasks] = useState(mockPendingTasks);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [overridePrice, setOverridePrice] = useState<number | null>(null);
  const [confirmAction, setConfirmAction] = useState<"approve" | "override" | "reject" | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  async function handleApprove(task: Task) {
    setIsProcessing(true);
    try {
      // POST /api/tasks/{id}/approve
      await new Promise((resolve) => setTimeout(resolve, 800));
      setTasks(tasks.filter((t) => t.id !== task.id));
      setSelectedTask(null);
      setConfirmAction(null);
      alert("Task approved! Writer will be assigned.");
    } finally {
      setIsProcessing(false);
    }
  }

  async function handleOverride(task: Task) {
    setIsProcessing(true);
    try {
      // POST /api/tasks/{id}/approve with override_price
      await new Promise((resolve) => setTimeout(resolve, 800));
      setTasks(tasks.filter((t) => t.id !== task.id));
      setSelectedTask(null);
      setConfirmAction(null);
      setOverridePrice(null);
      alert("Task approved with custom price!");
    } finally {
      setIsProcessing(false);
    }
  }

  async function handleReject(task: Task) {
    setIsProcessing(true);
    try {
      // POST /api/tasks/{id}/reject
      await new Promise((resolve) => setTimeout(resolve, 800));
      setTasks(tasks.filter((t) => t.id !== task.id));
      setSelectedTask(null);
      setConfirmAction(null);
      alert("Task rejected. Student notified.");
    } finally {
      setIsProcessing(false);
    }
  }

  return (
    <div className="space-y-6 p-6">
      <PageHeader title="Task Management" description="Review submissions and approve pricing" />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Task queue */}
        <Card className="lg:col-span-1" title={`Pending Tasks (${tasks.length})`}>
          {tasks.length === 0 ? (
            <p className="text-sm text-slate-600">All tasks reviewed!</p>
          ) : (
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {tasks.map((task) => (
                <button
                  key={task.id}
                  onClick={() => {
                    setSelectedTask(task);
                    setOverridePrice(null);
                  }}
                  className={`w-full rounded-lg border px-3 py-2 text-left transition ${
                    selectedTask?.id === task.id
                      ? "border-indigo-500 bg-indigo-50"
                      : "border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-medium text-slate-900 line-clamp-1">{task.title}</span>
                    <Badge tone={task.status === "pending_review" ? "warning" : "warning"}>
                      {task.status === "pending_review" ? "Review" : "Price"}
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-600">
                    {task.wordCount.toLocaleString()} words · {task.price?.currency} {task.price?.estimate}
                  </p>
                </button>
              ))}
            </div>
          )}
        </Card>

        {/* Task details and approval controls */}
        <Card className="lg:col-span-2" title={selectedTask ? "Review Task" : "Select a task"}>
          {selectedTask ? (
            <div className="space-y-5">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">{selectedTask.title}</h3>
                <p className="mt-1 text-sm text-slate-600">{selectedTask.subject}</p>
              </div>

              <div className="grid grid-cols-2 gap-3 rounded-lg bg-slate-50 p-3 text-sm">
                <div>
                  <span className="text-slate-600">Academic Level</span>
                  <div className="font-medium text-slate-900">{selectedTask.academicLevel}</div>
                </div>
                <div>
                  <span className="text-slate-600">Word Count</span>
                  <div className="font-medium text-slate-900">{selectedTask.wordCount.toLocaleString()}</div>
                </div>
                <div>
                  <span className="text-slate-600">Citation Style</span>
                  <div className="font-medium text-slate-900">{selectedTask.citationStyle}</div>
                </div>
                <div>
                  <span className="text-slate-600">Deadline</span>
                  <div className="font-medium text-slate-900">
                    {new Date(selectedTask.deadline).toLocaleDateString()}
                  </div>
                </div>
              </div>

              {selectedTask.price && (
                <PriceBreakdownView
                  price={{
                    ...selectedTask.price,
                    adminApproved: overridePrice || selectedTask.price.estimate,
                  }}
                  readOnly
                />
              )}

              {selectedTask.status === "awaiting_pricing" && (
                <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
                  <label className="block text-sm font-medium text-amber-900">
                    Override AI Price (Optional)
                  </label>
                  <input
                    type="number"
                    value={overridePrice ?? selectedTask.price?.estimate ?? ""}
                    onChange={(e) => setOverridePrice(e.target.value ? Number(e.target.value) : null)}
                    className="mt-2 w-full rounded-md border border-amber-200 px-3 py-2 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
                    placeholder={`${selectedTask.price?.estimate || ""}`}
                  />
                  <p className="mt-1 text-xs text-amber-700">Leave blank to use AI estimate</p>
                </div>
              )}

              <div className="space-y-2 border-t border-slate-200 pt-4">
                <div className="flex gap-2">
                  <Button
                    variant="primary"
                    className="flex-1"
                    onClick={() => setConfirmAction("approve")}
                    disabled={isProcessing}
                  >
                    ✓ Approve & Assign
                  </Button>
                  <Button
                    variant="danger"
                    className="flex-1"
                    onClick={() => setConfirmAction("reject")}
                    disabled={isProcessing}
                  >
                    ✗ Reject
                  </Button>
                </div>
                {selectedTask.status === "awaiting_pricing" && (
                  <Button
                    variant="secondary"
                    className="w-full"
                    onClick={() => setConfirmAction("override")}
                    disabled={isProcessing || !overridePrice}
                  >
                    Apply Custom Price
                  </Button>
                )}
              </div>
            </div>
          ) : (
            <p className="text-sm text-slate-600">Choose a task from the queue to review.</p>
          )}
        </Card>
      </div>

      {/* Confirmation modals */}
      <ConfirmModal
        isOpen={confirmAction === "approve"}
        title="Approve Task?"
        description="This task will be approved with the AI-estimated price and assigned to available writers."
        confirmText="Approve"
        onConfirm={() => selectedTask && handleApprove(selectedTask)}
        onCancel={() => setConfirmAction(null)}
        isLoading={isProcessing}
      />

      <ConfirmModal
        isOpen={confirmAction === "override"}
        title="Apply Custom Price?"
        description={`This task will be approved at ${selectedTask?.price?.currency} ${overridePrice?.toFixed(2)}`}
        confirmText="Confirm Override"
        onConfirm={() => selectedTask && handleOverride(selectedTask)}
        onCancel={() => setConfirmAction(null)}
        isLoading={isProcessing}
      />

      <ConfirmModal
        isOpen={confirmAction === "reject"}
        title="Reject Task?"
        description="The student will be notified and can resubmit with revisions."
        confirmText="Reject"
        variant="danger"
        onConfirm={() => selectedTask && handleReject(selectedTask)}
        onCancel={() => setConfirmAction(null)}
        isLoading={isProcessing}
      />
    </div>
  );
}
