import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

function FormHero() {
  const navigate = useNavigate();

  const handleStartBuilding = () => {
    navigate('/working');
  };

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Animated Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Build Forms with <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">AI Magic</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Describe your form in plain English, and let our AI generate a beautiful, functional form in seconds.
          </p>
        </motion.div>

        {/* Call-to-Action Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <button
            onClick={handleStartBuilding}
            className="px-8 py-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-lg font-medium shadow-lg hover:shadow-xl"
          >
            Start Building for Free
          </button>
        </motion.div>

        {/* Optional: Decorative Element */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-16"
        >
          {/* Your decorative element content */}
        </motion.div>
      </div>
    </section>
  );
}

export default FormHero;
