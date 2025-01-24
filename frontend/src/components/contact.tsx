import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Send, 
  Clock, 
  CheckCircle 
} from "lucide-react";

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    console.log(formData);
    setSubmitted(true);
  };

  const contactDetails = [
    {
      icon: <MapPin className="text-[#febd69] w-10 h-10" />,
      title: "Address",
      content: "123 E-Commerce Street, Digital City, Tech State 12345"
    },
    {
      icon: <Phone className="text-[#febd69] w-10 h-10" />,
      title: "Phone",
      content: "+1 (555) 123-4567"
    },
    {
      icon: <Mail className="text-[#febd69] w-10 h-10" />,
      title: "Email",
      content: "support@aszmart.com"
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-[#f3f3f3] to-[#e0e0e0] py-12"
    >
      <div className="container mx-auto max-w-6xl px-4">
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white shadow-2xl rounded-3xl overflow-hidden"
        >
          {/* Header */}
          <div className="bg-[#232f3e] text-white p-8 flex justify-between items-center">
            <h1 className="text-4xl font-bold tracking-wide">Contact Us</h1>
            <div className="flex items-center space-x-2">
              <Clock className="text-[#febd69]" />
              <span>Support: 24/7</span>
            </div>
          </div>

          {/* Content */}
          <div className="grid md:grid-cols-2 gap-8 p-8">
            {/* Contact Information */}
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
              {contactDetails.map((detail) => (
                <motion.div 
                  key={detail.title}
                  whileHover={{ x: 10 }}
                  className="flex items-center space-x-4 bg-gray-50 p-4 rounded-xl"
                >
                  {detail.icon}
                  <div>
                    <h3 className="font-semibold">{detail.title}</h3>
                    <p className="text-gray-600">{detail.content}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">Send Us a Message</h2>
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#febd69]"
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your Email"
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#febd69]"
                    required
                  />
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Subject"
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#febd69]"
                    required
                  />
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your Message"
                    rows={4}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#febd69]"
                    required
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    type="submit"
                    className="w-full bg-[#febd69] text-[#232f3e] p-3 rounded-lg flex items-center justify-center"
                  >
                    <Send className="mr-2" /> Send Message
                  </motion.button>
                </form>
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center bg-green-50 p-8 rounded-xl"
                >
                  <CheckCircle className="mx-auto text-green-500 w-16 h-16 mb-4" />
                  <h3 className="text-2xl font-semibold mb-2">Message Sent!</h3>
                  <p>We'll get back to you soon.</p>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Contact;