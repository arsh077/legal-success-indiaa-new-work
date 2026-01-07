
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Sparkles, Lock, ArrowRight, User } from 'lucide-react';
import Logo from '../components/Logo';

// --- ANIMATION COMPONENTS ---

interface PupilProps {
  size?: number;
  maxDistance?: number;
  pupilColor?: string;
  forceLookX?: number;
  forceLookY?: number;
}

const Pupil = ({ 
  size = 12, 
  maxDistance = 5,
  pupilColor = "black",
  forceLookX,
  forceLookY
}: PupilProps) => {
  const [mouseX, setMouseX] = useState<number>(0);
  const [mouseY, setMouseY] = useState<number>(0);
  const pupilRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouseX(e.clientX);
      setMouseY(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const calculatePupilPosition = () => {
    if (!pupilRef.current) return { x: 0, y: 0 };
    if (forceLookX !== undefined && forceLookY !== undefined) {
      return { x: forceLookX, y: forceLookY };
    }

    const pupil = pupilRef.current.getBoundingClientRect();
    const pupilCenterX = pupil.left + pupil.width / 2;
    const pupilCenterY = pupil.top + pupil.height / 2;
    const deltaX = mouseX - pupilCenterX;
    const deltaY = mouseY - pupilCenterY;
    const distance = Math.min(Math.sqrt(deltaX ** 2 + deltaY ** 2), maxDistance);
    const angle = Math.atan2(deltaY, deltaX);
    return { x: Math.cos(angle) * distance, y: Math.sin(angle) * distance };
  };

  const pupilPosition = calculatePupilPosition();

  return (
    <div
      ref={pupilRef}
      className="rounded-full"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: pupilColor,
        transform: `translate(${pupilPosition.x}px, ${pupilPosition.y}px)`,
        transition: 'transform 0.1s ease-out',
      }}
    />
  );
};

interface EyeBallProps {
  size?: number;
  pupilSize?: number;
  maxDistance?: number;
  eyeColor?: string;
  pupilColor?: string;
  isBlinking?: boolean;
  forceLookX?: number;
  forceLookY?: number;
  hasGlasses?: boolean;
}

const EyeBall = ({ 
  size = 48, 
  pupilSize = 16, 
  maxDistance = 10,
  eyeColor = "white",
  pupilColor = "black",
  isBlinking = false,
  forceLookX,
  forceLookY,
  hasGlasses = false
}: EyeBallProps) => {
  const [mouseX, setMouseX] = useState<number>(0);
  const [mouseY, setMouseY] = useState<number>(0);
  const eyeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouseX(e.clientX);
      setMouseY(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const calculatePupilPosition = () => {
    if (!eyeRef.current) return { x: 0, y: 0 };
    if (forceLookX !== undefined && forceLookY !== undefined) {
      return { x: forceLookX, y: forceLookY };
    }

    const eye = eyeRef.current.getBoundingClientRect();
    const eyeCenterX = eye.left + eye.width / 2;
    const eyeCenterY = eye.top + eye.height / 2;
    const deltaX = mouseX - eyeCenterX;
    const deltaY = mouseY - eyeCenterY;
    const distance = Math.min(Math.sqrt(deltaX ** 2 + deltaY ** 2), maxDistance);
    const angle = Math.atan2(deltaY, deltaX);
    return { x: Math.cos(angle) * distance, y: Math.sin(angle) * distance };
  };

  const pupilPosition = calculatePupilPosition();

  return (
    <div className="relative">
      <div
        ref={eyeRef}
        className="rounded-full flex items-center justify-center transition-all duration-150 relative z-10"
        style={{
          width: `${size}px`,
          height: isBlinking ? '2px' : `${size}px`,
          backgroundColor: eyeColor,
          overflow: 'hidden',
          boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)'
        }}
      >
        {!isBlinking && (
          <div
            className="rounded-full"
            style={{
              width: `${pupilSize}px`,
              height: `${pupilSize}px`,
              backgroundColor: pupilColor,
              transform: `translate(${pupilPosition.x}px, ${pupilPosition.y}px)`,
              transition: 'transform 0.1s ease-out',
            }}
          />
        )}
      </div>
      {/* Glasses Rim */}
      {hasGlasses && !isBlinking && (
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-amber-900 opacity-80 pointer-events-none z-20"
          style={{ width: `${size + 8}px`, height: `${size + 8}px` }}
        >
          {/* Bridge of nose connection */}
          <div className="absolute top-1/2 -right-3 w-3 h-1 bg-amber-900" />
        </div>
      )}
    </div>
  );
};

