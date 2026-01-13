import { Controller, Control, FieldValues } from "react-hook-form";
import { FormField } from "./form-field";

interface TextFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: keyof T & string;
  label: string;
  placeholder?: string;
  description?: string;
  type?: string;
  required?: boolean;
}

export function TextField<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  description,
  type = "text",
  required,
}: TextFieldProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormField label={label} description={description} error={fieldState.error?.message} required={required}>
          <input
            {...field}
            type={type}
            placeholder={placeholder}
            className="w-full rounded-md border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />
        </FormField>
      )}
    />
  );
}
