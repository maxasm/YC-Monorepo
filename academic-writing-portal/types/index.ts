export type Role = "student" | "writer" | "admin";

export type TaskStatus =
  | "pending_review"
  | "awaiting_pricing"
  | "approved"
  | "in_progress"
  | "awaiting_revisions"
  | "completed"
  | "disputed";

export interface PriceBreakdown {
  currency: string;
  estimate: number;
  adminApproved?: number;
  final?: number;
  components?: Array<{
    label: string;
    value: number;
  }>;
}

export interface Task {
  id: string;
  title: string;
  subject: string;
  status: TaskStatus;
  deadline: string;
  wordCount: number;
  academicLevel: string;
  citationStyle: string;
  instructions?: string;
  assignedWriterId?: string;
  studentId?: string;
  price?: PriceBreakdown;
  createdAt?: string;
  updatedAt?: string;
}

export interface Message {
  id: string;
  taskId: string;
  senderRole: Role;
  senderName: string;
  content: string;
  sentAt: string;
}

export interface Revision {
  id: string;
  taskId: string;
  note: string;
  status: "submitted" | "requested" | "completed";
  submittedAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
}

export interface AnalyticsPoint {
  label: string;
  value: number;
}

export interface EarningsSummary {
  available: number;
  pending: number;
  lifetime: number;
  currency: string;
}

export interface TableColumn<T> {
  key: keyof T & string;
  header: string;
  render?: (row: T) => React.ReactNode;
  className?: string;
}
