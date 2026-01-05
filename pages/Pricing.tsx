
import React from 'react';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';
import { SERVICES } from '../constants';

const Pricing: React.FC = () => {
  return (
    <div className="animate-in fade-in duration-700 py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-24">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8">Simple, <br />transparent pricing.</h1>
          <p className="text-xl text-gray-500 leading-relaxed">
            No hidden fees. No surprises. Just clear pricing for high-quality legal compliance support.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {SERVICES.map((service, i) => (
            <div 
              key={service.id} 
              className={`p-10 border rounded-[3rem] flex flex-col ${
                i === 0 ? 'border-black ring-1 ring-black shadow-2xl scale-105 z-10 bg-white' : 'border-gray-100'
              }`}
            >
              {i === 0 && (
                <div className="bg-black text-white text-[10px] uppercase tracking-widest px-3 py-1 rounded-full w-fit mb-6 mx-auto">Most Popular</div>
              )}
              <h3 className="text-2xl font-bold text-center mb-2">{service.title}</h3>
              <div className="text-4xl font-bold text-center mb-8">{service.price}</div>
              <p className="text-gray-500 text-sm text-center mb-8">{service.shortDesc}</p>
              
              <ul className="space-y-4 mb-10 flex-grow">
                {service.benefits.map((b, bi) => (
                  <li key={bi} className="flex items-center gap-3 text-sm text-gray-600">
                    <Check size={16} className="text-black flex-shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>

              <Link 
                to="/contact" 
                className={`w-full py-4 rounded-full font-bold text-center transition-all ${
                  i === 0 ? 'bg-black text-white hover:opacity-90' : 'bg-gray-50 hover:bg-black hover:text-white'
                }`}
              >
                Get Started
              </Link>
            </div>
          ))}
        </div>

        <div className="bg-gray-50 p-12 md:p-24 rounded-[3rem] text-center">
          <h2 className="text-3xl font-bold mb-6">Enterprises & Bulk Filing?</h2>
          <p className="text-gray-500 mb-10 max-w-xl mx-auto">We offer special discounts for food chains and corporations managing multiple licenses across states.</p>
          <Link to="/contact" className="border border-black px-10 py-4 rounded-full font-bold hover:bg-black hover:text-white transition-all">
            Contact Sales
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
