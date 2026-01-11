import "use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { api } from "@/lib/api";
import { Button } from "@/components/common/button";
import { Card } from "@/components/common/card";
import { PageHeader } from "@/components/common/page-header";
import { TextField } from "@/components/forms/text-field";
import { SelectField } from "@/components/forms/select-field";
import { TextareaField } from "@/components/forms/textarea-field";
import { FileDropzone } from "@/components/forms/file-dropzone";
import { PriceBreakdownView } from "@/components/common/price-breakdown";
import { TASK_TYPES, ACADEMIC_LEVELS, CITATION_STYLES } from "@/lib/constants";
import type { PriceBreakdown } from "@/types";

const submitTaskSchema = z.object({
  taskType: z.string().min(1, "Please select a task type"),
  academicLevel: z.string().min(1, "Please select an academic level"),
  subject: z.string().min(2, "Subject must be at least 2 characters"),
  wordCount: z.coerce.number().min(100, "Minimum 100 words").max(50000, "Maximum 50,000 words"),
  deadline: z.string().min(1, "Please select a deadline"),
  citationStyle: z.string().min(1, "Please select a citation style"),
  instructions: z.string().min(10, "Instructions must be at least 10 characters"),
  files: z.array(z.instanceof(File)).optional(),
});

type SubmitTaskFormData = z.infer<typeof submitTaskSchema>;

interface EstimatePriceResponse {
  price: PriceBreakdown;
}

export default function SubmitTaskPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [estimatedPrice, setEstimatedPrice] = useState<PriceBreakdown | null>(null);
  const [step, setStep] = useState<"form" | "review">("form");

  const { control, handleSubmit, formState, watch } = useForm<SubmitTaskFormData>({
    resolver: zodResolver(submitTaskSchema),
    defaultValues: {
      taskType: "",
      academicLevel: "",
      subject: "",
      wordCount: 3000,
      deadline: "",
      citationStyle: "",
      instructions: "",
      files: [],
    },
  });

  const formData = watch();

  async function getEstimate(data: SubmitTaskFormData) {
    try {
      const response = await api.post<EstimatePriceResponse>("/api/tasks/estimate-price", {
        taskType: data.taskType,
        academicLevel: data.academicLevel,
        wordCount: data.wordCount,
        citationStyle: data.citationStyle,
      });
      setEstimatedPrice(response.price);
      setStep("review");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to estimate price");
    }
  }

  async function onSubmit(data: SubmitTaskFormData) {
    setIsSubmitting(true);
    setError(null);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("taskType", data.taskType);
      formDataToSend.append("academicLevel", data.academicLevel);
      formDataToSend.append("subject", data.subject);
      formDataToSend.append("wordCount", String(data.wordCount));
      formDataToSend.append("deadline", data.deadline);
      formDataToSend.append("citationStyle", data.citationStyle);
      formDataToSend.append("instructions", data.instructions);

      if (data.files && data.files.length > 0) {
        data.files.forEach((file) => {
          formDataToSend.append("files", file);
        });
      }

      await api.post("/api/tasks", formDataToSend);
      router.push("/student/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit task");
      setIsSubmitting(false);
    }
  }

  return (
    <div className="space-y-6 p-6">
      <PageHeader title="Submit a Task" description="Get AI pricing and submit for admin approval." />

      <div className="mx-auto max-w-2xl">
        {step === "form" ? (
          <Card title="Task Details" description="Provide complete information for accurate pricing">
            <form onSubmit={handleSubmit(getEstimate)} className="space-y-6">
              <SelectField
                control={control}
                name="taskType"
                label="Task Type"
                options={TASK_TYPES.map((t) => ({ label: t, value: t }))}
                placeholder="Select task type"
                required
              />

              <SelectField
                control={control}
                name="academicLevel"
                label="Academic Level"
                options={ACADEMIC_LEVELS.map((l) => ({ label: l, value: l }))}
                placeholder="Select level"
                required
              />

              <TextField
                control={control}
                name="subject"
                label="Subject"
                placeholder="e.g., Environmental Science, Literature"
                required
              />

              <TextField
                control={control}
                name="wordCount"
                label="Word Count"
                type="number"
                placeholder="3000"
                required
              />

              <TextField
                control={control}
                name="deadline"
                label="Deadline"
                type="date"
                required
              />

              <SelectField
                control={control}
                name="citationStyle"
                label="Citation Style"
                options={CITATION_STYLES.map((s) => ({ label: s, value: s }))}
                placeholder="Select citation style"
                required
              />

              <TextareaField
                control={control}
                name="instructions"
                label="Task Instructions"
                placeholder="Detailed requirements, rubric, references, etc."
                rows={5}
                required
              />

              <FileDropzone
                control={control}
                name="files"
                label="Supporting Files (Optional)"
                description="Upload references, rubrics, or additional materials"
                accept=".pdf,.docx,.txt,.doc"
                multiple
              />

              {error && <div className="rounded-md bg-red-50 p-3 text-sm text-red-700">{error}</div>}

              <div className="flex gap-3">
                <Button variant="secondary" type="button" onClick={() => router.back()}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary" disabled={formState.isSubmitting}>
                  Get AI Price Estimate
                </Button>
              </div>
            </form>
          </Card>
        ) : (
          <div className="space-y-6">
            <Card>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-900">Review Your Task</h3>

                <div className="grid grid-cols-2 gap-3 border-b border-slate-200 pb-4 text-sm">
                  <div>
                    <span className="text-slate-600">Type</span>
                    <div className="font-medium text-slate-900">{formData.taskType}</div>
                  </div>
                  <div>
                    <span className="text-slate-600">Level</span>
                    <div className="font-medium text-slate-900">{formData.academicLevel}</div>
                  </div>
                  <div>
                    <span className="text-slate-600">Subject</span>
                    <div className="font-medium text-slate-900">{formData.subject}</div>
                  </div>
                  <div>
                    <span className="text-slate-600">Word Count</span>
                    <div className="font-medium text-slate-900">{formData.wordCount.toLocaleString()}</div>
                  </div>
                  <div>
                    <span className="text-slate-600">Deadline</span>
                    <div className="font-medium text-slate-900">{new Date(formData.deadline).toLocaleDateString()}</div>
                  </div>
                  <div>
                    <span className="text-slate-600">Citation Style</span>
                    <div className="font-medium text-slate-900">{formData.citationStyle}</div>
                  </div>
                </div>

                <div>
                  <span className="text-sm text-slate-600">Instructions</span>
                  <p className="mt-1 rounded bg-slate-50 p-3 text-sm text-slate-700">{formData.instructions}</p>
                </div>
              </div>
            </Card>

            {estimatedPrice && <PriceBreakdownView price={estimatedPrice} readOnly />}

            {error && <div className="rounded-md bg-red-50 p-3 text-sm text-red-700">{error}</div>}

            <div className="flex gap-3">
              <Button variant="secondary" type="button" onClick={() => setStep("form")}>
                Edit Details
              </Button>
              <Button
                type="button"
                variant="primary"
                loading={isSubmitting}
                disabled={isSubmitting}
                onClick={handleSubmit(onSubmit)}
              >
                Submit & Await Admin Approval
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
