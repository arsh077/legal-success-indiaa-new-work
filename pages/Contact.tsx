
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Phone, MapPin, ArrowRight, Clock, Calendar } from 'lucide-react';
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
    <div className="animate-in fade-in duration-700 py-20 px-6 min-h-screen bg-[#F9FAFB] dark:bg-zinc-950 transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-block px-3 py-1 bg-white dark:bg-zinc-900 text-[10px] font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-6 rounded-full border border-gray-200 dark:border-zinc-800">Contact Us</div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 text-black dark:text-white">Let's connect.</h1>
          <p className="text-xl text-gray-500 dark:text-gray-400 leading-relaxed">
            Ready to start your compliance journey? Reach out to our expert team.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          
          {/* LEFT CARD: Contact Info */}
          <div className="bg-white dark:bg-zinc-900 p-2 rounded-[3rem] border border-gray-100 dark:border-zinc-800 shadow-xl shadow-gray-100/50 dark:shadow-none flex flex-col group hover:border-gray-200 dark:hover:border-zinc-700 transition-all duration-500 min-h-[500px]">
            {/* Contact Details */}
            <div className="p-8 md:p-12 space-y-10 flex-grow">
              <div className="flex items-start gap-6">
                 <div className="w-12 h-12 bg-gray-50 dark:bg-zinc-800 rounded-2xl flex items-center justify-center flex-shrink-0 border border-gray-50 dark:border-zinc-700">
                   <Mail size={20} className="text-black dark:text-white" />
                 </div>
                 <div>
                   <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-1">Inquiries</h3>
                   <a href="mailto:info@legalsuccessindia.com" className="text-lg md:text-xl font-bold text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                     info@legalsuccessindia.com
                   </a>
                 </div>
              </div>

              <div className="flex items-start gap-6">
                 <div className="w-12 h-12 bg-gray-50 dark:bg-zinc-800 rounded-2xl flex items-center justify-center flex-shrink-0 border border-gray-50 dark:border-zinc-700">
                   <Phone size={20} className="text-black dark:text-white" />
                 </div>
                 <div>
                   <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-1">Phone Support</h3>
                   <div className="space-y-1">
                      <a href="tel:+919007299384" className="block text-lg md:text-xl font-bold text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors">+91 90072 99384</a>
                      <a href="tel:+916290634766" className="block text-lg md:text-xl font-bold text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors">+91 62906 34766</a>
                   </div>
                 </div>
              </div>

              <div className="flex items-start gap-6">
                 <div className="w-12 h-12 bg-gray-50 dark:bg-zinc-800 rounded-2xl flex items-center justify-center flex-shrink-0 border border-gray-50 dark:border-zinc-700">
                   <MapPin size={20} className="text-black dark:text-white" />
                 </div>
                 <div>
                   <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-1">Headquarters</h3>
                   <p className="text-lg md:text-xl font-bold text-black dark:text-white leading-tight">
                     8/5 Mominpore Road,<br />Kolkata – 700023, India
                   </p>
                 </div>
              </div>
            </div>

            {/* Business Hours Section */}
            <div className="mt-auto p-8 md:p-12 border-t border-gray-50 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-950 rounded-b-[2.5rem]">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-6">Business Hours</h3>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar size={14} className="text-black dark:text-white" />
                    <span className="text-sm font-bold text-black dark:text-white">Mon - Sat</span>
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 font-medium">10:00 AM – 07:00 PM</div>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar size={14} className="text-gray-400 dark:text-gray-500" />
                    <span className="text-sm font-bold text-gray-400 dark:text-gray-500">Sunday</span>
                  </div>
                  <div className="text-sm text-gray-400 dark:text-gray-500 font-medium">Closed</div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT CARD: Contact Form */}
          <div id="contact-form" className="bg-white dark:bg-zinc-900 p-10 md:p-14 rounded-[3rem] border border-gray-100 dark:border-zinc-800 shadow-xl shadow-gray-100/50 dark:shadow-none flex flex-col h-full hover:border-gray-200 dark:hover:border-zinc-700 transition-all duration-500 relative overflow-hidden">
            <div className="relative z-10">
              <div className="mb-10">
                <h2 className="text-3xl font-bold mb-4 text-black dark:text-white">Send a Message</h2>
                <p className="text-gray-500 dark:text-gray-400">We typically respond within 2 working hours.</p>
              </div>
              
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 ml-1">Name</label>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Arshed Anwar"
                    className="w-full bg-gray-50 dark:bg-zinc-950 border border-transparent focus:border-gray-200 dark:focus:border-zinc-700 rounded-2xl p-5 outline-none focus:bg-white dark:focus:bg-zinc-900 transition-all text-black dark:text-white font-medium" 
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 ml-1">Email</label>
                  <input 
                    type="email" 
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="contact@business.com"
                    className="w-full bg-gray-50 dark:bg-zinc-950 border border-transparent focus:border-gray-200 dark:focus:border-zinc-700 rounded-2xl p-5 outline-none focus:bg-white dark:focus:bg-zinc-900 transition-all text-black dark:text-white font-medium" 
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 ml-1">Service</label>
                  <select 
                    value={formData.service}
                    onChange={(e) => setFormData({...formData, service: e.target.value})}
                    className="w-full bg-gray-50 dark:bg-zinc-950 border border-transparent focus:border-gray-200 dark:focus:border-zinc-700 rounded-2xl p-5 outline-none focus:bg-white dark:focus:bg-zinc-900 transition-all appearance-none text-black dark:text-white font-medium cursor-pointer"
                  >
                    <option>FSSAI License</option>
                    <option>FSSAI Renewal</option>
                    <option>Copywriting</option>
                    <option>Other Legal Query</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 ml-1">Message</label>
                  <textarea 
                    rows={5} 
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    placeholder="How can we help you?"
                    className="w-full bg-gray-50 dark:bg-zinc-950 border border-transparent focus:border-gray-200 dark:focus:border-zinc-700 rounded-2xl p-5 outline-none focus:bg-white dark:focus:bg-zinc-900 transition-all text-black dark:text-white font-medium resize-none" 
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full bg-black dark:bg-white text-white dark:text-black py-5 rounded-2xl font-bold hover:bg-gray-900 dark:hover:bg-gray-200 transition-all flex items-center justify-center gap-2 shadow-xl active:scale-[0.98] mt-4"
                >
                  Send Inquiry <ArrowRight size={18} />
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;
