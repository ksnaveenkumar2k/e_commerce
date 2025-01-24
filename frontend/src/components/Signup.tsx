import React, { useState, useRef } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { User, Mail, Lock, Shield, Eye, EyeOff } from "lucide-react";

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
  const [showPassword, setShowPassword] = useState(false);

  const fullNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const validateForm = () => {
    const newErrors: typeof errors = {};

    if (!formData.full_name.trim()) {
      newErrors.full_name = "Full name is required";
      fullNameRef.current?.focus();
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      emailRef.current?.focus();
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
      emailRef.current?.focus();
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      passwordRef.current?.focus();
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
      passwordRef.current?.focus();
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

      await axios.post("http://localhost:8000/api/signup/", formData);
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
    <div className="min-h-screen bg-gradient-to-br from-[#f3f3f3] to-[#e0e0e0] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white shadow-2xl rounded-2xl overflow-hidden"
      >
        <div className="bg-[#232f3e] text-white p-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold">Create Account</h1>
          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 bg-[#febd69] text-[#232f3e] rounded-lg hover:bg-[#f3a847] transition-colors"
          >
            Back to Login
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {serverError && (
            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="p-4 bg-red-500 text-white rounded-lg text-center"
            >
              {serverError}
            </motion.div>
          )}

          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              ref={fullNameRef}
              type="text"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              className={`w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 ${
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

          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              ref={emailRef}
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 ${
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

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              ref={passwordRef}
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 ${
                errors.password 
                  ? "border-red-500 focus:ring-red-500" 
                  : "focus:ring-[#febd69]"
              }`}
              placeholder="Create a password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 focus:outline-none"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          <div className="relative">
            <Shield className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#febd69]"
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
                ? "bg-gray-400 cursor-not-allowed" 
                : "bg-[#febd69] hover:bg-[#f3a847] hover:shadow-lg"
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
      </motion.div>
    </div>
  );
};

export default Signup;