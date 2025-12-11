import { motion } from 'motion/react';
import { MessageSquare, Wand2, Code2, Download } from 'lucide-react';

const steps = [
  {
    icon: MessageSquare,
    title: 'Describe Your Form',
    description: 'Simply type what kind of form you need in plain English. Be as detailed or brief as you like.',
    color: 'from-indigo-500 to-purple-500'
  },
  {
    icon: Wand2,
    title: 'AI Generates Code',
    description: 'Our advanced AI instantly creates a complete HTML form matching your requirements.',
    color: 'from-purple-500 to-pink-500'
  },
  {
    icon: Code2,
    title: 'Preview & Customize',
    description: 'See your form live, make adjustments, and fine-tune the design to perfection.',
    color: 'from-pink-500 to-rose-500'
  },
  {
    icon: Download,
    title: 'Export & Use',
    description: 'Download the HTML code or copy it directly to use in your website or application.',
    color: 'from-rose-500 to-orange-500'
  }
];

export default function Working() {
  return (
    <section id="how-it-works" className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-gray-900 mb-4"
          >
            How It Works
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-600 max-w-2xl mx-auto"
          >
            From idea to implementation in four simple steps
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connection lines for desktop */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-indigo-200 via-purple-200 to-orange-200 -z-10" />
          
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="relative"
            >
              <div className="text-center">
                <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center mx-auto mb-6 relative z-10`}>
                  <step.icon className="w-10 h-10 text-white" />
                </div>
                <div className="absolute top-6 left-1/2 -translate-x-1/2 -z-10 text-gray-100">
                  {index + 1}
                </div>
                <h3 className="text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
