const Button = ({
  children,
  variant = "primary",
  loading,
  ...props
}) => {
  const styles = {
    primary: "bg-purple-600 hover:bg-purple-700 text-white",
    secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800",
    danger: "bg-red-600 hover:bg-red-700 text-white",
  };

  return (
    <button
      disabled={loading}
      className={`px-4 py-2 rounded-md font-medium transition
        ${styles[variant]}
        ${loading ? "opacity-70 cursor-not-allowed" : ""}
      `}
      {...props}
    >
      {loading ? "Processing..." : children}
    </button>
  );
};

export default Button;
