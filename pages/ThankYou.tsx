
import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight, Clock, ShieldCheck, Mail } from 'lucide-react';

const ThankYou: React.FC = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6 py-20 animate-in fade-in duration-1000">
      <div className="max-w-4xl w-full">
        <div className="bg-white border border-gray-100 rounded-[4rem] p-12 md:p-24 shadow-2xl shadow-black/5 relative overflow-hidden text-center">
          {/* Subtle Background Pattern */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#F9FAFB] rounded-full -mr-32 -mt-32 blur-3xl opacity-50"></div>
          
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-20 h-20 bg-black text-white rounded-3xl flex items-center justify-center mb-10 animate-bounce shadow-xl">
              <CheckCircle2 size={40} />
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-[#0B0B0B] mb-6">
              In safe hands.
            </h1>
            
            <p className="text-xl text-gray-500 max-w-xl mx-auto mb-16 leading-relaxed font-medium">
              Your inquiry has been successfully received. A compliance expert is reviewing your details and will contact you <span className="text-black font-bold underline underline-offset-4 decoration-1">within 120 minutes</span>.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mb-16">
              <div className="p-8 bg-[#F9FAFB] rounded-3xl border border-gray-50 flex flex-col items-center text-center group hover:bg-white hover:shadow-xl transition-all duration-500">
                <Clock className="text-gray-300 group-hover:text-black mb-4 transition-colors" size={24} />
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#9CA3AF] mb-2">Priority</h4>
                <p className="text-sm font-bold text-[#0B0B0B]">Real-time Queue</p>
              </div>
              <div className="p-8 bg-[#F9FAFB] rounded-3xl border border-gray-50 flex flex-col items-center text-center group hover:bg-white hover:shadow-xl transition-all duration-500">
                <ShieldCheck className="text-gray-300 group-hover:text-black mb-4 transition-colors" size={24} />
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#9CA3AF] mb-2">Security</h4>
                <p className="text-sm font-bold text-[#0B0B0B]">Encrypted Data</p>
              </div>
              <div className="p-8 bg-[#F9FAFB] rounded-3xl border border-gray-50 flex flex-col items-center text-center group hover:bg-white hover:shadow-xl transition-all duration-500">
                <Mail className="text-gray-300 group-hover:text-black mb-4 transition-colors" size={24} />
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#9CA3AF] mb-2">Notice</h4>
                <p className="text-sm font-bold text-[#0B0B0B]">Email Confirmed</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-6">
              <Link 
                to="/" 
                className="bg-black text-white px-12 py-5 rounded-full font-bold text-sm hover:scale-105 transition-all shadow-xl shadow-black/10 flex items-center gap-3"
              >
                Back to Home
                <ArrowRight size={18} />
              </Link>
              <Link 
                to="/compliance" 
                className="border border-gray-100 bg-white text-gray-500 px-12 py-5 rounded-full font-bold text-sm hover:border-black hover:text-black transition-all"
              >
                Compliance Hub
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;
