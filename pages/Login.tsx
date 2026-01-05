
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Lock, Mail, ShieldAlert } from 'lucide-react';
import Logo from '../components/Logo';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Mock Authentication Logic
    // In this demo, any password works for valid company emails
    setTimeout(() => {
      if (email === 'arshed@legalsuccess.in') {
        localStorage.setItem('user', JSON.stringify({ id: 'u1', name: 'Arshed Anwar', role: 'HEAD_ADMIN', email }));
        navigate('/dashboard');
      } else if (email === 'azsed@legalsuccess.in') {
        localStorage.setItem('user', JSON.stringify({ id: 'u2', name: 'Azsed Anwar', role: 'ADMIN', email }));
        navigate('/dashboard');
      } else if (email === 'siddharth@legalsuccess.in') {
        localStorage.setItem('user', JSON.stringify({ id: 'u3', name: 'Siddharth Roy', role: 'EMPLOYEE', email }));
        navigate('/dashboard');
      } else {
        setError('Unauthorized access. Use a valid @legalsuccess.in email.');
        setIsLoading(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gray-50 rounded-full blur-[120px] opacity-50 pointer-events-none" />
      
      <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-1000 relative z-10">
        <div className="text-center mb-12">
          <Logo className="h-12 justify-center mb-8" showText={false} />
          <h1 className="text-3xl font-bold tracking-tight text-[#0B0B0B]">Admin Portal.</h1>
          <p className="text-gray-500 mt-3 font-medium">Internal Lead & Compliance Management</p>
        </div>

        <div className="bg-white/70 backdrop-blur-2xl border border-gray-100 p-10 md:p-12 rounded-[3.5rem] shadow-2xl shadow-black/5">
          <form onSubmit={handleLogin} className="space-y-7">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 ml-1">Corporate Email</label>
              <div className="relative group">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-black transition-colors" size={18} />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="arshed@legalsuccess.in" 
                  className="w-full bg-gray-50/50 border border-transparent rounded-[1.5rem] py-5 pl-14 pr-6 focus:bg-white focus:border-gray-200 focus:ring-0 transition-all outline-none text-sm font-medium"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 ml-1">Access Password</label>
              <div className="relative group">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-black transition-colors" size={18} />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••" 
                  className="w-full bg-gray-50/50 border border-transparent rounded-[1.5rem] py-5 pl-14 pr-6 focus:bg-white focus:border-gray-200 focus:ring-0 transition-all outline-none text-sm font-medium"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 p-4 bg-red-50 text-red-600 rounded-2xl text-[11px] font-bold uppercase tracking-wider animate-in fade-in zoom-in-95">
                <ShieldAlert size={14} />
                {error}
              </div>
            )}

            <button 
              type="submit"
              disabled={isLoading}
              className={`w-full bg-black text-white py-5 rounded-[1.5rem] font-bold hover:bg-gray-800 transition-all flex items-center justify-center gap-3 group shadow-xl shadow-black/10 active:scale-[0.98] ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Authenticate Access
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-10 pt-10 border-t border-gray-100/50 text-center">
            <p className="text-[10px] text-gray-400 font-bold leading-relaxed uppercase tracking-[0.15em] max-w-[240px] mx-auto">
              Secure Gateway. Authorized personnel access only.
            </p>
          </div>
        </div>

        {/* Quick Help for Development */}
        <div className="mt-8 text-center animate-in fade-in duration-1000 delay-500">
           <p className="text-[10px] text-gray-300 font-bold uppercase tracking-widest">
             Demo Hint: Use arshed@legalsuccess.in
           </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
