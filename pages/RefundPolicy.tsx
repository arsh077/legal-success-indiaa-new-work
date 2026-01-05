
import React from 'react';

const RefundPolicy: React.FC = () => {
  return (
    <div className="animate-in fade-in duration-1000 py-24 px-6 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* HERO SECTION */}
        <div className="mb-24">
          <div className="inline-block px-3 py-1 bg-[#F9FAFB] text-[10px] font-bold uppercase tracking-widest text-[#6B7280] mb-8 rounded-full border border-gray-100">Customer Support</div>
          <h1 className="text-5xl md:text-8xl font-bold tracking-tighter mb-6 text-[#0B0B0B]">Refund & <br />Cancellation.</h1>
          <p className="text-xl text-[#6B7280] leading-relaxed max-w-2xl">
            Our approach to fair and transparent service handling.
          </p>
        </div>

        <div className="space-y-20 text-[#6B7280] leading-relaxed">
          
          {/* SECTION 1: Introduction */}
          <section className="animate-in slide-in-from-bottom-4 duration-700">
            <h2 className="text-2xl font-bold text-[#0B0B0B] mb-6 tracking-tight">1. Introduction</h2>
            <p>
              Legal Success India (“LSI”) understands that situations may arise where clients need to cancel services or request a refund. This policy outlines the terms under which refunds and cancellations are handled in a transparent and fair manner.
            </p>
          </section>

          {/* SECTION 2: Refund Policy */}
          <section className="animate-in slide-in-from-bottom-4 duration-700">
            <h2 className="text-2xl font-bold text-[#0B0B0B] mb-6 tracking-tight">2. Refund Policy</h2>
            <div className="bg-[#F9FAFB] p-10 rounded-[2rem] border border-gray-100 space-y-6">
              <ul className="space-y-4 list-none pl-0">
                <li className="flex items-start gap-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-black mt-2.5 flex-shrink-0"></div>
                  <p>A full refund will be issued if no work has been initiated or completed.</p>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-black mt-2.5 flex-shrink-0"></div>
                  <p>Refund requests must be submitted within 15 working days from the date of payment.</p>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-black mt-2.5 flex-shrink-0"></div>
                  <p>Refunds will be processed using the original payment method.</p>
                </li>
              </ul>
            </div>
          </section>

          {/* SECTION 3: Cancellation Policy */}
          <section className="animate-in slide-in-from-bottom-4 duration-700">
            <h2 className="text-2xl font-bold text-[#0B0B0B] mb-6 tracking-tight">3. Cancellation Policy</h2>
            <div className="space-y-6">
              <p>Clients may cancel services at any time. The following conditions apply:</p>
              <ul className="space-y-4 list-none pl-0">
                <li className="flex items-start gap-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-300 mt-2.5 flex-shrink-0"></div>
                  <p>A full refund will be provided if cancellation is requested before any work has begun.</p>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-300 mt-2.5 flex-shrink-0"></div>
                  <p>A partial refund may be considered if work has started but is not yet completed, based on the extent of work performed.</p>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-300 mt-2.5 flex-shrink-0"></div>
                  <p>No refunds will be issued once the service has been fully completed.</p>
                </li>
              </ul>
            </div>
          </section>

          {/* SECTION 4: How to Request */}
          <section className="animate-in slide-in-from-bottom-4 duration-700">
            <h2 className="text-2xl font-bold text-[#0B0B0B] mb-6 tracking-tight">4. How to Request a Refund or Cancellation</h2>
            <p className="mb-8">Clients may request a refund or cancellation by contacting our support team with clear communication of the request details.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-8 border border-gray-100 rounded-3xl">
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#6B7280] mb-4">Phone Support</h4>
                <p className="text-[#0B0B0B] font-bold">+91 90072 99384</p>
                <p className="text-[#0B0B0B] font-bold">+91 62906 34766</p>
              </div>
              <div className="p-8 border border-gray-100 rounded-3xl">
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#6B7280] mb-4">Email Support</h4>
                <p className="text-[#0B0B0B] font-bold">info@legalsuccessindia.com</p>
              </div>
            </div>
          </section>

          {/* SECTION 5: Processing Timeline */}
          <section className="animate-in slide-in-from-bottom-4 duration-700">
            <h2 className="text-2xl font-bold text-[#0B0B0B] mb-6 tracking-tight">5. Refund Processing Timeline</h2>
            <p>Approved refunds will be processed within <span className="text-[#0B0B0B] font-bold">15 working days</span> from the date of request. Refunds will be credited back to the original payment method used during the transaction.</p>
          </section>

          {/* SECTION 6: Policy Updates */}
          <section className="animate-in slide-in-from-bottom-4 duration-700">
            <h2 className="text-2xl font-bold text-[#0B0B0B] mb-6 tracking-tight">6. Policy Updates</h2>
            <p>Legal Success India reserves the right to modify or update this Refund & Cancellation Policy at any time without prior notice. Users are encouraged to review this page periodically to stay informed.</p>
          </section>

          {/* SECTION 7: Acceptance */}
          <section className="animate-in slide-in-from-bottom-4 duration-700 bg-black text-white p-12 rounded-[3rem] text-center">
            <h2 className="text-2xl font-bold mb-4 tracking-tight">Acceptance of Policy</h2>
            <p className="text-gray-400">
              By engaging with our services, users acknowledge that they have read, understood, and agreed to this Refund & Cancellation Policy.
            </p>
          </section>

        </div>

        {/* FOOTER DISCLAIMER */}
        <div className="mt-32 pt-16 border-t border-gray-100 text-center">
           <p className="text-[10px] font-medium text-[#6B7280] max-w-2xl mx-auto leading-relaxed uppercase tracking-widest">
            Legal Success India is an independent consultancy and not a government entity. Information provided is for informational purposes only and does not constitute legal advice.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicy;
