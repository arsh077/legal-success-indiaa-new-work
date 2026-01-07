
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, ShieldCheck, RefreshCw, FileText, Check, X, BarChart3, Globe2 } from 'lucide-react';
import { SERVICES } from '../constants.tsx';
import Logo from '../components/Logo.tsx';
import { Lead } from '../types.ts';
import Testimonials from '../components/Testimonials.tsx';
import { motion, AnimatePresence } from "framer-motion";

interface HomeProps {
  onFormSubmit: (lead: Omit<Lead, 'id' | 'status' | 'createdAt' | 'updatedAt'>) => void;
}

const Home: React.FC<HomeProps> = ({ onFormSubmit }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  
  // New Hero States
  const [isExpanded, setIsExpanded] = useState(false);
  const [formStep, setFormStep] = useState<"idle" | "submitting" | "success">("idle");

  const icons: Record<string, React.ReactNode> = {
    ShieldCheck: <ShieldCheck className="w-5 h-5" />,
    RefreshCw: <RefreshCw className="w-5 h-5" />,
    FileText: <FileText className="w-5 h-5" />
  };

  const handleExpand = () => setIsExpanded(true);
  
  const handleClose = () => {
    setIsExpanded(false);
    setTimeout(() => setFormStep("idle"), 500);
  };

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isExpanded) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; }
  }, [isExpanded]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) return;
    
    // Use the existing app logic for submission
    onFormSubmit({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      service: 'General Callback Request'
    });

    setFormStep("submitting");
    setTimeout(() => {
      setFormStep("success");
      // Redirect after showing success in modal
      setTimeout(() => {
        navigate('/thank-you');
      }, 1500);
    }, 1000);
  };

  return (
    <div className="animate-in fade-in duration-1000">
      
      {/* 
        -------------------------------------------
        NEW HERO SECTION 
        -------------------------------------------
      */}
      <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-white dark:bg-zinc-950 px-4 sm:px-6 py-12 sm:py-20 transition-colors duration-500">
        
        {/* Simulated GodRays/Background Effect using CSS gradients */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.08)_0%,transparent_50%)] animate-pulse-slow dark:opacity-40"></div>
          <div className="absolute top-[-20%] right-[-20%] w-[100%] h-[100%] bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.08)_0%,transparent_50%)] animate-float-slow dark:opacity-30"></div>
        </div>

        <div className="relative z-10 flex flex-col items-center gap-6 sm:gap-8 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center rounded-full border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 px-3 py-1 text-sm font-medium text-zinc-800 dark:text-zinc-200 backdrop-blur-sm"
          >
            <span className="flex h-2 w-2 rounded-full bg-blue-600 mr-2"></span>
            New: 2024 Compliance Report
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 max-w-4xl"
          >
            Orchestrate your entire <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
              compliance engine
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl px-4 leading-relaxed font-medium"
          >
            Stop wrestling with disconnected documents. Legal Success India provides the infrastructure to build, 
            measure, and scale your business compliance with enterprise-grade security.
          </motion.p>

          <AnimatePresence initial={false}>
            {!isExpanded && (
              <motion.div className="inline-block relative mt-4">
                <motion.div
                  style={{ borderRadius: "100px" }}
                  layout
                  layoutId="cta-card"
                  className="absolute inset-0 bg-black dark:bg-white"
                />
                <motion.button
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  layout={false}
                  onClick={handleExpand}
                  className="relative flex items-center gap-2 h-14 px-8 py-3 text-lg font-medium text-white dark:text-black tracking-wide hover:opacity-90 transition-opacity"
                >
                  Start your journey
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* 
        Expanded Modal Overlay 
      */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 sm:p-4">
            <motion.div
              layoutId="cta-card"
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              style={{ borderRadius: "24px" }}
              layout
              className="relative flex h-full w-full overflow-hidden bg-blue-700 sm:rounded-[24px] shadow-2xl"
            >
              {/* Mesh Gradient Background inside Modal (Simulated with CSS) */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 pointer-events-none bg-gradient-to-br from-blue-800 to-indigo-900"
              >
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
              </motion.div>

              {/* Close Button */}
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={handleClose}
                className="absolute right-4 top-4 sm:right-8 sm:top-8 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/20"
              >
                <X className="h-5 w-5" />
              </motion.button>

              {/* Modal Content */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="relative z-10 flex flex-col lg:flex-row h-full w-full max-w-7xl mx-auto overflow-y-auto lg:overflow-hidden"
              >
                {/* Left Side: Testimonials & Info */}
                <div className="flex-1 flex flex-col justify-center p-8 sm:p-12 lg:p-16 gap-8 text-white">
                  <div className="space-y-4">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight">
                      Ready to scale?
                    </h2>
                    <p className="text-blue-100 text-lg max-w-md">
                      Join 5,000+ forward-thinking companies building the future with Legal Success India.
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div className="flex gap-4 items-start">
                      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/10">
                        <BarChart3 className="w-6 h-6 text-blue-200" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">Analytics First</h3>
                        <p className="text-blue-100/80 text-sm leading-relaxed mt-1">
                          Real-time insights into your license renewal dates and compliance status.
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4 items-start">
                      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/10">
                        <Globe2 className="w-6 h-6 text-blue-200" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">Pan-India Support</h3>
                        <p className="text-blue-100/80 text-sm leading-relaxed mt-1">
                          Deploy to 28+ states instantly with our automated regulatory network.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-auto pt-8 border-t border-white/20">
                    <figure>
                      <blockquote className="text-xl font-medium leading-relaxed mb-6">
                        "LSI transformed how we handle FSSAI. We went from weekly headaches to automated compliance with zero downtime."
                      </blockquote>
                      <figcaption className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-full bg-gradient-to-tr from-orange-400 to-pink-500 flex items-center justify-center text-lg font-bold text-white">
                          AS
                        </div>
                        <div>
                          <div className="font-semibold">Anjali Sharma</div>
                          <div className="text-sm text-blue-200">CEO, FreshBites</div>
                        </div>
                      </figcaption>
                    </figure>
                  </div>
                </div>

                {/* Right Side: Form */}
                <div className="flex-1 flex items-center justify-center p-4 sm:p-12 lg:p-16 bg-black/10 backdrop-blur-sm lg:bg-transparent lg:backdrop-blur-none">
                  <div className="w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 sm:p-8 shadow-2xl">
                    
                    {formStep === "success" ? (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-center justify-center text-center h-[400px] space-y-6"
                      >
                        <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30">
                          <Check className="w-10 h-10 text-white" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-white mb-2">Request Received!</h3>
                          <p className="text-blue-100">Our team will be in touch shortly to schedule your personalized consultation.</p>
                        </div>
                      </motion.div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-1">
                          <h3 className="text-xl font-semibold text-white">Get a Consultation</h3>
                          <p className="text-sm text-blue-200">Fill out the form below and we'll contact you.</p>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <label htmlFor="name" className="block text-xs font-medium text-blue-200 mb-1.5 uppercase tracking-wider">
                              Full Name
                            </label>
                            <input
                              required
                              type="text"
                              id="name"
                              value={formData.name}
                              onChange={(e) => setFormData({...formData, name: e.target.value})}
                              placeholder="Jane Doe"
                              className="w-full px-4 py-3 rounded-lg bg-blue-950/40 border border-blue-300/20 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all text-sm"
                            />
                          </div>

                          <div>
                            <label htmlFor="email" className="block text-xs font-medium text-blue-200 mb-1.5 uppercase tracking-wider">
                              Email Address
                            </label>
                            <input
                              required
                              type="email"
                              id="email"
                              value={formData.email}
                              onChange={(e) => setFormData({...formData, email: e.target.value})}
                              placeholder="jane@company.com"
                              className="w-full px-4 py-3 rounded-lg bg-blue-950/40 border border-blue-300/20 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all text-sm"
                            />
                          </div>

                          <div>
                             <label htmlFor="phone" className="block text-xs font-medium text-blue-200 mb-1.5 uppercase tracking-wider">
                              Phone Number
                            </label>
                            <input
                              required
                              type="tel"
                              id="phone"
                              value={formData.phone}
                              onChange={(e) => setFormData({...formData, phone: e.target.value})}
                              placeholder="+91 99999 99999"
                              className="w-full px-4 py-3 rounded-lg bg-blue-950/40 border border-blue-300/20 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all text-sm"
                            />
                          </div>
                        </div>

                        <button
                          disabled={formStep === "submitting"}
                          type="submit"
                          className="w-full flex items-center justify-center px-8 py-3.5 rounded-lg bg-white text-blue-700 font-semibold hover:bg-blue-50 focus:ring-4 focus:ring-blue-500/30 transition-all disabled:opacity-70 disabled:cursor-not-allowed mt-2"
                        >
                          {formStep === "submitting" ? (
                             <span className="flex items-center gap-2">
                               <span className="h-4 w-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></span>
                               Sending...
                             </span>
                          ) : "Submit Request"}
                        </button>
                        
                        <p className="text-xs text-center text-blue-200/60 mt-4">
                          By submitting, you agree to our Terms of Service and Privacy Policy.
                        </p>
                      </form>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Trust Metrics */}
      <section className="border-y border-gray-100 dark:border-zinc-800 py-16 px-6 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12">
          {[
            { label: 'Happy Clients', val: '5,000+' },
            { label: 'States Served', val: '28' },
            { label: 'Legal Experts', val: '25+' },
            { label: 'Success Rate', val: '99%' },
          ].map((stat, i) => (
            <div key={i} className="text-center md:text-left animate-in fade-in slide-in-from-bottom-2" style={{ animationDelay: `${i * 100}ms` }}>
              <div className="text-3xl font-bold mb-2 tracking-tighter text-black dark:text-white">{stat.val}</div>
              <div className="text-[9px] text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] font-bold">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 px-6 bg-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-xl">
              <h2 className="text-2xl md:text-4xl font-bold tracking-tight mb-4 text-black dark:text-white">Expert compliance solutions</h2>
              <p className="text-gray-500 dark:text-gray-400 text-base font-medium">Focused legal and regulatory support for businesses operating across India.</p>
            </div>
            <Link to="/services" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.15em] hover:gap-3 transition-all text-black dark:text-white pb-1.5 border-b-2 border-black/10 dark:border-white/10">
              View All Services <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SERVICES.map((s) => (
              <Link 
                key={s.id} 
                to={`/services/${s.id}`} 
                className="group p-10 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-md border border-gray-100 dark:border-zinc-800 rounded-[2.5rem] hover:border-black dark:hover:border-white transition-all duration-700 flex flex-col h-full hover:shadow-xl hover:shadow-black/5"
              >
                <div className="w-12 h-12 bg-gray-50 dark:bg-zinc-800 rounded-xl flex items-center justify-center mb-8 group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-all duration-500 text-black dark:text-white">
                  {icons[s.icon]}
                </div>
                <h3 className="text-xl font-bold mb-4 tracking-tight text-black dark:text-white">{s.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-8 leading-relaxed flex-grow text-sm font-medium">{s.shortDesc}</p>
                <div className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity text-black dark:text-white">
                  Learn More <ArrowRight size={12} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="py-24 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-16">
          <div className="max-w-md">
            <div className="inline-block px-3 py-1 bg-gray-50 dark:bg-zinc-900 text-[10px] font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-6 rounded-full border border-gray-100 dark:border-zinc-800">Social Proof</div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 text-black dark:text-white leading-[1.1]">
              Trusted by <br />
              <span className="text-gray-300 dark:text-zinc-700">industry leaders.</span>
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-base font-medium mb-10 leading-relaxed">
              Join 5,000+ businesses who rely on Legal Success India for their compliance, renewals, and legal structuring.
            </p>
            <Link 
              to="/about" 
              className="inline-flex items-center gap-3 text-sm font-bold text-black dark:text-white hover:gap-4 transition-all"
            >
              Read Success Stories <ArrowRight size={18} />
            </Link>
          </div>
          <div className="w-full md:w-auto flex justify-center perspective-1000">
             <Testimonials />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
