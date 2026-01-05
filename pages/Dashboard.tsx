
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
  Clock,
  CheckCircle2
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
  
  // Modals state
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
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
      onUpdateLead({ ...lead, status, updatedAt: new Date().toISOString() });
    }
  };

  const assignLead = (leadId: string, userId: string) => {
    const lead = globalLeads.find(l => l.id === leadId);
    if (lead) {
      onUpdateLead({ 
        ...lead, 
        assignedTo: userId === 'unassigned' ? undefined : userId, 
        updatedAt: new Date().toISOString() 
      });
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
    const matchesSearch = l.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         l.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         l.service.toLowerCase().includes(searchQuery.toLowerCase());
    
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
      
      {/* ADD USER MODAL */}
      {isAddUserModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-[3rem] w-full max-w-lg p-10 md:p-14 shadow-2xl relative">
            <button 
              onClick={() => setIsAddUserModalOpen(false)}
              className="absolute top-10 right-10 p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
            <h2 className="text-3xl font-bold tracking-tight mb-2">Add Team Member</h2>
            <p className="text-gray-400 text-sm mb-10">Grant portal access to a new compliance expert.</p>
            
            <form onSubmit={handleAddUserSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Full Name</label>
                <input 
                  type="text" 
                  required
                  value={newUser.name}
                  onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                  className="w-full bg-gray-50 border-none rounded-2xl p-5 outline-none focus:ring-1 focus:ring-black transition-all"
                  placeholder="Employee Name"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Professional Email</label>
                <input 
                  type="email" 
                  required
                  value={newUser.email}
                  onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                  className="w-full bg-gray-50 border-none rounded-2xl p-5 outline-none focus:ring-1 focus:ring-black transition-all"
                  placeholder="name@legalsuccess.in"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Access Role</label>
                <select 
                  value={newUser.role}
                  onChange={(e) => setNewUser({...newUser, role: e.target.value as UserRole})}
                  className="w-full bg-gray-50 border-none rounded-2xl p-5 outline-none focus:ring-1 focus:ring-black transition-all appearance-none"
                >
                  <option value="EMPLOYEE">Employee (Assigned Leads Only)</option>
                  <option value="ADMIN">Admin (All Leads + Assignment)</option>
                </select>
              </div>
              <button 
                type="submit"
                className="w-full bg-black text-white py-6 rounded-full font-bold text-sm uppercase tracking-widest hover:bg-gray-800 transition-all shadow-xl shadow-black/10 mt-4"
              >
                Create Account
              </button>
            </form>
          </div>
        </div>
      )}

      {/* FLOATING HAMBURGER */}
      <button 
        onClick={() => setIsSidebarVisible(!isSidebarVisible)}
        className={`fixed top-8 left-8 z-[110] p-4 bg-white border border-gray-100 rounded-2xl shadow-2xl hover:bg-black hover:text-white transition-all duration-500 ease-out group ${
          isSidebarVisible ? 'opacity-0 scale-90 pointer-events-none' : 'opacity-100 scale-100'
        }`}
        aria-label="Toggle Menu"
      >
        <Menu size={20} className="group-hover:rotate-90 transition-transform duration-500" />
      </button>

      {/* SIDEBAR */}
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
            {isAdmin && (
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

      {/* MAIN CONTENT */}
      <main 
        className={`flex-grow h-screen overflow-y-auto transition-all duration-700 cubic-bezier(0.16, 1, 0.3, 1) ${
          isSidebarVisible 
            ? 'pl-[320px] pr-12 pt-12' 
            : 'px-12 md:px-24 pt-12 md:pt-32'
        }`}
      >
        <div className={`max-w-7xl mx-auto transition-all duration-1000 ${isSidebarVisible ? 'scale-[0.98]' : 'scale-100'}`}>
          
          {/* Dashboard Header Container */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 mb-20">
            <div className="flex flex-col gap-6">
              <div className="opacity-40 hover:opacity-100 transition-opacity">
                 <Logo className="h-6" />
              </div>
              
              <div>
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-[#0B0B0B] leading-none">
                  {activeTab === 'leads' ? 'Real-time Pipeline' : 'Our Experts'}
                </h1>
                <p className="text-[#9CA3AF] mt-4 font-medium text-lg md:text-xl max-w-xl">
                  {activeTab === 'leads' 
                    ? `Currently viewing ${filteredLeads.length} active inquiries.` 
                    : `Your team of specialized legal consultants.`}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
               <button className="p-6 bg-white border border-gray-100 rounded-2xl text-gray-400 hover:text-black transition-all shadow-sm">
                 <Bell size={22} />
               </button>
               {activeTab === 'users' && currentUser.role === 'HEAD_ADMIN' && (
                <button 
                  onClick={() => setIsAddUserModalOpen(true)}
                  className="bg-[#1D222B] text-white px-10 py-5 rounded-[2.2rem] font-bold text-[11px] uppercase tracking-widest flex items-center gap-6 hover:bg-black transition-all shadow-2xl shadow-black/10 group h-20"
                >
                  <UserPlus size={24} className="group-hover:scale-110 transition-transform" />
                  <div className="text-left">
                    <div className="leading-none mb-1">ADD TEAM</div>
                    <div className="opacity-40 text-[9px] font-black">MEMBER</div>
                  </div>
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
                    placeholder="Search by client, email or specific service..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-white border border-gray-100 rounded-[2.2rem] py-6 pl-16 pr-8 focus:ring-1 focus:ring-black outline-none transition-all shadow-sm text-sm"
                  />
                </div>
                <button className="flex items-center justify-center gap-3 px-10 py-6 bg-white border border-gray-100 rounded-[2.2rem] text-gray-500 font-bold text-[11px] uppercase tracking-widest hover:text-black hover:border-black transition-all shadow-sm">
                  <Filter size={18} />
                  Filters
                </button>
              </div>

              {/* Data Visualization / List */}
              <div className="grid grid-cols-1 gap-6 pb-24">
                {filteredLeads.map((lead, idx) => (
                  <div 
                    key={lead.id} 
                    className="bg-white border border-gray-50 rounded-[3.2rem] p-10 hover:shadow-2xl hover:shadow-black/5 transition-all duration-700 flex flex-col md:flex-row items-center justify-between gap-10 group"
                    style={{ animationDelay: `${idx * 100}ms` }}
                  >
                    <div className="flex items-center gap-8 flex-grow">
                      <div className="w-16 h-16 bg-black text-white rounded-[1.6rem] flex items-center justify-center font-bold text-2xl group-hover:scale-105 transition-transform duration-500">
                        {lead.name.charAt(0)}
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-4">
                          <h3 className="font-bold text-xl text-[#0B0B0B] tracking-tight">{lead.name}</h3>
                          <span className={`text-[9px] font-black uppercase tracking-[0.2em] border rounded-full px-4 py-1.5 flex items-center gap-2 ${getStatusColor(lead.status)}`}>
                            {lead.status.replace('_', ' ')}
                          </span>
                        </div>
                        <p className="text-[#6B7280] text-sm font-medium tracking-tight">
                          {lead.service} <span className="mx-2 text-gray-200">•</span> {lead.email}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-16 text-right w-full md:w-auto justify-between md:justify-end">
                      
                      {/* ASSIGNMENT (Admin Only) */}
                      {isAdmin && (
                        <div className="text-left min-w-[160px]">
                          <div className="text-[10px] font-bold text-gray-300 uppercase tracking-widest mb-3 flex items-center gap-2">
                            <UserCheck size={12} />
                            Assign Expert
                          </div>
                          <select 
                            value={lead.assignedTo || 'unassigned'}
                            onChange={(e) => assignLead(lead.id, e.target.value)}
                            className="w-full p-4 bg-gray-50 border-none rounded-2xl text-[10px] font-bold uppercase tracking-widest focus:ring-1 focus:ring-black outline-none transition-all cursor-pointer appearance-none text-gray-500 hover:bg-gray-100"
                          >
                            <option value="unassigned">-- Select Employee --</option>
                            {globalUsers.filter(u => u.role !== 'HEAD_ADMIN').map(user => (
                              <option key={user.id} value={user.id}>{user.name}</option>
                            ))}
                          </select>
                        </div>
                      )}

                      {!isAdmin && lead.assignedTo && (
                        <div className="text-left">
                           <div className="text-[10px] font-bold text-gray-300 uppercase tracking-widest mb-3">Responsible</div>
                           <div className="text-sm font-bold text-black uppercase tracking-tight">
                             {globalUsers.find(u => u.id === lead.assignedTo)?.name || 'Processing Team'}
                           </div>
                        </div>
                      )}

                      <div className="hidden lg:block text-center">
                        <div className="text-[10px] font-bold text-gray-300 uppercase tracking-widest mb-3">Timestamp</div>
                        <div className="text-sm font-bold text-[#0B0B0B]">
                          {new Date(lead.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}, {new Date(lead.createdAt).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>

                      <div className="flex flex-col items-center gap-2">
                        <select 
                          value={lead.status}
                          onChange={(e) => updateStatus(lead.id, e.target.value as LeadStatus)}
                          className="p-4 bg-gray-50 border-none rounded-2xl text-[10px] font-bold uppercase tracking-widest focus:ring-1 focus:ring-black outline-none transition-all cursor-pointer appearance-none font-black text-[#0B0B0B]"
                        >
                          <option value="NEW">NEW</option>
                          <option value="IN_PROGRESS">IN PROGRESS</option>
                          <option value="COMPLETED">COMPLETED</option>
                          <option value="CANCELLED">CANCELLED</option>
                        </select>
                      </div>

                      <button className="w-20 h-20 rounded-full bg-black text-white flex items-center justify-center hover:scale-110 transition-all shadow-2xl shadow-black/10 flex-shrink-0 group-hover:bg-[#111]">
                        <ChevronRight size={26} />
                      </button>
                    </div>
                  </div>
                ))}
                
                {filteredLeads.length === 0 && (
                  <div className="py-40 text-center bg-white rounded-[4rem] border border-dashed border-gray-100">
                    <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-10">
                       <LayoutDashboard className="text-gray-200" size={40} />
                    </div>
                    <h3 className="text-2xl font-bold text-[#0B0B0B]">No leads currently in queue</h3>
                    <p className="text-gray-400 mt-3 font-medium">New customer inquiries will appear here automatically.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 pb-24 animate-in fade-in slide-in-from-bottom-6 duration-700">
              {globalUsers.map((user, idx) => (
                <div 
                  key={user.id} 
                  className="bg-white p-12 border border-gray-50 rounded-[4.2rem] shadow-sm hover:border-black transition-all duration-700 group relative overflow-hidden"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <div className="flex items-center gap-8 mb-14">
                    <div className="w-20 h-20 bg-black text-white rounded-[1.8rem] flex items-center justify-center font-bold text-3xl group-hover:scale-105 transition-transform duration-500 shadow-xl shadow-black/5">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-bold text-2xl tracking-tight leading-none mb-3">{user.name}</h3>
                      <div className="text-[10px] font-black text-gray-400 uppercase tracking-[0.25em]">{user.role.replace('_', ' ')}</div>
                    </div>
                  </div>
                  <div className="space-y-10 mb-14">
                    <div className="flex flex-col gap-2.5">
                      <span className="text-gray-300 font-black uppercase tracking-widest text-[9px]">Professional Email</span>
                      <span className="font-bold text-[#0B0B0B] truncate text-base tracking-tight">{user.email}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300 font-black uppercase tracking-widest text-[9px]">Status</span>
                      <span className="text-[#10B981] font-black uppercase tracking-widest text-[9px] flex items-center gap-2.5 bg-[#10B981]/5 px-4 py-2 rounded-full border border-[#10B981]/10">
                        <div className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                        Online Now
                      </span>
                    </div>
                  </div>
                  <div className="pt-10 border-t border-gray-50 flex justify-between items-center">
                     <button className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-black transition-colors hover:underline underline-offset-8">Full Profile</button>
                     {currentUser.role === 'HEAD_ADMIN' && user.id !== currentUser.id && (
                        <button 
                          onClick={() => onRemoveUser(user.id)}
                          className="text-[10px] font-black uppercase tracking-widest text-red-500 hover:scale-105 transition-all flex items-center gap-2.5 px-4 py-2 hover:bg-red-50 rounded-xl"
                        >
                          <ShieldAlert size={14} />
                          Revoke Access
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
