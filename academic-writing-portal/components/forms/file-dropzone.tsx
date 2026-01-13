import { Control, Controller, FieldValues } from "react-hook-form";
import { useId } from "react";
import { FormField } from "./form-field";

interface FileDropzoneProps<T extends FieldValues> {
  control: Control<T>;
  name: keyof T & string;
  label: string;
  description?: string;
  required?: boolean;
  accept?: string;
  multiple?: boolean;
}

export function FileDropzone<T extends FieldValues>({
  control,
  name,
  label,
  description,
  required,
  accept,
  multiple,
}: FileDropzoneProps<T>) {
  const inputId = useId();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormField label={label} description={description} error={fieldState.error?.message} required={required}>
          <label
            htmlFor={inputId}
            className="flex w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-md border border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-center text-sm text-slate-600 transition hover:border-indigo-400 hover:bg-indigo-50"
          >
            <div className="text-sm font-medium text-slate-900">Drop files or click to upload</div>
            <div className="text-xs text-slate-500">PDF, DOCX, or TXT</div>
            <input
              id={inputId}
              type="file"
              className="sr-only"
              accept={accept}
              multiple={multiple}
              onChange={(event) => {
                const files = event.target.files ? Array.from(event.target.files) : [];
                field.onChange(files);
              }}
            />
            {Array.isArray(field.value) && field.value.length > 0 && (
              <ul className="w-full list-disc space-y-1 text-left text-xs text-slate-600">
                {field.value.map((file: File) => (
                  <li key={file.name}>{file.name}</li>
                ))}
              </ul>
            )}
          </label>
        </FormField>
      )}
    />
  );
}
