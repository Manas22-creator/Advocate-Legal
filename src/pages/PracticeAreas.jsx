import { Scale, Shield, FileText, Home, Users, Briefcase, Gavel, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PracticeAreas() {
  const areas = [
    {
      id: 'civil-law',
      title: 'Civil Law',
      icon: Scale,
      description: 'Comprehensive representation in civil disputes, property matters, breach of contract, and recovery suits.',
      details: [
        'Property Disputes & Partition Suits',
        'Breach of Contract & Specific Performance',
        'Recovery of Money & Damages',
        'Injunctions & Stay Orders'
      ]
    },
    {
      id: 'criminal-law',
      title: 'Criminal Law',
      icon: Shield,
      description: 'Aggressive defense in criminal proceedings, white-collar crimes, bail applications, and appeals.',
      details: [
        'Anticipatory & Regular Bail',
        'White Collar Crimes & Economic Offences',
        'Quashing of FIRs',
        'Criminal Appeals & Revisions'
      ]
    },
    {
      id: 'corporate-law',
      title: 'Corporate Law',
      icon: Briefcase,
      description: 'Strategic counsel for business formation, mergers, compliance, and commercial disputes.',
      details: [
        'Company Incorporation & Compliance',
        'Mergers & Acquisitions',
        'Commercial Contracts & Agreements',
        'Shareholder Disputes'
      ]
    },
    {
      id: 'property-law',
      title: 'Property & Real Estate',
      icon: Home,
      description: 'Expert guidance on real estate transactions, RERA compliance, and property litigation.',
      details: [
        'Title Verification & Due Diligence',
        'RERA Complaints & Appeals',
        'Lease & Leave License Agreements',
        'Redevelopment Disputes'
      ]
    },
    {
      id: 'family-law',
      title: 'Family Law',
      icon: Users,
      description: 'Sensitive handling of matrimonial disputes, divorce, child custody, and alimony matters.',
      details: [
        'Mutual & Contested Divorce',
        'Child Custody & Visitation Rights',
        'Maintenance & Alimony',
        'Domestic Violence Cases'
      ]
    },
    {
      id: 'arbitration',
      title: 'Arbitration & ADR',
      icon: Gavel,
      description: 'Alternative dispute resolution services including domestic and international arbitration.',
      details: [
        'Drafting Arbitration Agreements',
        'Representation in Arbitral Tribunals',
        'Enforcement of Arbitral Awards',
        'Mediation & Conciliation'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Page Header */}
      <div className="bg-slate-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">Practice Areas</h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Expert legal representation across diverse domains of law at the Bombay High Court.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {areas.map((area) => (
            <div key={area.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-xl hover:border-amber-500 transition-all duration-300 group">
              <div className="p-8">
                <div className="w-16 h-16 bg-slate-900 text-amber-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <area.icon className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4 font-serif">{area.title}</h2>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  {area.description}
                </p>
                <ul className="space-y-3 mb-8">
                  {area.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start text-sm text-slate-700">
                      <div className="mt-1.5 mr-3 w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/book-consultation"
                  className="inline-flex items-center text-amber-600 font-semibold hover:text-amber-700 transition-colors"
                >
                  Consult for {area.title} <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* High Court Litigation Banner */}
        <div className="mt-20 bg-slate-900 rounded-3xl overflow-hidden relative">
          <div className="absolute inset-0 z-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center" />
          <div className="relative z-10 p-12 md:p-16 flex flex-col md:flex-row items-center justify-between">
            <div className="max-w-2xl mb-8 md:mb-0">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">High Court Litigation</h2>
              <p className="text-lg text-slate-300 leading-relaxed">
                Specialized representation in Writ Petitions, Public Interest Litigations (PILs), First Appeals, Second Appeals, and Original Side matters before the Hon'ble Bombay High Court.
              </p>
            </div>
            <Link
              to="/book-consultation"
              className="shrink-0 bg-amber-500 text-slate-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-amber-400 transition-colors shadow-lg"
            >
              Schedule Meeting
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
