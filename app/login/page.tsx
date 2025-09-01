"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";


const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Import apiClient
  const { apiClient } = require("../../lib/apiClient");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        if (user && user.id) {
          console.log("User session restored:", user);
        } else {
          console.warn("Invalid user data in localStorage. Redirecting to login.");
          router.push("/login");
        }
      } catch (error) {
        console.error("Failed to parse user data from localStorage. Redirecting to login.", error);
        router.push("/login");
      }
    } else {
      console.info("No user session found. Redirecting to login.");
      router.push("/login");
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Use correct backend endpoint
      const data = await apiClient.post("/auth/login", {
        email: credentials.email,
        password: credentials.password,
      });
      if (data && data.token && data.user) {
        localStorage.setItem("authToken", data.token);
        // localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("userId", data.user.id);

        router.push("/dashboard");
      } else {
        setError(data.message || "Invalid credentials. Please try again.");
      }
    } catch (err: any) {
      setError(err.message || "Network error. Please try again later.");
    }
    setLoading(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  // Optionally, you can keep this for demo/testing
  const fillDemoCredentials = () => {
    setCredentials({
      email: "user@carepoint.com",
      password: "user123",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-green-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-green-600 rounded-full flex items-center justify-center">
            <svg
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="mt-6 text-2xl font-bold text-gray-900">
            Sign in to CarePoint
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Don’t have an account?{" "}
            <Link
              href="/signup"
              className="font-medium text-green-600 hover:text-green-500"
            >
              Create one
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={credentials.email}
                onChange={handleInputChange}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                value={credentials.password}
                onChange={handleInputChange}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm pr-10"
                placeholder="Password"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-0 flex items-center px-3 focus:outline-none"
                tabIndex={-1}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
              {error}
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </div>

          <div className="mt-6 text-center">
            {/* <button
              type="button"
              onClick={fillDemoCredentials}
              className="text-xs bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded border"
            >
              Fill Demo User Credentials
            </button> */}
          </div>

          <div className="flex items-center justify-between mt-4">
            <Link
              href="/"
              className="text-sm font-medium text-green-600 hover:text-green-500"
            >
              Back to Home
            </Link>
            <Link
              href="/forgot-password"
              className="text-sm font-medium text-green-600 hover:text-green-500"
            >
              Forgot Password?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
