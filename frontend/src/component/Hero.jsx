import { motion } from 'framer-motion'; // Fix: Use 'framer-motion' instead of 'motion/react'
import { ArrowRight, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // Add React Router

export default function Hero() {
  const navigate = useNavigate(); // Initialize navigation

  const handleStartBuilding = () => {
    navigate('/working'); // Navigate to the working page
  };

  return (
    <section className="relative overflow-hidden pt-20 pb-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          {/* AI-Powered Tag */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full mb-8"
          >
            <Sparkles className="w-4 h-4" />
            <span>AI-Powered Form Generation</span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl font-bold text-gray-900 mb-6 max-w-4xl mx-auto"
          >
            Create Beautiful Forms with Just a Prompt
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto"
          >
            Transform your ideas into fully functional HTML forms instantly.
            Just describe what you need, and our AI will generate clean, production-ready form code.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            {/* Start Building Button (with navigation) */}
            <button
              onClick={handleStartBuilding}
              className="w-full sm:w-auto px-8 py-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all hover:scale-105 flex items-center justify-center gap-2"
            >
              Start Building Free
              <ArrowRight className="w-5 h-5" />
            </button>

            {/* Watch Demo Button */}
            <button className="w-full sm:w-auto px-8 py-4 bg-white text-gray-900 rounded-lg border-2 border-gray-200 hover:border-indigo-600 transition-all hover:scale-105">
              Watch Demo
            </button>
          </motion.div>

          {/* Example Form Preview */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-16 relative"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-indigo-100/50 to-transparent blur-3xl" />
            <div className="relative bg-white rounded-2xl shadow-2xl p-8 max-w-3xl mx-auto border border-gray-200">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <div className="flex items-start gap-3 mb-4">
                  <Sparkles className="w-5 h-5 text-indigo-600 mt-1" />
                  <div className="flex-1">
                    <p className="text-gray-600 mb-2">Prompt:</p>
                    <p className="text-gray-900">"Create a contact form with name, email, subject, and message fields"</p>
                  </div>
                </div>
                <div className="border-t border-gray-300 my-4" />
                <div className="text-left">
                  <p className="text-gray-600 mb-3">Generated Form:</p>
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Full Name"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      disabled
                    />
                    <input
                      type="email"
                      placeholder="Email Address"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      disabled
                    />
                    <input
                      type="text"
                      placeholder="Subject"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      disabled
                    />
                    <textarea
                      placeholder="Your Message"
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      disabled
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
