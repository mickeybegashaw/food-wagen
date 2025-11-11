import { AlertCircle } from "lucide-react";

export default function InputField({
  name,
  placeholder,
  value,
  onChange,
  error,
}: {
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: any) => void;
  error?: string;
}) {
  return (
    <div>
      <input
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-lg bg-gray-100 px-4 py-3 text-gray-700 placeholder-gray-500 focus:bg-gray-200 focus:outline-none"
      />

      {error && (
        <div className="mt-2 flex items-center gap-2 text-red-500">
          <AlertCircle className="h-4 w-4" />
          <span className="text-sm font-medium">{error}</span>
        </div>
      )}
    </div>
  );
}
