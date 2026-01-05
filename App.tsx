
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import ServicesOverview from './pages/ServicesOverview';
import ServiceDetail from './pages/ServiceDetail';
import Pricing from './pages/Pricing';
import Contact from './pages/Contact';
import ApplicationLicense from './pages/ApplicationLicense';
import ApplicationRenewal from './pages/ApplicationRenewal';
import Disclaimer from './pages/Disclaimer';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import RefundPolicy from './pages/RefundPolicy';
import Compliance from './pages/Compliance';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ThankYou from './pages/ThankYou';
import { Lead, User } from './types';
import { MOCK_LEADS, MOCK_USERS } from './constants';

const App: React.FC = () => {
  // Global Leads State - Persisted in LocalStorage
  const [leads, setLeads] = useState<Lead[]>(() => {
    const saved = localStorage.getItem('lsi_leads');
    return saved ? JSON.parse(saved) : MOCK_LEADS;
  });

  // Global Users State - Persisted in LocalStorage
  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('lsi_users');
    return saved ? JSON.parse(saved) : MOCK_USERS;
  });

  useEffect(() => {
    localStorage.setItem('lsi_leads', JSON.stringify(leads));
  }, [leads]);

  useEffect(() => {
    localStorage.setItem('lsi_users', JSON.stringify(users));
  }, [users]);

  const addLead = (newLead: Omit<Lead, 'id' | 'status' | 'createdAt' | 'updatedAt'>) => {
    const lead: Lead = {
      ...newLead,
      id: `l-${Date.now()}`,
      status: 'NEW',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setLeads(prev => [lead, ...prev]);
  };

  const updateLead = (updatedLead: Lead) => {
    setLeads(prev => prev.map(l => l.id === updatedLead.id ? updatedLead : l));
  };

  const addUser = (newUser: Omit<User, 'id'>) => {
    const user: User = {
      ...newUser,
      id: `u-${Date.now()}`,
    };
    setUsers(prev => [...prev, user]);
  };

  const removeUser = (userId: string) => {
    if (confirm("Are you sure you want to revoke access? This user will be removed from the system.")) {
      setUsers(prev => prev.filter(u => u.id !== userId));
      // Unassign leads from this user to prevent orphaned assignments
      setLeads(prev => prev.map(l => l.assignedTo === userId ? { ...l, assignedTo: undefined } : l));
    }
  };

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home onFormSubmit={addLead} />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<ServicesOverview />} />
          <Route path="/services/:id" element={<ServiceDetail />} />
          <Route path="/apply-license" element={<ApplicationLicense onFormSubmit={addLead} />} />
          <Route path="/renew-license" element={<ApplicationRenewal onFormSubmit={addLead} />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/contact" element={<Contact onFormSubmit={addLead} />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
          <Route path="/compliance" element={<Compliance />} />
          <Route path="/login" element={<Login />} />
          <Route path="/thank-you" element={<ThankYou />} />
          <Route 
            path="/dashboard" 
            element={
              <Dashboard 
                globalLeads={leads} 
                onUpdateLead={updateLead} 
                globalUsers={users}
                onAddUser={addUser}
                onRemoveUser={removeUser}
              />
            } 
          />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
