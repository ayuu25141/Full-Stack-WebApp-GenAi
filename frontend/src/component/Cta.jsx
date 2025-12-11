import { motion } from 'framer-motion'; // Fixed import path
import { ArrowRight, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // Added for navigation

export default function CTA() {
  const navigate = useNavigate(); // Initialize navigation

  const handleGetStarted = () => {
    navigate('/working'); // Redirect to working page
  };

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-3xl p-12 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,transparent,black)]" />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 text-white rounded-full mb-6">
              <Sparkles className="w-4 h-4" />
              <span>Ready to Get Started?</span>
            </div>

            <h2 className="text-white mb-6">
              Start Building Forms in Seconds
            </h2>

            <p className="text-indigo-100 mb-8 max-w-2xl mx-auto">
              Join thousands of developers who are already using FormGenius AI to create beautiful,
              functional forms faster than ever before.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {/* Updated button with navigation */}
              <button
                onClick={handleGetStarted}
                className="w-full sm:w-auto px-8 py-4 bg-white text-indigo-600 rounded-lg hover:bg-gray-100 transition-all hover:scale-105 flex items-center justify-center gap-2"
              >
                Get Started Free
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="w-full sm:w-auto px-8 py-4 bg-transparent text-white rounded-lg border-2 border-white hover:bg-white/10 transition-all">
                View Pricing
              </button>
            </div>

            <p className="text-indigo-200 mt-6">
              No credit card required • Free forever plan available
            </p>
          </div>

          {/* Decorative elements */}
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-purple-500 rounded-full blur-3xl opacity-50" />
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-indigo-500 rounded-full blur-3xl opacity-50" />
        </motion.div>

        {/* Footer */}
        <div className="mt-16 text-center text-gray-600">
          <p>© 2025 FormGenius AI. All rights reserved.</p>
          <div className="flex items-center justify-center gap-6 mt-4">
            <a href="#" className="hover:text-gray-900 transition-colors">Privacy</a>
            <a href="#" className="hover:text-gray-900 transition-colors">Terms</a>
            <a href="#" className="hover:text-gray-900 transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </section>
  );
}
