import { motion } from 'motion/react';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Rajesh Sharma',
    role: 'Business Owner',
    text: 'The advocate provided excellent guidance for our family property dispute. The matter was resolved much faster than we anticipated. Highly recommended for their professionalism and clear communication.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: 2,
    name: 'Priya Desai',
    role: 'Corporate Executive',
    text: 'Professional, knowledgeable, and very responsive. Helped us navigate a complex corporate legal issue with ease. Their strategic approach saved our company significant time and resources.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: 3,
    name: 'Amit Patel',
    role: 'Real Estate Developer',
    text: 'I was facing a difficult civil litigation case, and the team here handled it brilliantly. They were always available to answer my questions and kept me updated throughout the process.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: 4,
    name: 'Neha Singh',
    role: 'Entrepreneur',
    text: 'Exceptional service! The attention to detail and dedication to my case was truly impressive. I felt confident and well-represented every step of the way.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: 5,
    name: 'Vikram Mehta',
    role: 'Senior Consultant',
    text: 'Their expertise in criminal defense is unmatched. They handled my case with extreme sensitivity and secured a favorable outcome. I am forever grateful for their support.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: 6,
    name: 'Anjali Rao',
    role: 'Homeowner',
    text: 'Very thorough and professional. They helped me with a complicated tenant-landlord dispute and ensured my rights were protected. Excellent legal counsel.',
    rating: 4,
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop'
  }
];

export default function Testimonials() {
  return (
    <div className="bg-slate-50 min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-6">Client Testimonials</h1>
            <div className="w-24 h-1.5 bg-amber-500 mx-auto mb-8 rounded-full"></div>
            <p className="text-lg text-slate-600 leading-relaxed">
              We take pride in our commitment to excellence and the successful outcomes we achieve for our clients. Read about their experiences working with us.
            </p>
          </motion.div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, idx) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow relative flex flex-col"
            >
              <Quote className="absolute top-6 right-8 w-10 h-10 text-amber-500/10" />
              
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < testimonial.rating ? 'text-amber-500 fill-amber-500' : 'text-slate-200'}`}
                  />
                ))}
              </div>

              <p className="text-slate-600 italic mb-8 flex-grow leading-relaxed">
                "{testimonial.text}"
              </p>

              <div className="flex items-center mt-auto pt-6 border-t border-slate-50">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4 ring-2 ring-amber-500/20"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="font-bold text-slate-900">{testimonial.name}</h4>
                  <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-24 bg-slate-900 rounded-3xl p-12 text-center text-white relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-500/5 rounded-full -ml-32 -mb-32 blur-3xl"></div>
          
          <h2 className="text-3xl font-serif font-bold mb-6 relative z-10">Experience Our Expert Legal Representation</h2>
          <p className="text-slate-400 max-w-2xl mx-auto mb-10 relative z-10">
            Join our list of satisfied clients. Schedule a consultation today to discuss your legal needs with our experienced team.
          </p>
          <a
            href="/book-consultation"
            className="inline-flex items-center px-8 py-4 bg-amber-500 text-slate-900 font-bold rounded-lg hover:bg-amber-400 transition-colors relative z-10 shadow-lg"
          >
            Book a Consultation Now
          </a>
        </motion.div>
      </div>
    </div>
  );
}
