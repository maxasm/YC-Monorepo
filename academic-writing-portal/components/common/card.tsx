import clsx from "clsx";
import type { ReactNode } from "react";

interface CardProps {
  title?: string;
  description?: string;
  className?: string;
  children: ReactNode;
  actions?: ReactNode;
}

export function Card({ title, description, className, children, actions }: CardProps) {
  return (
    <section className={clsx("rounded-xl border border-slate-200 bg-white shadow-sm", className)}>
      {(title || actions) && (
        <header className="flex items-start justify-between gap-3 border-b border-slate-200 px-5 py-4">
          <div>
            {title && <h3 className="text-base font-semibold text-slate-900">{title}</h3>}
            {description && <p className="text-sm text-slate-600">{description}</p>}
          </div>
          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </header>
      )}
      <div className="px-5 py-4">{children}</div>
    </section>
  );
}
