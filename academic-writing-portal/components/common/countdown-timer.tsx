import type { ReactNode } from "react";

interface CountdownTimerProps {
  deadlineISO: string;
  onExpired?: () => void;
}

export function useCountdownTimer(deadlineISO: string) {
  const now = new Date();
  const deadline = new Date(deadlineISO);
  const diffMs = deadline.getTime() - now.getTime();

  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);

  const isExpired = diffMs <= 0;
  const isUrgent = diffMs <= 24 * 60 * 60 * 1000; // < 24 hours

  return { days, hours, minutes, seconds, isExpired, isUrgent };
}

interface CountdownDisplayProps {
  deadline: string;
}

export function CountdownDisplay({ deadline }: CountdownDisplayProps) {
  const { days, hours, minutes, isExpired, isUrgent } = useCountdownTimer(deadline);

  if (isExpired) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-3">
        <p className="text-sm font-semibold text-red-700">⏰ Deadline passed</p>
      </div>
    );
  }

  return (
    <div className={`rounded-lg border-2 p-3 ${isUrgent ? "border-red-200 bg-red-50" : "border-indigo-200 bg-indigo-50"}`}>
      <p className={`text-sm font-semibold ${isUrgent ? "text-red-700" : "text-indigo-700"}`}>
        ⏱️ Time remaining: <span className="font-mono text-lg">{days}d {hours}h {minutes}m</span>
      </p>
      {isUrgent && <p className="mt-1 text-xs text-red-600">Urgent: Less than 24 hours left!</p>}
    </div>
  );
}
