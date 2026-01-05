import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  Search, 
  Filter, 
  LogOut,
  UserPlus,
  ChevronRight,
  Menu,
  ChevronLeft,
  Settings,
  Bell,
  LayoutDashboard,
  X,
  UserCheck,
  ShieldAlert,
  Phone,
  Mail,
  Calendar,
  ExternalLink,
  MessageSquare,
  Hash
} from 'lucide-react';
import { User, Lead, LeadStatus, UserRole } from '../types';
import Logo from '../components/Logo';

interface DashboardProps {
  globalLeads: Lead[];
  onUpdateLead: (lead: Lead) => void;
  globalUsers: User[];
  onAddUser: (user: Omit<User, 'id'>) => void;
  onRemoveUser: (userId: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ 
  globalLeads, 
  onUpdateLead, 
  globalUsers, 
  onAddUser, 
  onRemoveUser 
}) => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<'leads' | 'users'>('leads');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  
  // Modal states
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'EMPLOYEE' as UserRole });

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

  const updateStatus = (leadId: string, status: LeadStatus) => {
    const lead = globalLeads.find(l => l.id === leadId);
    if (lead) {
      const updated = { ...lead, status, updatedAt: new Date().toISOString() };
      onUpdateLead(updated);
      if (selectedLead?.id === leadId) setSelectedLead(updated);
    }
  };

  const assignLead = (leadId: string, userId: string) => {
    const lead = globalLeads.find(l => l.id === leadId);
    if (lead) {
      const updated = { 
        ...lead, 
        assignedTo: userId === 'unassigned' ? undefined : userId, 
        updatedAt: new Date().toISOString() 
      };
      onUpdateLead(updated);
      if (selectedLead?.id === leadId) setSelectedLead(updated);
    }
  };

  const handleAddUserSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUser.name || !newUser.email) return;
    onAddUser(newUser);
    setNewUser({ name: '', email: '', role: 'EMPLOYEE' });
    setIsAddUserModalOpen(false);
  };

  const filteredLeads = globalLeads.filter(l => {
    const query = searchQuery.toLowerCase();
    const matchesSearch = l.name.toLowerCase().includes(query) || 
                         l.email.toLowerCase().includes(query) ||
                         l.service.toLowerCase().includes(query) ||
                         l.phone.includes(searchQuery);
    
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

  const isAdmin = currentUser?.role === 'HEAD_ADMIN' || currentUser?.role === 'ADMIN';

  if (!currentUser) return null;

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex animate-in fade-in duration-700 relative overflow-hidden">
      
      {/* LEAD DETAIL MODAL */}
      {selectedLead && (
        <div className="fixed inset-0 z-[250] flex items-center justify-center p-6 bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white rounded-[4rem] w-full max-w-2xl p-10 md:p-16 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-4 bg-black" />
             
             <button 
              onClick={() => setSelectedLead(null)}
              className="absolute top-12 right-12 p-3 hover:bg-gray-100 rounded-full transition-all hover:rotate-90"
            >
              <X size={24} />
            </button>

            <div className="mb-14">
              <div className="flex items-center gap-10 mb-12">
                <div className="w-24 h-24 bg-black text-white rounded-[2.5rem] flex items-center justify-center font-bold text-4xl shadow-2xl">
                  {selectedLead.name.charAt(0)}
                </div>
                <div>
                   <h2 className="text-4xl font-black tracking-tighter mb-3 text-[#0B0B0B]">{selectedLead.name}</h2>
                   <div className="flex items-center gap-4">
                     <span className={`text-[10px] font-black uppercase tracking-widest px-5 py-2 rounded-full border ${getStatusColor(selectedLead.status)}`}>
                       {selectedLead.status.replace('_', ' ')}
                     </span>
                     <span className="text-gray-200 text-lg">/</span>
                     <p className="text-gray-400 font-bold text-[11px] uppercase tracking-[0.2em]">{selectedLead.service}</p>
                   </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-gray-50/50 p-12 rounded-[3.5rem] border border-gray-100">
                 <div className="space-y-10">
                    <div>
                      <label className="text-[10px] font-black text-gray-300 uppercase tracking-[0.3em] block mb-4">Mobile Contact</label>
                      <a href={`tel:${selectedLead.phone}`} className="flex items-center gap-5 text-2xl font-black text-black hover:text-blue-600 transition-all group">
                        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-md border border-gray-100 group-hover:bg-blue-600 group-hover:text-white transition-all">
                          <Phone size={20} />
                        </div>
                        {selectedLead.phone}
                        <ExternalLink size={16} className="opacity-0 group-hover:opacity-100 transition-all -translate-x-3 group-hover:translate-x-0" />
                      </a>
                    </div>
                    <div>
                      <label className="text-[10px] font-black text-gray-300 uppercase tracking-[0.3em] block mb-4">Email Channel</label>
                      <a href={`mailto:${selectedLead.email}`} className="flex items-center gap-5 text-xl font-bold text-black hover:text-blue-600 transition-all group">
                        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-md border border-gray-100 group-hover:bg-blue-600 group-hover:text-white transition-all">
                          <Mail size={20} />
                        </div>
                        <span className="truncate">{selectedLead.email}</span>
                      </a>
                    </div>
                 </div>
                 <div className="space-y-10">
                    <div>
                      <label className="text-[10px] font-black text-gray-300 uppercase tracking-[0.3em] block mb-4">Entry Point</label>
                      <div className="flex items-center gap-5 text-xl font-bold text-black">
                        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-md border border-gray-100">
                          <Calendar size={20} />
                        </div>
                        {new Date(selectedLead.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </div>
                    </div>
                    <div>
                      <label className="text-[10px] font-black text-gray-300 uppercase tracking-[0.3em] block mb-4">Internal ID</label>
                      <div className="flex items-center gap-5 text-xl font-bold text-black/40">
                        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-md border border-gray-100">
                          <Hash size={20} />
                        </div>
                        {selectedLead.id}
                      </div>
                    </div>
                 </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
               {isAdmin && (
                  <div className="space-y-4">
                    <label className="text-[11px] font-black uppercase tracking-[0.3em] text-gray-400 ml-2">Assign Consultant</label>
                    <div className="relative">
                      <select 
                        value={selectedLead.assignedTo || 'unassigned'}
                        onChange={(e) => assignLead(selectedLead.id, e.target.value)}
                        className="w-full p-7 bg-gray-100/50 border-none rounded-[1.8rem] text-[12px] font-black uppercase tracking-widest focus:ring-2 focus:ring-black outline-none transition-all cursor-pointer appearance-none"
                      >
                        <option value="unassigned">-- Search Team --</option>
                        {globalUsers.filter(u => u.role !== 'HEAD_ADMIN').map(user => (
                          <option key={user.id} value={user.id}>{user.name}</option>
                        ))}
                      </select>
                      <UserCheck className="absolute right-8 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none" size={20} />
                    </div>
                  </div>
               )}
               <div className="space-y-4">
                  <label className="text-[11px] font-black uppercase tracking-[0.3em] text-gray-400 ml-2">Pipeline Status</label>
                  <div className="grid grid-cols-2 gap-3">
                    {['NEW', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'].map((s) => (
                      <button 
                        key={s}
                        onClick={() => updateStatus(selectedLead.id, s as LeadStatus)}
                        className={`px-4 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                          selectedLead.status === s ? 'bg-black text-white shadow-2xl' : 'bg-gray-50 text-gray-400 hover:bg-gray-100'
                        }`}
                      >
                        {s.replace('_', ' ')}
                      </button>
                    ))}
                  </div>
               </div>
            </div>
            
            <div className="mt-14 pt-10 border-t border-gray-50">
               <button className="flex items-center gap-4 mx-auto text-[12px] font-black uppercase tracking-[0.3em] text-gray-300 hover:text-black transition-all">
                  <MessageSquare size={18} />
                  Add Compliance Note
               </button>
            </div>
          </div>
        </div>
      )}

      {/* ADD USER MODAL */}
      {isAddUserModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-[4rem] w-full max-w-lg p-12 md:p-16 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-3 bg-black" />
            <button 
              onClick={() => setIsAddUserModalOpen(false)}
              className="absolute top-12 right-12 p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={24} />
            </button>
            <h2 className="text-4xl font-black tracking-tighter mb-4 text-[#0B0B0B]">New Expert.</h2>
            <p className="text-gray-400 font-medium mb-12">Grant access to the Legal Success India pipeline.</p>
            
            <form onSubmit={handleAddUserSubmit} className="space-y-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-300 ml-2">Full Identity</label>
                <input 
                  type="text" 
                  required
                  value={newUser.name}
                  onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                  className="w-full bg-gray-50/50 border-none rounded-[1.8rem] p-6 outline-none focus:ring-2 focus:ring-black transition-all text-sm font-bold"
                  placeholder="Expert Name"
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-300 ml-2">Official Email</label>
                <input 
                  type="email" 
                  required
                  value={newUser.email}
                  onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                  className="w-full bg-gray-50/50 border-none rounded-[1.8rem] p-6 outline-none focus:ring-2 focus:ring-black transition-all text-sm font-bold"
                  placeholder="name@legalsuccess.in"
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-300 ml-2">Clearance Level</label>
                <select 
                  value={newUser.role}
                  onChange={(e) => setNewUser({...newUser, role: e.target.value as UserRole})}
                  className="w-full bg-gray-50/50 border-none rounded-[1.8rem] p-6 outline-none focus:ring-2 focus:ring-black appearance-none cursor-pointer text-sm font-bold uppercase tracking-widest"
                >
                  <option value="EMPLOYEE">Associate Expert</option>
                  <option value="ADMIN">Lead Admin</option>
                </select>
              </div>
              <button 
                type="submit"
                className="w-full bg-black text-white py-7 rounded-full font-black text-sm uppercase tracking-[0.3em] hover:bg-gray-800 transition-all shadow-2xl mt-6 active:scale-95"
              >
                Create Account
              </button>
            </form>
          </div>
        </div>
      )}

      {/* SIDEBAR */}
      <aside 
        className={`fixed left-0 top-0 h-full bg-white border-r border-gray-100 z-[100] transition-all duration-700 cubic-bezier(0.16, 1, 0.3, 1) ${
          isSidebarVisible ? 'w-80 translate-x-0' : 'w-0 -translate-x-full'
        } overflow-hidden shadow-2xl lg:shadow-none`}
      >
        <div className="w-80 p-10 h-full flex flex-col">
          <div className="mb-20 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="font-black text-2xl tracking-tighter text-[#0B0B0B]">LSI. PORTAL</span>
              <span className="text-[10px] font-black text-gray-300 uppercase tracking-[0.3em] mt-2">{currentUser.role.replace('_', ' ')}</span>
            </div>
            <button 
              onClick={() => setIsSidebarVisible(false)}
              className="p-3 hover:bg-gray-50 rounded-2xl transition-all text-gray-200 hover:text-black"
            >
              <ChevronLeft size={24} />
            </button>
          </div>

          <nav className="flex-grow space-y-4">
            <button 
              onClick={() => setActiveTab('leads')}
              className={`w-full flex items-center gap-5 px-8 py-5 rounded-[1.8rem] font-black text-[11px] uppercase tracking-[0.2em] transition-all duration-500 ${
                activeTab === 'leads' ? 'bg-black text-white shadow-2xl' : 'text-gray-400 hover:bg-gray-50 hover:text-black'
              }`}
            >
              <LayoutDashboard size={20} />
              Pipeline
            </button>
            {isAdmin && (
              <button 
                onClick={() => setActiveTab('users')}
                className={`w-full flex items-center gap-5 px-8 py-5 rounded-[1.8rem] font-black text-[11px] uppercase tracking-[0.2em] transition-all duration-500 ${
                  activeTab === 'users' ? 'bg-black text-white shadow-2xl' : 'text-gray-400 hover:bg-gray-50 hover:text-black'
                }`}
              >
                <Users size={20} />
                Expert Team
              </button>
            )}
            <button className="w-full flex items-center gap-5 px-8 py-5 rounded-[1.8rem] font-black text-[11px] uppercase tracking-[0.2em] text-gray-400 hover:bg-gray-50 hover:text-black transition-all">
              <Settings size={20} />
              Platform
            </button>
          </nav>

          <div className="pt-10 border-t border-gray-50 mt-auto">
            <div className="flex items-center gap-5 mb-10 p-4 rounded-[2rem] bg-[#F9FAFB]">
              <div className="w-14 h-14 rounded-[1.2rem] bg-black text-white flex items-center justify-center font-bold text-xl">
                {currentUser.name.charAt(0)}
              </div>
              <div className="overflow-hidden">
                <div className="text-sm font-black truncate text-[#0B0B0B]">{currentUser.name}</div>
                <div className="text-[10px] text-gray-300 truncate uppercase tracking-[0.2em] font-bold mt-1">Authorized</div>
              </div>
            </div>
            <button 
              onClick={handleLogout}
              className="w-full flex items-center gap-5 px-8 py-5 rounded-[1.5rem] font-black text-[11px] uppercase tracking-[0.2em] text-red-500 hover:bg-red-50 transition-all"
            >
              <LogOut size={20} />
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main 
        className={`flex-grow h-screen overflow-y-auto transition-all duration-700 cubic-bezier(0.16, 1, 0.3, 1) ${
          isSidebarVisible 
            ? 'pl-[320px] pr-12 pt-12' 
            : 'px-12 md:px-24 pt-12 md:pt-32'
        }`}
      >
        {/* HAMBURGER TRIGGER */}
        {!isSidebarVisible && (
          <button 
            onClick={() => setIsSidebarVisible(true)}
            className="fixed top-10 left-10 z-[110] p-5 bg-white border border-gray-100 rounded-[2rem] shadow-2xl hover:bg-black hover:text-white transition-all group active:scale-90"
          >
            <Menu size={24} className="group-hover:rotate-90 transition-transform duration-500" />
          </button>
        )}

        <div className={`max-w-7xl mx-auto pb-40 transition-all duration-1000 ${isSidebarVisible ? 'scale-[0.98]' : 'scale-100'}`}>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12 mb-24">
            <div>
              <div className="mb-12 opacity-30 hover:opacity-100 transition-opacity">
                 <Logo className="h-7" />
              </div>
              <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-[#0B0B0B] leading-[0.85] mb-8">
                {activeTab === 'leads' ? 'Real-time Flow' : 'Expert Network'}
              </h1>
              <p className="text-gray-400 font-bold text-xl md:text-2xl max-w-xl uppercase tracking-tighter leading-tight">
                {activeTab === 'leads' 
                  ? `Processing ${filteredLeads.length} active client inquiries for compliance excellence.` 
                  : `Managing access and performance for ${globalUsers.length} legal consultants.`}
              </p>
            </div>

            <div className="flex items-center gap-5">
               <button className="p-7 bg-white border border-gray-100 rounded-[2rem] text-gray-300 hover:text-black transition-all shadow-sm active:scale-95">
                 <Bell size={28} />
               </button>
               {activeTab === 'users' && currentUser.role === 'HEAD_ADMIN' && (
                <button 
                  onClick={() => setIsAddUserModalOpen(true)}
                  className="bg-[#0B0B0B] text-white px-12 py-6 rounded-[2.5rem] font-black text-[12px] uppercase tracking-[0.3em] flex items-center gap-8 hover:bg-blue-600 transition-all shadow-2xl group h-24"
                >
                  <UserPlus size={30} className="group-hover:scale-110 transition-transform" />
                  <div className="text-left leading-none">
                    <div>ONBOARD</div>
                    <div className="opacity-40 mt-2">NEW EXPERT</div>
                  </div>
                </button>
              )}
            </div>
          </div>

          {activeTab === 'leads' && (
            <div className="space-y-14 animate-in fade-in slide-in-from-bottom-12 duration-1000">
              
              <div className="flex flex-col md:flex-row gap-5 items-stretch">
                <div className="relative flex-grow">
                  <Search className="absolute left-10 top-1/2 -translate-y-1/2 text-gray-300" size={28} />
                  <input 
                    type="text" 
                    placeholder="Search by client, mobile ID, or email gateway..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-white border border-gray-100 rounded-[3rem] py-8 pl-24 pr-12 focus:ring-4 focus:ring-black/5 outline-none transition-all shadow-sm text-lg font-bold placeholder:text-gray-200"
                  />
                </div>
                <button className="flex items-center justify-center gap-5 px-14 py-8 bg-white border border-gray-100 rounded-[3rem] text-gray-400 font-black text-[12px] uppercase tracking-[0.3em] hover:text-black hover:border-black transition-all shadow-sm active:scale-95">
                  <Filter size={24} />
                  Filter Pipe
                </button>
              </div>

              <div className="grid grid-cols-1 gap-8">
                {filteredLeads.map((lead, idx) => (
                  <div 
                    key={lead.id} 
                    className="bg-white border border-gray-50 rounded-[4rem] p-12 hover:shadow-[0_60px_100px_-20px_rgba(0,0,0,0.15)] transition-all duration-700 flex flex-col md:flex-row items-center justify-between gap-12 group relative overflow-hidden"
                    style={{ animationDelay: `${idx * 150}ms` }}
                  >
                    <div className="flex items-center gap-12 flex-grow">
                      <div className="w-24 h-24 bg-black text-white rounded-[2.2rem] flex items-center justify-center font-black text-4xl group-hover:scale-110 transition-transform duration-700 shadow-2xl">
                        {lead.name.charAt(0)}
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-center gap-6">
                          <h3 className="font-black text-3xl text-[#0B0B0B] tracking-tighter">{lead.name}</h3>
                          <span className={`text-[10px] font-black uppercase tracking-[0.25em] border rounded-full px-6 py-2.5 flex items-center gap-3 ${getStatusColor(lead.status)}`}>
                            {lead.status.replace('_', ' ')}
                          </span>
                        </div>
                        <div className="flex items-center gap-6 text-[#6B7280] text-[15px] font-black tracking-tight uppercase">
                          <div className="flex items-center gap-3 text-black">
                            <Phone size={16} className="opacity-40" />
                            {lead.phone}
                          </div>
                          <span className="text-gray-100 font-thin text-2xl">|</span>
                          <span className="text-gray-300 tracking-[0.1em]">{lead.service}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-16 text-right w-full md:w-auto justify-between md:justify-end">
                      
                      {isAdmin && (
                        <div className="text-left min-w-[200px]">
                          <div className="text-[11px] font-black text-gray-200 uppercase tracking-[0.3em] mb-4 flex items-center gap-3">
                            <UserCheck size={16} />
                            Responsibility
                          </div>
                          <select 
                            value={lead.assignedTo || 'unassigned'}
                            onChange={(e) => assignLead(lead.id, e.target.value)}
                            className="w-full p-5 bg-gray-50 border-none rounded-[1.5rem] text-[11px] font-black uppercase tracking-[0.15em] focus:ring-2 focus:ring-black outline-none transition-all cursor-pointer appearance-none text-gray-400 hover:bg-gray-100"
                          >
                            <option value="unassigned">-- Select Expert --</option>
                            {globalUsers.filter(u => u.role !== 'HEAD_ADMIN').map(user => (
                              <option key={user.id} value={user.id}>{user.name}</option>
                            ))}
                          </select>
                        </div>
                      )}

                      {!isAdmin && lead.assignedTo && (
                        <div className="text-left">
                           <div className="text-[11px] font-black text-gray-200 uppercase tracking-[0.3em] mb-4">Case Officer</div>
                           <div className="text-[14px] font-black text-black uppercase tracking-tight">
                             {globalUsers.find(u => u.id === lead.assignedTo)?.name || 'Legal Team'}
                           </div>
                        </div>
                      )}

                      <div className="hidden lg:block text-center">
                        <div className="text-[11px] font-black text-gray-200 uppercase tracking-[0.3em] mb-4 text-center">Inquiry Meta</div>
                        <div className="text-[14px] font-black text-[#0B0B0B] flex flex-col items-center">
                          <span>{new Date(lead.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}</span>
                          <span className="text-[10px] text-gray-300 opacity-50">{new Date(lead.createdAt).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                      </div>

                      <div className="flex flex-col items-center gap-3">
                         <div className="text-[11px] font-black text-gray-200 uppercase tracking-[0.3em] mb-1">State</div>
                        <select 
                          value={lead.status}
                          onChange={(e) => updateStatus(lead.id, e.target.value as LeadStatus)}
                          className="p-5 bg-gray-50 border-none rounded-[1.5rem] text-[11px] font-black uppercase tracking-widest focus:ring-2 focus:ring-black outline-none transition-all cursor-pointer appearance-none font-black text-[#0B0B0B]"
                        >
                          <option value="NEW">NEW</option>
                          <option value="IN_PROGRESS">ACTIVE</option>
                          <option value="COMPLETED">CLOSED</option>
                          <option value="CANCELLED">VOID</option>
                        </select>
                      </div>

                      {/* THE CIRCULAR ACTION BUTTON */}
                      <button 
                        onClick={() => setSelectedLead(lead)}
                        className="w-24 h-24 rounded-full bg-black text-white flex items-center justify-center hover:scale-110 transition-all shadow-[0_30px_60px_-10px_rgba(0,0,0,0.4)] flex-shrink-0 active:scale-90 cursor-pointer hover:bg-[#111] group-hover:bg-blue-600"
                      >
                        <ChevronRight size={38} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 animate-in fade-in slide-in-from-bottom-12 duration-1000">
              {globalUsers.map((user, idx) => (
                <div 
                  key={user.id} 
                  className="bg-white p-14 border border-gray-50 rounded-[5rem] shadow-sm hover:border-black transition-all duration-700 group relative overflow-hidden"
                  style={{ animationDelay: `${idx * 150}ms` }}
                >
                  <div className="flex items-center gap-10 mb-16">
                    <div className="w-24 h-24 bg-black text-white rounded-[2.5rem] flex items-center justify-center font-black text-4xl group-hover:scale-105 transition-transform duration-700 shadow-2xl">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-black text-3xl tracking-tighter leading-none mb-4">{user.name}</h3>
                      <div className="text-[11px] font-black text-gray-200 uppercase tracking-[0.35em]">{user.role.replace('_', ' ')}</div>
                    </div>
                  </div>
                  <div className="space-y-12 mb-16">
                    <div className="flex flex-col gap-4">
                      <span className="text-gray-200 font-black uppercase tracking-[0.25em] text-[10px]">Portal Authenticator</span>
                      <span className="font-black text-[#0B0B0B] truncate text-lg tracking-tight">{user.email}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-200 font-black uppercase tracking-[0.25em] text-[10px]">Cloud Link</span>
                      <span className="text-[#10B981] font-black uppercase tracking-widest text-[10px] flex items-center gap-4 bg-[#10B981]/5 px-6 py-3 rounded-full border border-[#10B981]/10">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse" />
                        ENCRYPTED
                      </span>
                    </div>
                  </div>
                  <div className="pt-12 border-t border-gray-50 flex justify-between items-center">
                     <button className="text-[11px] font-black uppercase tracking-[0.25em] text-gray-300 hover:text-black transition-colors hover:underline underline-offset-[12px] decoration-2">Audit Logs</button>
                     {currentUser.role === 'HEAD_ADMIN' && user.id !== currentUser.id && (
                        <button 
                          onClick={() => onRemoveUser(user.id)}
                          className="text-[11px] font-black uppercase tracking-[0.25em] text-red-500 hover:scale-105 transition-all flex items-center gap-4 px-6 py-3 hover:bg-red-50 rounded-2xl"
                        >
                          <ShieldAlert size={16} />
                          REVOKE
                        </button>
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