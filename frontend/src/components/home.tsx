import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';
import { CircularProgress } from '@mui/material';

interface Product {
  _id: string;
  product_name: string;
  product_price: number | string;
  product_image: string;
  description: string;
  discount: number;
}

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/products/");
        // Ensure product_price is converted to a number
        const processedProducts = response.data.map((product: Product) => ({
          ...product,
          product_price: Number(product.product_price)
        }));
        setProducts(processedProducts);
      } catch (err) {
        setError("Failed to fetch products.");
        console.error("Error fetching products:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const calculateDiscountedPrice = (price: number, discount: number) => {
    return (price - (price * discount / 100)).toFixed(2);
  };

  return (
    <div className="bg-[#f3f3f3] min-h-screen">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h1 className="text-4xl font-bold text-[#232f3e] text-center mb-4">
            Welcome to ASZMart
          </h1>
          <p className="text-lg text-gray-600 text-center">
            Discover amazing deals and products just a click away!
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <CircularProgress color="inherit" />
          </div>
        ) : error ? (
          <p className="text-center text-red-500">Error: {error}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div 
                key={product._id} 
                className="
                  bg-white border border-gray-200 rounded-lg 
                  overflow-hidden shadow-md hover:shadow-xl 
                  transition-all duration-300 
                  transform hover:-translate-y-2
                "
              >
                <div className="relative">
                  <img
                    src={`data:image/jpeg;base64,${product.product_image}`}
                    alt={product.product_name}
                    className="w-full h-48 object-cover"
                  />
                  {product.discount > 0 && (
                    <span className="
                      absolute top-2 right-2 
                      bg-red-500 text-white 
                      px-2 py-1 rounded-full 
                      text-sm font-bold
                    ">
                      {product.discount}% OFF
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <h2 className="text-xl font-bold text-[#232f3e] line-clamp-2">
                    {product.product_name}
                  </h2>
                  <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                    {product.description}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      {product.discount > 0 ? (
                        <>
                          <p className="text-lg font-bold text-[#febd69]">
                            ${calculateDiscountedPrice(Number(product.product_price), product.discount)}
                          </p>
                          <p className="text-sm text-gray-500 line-through">
                            ${Number(product.product_price).toFixed(2)}
                          </p>
                        </>
                      ) : (
                        <p className="text-lg font-bold text-[#febd69]">
                          ${Number(product.product_price).toFixed(2)}
                        </p>
                      )}
                    </div>
                    <button 
                      className="
                        bg-[#febd69] hover:bg-[#f3a847] 
                        text-[#232f3e] px-3 py-2 
                        rounded-md text-sm font-semibold 
                        transition-colors duration-300
                      "
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Home;