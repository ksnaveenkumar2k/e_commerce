import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../index.css';

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      setError("Please fill in all fields");
      return false;
    }
    return true;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
        
        // Store authentication token
        localStorage.setItem('authToken', token);
        
        // Redirect based on role
        if (role === "admin") {
          navigate("/adminhome");
        } else {
          navigate("/home");
        }
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          switch (error.response.status) {
            case 401:
              setError("Invalid email or password");
              break;
            case 404:
              setError("User not found");
              break;
            case 500:
              setError("Server error. Please try again later.");
              break;
            default:
              setError("An unexpected error occurred");
          }
        } else if (error.request) {
          setError("No response from server. Please check your connection.");
        } else {
          setError("Error processing login. Please try again.");
        }
      }
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
            <h1 className="text-3xl font-bold">Login</h1>
            <button
              onClick={() => navigate("/signup")}
              className="px-4 py-2 bg-[#febd69] text-[#232f3e] rounded-lg hover:bg-[#f3a847] transition-colors"
            >
              Create Account
            </button>
          </div>

          <div className="p-8">
            {error && (
              <div className="p-4 mb-6 text-white bg-red-500 rounded-lg text-center">
                {error}
              </div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium mb-2">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#febd69]"
                  placeholder="Enter your email"
                  disabled={isLoading}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#febd69]"
                  placeholder="Enter your password"
                  disabled={isLoading}
                />
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;