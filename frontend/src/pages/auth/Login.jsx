import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import { login } from "../../api/auth.api";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast"; // import toast

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const submit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await login(form);

      // Check API response
      if (res.success) {
        setUser(res.data);
        toast.success(res.message || "Login successful");
        navigate("/profile");
      } else {
        toast.error(res.message || res.error || "Login failed");
      }
    } catch (err) {
      toast.error(err.message || "Login failed");
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
          <h2 className="text-3xl font-bold text-gray-900">Welcome back</h2>
          <p className="text-sm text-gray-500">Login to continue</p>
        </div>

        <Input
          label="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <div className="space-y-2">
          <Input
            label="Password"
            type={showPassword ? "text" : "password"}
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-xs font-medium text-indigo-600 hover:text-indigo-800"
          >
            {showPassword ? "Hide password" : "Show password"}
          </button>
        </div>

        <Button
          loading={loading}
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 rounded-lg shadow-md"
        >
          Login
        </Button>

        <p className="text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link to="/signup" className="font-semibold text-indigo-600 hover:underline">
            Signup
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
