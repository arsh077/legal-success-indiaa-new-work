
import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, UserCircle, Sun, Moon } from 'lucide-react';
import { NAV_ITEMS, APP_LINKS } from '../constants';
import Logo from './Logo';

const MagneticNavLink: React.FC<{ item: { label: string; href: string }; isScrolled: boolean }> = ({ item, isScrolled }) => {
  const location = useLocation();
  const linkRef = useRef<HTMLAnchorElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const isActive = location.pathname === item.href;

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!linkRef.current || window.innerWidth <= 768) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = linkRef.current.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) * 0.2; 
    const y = (clientY - (top + height / 2)) * 0.3;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <Link
      key={item.href}
      to={item.href}
      ref={linkRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ 
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: position.x === 0 ? 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)' : 'none'
      }}
      className={`relative py-1.5 text-[12px] font-bold uppercase tracking-[0.08em] transition-colors duration-300 group ${
        isActive 
          ? 'text-black dark:text-white' 
          : 'text-gray-400 dark:text-gray-500 hover:text-black dark:hover:text-white'
      }`}
    >
      {item.label}
      <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[1.5px] bg-black/20 dark:bg-white/20 transition-all duration-300 pointer-events-none ${
        isActive ? 'w-full opacity-100' : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-100'
      }`} />
    </Link>
  );
};

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showApps, setShowApps] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark');
    }
    return false;
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
    }
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        isScrolled 
          ? 'bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md border-b border-gray-100 dark:border-zinc-800 py-2 shadow-sm' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="group">
          <Logo className={isScrolled ? "h-8" : "h-10"} variant={isDark ? 'light' : 'dark'} />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-8 items-center">
          {NAV_ITEMS.map((item) => (
            <MagneticNavLink key={item.href} item={item} isScrolled={isScrolled} />
          ))}
          
          <div 
            className="relative group"
            onMouseEnter={() => setShowApps(true)}
            onMouseLeave={() => setShowApps(false)}
          >
            <button className="flex items-center gap-1 text-[12px] font-bold uppercase tracking-[0.08em] text-gray-400 dark:text-gray-500 group-hover:text-black dark:group-hover:text-white transition-colors py-1.5">
              Apps <ChevronDown size={11} className="mt-0.5 group-hover:rotate-180 transition-transform duration-300" />
            </button>
            {showApps && (
              <div className="absolute top-full right-0 pt-3 w-56 animate-in fade-in slide-in-from-top-1 duration-200">
                <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-2xl shadow-xl p-2">
                  {APP_LINKS.map((link) => (
                    <Link
                      key={link.href}
                      to={link.href}
                      className="flex items-center justify-between px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-gray-50 dark:hover:bg-zinc-800 rounded-xl transition-all"
                    >
                      {link.label}
                      <div className="w-1 h-1 rounded-full bg-black dark:bg-white opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors text-black dark:text-white"
            aria-label="Toggle Theme"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <Link to="/login" className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-black dark:text-white bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 px-4 py-2 rounded-full hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black hover:border-black dark:hover:border-white transition-all duration-500 shadow-sm">
            <UserCircle size={14} />
            Portal
          </Link>
        </div>

        <div className="md:hidden flex items-center gap-4">
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors text-black dark:text-white"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          
          <button className="text-black dark:text-white p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-lg transition-colors" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-zinc-950 border-b border-gray-100 dark:border-zinc-800 p-6 flex flex-col space-y-4 shadow-xl animate-in slide-in-from-top-2 duration-300">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              onClick={() => setIsOpen(false)}
              className="text-xl font-bold tracking-tight text-black dark:text-white"
            >
              {item.label}
            </Link>
          ))}
          <div className="pt-4 border-t border-gray-50 dark:border-zinc-800">
             <div className="text-[9px] font-bold uppercase tracking-widest text-gray-400 mb-4">Applications</div>
             <div className="space-y-4">
               {APP_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setIsOpen(false)}
                    className="block text-lg font-bold text-black dark:text-white"
                  >
                    {link.label}
                  </Link>
               ))}
               <Link
                 to="/login"
                 onClick={() => setIsOpen(false)}
                 className="block text-lg font-bold text-black dark:text-white border-t border-gray-50 dark:border-zinc-800 pt-4"
               >
                 Admin Portal
               </Link>
             </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
