import { motion } from 'motion/react';
import { Zap, Code, Palette, Download, Shield, Sparkles } from 'lucide-react';

const features = [
  {
    icon: Sparkles,
    title: 'AI-Powered Generation',
    description: 'Advanced AI understands your requirements and generates perfect forms instantly.',
    color: 'from-purple-500 to-indigo-500'
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Get your forms in seconds, not hours. Perfect for rapid prototyping and development.',
    color: 'from-yellow-500 to-orange-500'
  },
  {
    icon: Code,
    title: 'Clean HTML Code',
    description: 'Production-ready, semantic HTML with best practices built in.',
    color: 'from-green-500 to-emerald-500'
  },
  {
    icon: Palette,
    title: 'Customizable Design',
    description: 'Choose from multiple themes or customize colors, spacing, and styles.',
    color: 'from-pink-500 to-rose-500'
  },
  {
    icon: Download,
    title: 'Export Anywhere',
    description: 'Download HTML, copy to clipboard, or integrate directly into your project.',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: Shield,
    title: 'Validation Ready',
    description: 'Built-in HTML5 validation and accessibility features included.',
    color: 'from-violet-500 to-purple-500'
  }
];

export default  function Features() {
  return (
    <section id="features" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-gray-900 mb-4"
          >
            Everything You Need to Build Forms
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-600 max-w-2xl mx-auto"
          >
            Powerful features designed to make form creation effortless and efficient
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
