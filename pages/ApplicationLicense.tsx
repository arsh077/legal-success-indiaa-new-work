
import React, { useEffect } from 'react';
import { ArrowRight, CheckCircle2, LayoutGrid, Building2, HelpCircle, Check } from 'lucide-react';

const ApplicationLicense: React.FC = () => {
  // Automatic scroll to form on page load
  useEffect(() => {
    const timer = setTimeout(() => {
      const element = document.getElementById('apply-form');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 500); // Small delay to allow layout to settle and ensure scroll-behavior: smooth is respected
    return () => clearTimeout(timer);
  }, []);

  const scrollToForm = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById('apply-form');
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
            <div className="inline-block px-3 py-1 bg-[#F9FAFB] text-[10px] font-bold uppercase tracking-widest text-[#6B7280] mb-6 rounded-full border border-gray-100">Application Portal</div>
            <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-[1] mb-8 text-[#0B0B0B]">
              FSSAI License <br /> 
              <span className="text-[#D1D5DB]">Application.</span>
            </h1>
            <p className="text-xl text-[#6B7280] mb-12 leading-relaxed max-w-2xl">
              Helping food businesses register legally and confidently. Complete support for FSSAI registration from start to finish.
            </p>
            <div className="flex flex-wrap gap-5">
              <a 
                href="#apply-form" 
                onClick={scrollToForm}
                className="bg-black text-white px-12 py-5 rounded-full font-bold hover:bg-gray-800 transition-all flex items-center gap-3 group"
              >
                Apply Now
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <button className="border border-[#D1D5DB] text-[#0B0B0B] px-12 py-5 rounded-full font-bold hover:border-black transition-all">
                Talk to an Expert
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FORM SECTION (Immediately after Hero) - Added scroll-mt-32 to account for fixed header */}
      <section className="py-24 px-6 bg-[#F9FAFB] scroll-mt-32" id="apply-form">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white border border-gray-100 rounded-[3rem] p-10 md:p-16 shadow-2xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight mb-4 text-[#0B0B0B]">Ready to apply?</h2>
              <p className="text-[#6B7280]">Fill out the form below and our experts will get back to you within 2 hours.</p>
            </div>
            
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input type="text" placeholder="Full Name" className="w-full bg-[#F3F4F6] border-none rounded-2xl p-5 outline-none focus:ring-1 focus:ring-black text-[#0B0B0B] placeholder:text-[#9CA3AF]" />
                <input type="email" placeholder="Email Address" className="w-full bg-[#F3F4F6] border-none rounded-2xl p-5 outline-none focus:ring-1 focus:ring-black text-[#0B0B0B] placeholder:text-[#9CA3AF]" />
              </div>
              <input type="tel" placeholder="Phone Number" className="w-full bg-[#F3F4F6] border-none rounded-2xl p-5 outline-none focus:ring-1 focus:ring-black text-[#0B0B0B] placeholder:text-[#9CA3AF]" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <select className="w-full bg-[#F3F4F6] border-none rounded-2xl p-4 focus:ring-1 focus:ring-black appearance-none text-[#6B7280]">
                    <option>Select Business Type</option>
                    <option>Restaurant / Cafe</option>
                    <option>Cloud Kitchen</option>
                    <option>Manufacturing Unit</option>
                    <option>Distributor / Supplier</option>
                 </select>
                 <select className="w-full bg-[#F3F4F6] border-none rounded-2xl p-4 focus:ring-1 focus:ring-black appearance-none text-[#6B7280]">
                    <option>Expected License Type</option>
                    <option>Basic Registration</option>
                    <option>State License</option>
                    <option>Central License</option>
                 </select>
              </div>
              <button className="w-full bg-black text-white py-6 rounded-full font-bold text-lg hover:bg-gray-900 transition-all">
                Submit Application
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* 3. BENEFITS & STEPS SECTION */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-4xl font-bold tracking-tight mb-6 text-[#0B0B0B]">How the process works</h2>
            <p className="text-[#6B7280] text-lg">A clear path from application to certification.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { title: 'Reach out to our experts', desc: 'We have experienced compliance professionals to answer all your queries.' },
              { title: 'Provide required documents', desc: 'Share the necessary documents and we’ll guide you through the paperwork.' },
              { title: 'Get your FSSAI registration', desc: 'Your application is processed and the certificate is delivered to you.' }
            ].map((step, i) => (
              <div key={i} className="relative p-10 bg-[#F9FAFB] rounded-[2.5rem] border border-gray-50">
                <div className="text-6xl font-black text-[#F3F4F6] absolute top-8 right-8 pointer-events-none">0{i+1}</div>
                <h3 className="text-xl font-bold mb-4 text-[#0B0B0B] relative z-10">{step.title}</h3>
                <p className="text-[#6B7280] leading-relaxed relative z-10">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. DETAILED LEGAL CONTENT */}
      <section className="py-32 px-6 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-32">
            
            {/* Intro */}
            <div>
              <h2 className="text-4xl font-bold mb-10 tracking-tight text-[#0B0B0B]">FSSAI Registration – Food License Application Process Online</h2>
              <div className="text-lg text-[#6B7280] leading-relaxed space-y-6">
                <p>Planning to start or expand your food business in India? Obtaining an FSSAI registration is mandatory under the Food Safety and Standards Act, 2006.</p>
                <p>Whether you operate a home kitchen, restaurant, bakery, cloud kitchen, or food processing unit, a valid FSSAI food license is essential to operate legally and responsibly.</p>
              </div>
            </div>

            {/* Why Important */}
            <div>
              <h3 className="text-3xl font-bold mb-10 text-[#0B0B0B]">1. Why FSSAI Registration Is Important</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { t: 'Legal Requirement', d: 'Every food business must register. Operating without it is illegal and may result in penalties.' },
                  { t: 'Food Safety & Hygiene', d: 'Confirms compliance with hygiene standards under the Act.' },
                  { t: 'Builds Customer Trust', d: 'Displaying an FSSAI number builds credibility and consumer confidence.' },
                  { t: 'Enables Online Selling', d: 'Platforms like Swiggy, Zomato, and Amazon require valid registration.' },
                  { t: 'Supports Business Growth', d: 'Required for expansion, franchising, loans, and investments.' },
                  { t: 'Protection Against Penalties', d: 'Avoids legal notices, fines, or shutdowns.' },
                  { t: 'Promotes Clean Food Practices', d: 'Encourages GMP, hygiene, storage, and safe handling.' }
                ].map((item, i) => (
                  <div key={i} className="p-8 bg-[#F9FAFB] rounded-3xl border border-gray-50">
                    <h4 className="font-bold mb-3 text-[#0B0B0B]">{i+1}. {item.t}</h4>
                    <p className="text-sm text-[#6B7280] leading-relaxed">{item.d}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Who Needs It */}
            <div>
              <h3 className="text-3xl font-bold mb-10 text-[#0B0B0B]">2. Who Needs an FSSAI Certificate</h3>
              <div className="bg-black text-white p-12 rounded-[3rem] grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  'Food manufacturers', 'Food processors and repackers', 'Retailers and wholesalers',
                  'Restaurants & Cloud kitchens', 'Caterers and tiffin services', 'Home-based food sellers',
                  'Online food businesses', 'Importers and exporters'
                ].map((who, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Check size={16} className="text-[#D1D5DB]" />
                    <span className="font-medium">{who}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Categories Table */}
            <div>
              <h3 className="text-3xl font-bold mb-10 text-[#0B0B0B]">3. FSSAI License Categories</h3>
              <div className="overflow-hidden border border-gray-100 rounded-[2rem] shadow-sm">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-[#F9FAFB] border-b border-gray-100">
                    <tr>
                      <th className="px-8 py-6 font-bold text-sm uppercase tracking-widest text-[#6B7280]">License Type</th>
                      <th className="px-8 py-6 font-bold text-sm uppercase tracking-widest text-[#6B7280]">Eligibility</th>
                      <th className="px-8 py-6 font-bold text-sm uppercase tracking-widest text-[#6B7280]">Suitable For</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr>
                      <td className="px-8 py-6 font-bold text-[#0B0B0B]">Basic Registration</td>
                      <td className="px-8 py-6 text-[#6B7280]">Up to ₹12 Lakhs</td>
                      <td className="px-8 py-6 text-[#6B7280]">Home kitchens, petty sellers</td>
                    </tr>
                    <tr>
                      <td className="px-8 py-6 font-bold text-[#0B0B0B]">State License</td>
                      <td className="px-8 py-6 text-[#6B7280]">₹12 Lakh – ₹20 Crore</td>
                      <td className="px-8 py-6 text-[#6B7280]">Medium restaurants, distributors</td>
                    </tr>
                    <tr>
                      <td className="px-8 py-6 font-bold text-[#0B0B0B]">Central License</td>
                      <td className="px-8 py-6 text-[#6B7280]">Above ₹20 Crore</td>
                      <td className="px-8 py-6 text-[#6B7280]">Large manufacturers, exporters</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Documents */}
            <div>
              <h3 className="text-3xl font-bold mb-10 text-[#0B0B0B]">4. Documents Required</h3>
              <div className="space-y-4">
                {[
                  'Applicant photograph',
                  'Government ID (Aadhaar, PAN, Passport)',
                  'Business address proof (Rent Agreement / Utility Bill)',
                  'Food safety management plan',
                  'Additional documents like Form-B, NOC, water test report (where applicable)'
                ].map((doc, i) => (
                  <div key={i} className="flex gap-4 p-6 bg-[#F9FAFB] rounded-2xl border border-gray-50 items-center">
                    <CheckCircle2 size={20} className="text-black" />
                    <span className="font-medium text-[#0B0B0B]">{doc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Procedure */}
            <div>
              <h3 className="text-3xl font-bold mb-10 text-[#0B0B0B]">5. Registration Procedure</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {[
                  'Identify license type', 'Collect documents', 'Online application', 'Verification & Inspection', 'Approval & Download'
                ].map((proc, i) => (
                  <div key={i} className="p-6 bg-[#F9FAFB] rounded-3xl text-center border border-gray-50 flex flex-col items-center">
                    <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-xs font-bold mb-4">{i+1}</div>
                    <span className="text-sm font-bold text-[#0B0B0B] leading-tight">{proc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Penalties */}
            <div className="p-12 bg-gray-50 border border-gray-100 rounded-[3rem]">
              <h3 className="text-3xl font-bold mb-8 text-[#0B0B0B]">6. Penalties for Non-Compliance</h3>
              <ul className="space-y-6">
                <li className="flex gap-4 items-start">
                  <div className="w-2 h-2 rounded-full bg-red-500 mt-2.5 flex-shrink-0"></div>
                  <p className="text-[#6B7280] leading-relaxed"><span className="font-bold text-[#0B0B0B]">Fines up to ₹5 lakh:</span> Heavy monetary penalties for lack of registration.</p>
                </li>
                <li className="flex gap-4 items-start">
                  <div className="w-2 h-2 rounded-full bg-red-500 mt-2.5 flex-shrink-0"></div>
                  <p className="text-[#6B7280] leading-relaxed"><span className="font-bold text-[#0B0B0B]">Legal action for unsafe food:</span> Criminal liability if safety standards aren't met.</p>
                </li>
                <li className="flex gap-4 items-start">
                  <div className="w-2 h-2 rounded-full bg-red-500 mt-2.5 flex-shrink-0"></div>
                  <p className="text-[#6B7280] leading-relaxed"><span className="font-bold text-[#0B0B0B]">Business Suspension:</span> Risk of immediate shutdowns and loss of livelihood.</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FAQs Section */}
      <section className="py-32 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold mb-16 text-center text-[#0B0B0B]">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              { q: 'Is FSSAI mandatory for home kitchens?', a: 'Yes, any business involved in food handling, including home kitchens, must have FSSAI registration.' },
              { q: 'Can I apply for an FSSAI license online?', a: 'Yes, the entire process can be completed via the official FoSCoS portal with professional assistance.' },
              { q: 'Do I need separate licenses for multiple locations?', a: 'Yes, each food premise requires its own separate FSSAI registration or license.' }
            ].map((faq, i) => (
              <div key={i} className="p-8 bg-[#F9FAFB] rounded-[2rem] border border-gray-50">
                <h4 className="font-bold mb-3 text-[#0B0B0B]">{faq.q}</h4>
                <p className="text-[#6B7280] text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. DISCLAIMER BLOCK (Short Version) */}
      <section className="pb-32 px-6">
        <div className="max-w-4xl mx-auto p-12 bg-gray-50 border border-gray-100 rounded-[3rem] text-xs text-[#6B7280] leading-relaxed text-center">
          Legal Success India is an independent consultancy and not a government entity. Information provided is for informational purposes only and does not constitute legal advice.
        </div>
      </section>
    </div>
  );
};

export default ApplicationLicense;
