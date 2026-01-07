
import React from 'react';
import { Shield, Target, Award, BookOpen, Users, MessageSquare, CheckCircle } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="animate-in fade-in duration-1000">
      {/* Hero Section */}
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <div className="inline-block px-3 py-1 bg-[#F9FAFB] dark:bg-zinc-900 text-[10px] font-bold uppercase tracking-widest text-[#6B7280] dark:text-gray-400 mb-6 rounded-full border border-gray-100 dark:border-zinc-800">About Us</div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.1] mb-8 text-[#0B0B0B] dark:text-white">
              About Legal <br /> 
              <span className="text-[#D1D5DB] dark:text-zinc-600">Success India.</span>
            </h1>
            <h2 className="text-xl md:text-2xl font-medium text-[#0B0B0B] dark:text-white mb-8 tracking-tight">Clarity in compliance. Confidence in every step.</h2>
            <p className="text-lg text-[#6B7280] dark:text-gray-400 leading-relaxed">
              Legal Success India is an independent legal consultancy dedicated to helping individuals and businesses navigate regulatory and compliance requirements across India with ease, accuracy, and speed.
            </p>
          </div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-24 px-6 bg-[#F9FAFB]/50 dark:bg-zinc-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-10 tracking-tight text-[#0B0B0B] dark:text-white">Who We Are</h2>
            <div className="space-y-6 text-base text-[#6B7280] dark:text-gray-400 leading-relaxed">
              <p>
                At Legal Success India, our mission is simple: to make the legal system easier to understand and easier to use.
              </p>
              <p>
                We deliver prompt, dependable, and efficient legal guidance through a team of experienced legal professionals and business specialists who understand the real challenges of compliance in India. From startups to established enterprises, we help our clients meet their legal obligations without unnecessary delays or confusion.
              </p>
            </div>
          </div>
          <div className="aspect-[4/3] bg-white dark:bg-zinc-800 rounded-[3rem] border border-gray-100 dark:border-zinc-700 overflow-hidden relative group">
             <img 
               src="https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2000&auto=format&fit=crop" 
               alt="Team working" 
               className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
             />
          </div>
        </div>
      </section>

      {/* Founders Section */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-3xl font-bold tracking-tight mb-4 text-[#0B0B0B] dark:text-white">Our Founders</h2>
            <p className="text-[#6B7280] dark:text-gray-400">Leadership rooted in legal expertise and business strategy.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Arshed */}
            <div className="p-12 bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-[3rem] hover:border-black dark:hover:border-white transition-all duration-500 group">
              <div className="flex flex-col md:flex-row gap-8 items-start mb-8">
                <div className="w-20 h-20 bg-gray-50 dark:bg-zinc-800 rounded-2xl flex-shrink-0 grayscale group-hover:grayscale-0 transition-all overflow-hidden border border-gray-100 dark:border-zinc-700">
                   <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Arshed" alt="Arshed Anwar" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#0B0B0B] dark:text-white">Arshed Anwar</h3>
                  <div className="text-[10px] font-bold text-[#6B7280] dark:text-gray-500 uppercase tracking-widest mt-1">Co-Founder | Business & Compliance Strategy</div>
                </div>
              </div>
              <p className="text-[#6B7280] dark:text-gray-400 leading-relaxed mb-6 text-sm">
                Arshed Anwar holds a Master of Business Administration (MBA) and brings strong expertise in business operations, regulatory affairs, and compliance strategy. He has dedicated his professional career to helping clients navigate India’s complex legal and regulatory landscape.
              </p>
              <p className="text-[#6B7280] dark:text-gray-400 leading-relaxed text-sm">
                Arshed believes every client deserves personalized attention and solutions tailored to their specific needs. His client-centric approach forms the foundation of Legal Success India.
              </p>
            </div>

            {/* Azsed */}
            <div className="p-12 bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-[3rem] hover:border-black dark:hover:border-white transition-all duration-500 group">
              <div className="flex flex-col md:flex-row gap-8 items-start mb-8">
                <div className="w-20 h-20 bg-gray-50 dark:bg-zinc-800 rounded-2xl flex-shrink-0 grayscale group-hover:grayscale-0 transition-all overflow-hidden border border-gray-100 dark:border-zinc-700">
                   <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Azsed" alt="Azsed Anwar" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#0B0B0B] dark:text-white">Azsed Anwar</h3>
                  <div className="text-[10px] font-bold text-[#6B7280] dark:text-gray-500 uppercase tracking-widest mt-1">Co-Founder | Legal Advisory</div>
                </div>
              </div>
              <p className="text-[#6B7280] dark:text-gray-400 leading-relaxed mb-6 text-sm">
                Azsed Anwar is a practicing lawyer associated with a reputed law firm and holds an undergraduate degree in law. His legal expertise complements Arshed’s business acumen, creating a balanced and effective leadership partnership.
              </p>
              <p className="text-[#6B7280] dark:text-gray-400 leading-relaxed text-sm">
                Azsed is deeply committed to transparency, ethical practice, and client empowerment. He understands the difficulties clients face and works to simplify complex processes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Objective */}
      <section className="py-24 px-6 bg-black dark:bg-white text-white dark:text-black rounded-[4rem] mx-6 mb-32">
        <div className="max-w-7xl mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-4xl font-bold mb-10 tracking-tight leading-tight">A Shared Vision</h2>
            <p className="text-lg text-gray-400 dark:text-gray-600 leading-relaxed mb-16 italic">
              "Together, Arshed and Azsed built Legal Success India with a shared vision: to provide not just legal services, but clarity, education, and confidence."
            </p>
            <div className="h-[1px] w-24 bg-gray-800 dark:bg-gray-200 mx-auto mb-16"></div>
            <h3 className="text-xl font-bold mb-6">Our Objective</h3>
            <p className="text-gray-400 dark:text-gray-600 leading-relaxed text-sm">
              Our objective is to empower clients with accessible, reliable legal solutions tailored to their unique requirements. We focus on simplifying complex legal procedures while ensuring compliance with applicable laws and regulations.
            </p>
          </div>
        </div>
      </section>

      {/* Core Services Summary */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl font-bold tracking-tight text-[#0B0B0B] dark:text-white">Core Services</h2>
            <p className="text-[#6B7280] dark:text-gray-400 mt-4 text-sm">Focused solutions for sustainable business growth.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'FSSAI Registration', desc: 'Mandatory registration for food businesses. Ensures legal operation and builds consumer trust.' },
              { title: 'Trademark Registration', desc: 'Legal protection for brand names and logos. Prevents infringement and enhances brand value.' },
              { title: 'GST Registration', desc: 'Essential tax compliance for Indian businesses. Enables input tax credit and supports scalability.' },
              { title: 'Company Registration', desc: 'Setting up Private Limited Companies and LLPs. Provides legal recognition and asset protection.' },
              { title: 'Legal Documentation', desc: 'Drafting agreements and resolving regulatory objections. Reduces delays and legal risks.' }
            ].map((service, i) => (
              <div key={i} className="p-10 bg-[#F9FAFB] dark:bg-zinc-900 rounded-[2.5rem] border border-gray-50 dark:border-zinc-800 flex flex-col items-start hover:scale-[1.02] transition-transform duration-500">
                <div className="w-10 h-10 bg-black dark:bg-white text-white dark:text-black rounded-xl flex items-center justify-center mb-6">
                  <CheckCircle size={18} />
                </div>
                <h4 className="text-lg font-bold mb-4 text-[#0B0B0B] dark:text-white">{service.title}</h4>
                <p className="text-[#6B7280] dark:text-gray-400 text-sm leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 px-6 bg-[#F9FAFB]/50 dark:bg-zinc-900/50 backdrop-blur-md rounded-[4rem] mx-6 mb-32">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl font-bold tracking-tight text-[#0B0B0B] dark:text-white">Client Testimonials</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: 'PS Catering', content: 'Legal Success India handled our FSSAI license quickly and professionally. A reliable team.' },
              { name: 'Raj Kishan', content: 'Excellent service and extremely supportive staff. Highly recommended.' },
              { name: 'Shuvo D', content: 'They guided me personally through the FSSAI process and resolved all compliance concerns.' },
              { name: 'Md. Shahrukh', content: 'Outstanding support on complex legal matters. Truly dependable.' }
            ].map((t, i) => (
              <div key={i} className="bg-white dark:bg-zinc-800 p-10 rounded-[2.5rem] border border-gray-50 dark:border-zinc-700 flex flex-col h-full shadow-sm">
                <MessageSquare className="text-gray-100 dark:text-zinc-600 mb-6" size={40} />
                <p className="text-[#6B7280] dark:text-gray-300 italic text-sm mb-8 leading-relaxed flex-grow">"{t.content}"</p>
                <div className="font-bold text-[#0B0B0B] dark:text-white text-sm">{t.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Education */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
            <div>
              <h2 className="text-2xl font-bold mb-12 text-[#0B0B0B] dark:text-white">Compliance Assurance</h2>
              <ul className="space-y-6">
                {[
                  { icon: <Award size={18}/>, iKey: 'weekly' },
                  { icon: <Users size={18}/>, iKey: 'ca' },
                  { icon: <Shield size={18}/>, iKey: 'audit' },
                  { icon: <Target size={18}/>, iKey: 'research' }
                ].map((item, i) => (
                   <li key={i} className="flex gap-4 items-center p-6 bg-[#F9FAFB] dark:bg-zinc-900 rounded-2xl border border-gray-50 dark:border-zinc-800">
                    <div className="text-black dark:text-white">{item.icon}</div>
                    <span className="font-bold text-[13px] text-[#0B0B0B] dark:text-white">
                      {item.iKey === 'weekly' && 'Weekly legal and regulatory training'}
                      {item.iKey === 'ca' && 'Support from Chartered Accountants'}
                      {item.iKey === 'audit' && 'Regular internal audits for quality'}
                      {item.iKey === 'research' && 'Continuous research and updates'}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-12 text-[#0B0B0B] dark:text-white">Client Education</h2>
              <div className="bg-black dark:bg-zinc-800 text-white p-12 rounded-[3rem] relative overflow-hidden">
                <BookOpen className="absolute -right-10 -bottom-10 w-64 h-64 text-white/5 pointer-events-none" />
                <div className="relative z-10 space-y-8">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-sm">1</div>
                    <p className="text-gray-300 text-sm leading-relaxed"><span className="text-white font-bold block">Easy Legal Guides</span> Simplified step-by-step PDF resources for common registrations.</p>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-sm">2</div>
                    <p className="text-gray-300 text-sm leading-relaxed"><span className="text-white font-bold block">Workshops & Webinars</span> Periodic expert sessions led by the founders.</p>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-sm">3</div>
                    <p className="text-gray-300 text-sm leading-relaxed"><span className="text-white font-bold block">Resource Library</span> Complete FAQ database and historical case studies.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Info / Disclaimer (Short Version) */}
      <section className="py-24 px-6 border-t border-gray-100 dark:border-zinc-800">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs text-[#6B7280] dark:text-gray-400 leading-relaxed mb-12">
            Legal Success India is an independent consultancy and not a government entity. Information provided is for informational purposes only and does not constitute legal advice.
          </p>
          <div className="flex flex-col md:flex-row justify-center items-center gap-12 pt-12 border-t border-gray-100/50 dark:border-zinc-800/50">
            <div className="text-left">
               <div className="text-[10px] font-bold uppercase tracking-widest text-[#6B7280] dark:text-gray-500 mb-2">Email Address</div>
               <div className="text-base font-bold text-[#0B0B0B] dark:text-white">info@legalsuccessindia.com</div>
            </div>
            <div className="text-left">
               <div className="text-[10px] font-bold uppercase tracking-widest text-[#6B7280] dark:text-gray-500 mb-2">Direct Phone</div>
               <div className="text-base font-bold text-[#0B0B0B] dark:text-white">+91 62906 34766</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
