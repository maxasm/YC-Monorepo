import clsx from "clsx";

export type BadgeTone = "info" | "success" | "warning" | "danger" | "muted";

const toneClasses: Record<BadgeTone, string> = {
  info: "bg-indigo-50 text-indigo-700 ring-indigo-100",
  success: "bg-emerald-50 text-emerald-700 ring-emerald-100",
  warning: "bg-amber-50 text-amber-700 ring-amber-100",
  danger: "bg-red-50 text-red-700 ring-red-100",
  muted: "bg-slate-100 text-slate-700 ring-slate-200",
};

interface BadgeProps {
  children: React.ReactNode;
  tone?: BadgeTone;
  className?: string;
}

export function Badge({ children, tone = "muted", className }: BadgeProps) {
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset",
        toneClasses[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
