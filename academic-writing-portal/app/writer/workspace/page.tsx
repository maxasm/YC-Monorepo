"use client";

import { useState } from "react";
import { Card } from "@/components/common/card";
import { PageHeader } from "@/components/common/page-header";
import { Button } from "@/components/common/button";
import { Badge } from "@/components/common/badge";
import { CountdownDisplay } from "@/components/common/countdown-timer";
import { FileDropzone } from "@/components/forms/file-dropzone";
import { TextareaField } from "@/components/forms/textarea-field";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import type { Task, Revision } from "@/types";

// Mock data
const mockTask: Task = {
  id: "task-1",
  title: "Research Paper on Climate Change",
  subject: "Environmental Science",
  status: "in_progress",
  deadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
  wordCount: 5000,
  academicLevel: "Masters",
  citationStyle: "APA",
  instructions: "Focus on recent climate policy changes and their impacts. Include at least 15 peer-reviewed sources.",
  price: { currency: "USD", estimate: 150, final: 145 },
};

const mockRevisions: Revision[] = [
  {
    id: "rev-1",
    taskId: "task-1",
    note: "Please add more data on carbon emissions trends",
    status: "requested",
    submittedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "rev-2",
    taskId: "task-1",
    note: "Updated with emissions data from 2020-2024",
    status: "completed",
    submittedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

const draftSchema = z.object({
  content: z.string().min(100, "Content must be at least 100 characters"),
  files: z.array(z.instanceof(File)).optional(),
});

type DraftFormData = z.infer<typeof draftSchema>;

export default function WriterWorkspacePage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submittedRevisions, setSubmittedRevisions] = useState<Revision[]>(mockRevisions);

  const { control, handleSubmit, formState, reset } = useForm<DraftFormData>({
    resolver: zodResolver(draftSchema),
    defaultValues: { content: "", files: [] },
  });

  async function onSubmitDraft(data: DraftFormData) {
    setIsSubmitting(true);
    setError(null);

    try {
      // In production: POST /api/tasks/{id}/drafts
      // Simulate submission
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const newRevision: Revision = {
        id: `rev-${Date.now()}`,
        taskId: mockTask.id,
        note: data.content,
        status: "submitted",
        submittedAt: new Date().toISOString(),
      };

      setSubmittedRevisions([...submittedRevisions, newRevision]);
      reset();
      alert("Draft submitted successfully!");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit draft");
    } finally {
      setIsSubmitting(false);
    }
  }

  const pendingRevision = submittedRevisions.find((r) => r.status === "requested");

  return (
    <div className="space-y-6 p-6">
      <PageHeader
        title="Workspace"
        description={mockTask.title}
        actions={<Badge tone="info">Status: {mockTask.status}</Badge>}
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Task info sidebar */}
        <div className="space-y-4 lg:col-span-1">
          <Card title="Deadline">
            <CountdownDisplay deadline={mockTask.deadline} />
          </Card>

          <Card title="Compensation">
            <div className="text-center">
              <p className="text-sm text-slate-600">Your earning</p>
              <p className="mt-2 text-2xl font-bold text-indigo-700">
                {mockTask.price.currency} {mockTask.price.final?.toFixed(2)}
              </p>
            </div>
          </Card>

          <Card title="Requirements">
            <div className="space-y-2 text-sm">
              <div>
                <span className="font-medium text-slate-700">Word count:</span>
                <span className="ml-2 text-slate-600">{mockTask.wordCount.toLocaleString()}</span>
              </div>
              <div>
                <span className="font-medium text-slate-700">Citation:</span>
                <span className="ml-2 text-slate-600">{mockTask.citationStyle}</span>
              </div>
              <div>
                <span className="font-medium text-slate-700">Level:</span>
                <span className="ml-2 text-slate-600">{mockTask.academicLevel}</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Workspace main area */}
        <div className="space-y-6 lg:col-span-2">
          {/* Instructions card */}
          <Card title="Task Instructions">
            <div className="text-sm text-slate-700">{mockTask.instructions}</div>
          </Card>

          {/* Revision tracker */}
          <Card title="Revision History">
            {submittedRevisions.length === 0 ? (
              <p className="text-sm text-slate-600">No revisions yet.</p>
            ) : (
              <div className="space-y-3">
                {submittedRevisions.map((rev) => (
                  <div key={rev.id} className="rounded-lg border border-slate-200 p-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <Badge
                          tone={rev.status === "requested" ? "warning" : rev.status === "completed" ? "success" : "muted"}
                        >
                          {rev.status === "requested" ? "Feedback" : rev.status === "completed" ? "Resolved" : "Submitted"}
                        </Badge>
                        <p className="mt-2 text-sm text-slate-700">{rev.note}</p>
                      </div>
                      <span className="text-xs text-slate-500">
                        {new Date(rev.submittedAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>

          {/* Draft submission */}
          <Card title="Submit Draft" className="border-indigo-200 bg-indigo-50">
            <form onSubmit={handleSubmit(onSubmitDraft)} className="space-y-5">
              {pendingRevision && (
                <div className="rounded-lg border-l-4 border-amber-400 bg-amber-50 p-3">
                  <p className="text-sm font-semibold text-amber-900">Pending Feedback:</p>
                  <p className="mt-1 text-sm text-amber-800">{pendingRevision.note}</p>
                </div>
              )}

              <TextareaField
                control={control}
                name="content"
                label="Draft Content / Revision Note"
                placeholder="Paste your draft or describe revisions made..."
                rows={8}
                required
              />

              <FileDropzone
                control={control}
                name="files"
                label="Attach Document (Optional)"
                description="PDF, DOCX, or TXT file"
                accept=".pdf,.docx,.txt,.doc"
                multiple={false}
              />

              {error && <div className="rounded-md bg-red-50 p-3 text-sm text-red-700">{error}</div>}

              <Button type="submit" variant="primary" loading={isSubmitting} disabled={formState.isSubmitting}>
                {pendingRevision ? "Submit Revision" : "Submit Draft"}
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}
