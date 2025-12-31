const Input = ({
  label,
  type = "text",
  value,
  onChange,
  error,
  ...props
}) => {
  return (
    <div className="space-y-1">
      {label && (
        <label className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      <input
        type={type}
        value={value}
        onChange={onChange}
        className={`w-full px-3 py-2 border rounded-md outline-none transition
          ${error ? "border-red-500" : "border-gray-300 focus:border-purple-600"}
        `}
        {...props}
      />

      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
};

export default Input;
