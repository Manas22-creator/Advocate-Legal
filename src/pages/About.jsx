import { useState, useEffect } from 'react';
import { ArrowRight, Scale, BookOpen, Clock, MapPin, Mail, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function About() {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const res = await fetch('/api/team');
        const data = await res.json();
        setTeamMembers(data);
      } catch (error) {
        console.error('Error fetching team:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTeam();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Page Header */}
      <div className="bg-slate-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">About the Advocate</h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Over two decades of distinguished legal practice at the Bombay High Court.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Main Content */}
          <div className="lg:col-span-8">
            <div className="prose prose-lg prose-slate max-w-none">
              <h2 className="text-3xl font-serif font-bold text-slate-900 mb-6">A Legacy of Legal Excellence</h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                With over 20 years of dedicated practice at the Bombay High Court, our lead advocate has established a reputation for meticulous preparation, aggressive representation, and an unwavering commitment to client success.
              </p>
              <p className="text-slate-600 leading-relaxed mb-6">
                Specializing in complex civil litigation, corporate disputes, and high-stakes criminal defense, the practice is built on a foundation of deep legal knowledge and strategic foresight. We understand that every case is unique and requires a tailored approach to achieve the best possible outcome.
              </p>
              
              <div className="my-12 p-8 bg-slate-50 border-l-4 border-amber-500 rounded-r-2xl">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Our Philosophy</h3>
                <p className="text-slate-700 italic">
                  "Justice is not merely a concept to be debated, but a right to be fiercely protected. We approach every case with the dedication and rigor required to ensure our clients' voices are heard and their rights are upheld in the court of law."
                </p>
              </div>

              <h3 className="text-2xl font-serif font-bold text-slate-900 mb-4">Professional Background</h3>
              <ul className="space-y-4 mb-8 text-slate-600">
                <li className="flex items-start">
                  <div className="mt-1.5 mr-3 w-2 h-2 rounded-full bg-amber-500 shrink-0" />
                  <span>Enrolled with the Bar Council of Maharashtra and Goa (2003)</span>
                </li>
                <li className="flex items-start">
                  <div className="mt-1.5 mr-3 w-2 h-2 rounded-full bg-amber-500 shrink-0" />
                  <span>Member, Bombay Bar Association</span>
                </li>
                <li className="flex items-start">
                  <div className="mt-1.5 mr-3 w-2 h-2 rounded-full bg-amber-500 shrink-0" />
                  <span>LL.M. in Corporate Law, Government Law College, Mumbai</span>
                </li>
                <li className="flex items-start">
                  <div className="mt-1.5 mr-3 w-2 h-2 rounded-full bg-amber-500 shrink-0" />
                  <span>Regularly appointed as Amicus Curiae by the Hon'ble High Court in complex matters</span>
                </li>
              </ul>

              <h3 className="text-2xl font-serif font-bold text-slate-900 mb-4">The Team</h3>
              <p className="text-slate-600 leading-relaxed mb-8">
                The practice is supported by a dedicated team of junior advocates, legal researchers, and paralegals who bring diverse expertise and tireless work ethic to every case. This collaborative approach ensures that no detail is overlooked and every legal avenue is thoroughly explored.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {loading ? (
                  <div className="col-span-full text-center py-8 text-slate-500">Loading team members...</div>
                ) : teamMembers.length > 0 ? (
                  teamMembers.map((member) => (
                    <div key={member.id} className="bg-slate-50 rounded-2xl p-6 border border-slate-200 text-center hover:border-amber-500 transition-colors">
                      <div className="w-24 h-24 mx-auto rounded-full overflow-hidden mb-4 bg-slate-200">
                        <img 
                          src={member.image_url} 
                          alt={member.name} 
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <h4 className="text-lg font-bold text-slate-900 mb-1">{member.name}</h4>
                      <p className="text-amber-600 font-medium text-sm mb-3">{member.role}</p>
                      <p className="text-slate-600 text-sm leading-relaxed">{member.description}</p>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-8 text-slate-500">No team members found.</div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 space-y-8">
              {/* Profile Card */}
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
                <div className="aspect-square rounded-xl overflow-hidden mb-6 bg-slate-200">
                  <img 
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop" 
                    alt="Advocate Portrait" 
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Senior Advocate</h3>
                <p className="text-amber-600 font-medium mb-6">Bombay High Court</p>
                
                <div className="space-y-4 text-sm text-slate-600">
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 mr-3 text-slate-400" />
                    20+ Years Experience
                  </div>
                  <div className="flex items-center">
                    <BookOpen className="w-5 h-5 mr-3 text-slate-400" />
                    1500+ Cases Handled
                  </div>
                  <div className="flex items-center">
                    <Scale className="w-5 h-5 mr-3 text-slate-400" />
                    Civil & Corporate Law Expert
                  </div>
                </div>
              </div>

              {/* Quick Contact */}
              <div className="bg-slate-900 rounded-2xl p-6 text-white">
                <h3 className="text-lg font-bold mb-4">Get in Touch</h3>
                <div className="space-y-4 text-sm text-slate-300 mb-6">
                  <div className="flex items-start">
                    <MapPin className="w-5 h-5 mr-3 text-amber-500 shrink-0 mt-0.5" />
                    <span>Chamber No. 101, Bombay High Court, Fort, Mumbai</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-5 h-5 mr-3 text-amber-500 shrink-0" />
                    <span>+91 98765 43210</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="w-5 h-5 mr-3 text-amber-500 shrink-0" />
                    <span>contact@advocatelegal.com</span>
                  </div>
                </div>
                <Link
                  to="/book-consultation"
                  className="block w-full text-center bg-amber-500 text-slate-900 py-3 rounded-lg font-medium hover:bg-amber-400 transition-colors"
                >
                  Book Consultation
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
