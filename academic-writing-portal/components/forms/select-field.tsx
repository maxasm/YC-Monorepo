import { Controller, Control, FieldValues } from "react-hook-form";
import { FormField } from "./form-field";

interface SelectOption {
  label: string;
  value: string;
}

interface SelectFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: keyof T & string;
  label: string;
  options: SelectOption[];
  placeholder?: string;
  description?: string;
  required?: boolean;
}

export function SelectField<T extends FieldValues>({
  control,
  name,
  label,
  options,
  placeholder,
  description,
  required,
}: SelectFieldProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormField label={label} description={description} error={fieldState.error?.message} required={required}>
          <select
            {...field}
            className="w-full rounded-md border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </FormField>
      )}
    />
  );
}
