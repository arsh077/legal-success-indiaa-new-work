
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  FileText, 
  CheckCircle, 
  Clock, 
  Search, 
  Filter, 
  MoreVertical, 
  LogOut,
  UserPlus,
  ArrowUpRight,
  ChevronRight,
  ShieldAlert,
  Menu,
  X,
  ChevronLeft,
  Settings,
  Bell,
  LayoutDashboard
} from 'lucide-react';
import { User, Lead, LeadStatus } from '../types';
import { MOCK_USERS, MOCK_LEADS } from '../constants';
import Logo from '../components/Logo';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [leads, setLeads] = useState<Lead[]>(MOCK_LEADS);
  const [users, setUsers] = useState<User[]>(MOCK_USERS);
  const [activeTab, setActiveTab] = useState<'leads' | 'users'>('leads');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  useEffect(() => {
    const userJson = localStorage.getItem('user');
    if (!userJson) {
      navigate('/login');
      return;
    }
    setCurrentUser(JSON.parse(userJson));

    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsSidebarVisible(false);
      } else {
        setIsSidebarVisible(true);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const updateLeadStatus = (leadId: string, status: LeadStatus) => {
    setLeads(prev => prev.map(l => l.id === leadId ? { ...l, status, updatedAt: new Date().toISOString() } : l));
  };

  const assignLead = (leadId: string, userId: string) => {
    if (currentUser?.role === 'EMPLOYEE') return;
    setLeads(prev => prev.map(l => l.id === leadId ? { ...l, assignedTo: userId, updatedAt: new Date().toISOString() } : l));
  };

  const filteredLeads = leads.filter(l => {
    const matchesSearch = l.name.toLowerCase().includes(searchQuery.toLowerCase()) || l.email.toLowerCase().includes(searchQuery.toLowerCase());
    if (currentUser?.role === 'EMPLOYEE') {
      return matchesSearch && l.assignedTo === currentUser.id;
    }
    return matchesSearch;
  });

  const getStatusColor = (status: LeadStatus) => {
    switch (status) {
      case 'NEW': return 'bg-blue-50 text-blue-600 border-blue-100';
      case 'IN_PROGRESS': return 'bg-yellow-50 text-yellow-600 border-yellow-100';
      case 'COMPLETED': return 'bg-green-50 text-green-600 border-green-100';
      case 'CANCELLED': return 'bg-red-50 text-red-600 border-red-100';
      default: return 'bg-gray-50 text-gray-600 border-gray-100';
    }
  };

  if (!currentUser) return null;

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex animate-in fade-in duration-700 relative overflow-hidden">
      
      {/* 
          FLOATING HAMBURGER 
          Always on top, stays visible or fades based on state 
      */}
      <button 
        onClick={() => setIsSidebarVisible(!isSidebarVisible)}
        className={`fixed top-8 left-8 z-[110] p-4 bg-white border border-gray-100 rounded-2xl shadow-2xl hover:bg-black hover:text-white transition-all duration-500 ease-out group ${
          isSidebarVisible ? 'opacity-0 scale-90 pointer-events-none' : 'opacity-100 scale-100'
        }`}
        aria-label="Toggle Menu"
      >
        <Menu size={20} className="group-hover:rotate-90 transition-transform duration-500" />
      </button>

      {/* 
          SIDEBAR 
          Using fixed width + transform for performance.
      */}
      <aside 
        className={`fixed left-0 top-0 h-full bg-white border-r border-gray-100 z-[100] transition-all duration-700 cubic-bezier(0.16, 1, 0.3, 1) ${
          isSidebarVisible ? 'w-80 translate-x-0' : 'w-0 -translate-x-full'
        } overflow-hidden shadow-2xl lg:shadow-none`}
      >
        <div className="w-80 p-10 h-full flex flex-col">
          <div className="mb-16 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="font-bold text-xl tracking-tighter text-[#0B0B0B]">LSI. PORTAL</span>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mt-1">{currentUser.role.replace('_', ' ')}</span>
            </div>
            <button 
              onClick={() => setIsSidebarVisible(false)}
              className="p-2 hover:bg-gray-50 rounded-xl transition-all text-gray-300 hover:text-black"
            >
              <ChevronLeft size={20} />
            </button>
          </div>

          <nav className="flex-grow space-y-3">
            <button 
              onClick={() => setActiveTab('leads')}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-bold text-[11px] uppercase tracking-widest transition-all duration-500 ${
                activeTab === 'leads' ? 'bg-black text-white shadow-xl shadow-black/10' : 'text-gray-400 hover:bg-gray-50 hover:text-black'
              }`}
            >
              <LayoutDashboard size={18} />
              Pipeline
            </button>
            {(currentUser.role === 'HEAD_ADMIN' || currentUser.role === 'ADMIN') && (
              <button 
                onClick={() => setActiveTab('users')}
                className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-bold text-[11px] uppercase tracking-widest transition-all duration-500 ${
                  activeTab === 'users' ? 'bg-black text-white shadow-xl shadow-black/10' : 'text-gray-400 hover:bg-gray-50 hover:text-black'
                }`}
              >
                <Users size={18} />
                Team
              </button>
            )}
            <button className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-bold text-[11px] uppercase tracking-widest text-gray-400 hover:bg-gray-50 hover:text-black transition-all">
              <Settings size={18} />
              Config
            </button>
          </nav>

          <div className="pt-10 border-t border-gray-50 mt-auto">
            <div className="flex items-center gap-4 mb-8 p-3 rounded-2xl bg-[#F9FAFB]">
              <div className="w-12 h-12 rounded-xl bg-black text-white flex items-center justify-center font-bold text-sm">
                {currentUser.name.charAt(0)}
              </div>
              <div className="overflow-hidden">
                <div className="text-sm font-bold truncate text-[#0B0B0B]">{currentUser.name}</div>
                <div className="text-[9px] text-gray-400 truncate uppercase tracking-widest font-bold">Authenticated</div>
              </div>
            </div>
            <button 
              onClick={handleLogout}
              className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-bold text-[11px] uppercase tracking-widest text-red-500 hover:bg-red-50 transition-all"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* 
          MAIN CONTENT 
          Adjusts margin and padding based on sidebar state for a "Push" effect.
          Added scaling effect for extra premium feel.
      */}
      <main 
        className={`flex-grow h-screen overflow-y-auto transition-all duration-700 cubic-bezier(0.16, 1, 0.3, 1) ${
          isSidebarVisible 
            ? 'pl-[320px] pr-12 pt-12' // Sidebar width is 80 (320px)
            : 'px-12 md:px-24 pt-12 md:pt-32'
        }`}
      >
        <div className={`max-w-7xl mx-auto transition-all duration-1000 ${isSidebarVisible ? 'scale-[0.98]' : 'scale-100'}`}>
          
          {/* Dashboard Header Container */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 mb-20">
            <div className="flex flex-col gap-6">
              {/* Internal Brand for Context (Optional, but keeps visual balance) */}
              <div className="opacity-40 hover:opacity-100 transition-opacity">
                 <Logo className="h-6" />
              </div>
              
              <div>
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-[#0B0B0B] leading-none">
                  {activeTab === 'leads' ? 'Lead Management' : 'Our Experts'}
                </h1>
                <p className="text-[#9CA3AF] mt-4 font-medium text-lg md:text-xl max-w-xl">
                  {activeTab === 'leads' 
                    ? `Managing the digital gateway of Legal Success India.` 
                    : `Your team of specialized legal consultants.`}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
               <button className="p-5 bg-white border border-gray-100 rounded-2xl text-gray-400 hover:text-black transition-all shadow-sm">
                 <Bell size={20} />
               </button>
               {activeTab === 'users' && currentUser.role === 'HEAD_ADMIN' && (
                <button className="bg-black text-white px-10 py-5 rounded-2xl font-bold text-[12px] uppercase tracking-widest flex items-center gap-3 hover:bg-gray-800 transition-all shadow-2xl shadow-black/10">
                  <UserPlus size={18} />
                  Add Team Member
                </button>
              )}
            </div>
          </div>

          {activeTab === 'leads' && (
            <div className="space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-700">
              
              {/* Quick Filters */}
              <div className="flex flex-col md:flex-row gap-4 items-stretch">
                <div className="relative flex-grow">
                  <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300" size={20} />
                  <input 
                    type="text" 
                    placeholder="Search leads by name, email or service type..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-white border border-gray-100 rounded-[2rem] py-6 pl-16 pr-8 focus:ring-1 focus:ring-black outline-none transition-all shadow-sm text-sm"
                  />
                </div>
                <button className="flex items-center justify-center gap-3 px-10 py-6 bg-white border border-gray-100 rounded-[2rem] text-gray-500 font-bold text-[11px] uppercase tracking-widest hover:text-black hover:border-black transition-all shadow-sm">
                  <Filter size={18} />
                  Advanced Filters
                </button>
              </div>

              {/* Data Visualization / List */}
              <div className="grid grid-cols-1 gap-6 pb-20">
                {filteredLeads.map((lead, idx) => (
                  <div 
                    key={lead.id} 
                    className="bg-white border border-gray-50 rounded-[3rem] p-10 hover:shadow-2xl hover:shadow-black/5 transition-all duration-700 flex flex-col md:flex-row items-center justify-between gap-10 group"
                    style={{ animationDelay: `${idx * 100}ms` }}
                  >
                    <div className="flex items-center gap-8 flex-grow">
                      <div className="w-16 h-16 bg-[#F9FAFB] rounded-2xl flex items-center justify-center font-bold text-xl group-hover:bg-black group-hover:text-white transition-all duration-700 ease-out">
                        {lead.name.charAt(0)}
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-4">
                          <h3 className="font-bold text-xl text-[#0B0B0B] tracking-tight">{lead.name}</h3>
                          <span className={`text-[9px] font-bold uppercase tracking-[0.2em] border rounded-full px-4 py-1.5 ${getStatusColor(lead.status)}`}>
                            {lead.status.replace('_', ' ')}
                          </span>
                        </div>
                        <p className="text-[#6B7280] text-sm font-medium tracking-tight">
                          {lead.service} <span className="mx-2 text-gray-200">•</span> {lead.email}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-16 text-right">
                      <div className="hidden lg:block">
                        <div className="text-[10px] font-bold text-gray-300 uppercase tracking-widest mb-2">Assigned Lead</div>
                        <div className="text-sm font-bold text-[#0B0B0B]">
                          {lead.assignedTo ? users.find(u => u.id === lead.assignedTo)?.name : 'Pending Assign'}
                        </div>
                      </div>
                      <div className="hidden sm:block">
                        <div className="text-[10px] font-bold text-gray-300 uppercase tracking-widest mb-2">Timestamp</div>
                        <div className="text-sm font-bold text-[#0B0B0B]">{new Date(lead.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}</div>
                      </div>
                      <button className="w-14 h-14 rounded-full border border-gray-100 flex items-center justify-center text-gray-300 hover:text-black hover:border-black transition-all group-hover:bg-black group-hover:text-white group-hover:border-black">
                        <ChevronRight size={22} className="group-hover:translate-x-0.5 transition-transform" />
                      </button>
                    </div>
                  </div>
                ))}
                
                {filteredLeads.length === 0 && (
                  <div className="py-40 text-center bg-white rounded-[4rem] border border-dashed border-gray-100">
                    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-8">
                       <FileText className="text-gray-200" size={32} />
                    </div>
                    <h3 className="text-2xl font-bold text-[#0B0B0B]">No leads found</h3>
                    <p className="text-gray-400 mt-2 font-medium">Try broadening your search criteria.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-20 animate-in fade-in slide-in-from-bottom-6 duration-700">
              {users.map((user, idx) => (
                <div 
                  key={user.id} 
                  className="bg-white p-12 border border-gray-100 rounded-[4rem] shadow-sm hover:border-black transition-all duration-700 group relative overflow-hidden"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <div className="flex items-center gap-6 mb-12">
                    <div className="w-20 h-20 bg-[#F9FAFB] rounded-3xl flex items-center justify-center font-bold text-3xl group-hover:bg-black group-hover:text-white transition-all duration-700">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-bold text-2xl tracking-tight">{user.name}</h3>
                      <div className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mt-2">{user.role}</div>
                    </div>
                  </div>
                  <div className="space-y-6 mb-10">
                    <div className="flex flex-col gap-1">
                      <span className="text-gray-300 font-bold uppercase tracking-widest text-[9px]">Professional Email</span>
                      <span className="font-bold text-[#0B0B0B] truncate text-sm">{user.email}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300 font-bold uppercase tracking-widest text-[9px]">Activity</span>
                      <span className="text-green-500 font-bold uppercase tracking-widest text-[9px] flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        Online Now
                      </span>
                    </div>
                  </div>
                  <div className="pt-8 border-t border-gray-50 flex justify-between items-center">
                     <button className="text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-black transition-colors underline-offset-4 hover:underline">Full Profile</button>
                     {currentUser.role === 'HEAD_ADMIN' && user.role !== 'HEAD_ADMIN' && (
                        <button className="text-[10px] font-bold uppercase tracking-widest text-red-500 hover:underline">Revoke Access</button>
                     )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
