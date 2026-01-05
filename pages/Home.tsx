
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, RefreshCw, FileText, CheckCircle2, UserCheck, Clock, Zap } from 'lucide-react';
import { SERVICES, TESTIMONIALS } from '../constants';
import Logo from '../components/Logo';

const Home: React.FC = () => {
  const icons: Record<string, React.ReactNode> = {
    ShieldCheck: <ShieldCheck className="w-5 h-5" />,
    RefreshCw: <RefreshCw className="w-5 h-5" />,
    FileText: <FileText className="w-5 h-5" />
  };

  return (
    <div className="animate-in fade-in duration-1000">
      {/* Hero Section - Reduced padding and heading size */}
      <section className="py-20 md:py-36 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <div className="mb-10 animate-in slide-in-from-bottom-2 duration-700">
              <Logo className="h-8 opacity-60" showText={false} />
            </div>
            
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-[1.1] mb-8">
              Compliance, <br /> 
              <span className="text-[#E5E7EB]">without confusion.</span>
            </h1>
            <p className="text-base md:text-lg text-gray-500 mb-12 leading-relaxed max-w-xl font-medium">
              We help Indian businesses navigate regulatory requirements with clarity, speed, and confidence. We handle the paperwork so you can focus on growth.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                to="/services" 
                className="bg-black text-white px-8 py-4 rounded-full font-bold hover:bg-gray-800 transition-all flex items-center gap-2 group shadow-lg shadow-black/5 text-xs"
              >
                Explore Services
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                to="/contact" 
                className="border border-gray-200 px-8 py-4 rounded-full font-bold hover:border-black transition-all flex items-center bg-white/50 backdrop-blur-sm text-xs"
              >
                Book a Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Metrics - Reduced padding */}
      <section className="border-y border-gray-100 py-16 px-6 bg-white/40 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12">
          {[
            { label: 'Happy Clients', val: '5,000+' },
            { label: 'States Served', val: '28' },
            { label: 'Legal Experts', val: '25+' },
            { label: 'Success Rate', val: '99%' },
          ].map((stat, i) => (
            <div key={i} className="text-center md:text-left animate-in fade-in slide-in-from-bottom-2" style={{ animationDelay: `${i * 100}ms` }}>
              <div className="text-3xl font-bold mb-2 tracking-tighter text-[#0B0B0B]">{stat.val}</div>
              <div className="text-[9px] text-[#9CA3AF] uppercase tracking-[0.2em] font-bold">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Services Grid - Reduced padding and heading size */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-xl">
              <h2 className="text-2xl md:text-4xl font-bold tracking-tight mb-4 text-[#0B0B0B]">Expert compliance solutions</h2>
              <p className="text-[#6B7280] text-base font-medium">Focused legal and regulatory support for businesses operating across India.</p>
            </div>
            <Link to="/services" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.15em] hover:gap-3 transition-all text-[#0B0B0B] pb-1.5 border-b-2 border-black/10">
              View All Services <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SERVICES.map((s) => (
              <Link 
                key={s.id} 
                to={`/services/${s.id}`} 
                className="group p-10 bg-white/60 backdrop-blur-md border border-gray-100 rounded-[2.5rem] hover:border-black transition-all duration-700 flex flex-col h-full hover:shadow-xl hover:shadow-black/5"
              >
                <div className="w-12 h-12 bg-[#F9FAFB] rounded-xl flex items-center justify-center mb-8 group-hover:bg-black group-hover:text-white transition-all duration-500">
                  {icons[s.icon]}
                </div>
                <h3 className="text-xl font-bold mb-4 tracking-tight text-[#0B0B0B]">{s.title}</h3>
                <p className="text-[#6B7280] mb-8 leading-relaxed flex-grow text-sm font-medium">{s.shortDesc}</p>
                <div className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn More <ArrowRight size={12} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Lead Capture Form - Reduced padding */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-black text-white rounded-[3rem] p-10 md:p-24 overflow-hidden relative shadow-xl shadow-black/10">
            <div className="max-w-2xl relative z-10">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-8 leading-[1.1] animate-in slide-in-from-bottom-4">Let’s simplify your compliance.</h2>
              <p className="text-gray-400 mb-16 text-base font-medium max-w-md">Share your details and a compliance expert will contact you within 2 working hours.</p>
              
              <form className="grid grid-cols-1 md:grid-cols-2 gap-10" onSubmit={(e) => e.preventDefault()}>
                <div className="group border-b border-gray-800 focus-within:border-white transition-colors duration-500">
                  <label className="text-[9px] font-bold uppercase tracking-[0.2em] text-gray-600 block mb-1.5">Full Name</label>
                  <input 
                    type="text" 
                    placeholder="E.g. Arshed Anwar" 
                    className="w-full bg-transparent py-3 focus:outline-none text-white text-sm placeholder:text-gray-800"
                  />
                </div>
                <div className="group border-b border-gray-800 focus-within:border-white transition-colors duration-500">
                  <label className="text-[9px] font-bold uppercase tracking-[0.2em] text-gray-600 block mb-1.5">Email Address</label>
                  <input 
                    type="email" 
                    placeholder="E.g. contact@business.com" 
                    className="w-full bg-transparent py-3 focus:outline-none text-white text-sm placeholder:text-gray-800"
                  />
                </div>
                <div className="md:col-span-2 group border-b border-gray-800 focus-within:border-white transition-colors duration-500">
                  <label className="text-[9px] font-bold uppercase tracking-[0.2em] text-gray-600 block mb-1.5">Phone Number</label>
                  <input 
                    type="tel" 
                    placeholder="+91 00000 00000" 
                    className="w-full bg-transparent py-3 focus:outline-none text-white text-sm placeholder:text-gray-800"
                  />
                </div>
                <div className="pt-6">
                  <button 
                    className="bg-white text-black px-10 py-4 rounded-full font-bold hover:scale-105 transition-all text-sm shadow-xl active:scale-95"
                  >
                    Request a Callback
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
