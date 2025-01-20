// Home.tsx
import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-700 via-blue-800 to-black text-white">
      <Header />
      <div className="container mx-auto p-8">
        <h1 className="text-5xl font-bold text-center mb-6">Welcome to Our Platform</h1>
        <p className="text-lg text-center mb-8">
          This is an example of a home page with a header and footer.
        </p>
        <div className="flex justify-center">
          <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-white">
            Get Started
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
