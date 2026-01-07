
import React from 'react';
import { Shield, Target, Award, BookOpen, Users, MessageSquare, CheckCircle } from 'lucide-react';
import { TextRoll } from '../components/ui/text-roll.tsx';

const About: React.FC = () => {
  return (
    <div className="animate-in fade-in duration-1000 bg-white dark:bg-zinc-950">
      
      {/* Hero */}
      <div className="pt-32 pb-20 px-6 text-center max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.1] mb-6 text-[#0B0B0B] dark:text-white flex flex-col items-center">
          <span className="block md:hidden">About Legal Success India.</span>
          <div className="hidden md:block">
            <TextRoll center>About Legal Success India.</TextRoll>
          </div>
        </h1>
        <h2 className="text-xl md:text-2xl font-medium text-gray-500 dark:text-zinc-400 mb-8 tracking-tight">
          Clarity in compliance. Confidence in every step.
        </h2>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-24">
          {/* Who We Are */}
          <section className="py-12 bg-[#F9FAFB]/50 dark:bg-zinc-900/50 backdrop-blur-sm rounded-[2rem] p-8 mb-12 border border-gray-100 dark:border-zinc-800">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6 tracking-tight text-[#0B0B0B] dark:text-white">Who We Are</h2>
                <div className="space-y-6 text-base text-[#6B7280] dark:text-gray-400 leading-relaxed">
                  <p>
                    At Legal Success India, our mission is simple: to make the legal system easier to understand and easier to use.
                  </p>
                  <p>
                    We deliver prompt, dependable, and efficient legal guidance through a team of experienced legal professionals and business specialists who understand the real challenges of compliance in India. From startups to established enterprises, we help our clients meet their legal obligations without unnecessary delays or confusion.
                  </p>
                </div>
              </div>
              <div className="aspect-[4/3] bg-white dark:bg-zinc-800 rounded-[2rem] border border-gray-100 dark:border-zinc-700 overflow-hidden relative group">
                <img 
                  src="https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2000&auto=format&fit=crop" 
                  alt="Team working" 
                  className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                />
              </div>
            </div>
          </section>

          {/* Founders Section */}
          <section className="py-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight mb-4 text-[#0B0B0B] dark:text-white">Our Founders</h2>
              <p className="text-[#6B7280] dark:text-gray-400">Leadership rooted in legal expertise and business strategy.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Arshed */}
              <div className="p-8 bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-[2rem] hover:border-black dark:hover:border-white transition-all duration-500 group">
                <div className="flex flex-col md:flex-row gap-6 items-start mb-6">
                  <div className="w-16 h-16 bg-gray-50 dark:bg-zinc-800 rounded-2xl flex-shrink-0 grayscale group-hover:grayscale-0 transition-all overflow-hidden border border-gray-100 dark:border-zinc-700">
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Arshed" alt="Arshed Anwar" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#0B0B0B] dark:text-white">Arshed Anwar</h3>
                    <div className="text-[9px] font-bold text-[#6B7280] dark:text-gray-500 uppercase tracking-widest mt-1">Co-Founder | Business & Compliance Strategy</div>
                  </div>
                </div>
                <p className="text-[#6B7280] dark:text-gray-400 leading-relaxed mb-4 text-xs">
                  Arshed Anwar holds a Master of Business Administration (MBA) and brings strong expertise in business operations, regulatory affairs, and compliance strategy. He has dedicated his professional career to helping clients navigate India’s complex legal and regulatory landscape.
                </p>
                <p className="text-[#6B7280] dark:text-gray-400 leading-relaxed text-xs">
                  Arshed believes every client deserves personalized attention and solutions tailored to their specific needs. His client-centric approach forms the foundation of Legal Success India.
                </p>
              </div>

              {/* Azsed */}
              <div className="p-8 bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-[2rem] hover:border-black dark:hover:border-white transition-all duration-500 group">
                <div className="flex flex-col md:flex-row gap-6 items-start mb-6">
                  <div className="w-16 h-16 bg-gray-50 dark:bg-zinc-800 rounded-2xl flex-shrink-0 grayscale group-hover:grayscale-0 transition-all overflow-hidden border border-gray-100 dark:border-zinc-700">
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Azsed" alt="Azsed Anwar" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#0B0B0B] dark:text-white">Azsed Anwar</h3>
                    <div className="text-[9px] font-bold text-[#6B7280] dark:text-gray-500 uppercase tracking-widest mt-1">Co-Founder | Legal Advisory</div>
                  </div>
                </div>
                <p className="text-[#6B7280] dark:text-gray-400 leading-relaxed mb-4 text-xs">
                  Azsed Anwar is a practicing lawyer associated with a reputed law firm and holds an undergraduate degree in law. His legal expertise complements Arshed’s business acumen, creating a balanced and effective leadership partnership.
                </p>
                <p className="text-[#6B7280] dark:text-gray-400 leading-relaxed text-xs">
                  Azsed is deeply committed to transparency, ethical practice, and client empowerment. He understands the difficulties clients face and works to simplify complex processes.
                </p>
              </div>
            </div>
          </section>

          {/* Vision & Objective */}
          <section className="py-12 bg-black dark:bg-white text-white dark:text-black rounded-[2rem] mx-2 mb-12">
            <div className="text-center p-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-8 tracking-tight leading-tight">A Shared Vision</h2>
              <p className="text-base text-gray-400 dark:text-gray-600 leading-relaxed mb-10 italic">
                "Together, Arshed and Azsed built Legal Success India with a shared vision: to provide not just legal services, but clarity, education, and confidence."
              </p>
              <div className="h-[1px] w-24 bg-gray-800 dark:bg-gray-200 mx-auto mb-10"></div>
              <h3 className="text-lg font-bold mb-4">Our Objective</h3>
              <p className="text-gray-400 dark:text-gray-600 leading-relaxed text-sm">
                Our objective is to empower clients with accessible, reliable legal solutions tailored to their unique requirements. We focus on simplifying complex legal procedures while ensuring compliance with applicable laws and regulations.
              </p>
            </div>
          </section>

          {/* Core Services Summary */}
          <section className="py-12">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold tracking-tight text-[#0B0B0B] dark:text-white">Core Services</h2>
              <p className="text-[#6B7280] dark:text-gray-400 mt-2 text-xs">Focused solutions for sustainable business growth.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: 'FSSAI Registration', desc: 'Mandatory registration for food businesses. Ensures legal operation and builds consumer trust.' },
                { title: 'Trademark Registration', desc: 'Legal protection for brand names and logos. Prevents infringement and enhances brand value.' },
                { title: 'GST Registration', desc: 'Essential tax compliance for Indian businesses. Enables input tax credit and supports scalability.' },
                { title: 'Company Registration', desc: 'Setting up Private Limited Companies and LLPs. Provides legal recognition and asset protection.' },
                { title: 'Legal Documentation', desc: 'Drafting agreements and resolving regulatory objections. Reduces delays and legal risks.' }
              ].map((service, i) => (
                <div key={i} className="p-8 bg-[#F9FAFB] dark:bg-zinc-900 rounded-[2rem] border border-gray-50 dark:border-zinc-800 flex flex-col items-start hover:scale-[1.02] transition-transform duration-500">
                  <div className="w-8 h-8 bg-black dark:bg-white text-white dark:text-black rounded-lg flex items-center justify-center mb-4">
                    <CheckCircle size={14} />
                  </div>
                  <h4 className="text-base font-bold mb-2 text-[#0B0B0B] dark:text-white">{service.title}</h4>
                  <p className="text-[#6B7280] dark:text-gray-400 text-xs leading-relaxed">{service.desc}</p>
                </div>
              ))}
            </div>
          </section>
      </div>
    </div>
  );
};

export default About;
