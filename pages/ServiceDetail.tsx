
import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowRight, CheckCircle2, ChevronRight } from 'lucide-react';
import { SERVICES } from '../constants';

const ServiceDetail: React.FC = () => {
  const { id } = useParams();
  const service = SERVICES.find(s => s.id === id);

  if (!service) return <Navigate to="/services" />;

  return (
    <div className="animate-in fade-in duration-700">
      {/* Service Hero */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-8">
            <Link to="/services" className="hover:text-black">Services</Link>
            <ChevronRight size={10} />
            <span className="text-black">{service.title}</span>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-8 leading-tight">{service.title}</h1>
              <p className="text-lg text-gray-500 leading-relaxed mb-10 font-medium">
                {service.fullDesc}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/contact" className="bg-black text-white px-10 py-5 rounded-full font-bold flex items-center gap-2 text-sm shadow-lg shadow-black/10">
                  Start Application <ArrowRight size={16} />
                </Link>
                <div className="flex flex-col justify-center px-6">
                  <div className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Pricing Starts At</div>
                  <div className="font-bold text-base">{service.price}</div>
                </div>
              </div>
            </div>
            <div className="bg-white/40 backdrop-blur-sm p-4 rounded-[3rem] border border-gray-100 overflow-hidden shadow-sm">
               <div className="aspect-[4/3] rounded-[2.5rem] overflow-hidden">
                <img 
                  src={`https://picsum.photos/800/600?random=${service.id}`} 
                  alt={service.title} 
                  className="w-full h-full object-cover grayscale opacity-80" 
                />
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Purpose & Process */}
      <section className="py-24 px-6 bg-gray-50/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-24">
          <div>
            <h2 className="text-2xl font-bold mb-8 tracking-tight">Purpose & Use Case</h2>
            <div className="space-y-4">
              {service.purpose.map((item, i) => (
                <div key={i} className="flex gap-4 p-6 bg-white/80 rounded-3xl border border-gray-100 items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-black text-white flex items-center justify-center mt-0.5">
                    <CheckCircle2 size={12} />
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed font-medium">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-8 tracking-tight">The Process</h2>
            <div className="space-y-0 relative">
              <div className="absolute left-6 top-8 bottom-8 w-[1px] bg-gray-200"></div>
              {service.process.map((step, i) => (
                <div key={i} className="relative pl-16 pb-12 last:pb-0">
                  <div className="absolute left-0 top-0 w-12 h-12 bg-white border border-gray-200 rounded-full flex items-center justify-center text-[#0B0B0B] font-bold z-10 text-sm">
                    {i + 1}
                  </div>
                  <p className="text-base text-gray-700 font-medium pt-2.5 leading-relaxed">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight">Why Choose Us for {service.title}?</h2>
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {service.benefits.map((benefit, i) => (
            <div key={i} className="p-8 border border-gray-100 rounded-[2rem] bg-white/40 backdrop-blur-sm hover:border-black transition-all text-center group">
              <div className="w-10 h-10 bg-black text-white rounded-xl mx-auto mb-6 flex items-center justify-center">
                <CheckCircle2 size={18} />
              </div>
              <h3 className="font-bold mb-2 text-sm tracking-tight">{benefit}</h3>
              <p className="text-[11px] text-gray-500 uppercase tracking-widest font-bold">Verified Procedure</p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto bg-black text-white p-12 md:p-20 rounded-[4rem] text-center shadow-2xl shadow-black/20 overflow-hidden relative">
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold mb-8 tracking-tight leading-tight">Ready to get your <br />{service.title}?</h2>
            <p className="text-gray-400 text-base mb-12 max-w-xl mx-auto">Join thousands of successful business owners who trust Legal Success India for their compliance journey.</p>
            <Link to="/contact" className="bg-white text-black px-12 py-5 rounded-full font-bold hover:scale-105 transition-transform inline-block text-sm">
              Apply Now
            </Link>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
        </div>
      </section>
    </div>
  );
};

export default ServiceDetail;
