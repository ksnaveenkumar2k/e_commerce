import React, { useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const validateForm = () => {
    if (!formData.email) {
      setError("Email is required");
      emailRef.current?.focus();
      return false;
    }
    if (!formData.password) {
      setError("Password is required");
      passwordRef.current?.focus();
      return false;
    }
    return true;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const response = await axios.post("http://localhost:8000/api/login/", formData);
      
      if (response.status === 200) {
        const { role, token } = response.data;
        
        localStorage.setItem('authToken', token);
        
        role === "admin" ? navigate("/adminhome") : navigate("/home");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMap: { [key: number]: string } = {
          401: "Invalid email or password",
          404: "User not found",
          500: "Server error. Please try again later.",
        };
        
        setError(
          error.response 
            ? errorMap[error.response.status] || "An unexpected error occurred"
            : error.request 
            ? "No response from server. Check connection."
            : "Error processing login."
        );
      }
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
          <h1 className="text-3xl font-bold">Login</h1>
          <button
            onClick={() => navigate("/signup")}
            className="px-4 py-2 bg-[#febd69] text-[#232f3e] rounded-lg hover:bg-[#f3a847] transition-colors"
          >
            Create Account
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {error && (
            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="p-4 bg-red-500 text-white rounded-lg text-center"
            >
              {error}
            </motion.div>
          )}

          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              ref={emailRef}
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#febd69]"
              placeholder="Enter your email"
              disabled={isLoading}
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              ref={passwordRef}
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#febd69]"
              placeholder="Enter your password"
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 focus:outline-none"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
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
            {isLoading ? "Logging in..." : "Login"}
          </button>

          <p className="text-sm text-center text-gray-600 mt-4">
            Don't have an account?{" "}
            <a 
              href="/signup" 
              className="text-[#febd69] font-medium hover:underline"
            >
              Create Account
            </a>
          </p>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;