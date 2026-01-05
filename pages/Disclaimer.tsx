
import React from 'react';

const Disclaimer: React.FC = () => {
  return (
    <div className="animate-in fade-in duration-1000 py-24 px-6 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="inline-block px-3 py-1 bg-[#F9FAFB] text-[10px] font-bold uppercase tracking-widest text-[#6B7280] mb-8 rounded-full border border-gray-100">Official Notice</div>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-16 text-[#0B0B0B]">Disclaimer</h1>
        
        <div className="prose prose-lg text-[#6B7280] leading-relaxed space-y-8">
          <p className="text-xl text-[#0B0B0B] font-medium">
            Legal Success India is an independent third-party consultancy. We are not affiliated with, associated with, or endorsed by any government authority, agency, or department.
          </p>
          
          <p>
            The information, products, and services displayed on this website may include offerings promoted or supported by third-party service providers. Legal Success India does not manufacture, control, or guarantee the quality, accuracy, or effectiveness of any third-party products or services. Users are advised to conduct their own research and exercise discretion before engaging with any product or service.
          </p>

          <p>
            While we provide information and guidance related to government registrations, documentation, and compliance requirements, we do not directly issue licenses or approvals. All information available on this website is provided strictly for informational purposes only and does not constitute legal advice.
          </p>

          <p>
            Legal Success India does not guarantee the accuracy, completeness, or outcomes of any application or service. Government processing timelines, approvals, and decisions are outside our control and may vary.
          </p>

          <div className="bg-[#F9FAFB] p-10 rounded-[2rem] border border-gray-100">
            <h3 className="text-[#0B0B0B] font-bold mb-6">By submitting your information through this website, you acknowledge and agree that:</h3>
            <ul className="space-y-4 list-none pl-0">
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-black mt-2 flex-shrink-0"></div>
                <span>You are doing so voluntarily and at your own risk.</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-black mt-2 flex-shrink-0"></div>
                <span>You have read and understood our Terms & Conditions and Privacy Policy.</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-black mt-2 flex-shrink-0"></div>
                <span>Final legal responsibility rests with the user.</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-black mt-2 flex-shrink-0"></div>
                <span>Estimated timelines, where mentioned, are indicative only and subject to change based on government processing and document verification.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Disclaimer;
