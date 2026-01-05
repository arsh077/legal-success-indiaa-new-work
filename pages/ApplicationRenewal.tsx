
import React, { useEffect } from 'react';
import { ArrowRight, RefreshCw, Clock, ShieldAlert, CheckCircle2, Check } from 'lucide-react';

const ApplicationRenewal: React.FC = () => {
  // Automatic scroll to form on page load
  useEffect(() => {
    const timer = setTimeout(() => {
      const element = document.getElementById('renew-form');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const scrollToForm = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById('renew-form');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="animate-in fade-in duration-1000">
      {/* 1. HERO SECTION */}
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <div className="inline-block px-3 py-1 bg-[#F9FAFB] text-[10px] font-bold uppercase tracking-widest text-[#6B7280] mb-6 rounded-full border border-gray-100">Renewal Portal</div>
            <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-[1] mb-8 text-[#0B0B0B]">
              FSSAI License <br /> 
              <span className="text-[#D1D5DB]">Renewal.</span>
            </h1>
            <p className="text-xl text-[#6B7280] mb-12 leading-relaxed max-w-2xl">
              Stay compliant, avoid penalties, and keep your business running. Seamless renewal support so you never lose your legal status.
            </p>
            <div className="flex flex-wrap gap-5">
              <a 
                href="#renew-form" 
                onClick={scrollToForm}
                className="bg-black text-white px-12 py-5 rounded-full font-bold hover:bg-gray-800 transition-all flex items-center gap-3 group"
              >
                Renew Now
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <button className="border border-[#D1D5DB] text-[#0B0B0B] px-12 py-5 rounded-full font-bold hover:border-black transition-all">
                Ask an Expert
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FORM SECTION (Immediately after Hero) - Added scroll-mt-32 */}
      <section className="py-24 px-6 bg-[#F9FAFB] scroll-mt-32" id="renew-form">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white border border-gray-100 rounded-[3rem] p-10 md:p-16 shadow-2xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight mb-4 text-[#0B0B0B]">Renew your license.</h2>
              <p className="text-[#6B7280]">Submit your existing license details for a fast renewal assessment.</p>
            </div>
            
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input type="text" placeholder="Full Name" className="w-full bg-[#F3F4F6] border-none rounded-2xl p-5 outline-none focus:ring-1 focus:ring-black text-[#0B0B0B] placeholder:text-[#9CA3AF]" />
                <input type="email" placeholder="Email Address" className="w-full bg-[#F3F4F6] border-none rounded-2xl p-5 outline-none focus:ring-1 focus:ring-black text-[#0B0B0B] placeholder:text-[#9CA3AF]" />
              </div>
              <input type="tel" placeholder="Phone Number" className="w-full bg-[#F3F4F6] border-none rounded-2xl p-5 outline-none focus:ring-1 focus:ring-black text-[#0B0B0B] placeholder:text-[#9CA3AF]" />
              <input type="text" placeholder="Current FSSAI License Number" className="w-full bg-[#F3F4F6] border-none rounded-2xl p-5 outline-none focus:ring-1 focus:ring-black font-mono tracking-wider text-[#0B0B0B]" />
              
              <button className="w-full bg-black text-white py-6 rounded-full font-bold text-lg hover:bg-gray-900 transition-all flex items-center justify-center gap-3">
                <RefreshCw size={20} />
                Submit Renewal Request
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* 3. BENEFITS & STEPS SECTION */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-4xl font-bold tracking-tight mb-6 text-[#0B0B0B]">Renewal process</h2>
            <p className="text-[#6B7280] text-lg">Keep your operations seamless and legal.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {[
              'Consult our team', 'Share license copy', 'Application filing', 'Progress monitoring', 'Receive certificate'
            ].map((step, i) => (
              <div key={i} className="text-center group">
                <div className="w-16 h-16 bg-[#F9FAFB] border border-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6 text-[#0B0B0B] font-bold text-xl group-hover:bg-black group-hover:text-white transition-all duration-500">
                  {i+1}
                </div>
                <div className="text-sm font-bold text-[#0B0B0B]">{step}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. DETAILED LEGAL CONTENT */}
      <section className="py-32 px-6 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto space-y-32">
          
          {/* Why Renewal Matters */}
          <div>
            <h2 className="text-3xl font-bold mb-10 text-[#0B0B0B]">Why Renewal Matters</h2>
            <p className="text-lg text-[#6B7280] leading-relaxed mb-12">
              FSSAI licenses are valid for up to five years. Renewing on time is critical to avoid penalties and legal issues. If you miss the renewal window, your business operates illegally.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { t: 'Maintains legal status', d: 'Ensures your business stays authorized without any legal gap.' },
                { t: 'Avoids daily fines', d: 'Penalties apply for every day of operation with an expired license.' },
                { t: 'Keeps customer trust', d: 'Active license numbers are essential for Zomato/Swiggy visibility.' },
                { t: 'Smooth operations', d: 'Prevents supply chain blocks and government notices.' }
              ].map((benefit, i) => (
                <div key={i} className="p-8 bg-[#F9FAFB] rounded-3xl border border-gray-50 flex items-start gap-4">
                  <Check size={20} className="text-black flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold mb-2 text-[#0B0B0B]">{benefit.t}</h4>
                    <p className="text-sm text-[#6B7280] leading-relaxed">{benefit.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Required Documents */}
          <div>
            <h2 className="text-3xl font-bold mb-10 text-[#0B0B0B]">Required Documents</h2>
            <div className="bg-black text-white p-12 rounded-[3rem] space-y-6">
              {[
                'Your current FSSAI certificate',
                'Updated address or business details (if changed)',
                'List of products/services being provided',
                'Any regulatory changes since original registration'
              ].map((doc, i) => (
                <div key={i} className="flex gap-4 items-center">
                  <div className="w-2 h-2 rounded-full bg-white flex-shrink-0"></div>
                  <span className="font-medium">{doc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ Renewal */}
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-[#0B0B0B]">Common Renewal Questions</h2>
            <div className="space-y-6">
              {[
                { q: 'What if I miss the renewal date?', a: 'Penalties apply, and renewal can become significantly more complex, often requiring a fresh application.' },
                { q: 'Can I convert Basic to State/Central during renewal?', a: 'Yes, if your turnover or operational scale has grown, you can upgrade your category.' }
              ].map((faq, i) => (
                <div key={i} className="p-8 bg-[#F9FAFB] rounded-[2rem] border border-gray-50">
                  <h4 className="font-bold mb-3 text-[#0B0B0B]">{faq.q}</h4>
                  <p className="text-[#6B7280] text-sm leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. DISCLAIMER BLOCK (Short Version) */}
      <section className="pb-32 px-6">
        <div className="max-w-4xl mx-auto p-12 bg-gray-50 border border-gray-100 rounded-[3rem] text-xs text-[#6B7280] leading-relaxed text-center">
          Legal Success India is an independent consultancy and not a government entity. Information provided is for informational purposes only and does not constitute legal advice.
        </div>
      </section>
    </div>
  );
};

export default ApplicationRenewal;
