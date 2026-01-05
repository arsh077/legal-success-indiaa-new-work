
export interface Service {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  purpose: string[];
  process: string[];
  benefits: string[];
  price: string;
  icon: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export type UserRole = 'HEAD_ADMIN' | 'ADMIN' | 'EMPLOYEE';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  password?: string; // Only for mock purposes
}

export type LeadStatus = 'NEW' | 'CONTACTED' | 'IN_PROGRESS' | 'DOCUMENTATION' | 'COMPLETED' | 'CANCELLED';

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  status: LeadStatus;
  assignedTo?: string; // User ID
  createdAt: string;
  updatedAt: string;
  notes?: string;
}
