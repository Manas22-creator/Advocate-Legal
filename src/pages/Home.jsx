import { Link } from 'react-router-dom';
import { ArrowRight, Scale, Shield, FileText, CheckCircle, Users, Award } from 'lucide-react';
import { motion } from 'motion/react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/90 to-transparent z-10" />
        
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 lg:py-48">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-amber-500/10 text-amber-500 text-sm font-semibold tracking-wide uppercase mb-6 border border-amber-500/20">
              <Award className="w-4 h-4 mr-2" />
              20+ Years of Excellence
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-serif font-bold tracking-tight mb-6 leading-tight">
              Expert Legal Counsel at the <span className="text-amber-500">Bombay High Court</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl leading-relaxed">
              Providing strategic, aggressive, and effective legal representation for complex civil, criminal, and corporate matters. Your rights, our priority.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/book-consultation"
                className="inline-flex justify-center items-center px-8 py-4 text-base font-medium rounded-md text-slate-900 bg-amber-500 hover:bg-amber-400 transition-colors shadow-lg"
              >
                Book a Consultation
                <ArrowRight className="ml-2 -mr-1 w-5 h-5" />
              </Link>
              <Link
                to="/practice-areas"
                className="inline-flex justify-center items-center px-8 py-4 text-base font-medium rounded-md text-white border border-slate-700 hover:bg-slate-800 transition-colors"
              >
                Explore Practice Areas
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-amber-500 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-amber-600/30">
            <div>
              <div className="text-4xl font-bold text-slate-900 mb-2">20+</div>
              <div className="text-sm font-medium text-amber-900 uppercase tracking-wider">Years Experience</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-slate-900 mb-2">1500+</div>
              <div className="text-sm font-medium text-amber-900 uppercase tracking-wider">Cases Handled</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-slate-900 mb-2">95%</div>
              <div className="text-sm font-medium text-amber-900 uppercase tracking-wider">Success Rate</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-slate-900 mb-2">24/7</div>
              <div className="text-sm font-medium text-amber-900 uppercase tracking-wider">Legal Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Practice Areas Preview */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-4">Our Practice Areas</h2>
            <div className="w-24 h-1 bg-amber-500 mx-auto mb-6"></div>
            <p className="text-lg text-slate-600">
              Comprehensive legal services tailored to protect your interests across various domains of law.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Civil Litigation', icon: Scale, desc: 'Expert handling of property disputes, breach of contract, and civil rights violations.' },
              { title: 'Criminal Defense', icon: Shield, desc: 'Aggressive representation in criminal proceedings, bail matters, and appeals.' },
              { title: 'Corporate Law', icon: FileText, desc: 'Strategic counsel for business formation, mergers, compliance, and commercial disputes.' },
            ].map((area, idx) => (
              <div key={idx} className="group p-8 border border-slate-200 rounded-2xl hover:border-amber-500 hover:shadow-xl transition-all duration-300 bg-slate-50 hover:bg-white">
                <div className="w-14 h-14 bg-slate-900 text-amber-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <area.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{area.title}</h3>
                <p className="text-slate-600 mb-6 leading-relaxed">{area.desc}</p>
                <Link to="/practice-areas" className="text-amber-600 font-semibold inline-flex items-center group-hover:text-amber-700">
                  Learn more <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/practice-areas" className="inline-flex items-center text-slate-900 font-semibold hover:text-amber-600 transition-colors">
              View all practice areas <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-6">Why Choose Our Legal Services?</h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                With a deep understanding of the Indian legal system and decades of experience at the Bombay High Court, we provide unparalleled legal strategy and representation.
              </p>
              <ul className="space-y-6">
                {[
                  'Direct access to senior counsel for critical matters',
                  'Transparent fee structure with no hidden costs',
                  'Strategic, result-oriented approach to litigation',
                  'Dedicated team of junior advocates and researchers',
                  'Strict confidentiality and data protection protocols'
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-amber-500 mr-4 shrink-0 mt-0.5" />
                    <span className="text-slate-700 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-amber-500 rounded-3xl transform translate-x-4 translate-y-4 opacity-20"></div>
              <img 
                src="https://images.unsplash.com/photo-1505664194779-8beaceb93744?q=80&w=1000&auto=format&fit=crop" 
                alt="Bombay High Court" 
                className="relative rounded-3xl shadow-2xl object-cover h-[500px] w-full"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-4">Client Testimonials</h2>
            <div className="w-24 h-1 bg-amber-500 mx-auto mb-6"></div>
            <p className="text-lg text-slate-600">
              Read what our clients have to say about our legal representation and services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { name: 'Rajesh Sharma', text: 'The advocate provided excellent guidance for our family property dispute. The matter was resolved much faster than we anticipated. Highly recommended for their professionalism and clear communication.' },
              { name: 'Priya Desai', text: 'Professional, knowledgeable, and very responsive. Helped us navigate a complex corporate legal issue with ease. Their strategic approach saved our company significant time and resources.' },
              { name: 'Amit Patel', text: 'I was facing a difficult civil litigation case, and the team here handled it brilliantly. They were always available to answer my questions and kept me updated throughout the process.' },
              { name: 'Neha Singh', text: 'Exceptional service! The attention to detail and dedication to my case was truly impressive. I felt confident and well-represented every step of the way.' }
            ].map((testimonial, idx) => (
              <div key={idx} className="bg-slate-50 p-8 rounded-2xl border border-slate-200 relative">
                <div className="text-amber-500 text-6xl font-serif absolute top-4 left-6 opacity-20">"</div>
                <p className="text-slate-600 leading-relaxed mb-6 relative z-10 italic">"{testimonial.text}"</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center text-white font-bold mr-4">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">{testimonial.name}</h4>
                    <div className="flex text-amber-500">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg key={star} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/testimonials" className="inline-flex items-center text-slate-900 font-semibold hover:text-amber-600 transition-colors">
              Read all testimonials <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-slate-900 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">Need Legal Assistance?</h2>
          <p className="text-xl text-slate-300 mb-10">
            Schedule a consultation today to discuss your legal matters with our experienced team.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/book-consultation"
              className="inline-flex justify-center items-center px-8 py-4 text-base font-medium rounded-md text-slate-900 bg-amber-500 hover:bg-amber-400 transition-colors shadow-lg"
            >
              Book Consultation
            </Link>
            <Link
              to="/contact"
              className="inline-flex justify-center items-center px-8 py-4 text-base font-medium rounded-md text-white border border-slate-700 hover:bg-slate-800 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
