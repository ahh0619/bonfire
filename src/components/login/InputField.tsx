const InputField = ({
  id,
  label,
  type,
  placeholder,
  required = true,
}: {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  required?: boolean;
}) => (
  <div className="w-full mb-4">
    <label
      htmlFor={id}
      className="block text-base font-semibold text-gray-800 mb-1"
    >
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type={type}
      id={id}
      name={id}
      className="w-full border-b border-gray-300 focus:outline-none focus:border-red-500 py-2 text-sm placeholder-gray-400"
      placeholder={placeholder}
      required={required}
    />
  </div>
);

export default InputField;
