
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import { Lead } from '../types';

interface ContactProps {
  onFormSubmit: (lead: Omit<Lead, 'id' | 'status' | 'createdAt' | 'updatedAt'>) => void;
}

const Contact: React.FC<ContactProps> = ({ onFormSubmit }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'FSSAI License',
    message: ''
  });

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    onFormSubmit({
      name: formData.name,
      email: formData.email,
      phone: 'Contact via Email/Form',
      service: formData.service,
      notes: formData.message
    });

    navigate('/thank-you');
  };

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
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[#6B7280]">Name</label>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-[#F3F4F6] border-none rounded-2xl p-4 focus:ring-1 focus:ring-black outline-none transition-all text-[#0B0B0B]" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[#6B7280]">Email</label>
                  <input 
                    type="email" 
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-[#F3F4F6] border-none rounded-2xl p-4 focus:ring-1 focus:ring-black outline-none transition-all text-[#0B0B0B]" 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-[#6B7280]">Service Required</label>
                <select 
                  value={formData.service}
                  onChange={(e) => setFormData({...formData, service: e.target.value})}
                  className="w-full bg-[#F3F4F6] border-none rounded-2xl p-4 focus:ring-1 focus:ring-black outline-none transition-all appearance-none text-[#0B0B0B]"
                >
                  <option>FSSAI License</option>
                  <option>FSSAI Renewal</option>
                  <option>Copywriting</option>
                  <option>Other Legal Query</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-[#6B7280]">Message</label>
                <textarea 
                  rows={4} 
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full bg-[#F3F4F6] border-none rounded-2xl p-4 focus:ring-1 focus:ring-black outline-none transition-all text-[#0B0B0B]" 
                />
              </div>
              <button 
                type="submit"
                className="w-full bg-black text-white py-5 rounded-full font-bold hover:bg-[#111] transition-all flex items-center justify-center gap-2 shadow-xl active:scale-95"
              >
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
