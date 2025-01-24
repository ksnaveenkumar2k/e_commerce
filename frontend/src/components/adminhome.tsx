import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminPage: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    product_name: "",
    product_price: "",
    discount: "",
    description: "",
  });
  const [productImage, setProductImage] = useState<string | null>(null);
  const [message, setMessage] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
      const maxSize = 2 * 1024 * 1024; // 2MB

      if (!allowedTypes.includes(file.type)) {
        setMessage("Invalid file type. Only JPEG and PNG are allowed.");
        setIsError(true);
        setProductImage(null);
        return;
      }

      if (file.size > maxSize) {
        setMessage("File size exceeds 2MB. Please upload a smaller file.");
        setIsError(true);
        setProductImage(null);
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setProductImage(reader.result as string);
        setMessage("");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.product_name ||
      !formData.product_price ||
      !formData.discount ||
      !formData.description ||
      !productImage
    ) {
      setMessage("All fields are required, including a product image.");
      setIsError(true);
      return;
    }

    setIsLoading(true);

    const data = new FormData();
    data.append("product_name", formData.product_name);
    data.append("product_price", formData.product_price);
    data.append("discount", formData.discount);
    data.append("description", formData.description);
    if (productImage) {
      data.append("product_image", productImage);
    }

    try {
      const response = await axios.post("http://localhost:8000/api/add-product/", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Product added:", response.data);
      setMessage("Product added successfully!");
      setIsError(false);

      setFormData({
        product_name: "",
        product_price: "",
        discount: "",
        description: "",
      });
      setProductImage(null);
    } catch (error) {
      console.error(error);
      setMessage("Error adding product. Please try again.");
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f3f3f3] text-[#232f3e]">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="bg-white shadow-2xl rounded-2xl overflow-hidden">
          <div className="bg-[#232f3e] text-white p-6 flex justify-between items-center">
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <button
              onClick={() => navigate("/home")}
              className="px-4 py-2 bg-[#febd69] text-[#232f3e] rounded-lg hover:bg-[#f3a847] transition-colors"
            >
              Back to Home
            </button>
          </div>

          <div className="p-8">
            {message && (
              <div
                className={`p-4 mb-6 rounded-lg text-center ${
                  isError ? "bg-red-500 text-white" : "bg-green-500 text-white"
                }`}
              >
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Product Name</label>
                <input
                  type="text"
                  name="product_name"
                  value={formData.product_name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#febd69] focus:outline-none"
                  placeholder="Enter product name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Product Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#febd69] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Product Price</label>
                  <input
                    type="number"
                    name="product_price"
                    value={formData.product_price}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#febd69] focus:outline-none"
                    placeholder="Price"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Discount (%)</label>
                  <input
                    type="number"
                    name="discount"
                    value={formData.discount}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#febd69] focus:outline-none"
                    placeholder="Discount"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#febd69] focus:outline-none"
                  placeholder="Enter product description"
                  rows={4}
                ></textarea>
              </div>

              <button
                type="submit"
                className={`w-full px-4 py-3 text-[#232f3e] rounded-lg font-semibold transition duration-300 ${
                  isLoading ? "bg-gray-400" : "bg-[#febd69] hover:bg-[#f3a847]"
                }`}
                disabled={isLoading}
              >
                {isLoading ? "Adding Product..." : "Add Product"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;