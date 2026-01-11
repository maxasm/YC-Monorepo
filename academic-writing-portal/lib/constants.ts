export const TASK_STATUSES = [
  "pending_review",
  "awaiting_pricing",
  "approved",
  "in_progress",
  "awaiting_revisions",
  "completed",
  "disputed",
] as const;

export const ROLES = ["student", "writer", "admin"] as const;

export const ACADEMIC_LEVELS = ["Undergraduate", "Masters", "PhD"] as const;
export const CITATION_STYLES = ["APA", "MLA", "Chicago", "Harvard", "IEEE"] as const;
export const TASK_TYPES = ["Essay", "Research Paper", "Case Study", "Thesis", "Presentation"] as const;

export const PRICING_LABELS = {
  estimate: "AI estimate (read-only)",
  adminApproved: "Admin-approved price",
  final: "Final payable amount",
};
