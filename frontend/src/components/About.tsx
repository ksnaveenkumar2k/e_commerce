import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Globe,
  Shield,
  Truck,
  Target,
  Award,
  Users,
  Zap,
  CheckCircle,
  ArrowRight,
  Contact,
} from "lucide-react";
import { Navigate, useNavigate } from "react-router-dom";

const About: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.pageYOffset / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const milestones = [
    {
      year: 2023,
      event: "ASZMart Founding",
      description: "Launching our innovative e-commerce platform",
    },
    {
      year: 2024,
      event: "Global Expansion",
      description: "Extending our reach to international markets",
    },
    {
      year: 2025,
      event: "Technology Innovation",
      description: "Introducing AI-powered shopping experiences",
    },
  ];

  const valueProps = [
    {
      icon: <Globe className="w-12 h-12 text-[#febd69]" />,
      title: "Global Reach",
      description:
        "Connecting customers worldwide with seamless online shopping experiences.",
    },
    {
      icon: <Shield className="w-12 h-12 text-[#febd69]" />,
      title: "Secure Transactions",
      description:
        "Advanced encryption and fraud protection for worry-free purchases.",
    },
    {
      icon: <Truck className="w-12 h-12 text-[#febd69]" />,
      title: "Fast Shipping",
      description:
        "Swift and reliable delivery across multiple regions and countries.",
    },
  ];

  const teamValues = [
    "Customer-Centric Approach",
    "Continuous Innovation",
    "Transparency and Trust",
    "Sustainable Practices",
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-[#f3f3f3] to-[#e0e0e0] text-[#232f3e]"
    >
      {/* Scroll Progress Bar */}
      <div
        className="fixed top-0 left-0 h-1 bg-[#febd69] z-50"
        style={{ width: `${scrollProgress}%` }}
      />

      <div className="container mx-auto max-w-6xl px-4 py-12 space-y-12">
        {/* Hero Section */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="bg-white shadow-2xl rounded-3xl overflow-hidden"
        >
          <div className="bg-[#232f3e] text-white p-8 flex flex-col md:flex-row justify-between items-center">
            <h1 className="text-4xl font-bold tracking-wide mb-4 md:mb-0">
              ASZMart Journey
            </h1>
            <div className="flex space-x-4">
              <button className="px-4 py-2 bg-[#febd69] text-[#232f3e] rounded-lg hover:bg-[#f3a847] transition-colors">
                Our Story
              </button>
              <button
                className="px-4 py-2 border border-white rounded-lg hover:bg-white/10 transition-colors"
                onClick={() => navigate("/contact")}
              >
                Contact Us
              </button>
            </div>
          </div>
        </motion.div>

        {/* Milestones */}
        <section className="bg-white rounded-3xl p-8 shadow-lg">
          <h2 className="text-3xl font-semibold mb-6 text-center">
            Our Milestones
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {milestones.map((milestone) => (
              <motion.div
                key={milestone.year}
                whileHover={{ scale: 1.05 }}
                className="bg-gray-50 p-6 rounded-xl text-center"
              >
                <h3 className="text-2xl font-bold text-[#febd69] mb-2">
                  {milestone.year}
                </h3>
                <h4 className="font-semibold mb-2">{milestone.event}</h4>
                <p className="text-gray-600">{milestone.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Value Propositions */}
        <section className="bg-white rounded-3xl p-8 shadow-lg">
          <h2 className="text-3xl font-semibold mb-6 text-center">
            Why Choose ASZMart
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {valueProps.map((prop) => (
              <motion.div
                key={prop.title}
                whileHover={{ scale: 1.05 }}
                className="bg-gray-50 p-6 rounded-xl text-center"
              >
                <div className="flex justify-center mb-4">{prop.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{prop.title}</h3>
                <p className="text-gray-600">{prop.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Core Values */}
        <section className="bg-white rounded-3xl p-8 shadow-lg">
          <h2 className="text-3xl font-semibold mb-6 text-center">
            Our Core Values
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {teamValues.map((value) => (
              <motion.div
                key={value}
                whileHover={{ x: 10 }}
                className="flex items-center bg-gray-50 p-4 rounded-xl"
              >
                <CheckCircle className="mr-4 text-[#febd69]" />
                <span className="text-lg">{value}</span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section className="bg-[#232f3e] text-white rounded-3xl p-12 flex flex-col md:flex-row justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">Let's Connect</h2>
            <p className="text-lg mb-4">
              Transform Your Shopping Experience with ASZMart
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            className="flex items-center px-6 py-3 bg-[#febd69] text-[#232f3e] rounded-lg"
          >
            Contact Support <ArrowRight className="ml-2" />
          </motion.button>
        </section>
      </div>
    </motion.div>
  );
};

export default About;