// --- NECKBAND COMPONENT (The Lawyer's Tab) ---
const AdvocateNeckband = () => (
  <div className="absolute top-24 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none z-20">
    <div className="w-12 h-3 bg-white border-b border-gray-200"></div>
    <div className="flex gap-1">
       <div className="w-4 h-12 bg-white shadow-sm"></div>
       <div className="w-4 h-12 bg-white shadow-sm"></div>
    </div>
  </div>
);

// --- MAIN PAGE COMPONENT ---

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  
  // Form States
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Animation States
  const [mouseX, setMouseX] = useState<number>(0);
  const [mouseY, setMouseY] = useState<number>(0);
  const [isSeniorBlinking, setIsSeniorBlinking] = useState(false); // Purple replacement
  const [isJuniorBlinking, setIsJuniorBlinking] = useState(false); // Black replacement
  const [isTyping, setIsTyping] = useState(false);
  const [isLookingAtEachOther, setIsLookingAtEachOther] = useState(false);
  const [isPeeking, setIsPeeking] = useState(false);
  
  const seniorRef = useRef<HTMLDivElement>(null);
  const juniorRef = useRef<HTMLDivElement>(null);
  const bookRef = useRef<HTMLDivElement>(null);
  const gavelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouseX(e.clientX);
      setMouseY(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Blinking Logic
  useEffect(() => {
    const setupBlink = (setBlink: (v: boolean) => void) => {
      const schedule = () => {
        const timeout = setTimeout(() => {
          setBlink(true);
          setTimeout(() => {
            setBlink(false);
            schedule();
          }, 150);
        }, Math.random() * 4000 + 3000);
        return timeout;
      };
      return schedule();
    };

    const t1 = setupBlink(setIsSeniorBlinking);
    const t2 = setupBlink(setIsJuniorBlinking);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  // Interaction Logic
  useEffect(() => {
    if (isTyping) {
      setIsLookingAtEachOther(true);
      const timer = setTimeout(() => setIsLookingAtEachOther(false), 800);
      return () => clearTimeout(timer);
    }
    setIsLookingAtEachOther(false);
  }, [isTyping]);

  useEffect(() => {
    if (password.length > 0 && showPassword) {
      const schedulePeek = () => {
        const timeout = setTimeout(() => {
          setIsPeeking(true);
          setTimeout(() => setIsPeeking(false), 800);
          schedulePeek();
        }, Math.random() * 3000 + 2000);
        return timeout;
      };
      const t = schedulePeek();
      return () => clearTimeout(t);
    }
    setIsPeeking(false);
  }, [password, showPassword]);

  const calculatePosition = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (!ref.current) return { faceX: 0, faceY: 0, bodySkew: 0 };
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 3;
    const deltaX = mouseX - centerX;
    const deltaY = mouseY - centerY;
    
    return {
      faceX: Math.max(-15, Math.min(15, deltaX / 20)),
      faceY: Math.max(-10, Math.min(10, deltaY / 30)),
      bodySkew: Math.max(-6, Math.min(6, -deltaX / 120))
    };
  };

  const seniorPos = calculatePosition(seniorRef);
  const juniorPos = calculatePosition(juniorRef);
  const bookPos = calculatePosition(bookRef);
  const gavelPos = calculatePosition(gavelRef);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    setTimeout(() => {
      // Demo logic
      if (email.includes('@legalsuccess.in') || email === 'demo@example.com') {
         const user = { 
            id: 'u-new', 
            name: name || 'Demo User', 
            email, 
            role: 'ADMIN' 
         };
         localStorage.setItem('user', JSON.stringify(user));
         navigate('/dashboard');
      } else {
         if(isLoginMode) {
             setError('Access denied. Use demo@example.com');
         } else {
             // Simulate signup success
             navigate('/dashboard');
         }
         setIsLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-white dark:bg-zinc-950">
      
      {/* LEFT: ANIMATION SECTION */}
      <div className="relative hidden lg:flex flex-col justify-between bg-zinc-100 dark:bg-zinc-900 p-12 overflow-hidden">
         {/* Background Elements */}
         <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-50"></div>
         
         <div className="relative z-20">
           <Logo className="h-8" />
         </div>

         <div className="relative z-20 flex items-end justify-center h-[500px]">
           <div className="relative w-[550px] h-[400px]">
             
             {/* CHARACTER 1: The Senior Counsel (Back Left) */}
             <div 
               ref={seniorRef}
               className="absolute bottom-0 transition-all duration-700 ease-in-out shadow-2xl"
               style={{
                 left: '70px',
                 width: '180px',
                 height: (isTyping || (password.length > 0 && !showPassword)) ? '440px' : '400px',
                 backgroundColor: '#18181b', // Zinc-900 (Black Robe)
                 borderRadius: '24px 24px 0 0',
                 zIndex: 1,
                 transform: (password.length > 0 && showPassword)
                   ? `skewX(0deg)`
                   : (isTyping || (password.length > 0 && !showPassword))
                     ? `skewX(${(seniorPos.bodySkew || 0) - 8}deg) translateX(20px)` 
                     : `skewX(${seniorPos.bodySkew || 0}deg)`,
                 transformOrigin: 'bottom center',
               }}
             >
                <AdvocateNeckband />
                <div 
                  className="absolute flex gap-8 transition-all duration-700 ease-in-out z-30"
                  style={{
                    left: (password.length > 0 && showPassword) ? `${20}px` : isLookingAtEachOther ? `${55}px` : `${45 + seniorPos.faceX}px`,
                    top: (password.length > 0 && showPassword) ? `${35}px` : isLookingAtEachOther ? `${65}px` : `${40 + seniorPos.faceY}px`,
                  }}
                >
                  <EyeBall 
                    size={18} pupilSize={7} isBlinking={isSeniorBlinking}
                    pupilColor="#18181b"
                    forceLookX={(password.length > 0 && showPassword) ? (isPeeking ? 4 : -4) : isLookingAtEachOther ? 3 : undefined}
                    forceLookY={(password.length > 0 && showPassword) ? (isPeeking ? 5 : -4) : isLookingAtEachOther ? 4 : undefined}
                  />
                  <EyeBall 
                    size={18} pupilSize={7} isBlinking={isSeniorBlinking}
                    pupilColor="#18181b"
                    forceLookX={(password.length > 0 && showPassword) ? (isPeeking ? 4 : -4) : isLookingAtEachOther ? 3 : undefined}
                    forceLookY={(password.length > 0 && showPassword) ? (isPeeking ? 5 : -4) : isLookingAtEachOther ? 4 : undefined}
                  />
                </div>
             </div>

             {/* CHARACTER 2: The Junior Associate (Middle) */}
             <div 
               ref={juniorRef}
               className="absolute bottom-0 transition-all duration-700 ease-in-out shadow-2xl"
               style={{
                 left: '240px',
                 width: '120px',
                 height: '310px',
                 backgroundColor: '#27272a', // Zinc-800
                 borderRadius: '20px 20px 0 0',
                 zIndex: 2,
                 transform: (password.length > 0 && showPassword)
                  ? `skewX(0deg)`
                  : isLookingAtEachOther
                    ? `skewX(${(juniorPos.bodySkew || 0) * 1.5 + 10}deg) translateX(20px)`
                    : (isTyping || (password.length > 0 && !showPassword))
                      ? `skewX(${(juniorPos.bodySkew || 0) * 1.5}deg)` 
                      : `skewX(${juniorPos.bodySkew || 0}deg)`,
                 transformOrigin: 'bottom center',
               }}
             >
                <div className="absolute top-20 left-1/2 -translate-x-1/2 w-8 h-2 bg-white/90"></div>
                <div 
                  className="absolute flex gap-6 transition-all duration-700 ease-in-out z-30"
                  style={{
                    left: (password.length > 0 && showPassword) ? `${10}px` : isLookingAtEachOther ? `${32}px` : `${26 + juniorPos.faceX}px`,
                    top: (password.length > 0 && showPassword) ? `${28}px` : isLookingAtEachOther ? `${12}px` : `${32 + juniorPos.faceY}px`,
                  }}
                >
                  <EyeBall 
                    size={16} pupilSize={6} isBlinking={isJuniorBlinking} hasGlasses={true}
                    pupilColor="#18181b"
                    forceLookX={(password.length > 0 && showPassword) ? -4 : isLookingAtEachOther ? 0 : undefined}
                    forceLookY={(password.length > 0 && showPassword) ? -4 : isLookingAtEachOther ? -4 : undefined}
                  />
                  <EyeBall 
                    size={16} pupilSize={6} isBlinking={isJuniorBlinking} hasGlasses={true}
                    pupilColor="#18181b"
                    forceLookX={(password.length > 0 && showPassword) ? -4 : isLookingAtEachOther ? 0 : undefined}
                    forceLookY={(password.length > 0 && showPassword) ? -4 : isLookingAtEachOther ? -4 : undefined}
                  />
                </div>
             </div>

             {/* CHARACTER 3: The Law Book (Front Left) */}
             <div 
               ref={bookRef}
               className="absolute bottom-0 transition-all duration-700 ease-in-out shadow-xl"
               style={{
                 left: '0px',
                 width: '240px',
                 height: '200px',
                 zIndex: 3,
                 backgroundColor: '#7f1d1d', // Red-900
                 borderRadius: '20px 20px 0 0',
                 transform: (password.length > 0 && showPassword) ? `skewX(0deg)` : `skewX(${bookPos.bodySkew || 0}deg)`,
                 transformOrigin: 'bottom center',
                 borderLeft: '20px solid #fef2f2', // Pages
               }}
             >
                {/* Book Label */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-16 border-2 border-amber-500/30 rounded-lg"></div>
                
                <div 
                  className="absolute flex gap-8 transition-all duration-200 ease-out"
                  style={{
                    left: (password.length > 0 && showPassword) ? `${50}px` : `${82 + (bookPos.faceX || 0)}px`,
                    top: (password.length > 0 && showPassword) ? `${85}px` : `${90 + (bookPos.faceY || 0)}px`,
                  }}
                >
                  <Pupil size={14} pupilColor="#3f1a1a" forceLookX={(password.length > 0 && showPassword) ? -5 : undefined} forceLookY={(password.length > 0 && showPassword) ? -4 : undefined} />
                  <Pupil size={14} pupilColor="#3f1a1a" forceLookX={(password.length > 0 && showPassword) ? -5 : undefined} forceLookY={(password.length > 0 && showPassword) ? -4 : undefined} />
                </div>
             </div>

             {/* CHARACTER 4: The Gavel Block (Front Right) */}
             <div 
               ref={gavelRef}
               className="absolute bottom-0 transition-all duration-700 ease-in-out shadow-xl"
               style={{
                 left: '310px',
                 width: '140px',
                 height: '230px',
                 backgroundColor: '#78350f', // Wood/Brown
                 borderRadius: '20px 20px 0 0',
                 zIndex: 4,
                 transform: (password.length > 0 && showPassword) ? `skewX(0deg)` : `skewX(${gavelPos.bodySkew || 0}deg)`,
                 transformOrigin: 'bottom center',
               }}
             >
                <div 
                  className="absolute flex gap-6 transition-all duration-200 ease-out"
                  style={{
                    left: (password.length > 0 && showPassword) ? `${20}px` : `${52 + (gavelPos.faceX || 0)}px`,
                    top: (password.length > 0 && showPassword) ? `${35}px` : `${40 + (gavelPos.faceY || 0)}px`,
                  }}
                >
                  <Pupil size={12} pupilColor="#451a03" forceLookX={(password.length > 0 && showPassword) ? -5 : undefined} forceLookY={(password.length > 0 && showPassword) ? -4 : undefined} />
                  <Pupil size={12} pupilColor="#451a03" forceLookX={(password.length > 0 && showPassword) ? -5 : undefined} forceLookY={(password.length > 0 && showPassword) ? -4 : undefined} />
                </div>
                {/* Mouth Line */}
                <div 
                  className="absolute w-20 h-[4px] bg-[#451a03] rounded-full transition-all duration-200 ease-out"
                  style={{
                    left: (password.length > 0 && showPassword) ? `${10}px` : `${40 + (gavelPos.faceX || 0)}px`,
                    top: (password.length > 0 && showPassword) ? `${88}px` : `${88 + (gavelPos.faceY || 0)}px`,
                  }}
                />
             </div>

           </div>
         </div>
      </div>

      {/* RIGHT: FORM SECTION */}
      <div className="flex items-center justify-center p-8 bg-white dark:bg-zinc-950 relative">
        <div className="w-full max-w-[420px] animate-in slide-in-from-right-8 duration-700">
           {/* Mobile Logo */}
           <div className="lg:hidden flex justify-center mb-10">
              <Logo />
           </div>

           <div className="text-center mb-10">
              <h1 className="text-3xl font-bold tracking-tight text-black dark:text-white mb-2">
                {isLoginMode ? 'Welcome back!' : 'Join the Firm'}
              </h1>
              <p className="text-gray-500 text-sm">
                {isLoginMode ? 'Enter your credentials to access the portal.' : 'Create an account to manage your compliance.'}
              </p>
           </div>

           <form onSubmit={handleSubmit} className="space-y-5">
              {!isLoginMode && (
                <div className="space-y-2">
                   <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Full Name</label>
                   <div className="relative group">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-black dark:group-focus-within:text-white transition-colors" size={18} />
                      <input 
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onFocus={() => setIsTyping(true)}
                        onBlur={() => setIsTyping(false)}
                        className="w-full bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl py-3.5 pl-12 pr-4 outline-none focus:border-black dark:focus:border-white transition-all text-sm font-medium"
                        placeholder="Arshed Anwar"
                        required={!isLoginMode}
                      />
                   </div>
                </div>
              )}

              <div className="space-y-2">
                 <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Email Address</label>
                 <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-black dark:group-focus-within:text-white transition-colors" size={18} />
                    <input 
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onFocus={() => setIsTyping(true)}
                      onBlur={() => setIsTyping(false)}
                      className="w-full bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl py-3.5 pl-12 pr-4 outline-none focus:border-black dark:focus:border-white transition-all text-sm font-medium"
                      placeholder="name@firm.com"
                      required
                    />
                 </div>
              </div>

              <div className="space-y-2">
                 <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Password</label>
                 <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-black dark:group-focus-within:text-white transition-colors" size={18} />
                    <input 
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onFocus={() => setIsTyping(true)}
                      onBlur={() => setIsTyping(false)}
                      className="w-full bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl py-3.5 pl-12 pr-12 outline-none focus:border-black dark:focus:border-white transition-all text-sm font-medium"
                      placeholder="••••••••"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black dark:hover:text-white transition-colors"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                 </div>
              </div>

              {error && (
                <div className="p-3 bg-red-50 text-red-600 text-xs font-bold rounded-lg flex items-center gap-2">
                   <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span> {error}
                </div>
              )}

              <button 
                type="submit"
                disabled={isLoading}
                className="w-full bg-black dark:bg-white text-white dark:text-black py-4 rounded-xl font-bold text-sm hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-lg active:scale-[0.98]"
              >
                {isLoading ? (
                  <span className="w-4 h-4 border-2 border-white/20 dark:border-black/20 border-t-white dark:border-t-black rounded-full animate-spin" />
                ) : (
                  <>
                    {isLoginMode ? 'Authenticate Access' : 'Create Account'}
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
           </form>

           <div className="mt-8 text-center">
             <p className="text-sm text-gray-500">
               {isLoginMode ? "Don't have an account? " : "Already have an account? "}
               <button 
                 onClick={() => {
                   setIsLoginMode(!isLoginMode);
                   setError('');
                 }}
                 className="text-black dark:text-white font-bold hover:underline"
               >
                 {isLoginMode ? 'Sign Up' : 'Log In'}
               </button>
             </p>
           </div>
        </div>
      </div>

    </div>
  );
};

export default Login;
