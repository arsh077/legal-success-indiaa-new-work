
import React, { useEffect } from 'react';
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

const Contact: React.FC = () => {
  // Automatic scroll to form on page load
  useEffect(() => {
    const timer = setTimeout(() => {
      const element = document.getElementById('contact-form');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="animate-in fade-in duration-700 py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          <div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 text-[#0B0B0B]">Let's connect.</h1>
            <p className="text-xl text-[#6B7280] mb-16 leading-relaxed">
              Have a question or ready to start your filing? Reach out to us. We’re here to help you navigate the legal landscape.
            </p>

            <div className="space-y-12">
              <div className="flex gap-6">
                <div className="w-12 h-12 bg-[#F9FAFB] rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Mail size={24} className="text-[#0B0B0B]" />
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-[#6B7280] mb-1">Email Us</div>
                  <div className="text-xl font-bold text-[#0B0B0B]">info@legalsuccessindia.com</div>
                </div>
              </div>
              
              <div className="flex gap-6">
                <div className="w-12 h-12 bg-[#F9FAFB] rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Phone size={24} className="text-[#0B0B0B]" />
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-[#6B7280] mb-1">Call Anytime</div>
                  <div className="text-xl font-bold text-[#0B0B0B]">+91 90072 99384</div>
                  <div className="text-xl font-bold text-[#0B0B0B]">+91 62906 34766</div>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="w-12 h-12 bg-[#F9FAFB] rounded-2xl flex items-center justify-center flex-shrink-0">
                  <MapPin size={24} className="text-[#0B0B0B]" />
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-[#6B7280] mb-1">Main Office</div>
                  <div className="text-xl font-bold text-[#0B0B0B]">22/1 Mominpore Road, Kolkata – 700023</div>
                </div>
              </div>
            </div>
          </div>

          <div id="contact-form" className="bg-white p-10 md:p-16 border border-gray-100 rounded-[3rem] shadow-2xl scroll-mt-32">
            <h2 className="text-2xl font-bold mb-8 text-[#0B0B0B]">Send an Inquiry</h2>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[#6B7280]">Name</label>
                  <input type="text" className="w-full bg-[#F3F4F6] border-none rounded-2xl p-4 focus:ring-1 focus:ring-black outline-none transition-all text-[#0B0B0B]" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[#6B7280]">Email</label>
                  <input type="email" className="w-full bg-[#F3F4F6] border-none rounded-2xl p-4 focus:ring-1 focus:ring-black outline-none transition-all text-[#0B0B0B]" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-[#6B7280]">Service Required</label>
                <select className="w-full bg-[#F3F4F6] border-none rounded-2xl p-4 focus:ring-1 focus:ring-black outline-none transition-all appearance-none text-[#0B0B0B]">
                  <option>FSSAI License</option>
                  <option>FSSAI Renewal</option>
                  <option>Copywriting</option>
                  <option>Other Legal Query</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-[#6B7280]">Message</label>
                <textarea rows={4} className="w-full bg-[#F3F4F6] border-none rounded-2xl p-4 focus:ring-1 focus:ring-black outline-none transition-all text-[#0B0B0B]" />
              </div>
              <button className="w-full bg-black text-white py-5 rounded-full font-bold hover:bg-[#111] transition-all flex items-center justify-center gap-2">
                Send Message <ArrowRight size={18} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
