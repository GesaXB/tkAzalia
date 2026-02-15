interface FormInputProps {
  label: string;
  type: "text" | "email" | "tel" | "password";
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  icon?: React.ReactNode;
  toggleIcon?: React.ReactNode;
  onToggleVisibility?: () => void;
  error?: string;
}

export default function FormInput({
  label,
  type,
  placeholder,
  value,
  onChange,
  required = true,
  icon,
  toggleIcon,
  onToggleVisibility,
  error,
}: FormInputProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon}
          </div>
        )}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full pl-10 pr-12 py-3 rounded-xl border border-slate-200 focus:border-[#01793B] focus:ring-2 focus:ring-[#01793B]/20 outline-none transition-all bg-white shadow-sm"
          required={required}
        />
        {toggleIcon && (
          <button
            type="button"
            onClick={onToggleVisibility}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            {toggleIcon}
          </button>
        )}
      </div>
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}
