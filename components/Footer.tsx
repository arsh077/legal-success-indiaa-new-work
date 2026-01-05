
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#F9FAFB] border-t border-gray-100 pt-32 pb-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-8 md:px-12">
        {/* 3 Column Structure */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8 mb-32">
          {/* Column 1: Brand (Takes more space to avoid clipping) */}
          <div className="md:col-span-5 flex flex-col items-start">
            <Logo className="h-12 mb-8" />
            <p className="text-[#6B7280] text-sm leading-relaxed max-w-sm font-medium">
              Empowering Indian businesses with clear, reliable compliance guidance. We simplify legal processes so you can focus on growth.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="md:col-span-3">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#9CA3AF] mb-10">Navigation</h4>
            <ul className="space-y-4 text-[#0B0B0B] text-[12px] font-bold uppercase tracking-wider">
              <li><Link to="/" className="hover:text-[#6B7280] transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-[#6B7280] transition-colors">About</Link></li>
              <li><Link to="/services" className="hover:text-[#6B7280] transition-colors">Services</Link></li>
              <li><Link to="/apply-license" className="hover:text-[#6B7280] transition-colors">License Application</Link></li>
              <li><Link to="/renew-license" className="hover:text-[#6B7280] transition-colors">Renewal Portal</Link></li>
              <li><Link to="/pricing" className="hover:text-[#6B7280] transition-colors">Pricing</Link></li>
              <li><Link to="/compliance" className="hover:text-[#6B7280] transition-colors">Compliance Hub</Link></li>
              <li><Link to="/contact" className="hover:text-[#6B7280] transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div className="md:col-span-4">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#9CA3AF] mb-10">Direct Contact</h4>
            <ul className="space-y-6 text-[#0B0B0B] text-[14px] font-bold tracking-tight">
              <li><a href="mailto:info@legalsuccessindia.com" className="hover:underline">info@legalsuccessindia.com</a></li>
              <li><a href="tel:+919007299384" className="hover:underline block">+91 90072 99384</a></li>
              <li><a href="tel:+916290634766" className="hover:underline block">+91 62906 34766</a></li>
              <li className="text-[#6B7280] font-medium leading-relaxed pt-4 border-t border-gray-100 mt-6 text-sm">
                22/1 Mominpore Road,<br />
                Kolkata – 700023, India
              </li>
            </ul>
          </div>
        </div>

        {/* Short Legal Line */}
        <div className="bg-white border border-gray-100 rounded-[2.5rem] p-8 md:p-10 mb-20 text-center shadow-sm">
          <p className="text-[11px] font-medium text-[#6B7280] max-w-3xl mx-auto leading-relaxed uppercase tracking-wider">
            Legal Success India is an independent consultancy and not a government entity. Information provided is for informational purposes only and does not constitute legal advice.
          </p>
        </div>

        {/* Bottom Line */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 pt-10 border-t border-gray-100">
          <div className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest">
            &copy; {new Date().getFullYear()} Khalid Legal Works Private Limited
          </div>
          <div className="flex flex-wrap gap-6 text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest">
            <Link to="/terms" className="hover:text-[#0B0B0B] transition-colors">Terms</Link>
            <Link to="/privacy" className="hover:text-[#0B0B0B] transition-colors">Privacy</Link>
            <Link to="/refund-policy" className="hover:text-[#0B0B0B] transition-colors">Refunds</Link>
            <Link to="/disclaimer" className="hover:text-[#0B0B0B] transition-colors">Disclaimer</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
