
import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, FileText, RefreshCw, Scale, ArrowRight } from 'lucide-react';

const Compliance: React.FC = () => {
  return (
    <div className="animate-in fade-in duration-1000">
      {/* Header Section */}
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <div className="inline-block px-3 py-1 bg-[#F9FAFB] text-[10px] font-bold uppercase tracking-widest text-[#6B7280] mb-8 rounded-full border border-gray-100">Governance & Trust</div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.1] mb-8 text-[#0B0B0B]">
              Compliance <br /> 
              <span className="text-[#D1D5DB]">Center.</span>
            </h1>
            <p className="text-lg text-[#6B7280] leading-relaxed max-w-2xl font-medium">
              Legal Success India is committed to transparency. This hub provides a clear overview of our operating policies, legal disclaimers, and data protection standards.
            </p>
          </div>
        </div>
      </section>

      {/* Grid of Policies */}
      <section className="py-24 px-6 border-t border-gray-100 bg-white/40 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Disclaimer Summary */}
          <div className="p-12 bg-[#F9FAFB]/80 backdrop-blur-sm rounded-[3rem] border border-gray-100 flex flex-col hover:border-black transition-all group">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-8 border border-gray-100 group-hover:bg-black group-hover:text-white transition-all">
              <Scale size={20} />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-[#0B0B0B] tracking-tight">Legal Disclaimer</h3>
            <p className="text-[#6B7280] mb-10 leading-relaxed flex-grow text-sm font-medium">
              Legal Success India is an independent third-party consultancy. We are not affiliated with, associated with, or endorsed by any government authority.
            </p>
            <Link to="/disclaimer" className="flex items-center gap-2 font-bold text-[10px] uppercase tracking-widest text-[#0B0B0B]">
              Full Disclaimer <ArrowRight size={14} />
            </Link>
          </div>

          {/* Privacy Policy Summary */}
          <div className="p-12 bg-[#F9FAFB]/80 backdrop-blur-sm rounded-[3rem] border border-gray-100 flex flex-col hover:border-black transition-all group">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-8 border border-gray-100 group-hover:bg-black group-hover:text-white transition-all">
              <Shield size={20} />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-[#0B0B0B] tracking-tight">Privacy & Data</h3>
            <p className="text-[#6B7280] mb-10 leading-relaxed flex-grow text-sm font-medium">
              Your privacy is paramount. We implement industry-standard safeguards to protect your personal and business data. We never sell your data to third parties.
            </p>
            <Link to="/privacy" className="flex items-center gap-2 font-bold text-[10px] uppercase tracking-widest text-[#0B0B0B]">
              Privacy Details <ArrowRight size={14} />
            </Link>
          </div>

          {/* Refund Policy Summary */}
          <div className="p-12 bg-[#F9FAFB]/80 backdrop-blur-sm rounded-[3rem] border border-gray-100 flex flex-col hover:border-black transition-all group">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-8 border border-gray-100 group-hover:bg-black group-hover:text-white transition-all">
              <RefreshCw size={20} />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-[#0B0B0B] tracking-tight">Refund & Cancellation</h3>
            <p className="text-[#6B7280] mb-10 leading-relaxed flex-grow text-sm font-medium">
              Transparent service handling. Full refunds are available if no work has been initiated within 15 working days.
            </p>
            <Link to="/refund-policy" className="flex items-center gap-2 font-bold text-[10px] uppercase tracking-widest text-[#0B0B0B]">
              Refund Terms <ArrowRight size={14} />
            </Link>
          </div>

          {/* Terms & Conditions Summary */}
          <div className="p-12 bg-[#F9FAFB]/80 backdrop-blur-sm rounded-[3rem] border border-gray-100 flex flex-col hover:border-black transition-all group">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-8 border border-gray-100 group-hover:bg-black group-hover:text-white transition-all">
              <FileText size={20} />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-[#0B0B0B] tracking-tight">Terms of Service</h3>
            <p className="text-[#6B7280] mb-10 leading-relaxed flex-grow text-sm font-medium">
              Our governing framework for business engagement. Covers payments, liability, and dispute resolution in accordance with Indian law.
            </p>
            <Link to="/terms" className="flex items-center gap-2 font-bold text-[10px] uppercase tracking-widest text-[#0B0B0B]">
              Agreement <ArrowRight size={14} />
            </Link>
          </div>

        </div>
      </section>

      {/* Corporate Info Block */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-black text-white p-16 rounded-[4rem] relative overflow-hidden shadow-2xl">
             <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2">
                  <h2 className="text-2xl font-bold mb-6 tracking-tight">Corporate Identity</h2>
                  <p className="text-gray-400 max-w-xl mb-8 text-sm">Legal Success India operates under Khalid Legal Works Private Limited, registered in West Bengal. We adhere to all corporate governance norms as per the Companies Act, 2013.</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-sm">
                    <div>
                      <span className="text-gray-500 block uppercase tracking-widest text-[9px] mb-2 font-bold">CIN</span>
                      <span className="font-mono text-base tracking-widest">U70200WB2024PTC270336</span>
                    </div>
                    <div>
                      <span className="text-gray-500 block uppercase tracking-widest text-[9px] mb-2 font-bold">Directors</span>
                      <span className="text-base">Azsed Anwar, Arshed Anwar</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-center lg:justify-end">
                   <div className="w-32 h-32 border border-white/20 rounded-full flex items-center justify-center font-bold text-[9px] uppercase tracking-widest text-center">
                      Verified <br /> Business
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Short Legal Line */}
      <section className="pb-32 px-6">
        <div className="max-w-4xl mx-auto p-12 bg-gray-50/50 backdrop-blur-md border border-gray-100 rounded-[3rem] text-[10px] text-[#6B7280] leading-relaxed text-center uppercase tracking-widest font-bold">
          Legal Success India is an independent consultancy and not a government entity.
        </div>
      </section>
    </div>
  );
};

export default Compliance;
