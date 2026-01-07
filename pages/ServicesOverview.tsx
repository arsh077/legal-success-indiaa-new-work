
import React from 'react';
import { Link } from 'react-router-dom';
import { SERVICES } from '../constants';
import { ArrowRight, ShieldCheck, RefreshCw, FileText } from 'lucide-react';

const ServicesOverview: React.FC = () => {
  const icons: Record<string, React.ReactNode> = {
    ShieldCheck: <ShieldCheck className="w-8 h-8" />,
    RefreshCw: <RefreshCw className="w-8 h-8" />,
    FileText: <FileText className="w-8 h-8" />
  };

  return (
    <div className="animate-in fade-in duration-700 py-20 px-6 bg-transparent">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-2xl mb-24">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-8 text-black dark:text-white">Our Services.</h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed">
            From registration to ongoing compliance, we offer a comprehensive suite of legal and regulatory solutions tailored for the Indian landscape.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {SERVICES.map((service) => (
            <Link 
              key={service.id} 
              to={`/services/${service.id}`}
              className="group flex flex-col md:flex-row items-start md:items-center justify-between p-10 md:p-14 border border-gray-100 dark:border-zinc-800 rounded-[3rem] hover:border-black dark:hover:border-white transition-all duration-500 gap-8 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-md"
            >
              <div className="flex items-center gap-10">
                <div className="w-14 h-14 bg-gray-50 dark:bg-zinc-800 rounded-2xl flex items-center justify-center group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-colors text-black dark:text-white">
                  {icons[service.icon]}
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-2 tracking-tight text-black dark:text-white">{service.title}</h2>
                  <p className="text-gray-500 dark:text-gray-400 max-w-lg text-sm">{service.shortDesc}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right hidden md:block">
                  <div className="text-[10px] text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1 font-bold">Pricing</div>
                  <div className="font-bold text-sm text-black dark:text-white">{service.price}</div>
                </div>
                <div className="w-10 h-10 rounded-full border border-gray-100 dark:border-zinc-800 flex items-center justify-center group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black group-hover:border-black dark:group-hover:border-white transition-all text-black dark:text-white">
                  <ArrowRight size={16} />
                </div>
              </div>
            </Link>
          ))}
          
          {/* Custom Quote Placeholder */}
          <div className="bg-gray-50/50 dark:bg-zinc-900/50 backdrop-blur-sm p-10 md:p-14 rounded-[3rem] mt-12 flex flex-col md:flex-row items-center justify-between gap-8 border border-gray-100 dark:border-zinc-800">
            <div className="text-center md:text-left">
              <h2 className="text-xl font-bold mb-2 tracking-tight text-[#0B0B0B] dark:text-white">Need a custom legal solution?</h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Contact us for specialized requirements not listed above.</p>
            </div>
            <Link to="/contact" className="bg-black dark:bg-white text-white dark:text-black px-8 py-4 rounded-full font-bold hover:scale-105 transition-transform text-sm">
              Get Custom Quote
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesOverview;
