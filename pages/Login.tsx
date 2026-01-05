
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Lock, Mail } from 'lucide-react';
import Logo from '../components/Logo';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock Authentication Logic
    // In a real app, this would be an API call returning a JWT
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
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="text-center mb-12">
          <Logo className="h-12 justify-center mb-8" showText={false} />
          <h1 className="text-3xl font-bold tracking-tight text-[#0B0B0B]">Admin Portal.</h1>
          <p className="text-gray-500 mt-2">Manage leads and compliance workflow.</p>
        </div>

        <div className="bg-white/60 backdrop-blur-xl border border-gray-100 p-10 rounded-[3rem] shadow-2xl shadow-black/5">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@legalsuccess.in" 
                  className="w-full bg-gray-50 border-none rounded-2xl py-4 pl-12 pr-4 focus:ring-1 focus:ring-black transition-all outline-none"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••" 
                  className="w-full bg-gray-50 border-none rounded-2xl py-4 pl-12 pr-4 focus:ring-1 focus:ring-black transition-all outline-none"
                  required
                />
              </div>
            </div>

            {error && <p className="text-red-500 text-xs font-medium text-center">{error}</p>}

            <button 
              type="submit"
              className="w-full bg-black text-white py-5 rounded-2xl font-bold hover:bg-gray-800 transition-all flex items-center justify-center gap-2 group"
            >
              Sign In
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-gray-100 text-center">
            <p className="text-[10px] text-gray-400 font-medium leading-relaxed uppercase tracking-widest">
              Authorized personnel only. All access is logged and monitored.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
