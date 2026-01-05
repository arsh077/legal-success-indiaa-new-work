
import { Service, Testimonial, NavItem, User, Lead } from './types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Compliance', href: '/compliance' },
  { label: 'Contact', href: '/contact' },
];

export const APP_LINKS = [
  { label: 'FSSAI License', href: '/apply-license' },
  { label: 'FSSAI Renewal', href: '/renew-license' },
];

export const MOCK_USERS: User[] = [
  { id: 'u1', name: 'Arshed Anwar', email: 'arshed@legalsuccess.in', role: 'HEAD_ADMIN' },
  { id: 'u2', name: 'Azsed Anwar', email: 'azsed@legalsuccess.in', role: 'ADMIN' },
  { id: 'u3', name: 'Siddharth Roy', email: 'siddharth@legalsuccess.in', role: 'EMPLOYEE' },
  { id: 'u4', name: 'Priya Das', email: 'priya@legalsuccess.in', role: 'EMPLOYEE' },
];

export const MOCK_LEADS: Lead[] = [
  { 
    id: 'l1', 
    name: 'Rajesh Kumar', 
    email: 'rajesh@example.com', 
    phone: '9876543210', 
    service: 'FSSAI License', 
    status: 'NEW', 
    createdAt: '2024-03-20T10:00:00Z',
    updatedAt: '2024-03-20T10:00:00Z'
  },
  { 
    id: 'l2', 
    name: 'Sunita Mehra', 
    email: 'sunita@hotel.com', 
    phone: '9123456789', 
    service: 'FSSAI Renewal', 
    status: 'IN_PROGRESS', 
    assignedTo: 'u3',
    createdAt: '2024-03-18T14:30:00Z',
    updatedAt: '2024-03-19T09:15:00Z'
  },
  { 
    id: 'l3', 
    name: 'Tiffin Box Services', 
    email: 'orders@tiffin.com', 
    phone: '8877665544', 
    service: 'FSSAI License', 
    status: 'COMPLETED', 
    assignedTo: 'u4',
    createdAt: '2024-03-10T11:00:00Z',
    updatedAt: '2024-03-15T16:00:00Z'
  }
];

export const SERVICES: Service[] = [
  {
    id: 'fssai-license',
    title: 'FSSAI Licensing',
    shortDesc: 'End-to-end food safety registration for manufacturers, restaurants, cloud kitchens, and distributors.',
    fullDesc: 'The Food Safety and Standards Authority of India (FSSAI) is a mandatory requirement for any food business operator in India. We navigate the bureaucracy so you can focus on your kitchen.',
    purpose: [
      'Legal compliance for food startups',
      'Trust and quality assurance for customers',
      'Eligibility for government tenders and corporate orders'
    ],
    process: [
      'Eligibility Check: Determining Basic, State, or Central license.',
      'Document Submission: ID proof, layout plans, and water reports.',
      'Application Filing: Submission on the FoSCoS portal.',
      'Inspection Support: Guidance through site visits (if required).',
      'Issuance: Soft copy of the FSSAI license is granted.'
    ],
    benefits: [
      'Legal Requirement',
      'Ensures Food Safety and Hygiene',
      'Builds Customer Trust',
      'Enables Online Selling',
      'Supports Business Growth',
      'Protection Against Penalties',
      'Promotes Clean Food Practices'
    ],
    price: 'From ₹1,999',
    icon: 'ShieldCheck'
  },
  {
    id: 'fssai-renewal',
    title: 'FSSAI Renewal',
    shortDesc: 'Timely renewals and compliance tracking so your license never becomes a business risk.',
    fullDesc: 'FSSAI licenses expire after 1 to 5 years. Renewal must be filed 30 days before the expiry date to avoid heavy penalties. We handle the tracking for you.',
    purpose: ['Maintaining continuity of business', 'Avoiding late fees', 'Updating business details'],
    process: [
      'Consultation and existing license review',
      'Updating business info if required',
      'Document review and renewal filing',
      'Application monitoring and tracking',
      'Delivery of renewed certificate'
    ],
    benefits: ['Avoid late fees and penalties', 'Maintain uninterrupted operations', 'Protect brand credibility'],
    price: 'From ₹1,499',
    icon: 'RefreshCw'
  },
  {
    id: 'copywriting',
    title: 'Legal & Regulatory Copywriting',
    shortDesc: 'Clear, compliant drafting for policies, agreements, and mandatory disclosures.',
    fullDesc: 'Our expert team crafts legal documents that are not only legally sound but also actually understandable for your customers and partners.',
    purpose: ['Contract Drafting', 'Terms & Conditions', 'Privacy Policies'],
    process: [
      'Requirements Gathering',
      'Drafting Stage',
      'Client Review',
      'Final Polish'
    ],
    benefits: ['Clear Communication', 'Reduced Legal Risk', 'Professional Edge'],
    price: 'Custom Quote',
    icon: 'FileText'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Anjali Sharma',
    role: 'CEO, FreshBites',
    content: 'Legal Success India handled our FSSAI registration smoothly. What usually takes weeks of back-and-forth was completed without constant follow-ups.'
  },
  {
    id: '2',
    name: 'Vikram Mehta',
    role: 'Founder, TechLogix',
    content: 'Their legal drafting was clear, compliant, and easy to understand. No unnecessary jargon, just exactly what our platform needed.'
  },
  {
    id: '3',
    name: 'Rohan Gupta',
    role: 'Director, RG Foods',
    content: 'They proactively managed our renewal well before the deadline. We never had to worry about tracking the dates ourselves.'
  }
];
