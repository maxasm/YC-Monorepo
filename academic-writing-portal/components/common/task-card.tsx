import type { Task } from "@/types";
import { Badge } from "./badge";
import Link from "next/link";

interface TaskCardProps {
  task: Task;
  href?: string;
}

const statusLabels: Record<string, { label: string; tone: "info" | "warning" | "success" | "danger" | "muted" }> = {
  pending_review: { label: "Pending Review", tone: "warning" },
  awaiting_pricing: { label: "Awaiting Pricing", tone: "warning" },
  approved: { label: "Approved", tone: "info" },
  in_progress: { label: "In Progress", tone: "info" },
  awaiting_revisions: { label: "Awaiting Revisions", tone: "warning" },
  completed: { label: "Completed", tone: "success" },
  disputed: { label: "Disputed", tone: "danger" },
};

export function TaskCard({ task, href }: TaskCardProps) {
  const statusInfo = statusLabels[task.status] || { label: task.status, tone: "muted" as const };
  const deadlineDate = new Date(task.deadline);
  const now = new Date();
  const daysLeft = Math.ceil((deadlineDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

  const content = (
    <div className="flex flex-col gap-3 rounded-lg border border-slate-200 bg-white p-4 transition hover:shadow-md">
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1">
          <h4 className="font-semibold text-slate-900">{task.title}</h4>
          <p className="text-sm text-slate-600">{task.subject}</p>
        </div>
        <Badge tone={statusInfo.tone}>{statusInfo.label}</Badge>
      </div>

      <div className="grid grid-cols-3 gap-3 text-xs text-slate-600">
        <div>
          <span className="block font-medium text-slate-700">Level</span>
          {task.academicLevel}
        </div>
        <div>
          <span className="block font-medium text-slate-700">Words</span>
          {task.wordCount.toLocaleString()}
        </div>
        <div>
          <span className="block font-medium text-slate-700">Citation</span>
          {task.citationStyle}
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-slate-200 pt-2 text-xs">
        <div>
          <span className="text-slate-600">Deadline in </span>
          <span className={`font-semibold ${daysLeft < 3 ? "text-red-600" : "text-slate-900"}`}>
            {daysLeft} day{daysLeft !== 1 ? "s" : ""}
          </span>
        </div>
        {task.price && (
          <div className="font-semibold text-indigo-700">
            {task.price.currency} {task.price.final || task.price.adminApproved || task.price.estimate}
          </div>
        )}
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block">
        {content}
      </Link>
    );
  }

  return content;
}
