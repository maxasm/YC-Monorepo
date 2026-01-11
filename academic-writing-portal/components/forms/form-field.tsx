interface FormFieldProps {
  label: string;
  description?: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}

export function FormField({ label, description, error, required, children }: FormFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-baseline justify-between gap-2">
        <label className="text-sm font-medium text-slate-800">
          {label}
          {required && <span className="text-red-600"> *</span>}
        </label>
        {description && <span className="text-xs text-slate-500">{description}</span>}
      </div>
      {children}
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
