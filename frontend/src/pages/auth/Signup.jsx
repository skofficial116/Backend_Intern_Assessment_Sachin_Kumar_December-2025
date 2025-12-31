import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import { signup } from "../../api/auth.api";
import toast from "react-hot-toast"; // import toast

const Signup = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const emailValid = useMemo(
    () => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email),
    [form.email]
  );

  const passwordChecks = useMemo(
    () => ({
      length: form.password.length >= 8,
      uppercase: /[A-Z]/.test(form.password),
      lowercase: /[a-z]/.test(form.password),
      number: /\d/.test(form.password),
      special: /[^A-Za-z0-9]/.test(form.password),
    }),
    [form.password]
  );

  const passwordStrong = Object.values(passwordChecks).every(Boolean);

  const passwordsMatch =
    form.password.length > 0 &&
    form.confirmPassword.length > 0 &&
    form.password === form.confirmPassword;

  const formValid =
    form.fullName && emailValid && passwordStrong && passwordsMatch;

  const submit = async (e) => {
    e.preventDefault();
    if (!formValid) return;

    try {
      setLoading(true);
      const res = await signup(form);

      if (res.success) {
        toast.success(res.message || "Signup successful");
        navigate("/login");
      } else {
        toast.error(res.message || res.error || "Signup failed");
      }
    } catch (err) {
      toast.error(err.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
      <form
        onSubmit={submit}
        className="w-full max-w-md rounded-2xl bg-white/80 backdrop-blur p-8 shadow-xl space-y-6"
      >
        <div className="text-center space-y-1">
          <h2 className="text-3xl font-bold text-gray-900">Create account</h2>
          <p className="text-sm text-gray-500">Strong credentials keep you safe</p>
        </div>

        <Input
          label="Full Name"
          value={form.fullName}
          onChange={(e) => setForm({ ...form, fullName: e.target.value })}
        />

        <div className="space-y-1">
          <Input
            label="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          {form.email && (
            <p
              className={`text-xs ${emailValid ? "text-green-600" : "text-red-500"}`}
            >
              {emailValid ? "Valid email address" : "Invalid email format"}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Input
            label="Password"
            type={showPassword ? "text" : "password"}
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <div className="grid grid-cols-2 gap-1 text-xs">
            <span className={passwordChecks.length ? "text-green-600" : "text-gray-400"}>
              8+ characters
            </span>
            <span className={passwordChecks.uppercase ? "text-green-600" : "text-gray-400"}>
              Uppercase
            </span>
            <span className={passwordChecks.lowercase ? "text-green-600" : "text-gray-400"}>
              Lowercase
            </span>
            <span className={passwordChecks.number ? "text-green-600" : "text-gray-400"}>
              Number
            </span>
            <span className={passwordChecks.special ? "text-green-600" : "text-gray-400"}>
              Special char
            </span>
          </div>

          <Input
            label="Confirm Password"
            type={showPassword ? "text" : "password"}
            value={form.confirmPassword}
            onChange={(e) =>
              setForm({ ...form, confirmPassword: e.target.value })
            }
          />

          {form.confirmPassword && (
            <p className={`text-xs ${passwordsMatch ? "text-green-600" : "text-red-500"}`}>
              {passwordsMatch ? "Passwords match" : "Passwords do not match"}
            </p>
          )}

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-xs font-medium text-indigo-600 hover:text-indigo-800"
          >
            {showPassword ? "Hide passwords" : "Show passwords"}
          </button>
        </div>

        <Button
          loading={loading}
          disabled={!formValid}
          className={`w-full py-3 rounded-lg font-semibold text-white shadow-md ${
            formValid
              ? "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Signup
        </Button>

        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-indigo-600 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
