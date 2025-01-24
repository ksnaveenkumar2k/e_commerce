import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
    role: "user",
  });
  const [errors, setErrors] = useState<{
    full_name?: string;
    email?: string;
    password?: string;
  }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const validateForm = () => {
    const newErrors: {
      full_name?: string;
      email?: string;
      password?: string;
    } = {};

    if (!formData.full_name.trim()) {
      newErrors.full_name = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
    setServerError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const emailCheckResponse = await axios.get(
        `http://localhost:8000/api/check-email/?email=${formData.email}`
      );

      if (emailCheckResponse.data.exists) {
        setServerError("Email is already in use");
        setIsLoading(false);
        return;
      }

      const response = await axios.post("http://localhost:8000/api/signup/", formData);
      navigate("/", { 
        state: { 
          message: "Signup successful! Please log in.", 
          type: "success" 
        } 
      });
    } catch (error) {
      setServerError("Something went wrong. Please try again.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f3f3f3] text-[#232f3e]">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="bg-white shadow-2xl rounded-2xl overflow-hidden">
          <div className="bg-[#232f3e] text-white p-6 flex justify-between items-center">
            <h1 className="text-3xl font-bold">Create Account</h1>
            <button
              onClick={() => navigate("/")}
              className="px-4 py-2 bg-[#febd69] text-[#232f3e] rounded-lg hover:bg-[#f3a847] transition-colors"
            >
              Back to Login
            </button>
          </div>

          <div className="p-8">
            {serverError && (
              <div className="p-4 mb-6 text-white bg-red-500 rounded-lg text-center">
                {serverError}
              </div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium mb-2">Full Name</label>
                <input
                  type="text"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 ${
                    errors.full_name 
                      ? "border-red-500 focus:ring-red-500" 
                      : "focus:ring-[#febd69]"
                  }`}
                  placeholder="Enter your full name"
                />
                {errors.full_name && (
                  <p className="text-red-500 text-xs mt-1">{errors.full_name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 ${
                    errors.email 
                      ? "border-red-500 focus:ring-red-500" 
                      : "focus:ring-[#febd69]"
                  }`}
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 ${
                    errors.password 
                      ? "border-red-500 focus:ring-red-500" 
                      : "focus:ring-[#febd69]"
                  }`}
                  placeholder="Create a password"
                />
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Role</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#febd69]"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full px-4 py-3 text-[#232f3e] rounded-lg font-semibold transition duration-300 ${
                  isLoading 
                    ? "bg-gray-400" 
                    : "bg-[#febd69] hover:bg-[#f3a847]"
                }`}
              >
                {isLoading ? "Creating Account..." : "Create Account"}
              </button>

              <p className="text-sm text-center text-gray-600 mt-4">
                Already have an account?{" "}
                <a 
                  href="/" 
                  className="text-[#febd69] font-medium hover:underline"
                >
                  Login
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;