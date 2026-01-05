
import React from 'react';

const Terms: React.FC = () => {
  return (
    <div className="animate-in fade-in duration-1000 py-24 px-6 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="inline-block px-3 py-1 bg-[#F9FAFB] text-[10px] font-bold uppercase tracking-widest text-[#6B7280] mb-8 rounded-full border border-gray-100">Legal Agreement</div>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-16 text-[#0B0B0B]">Terms & Conditions</h1>
        
        <div className="space-y-16 text-[#6B7280] leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-[#0B0B0B] mb-6">1. Business Information</h2>
            <p className="text-lg">
              Legal Success India<br />
              22/1 Mominpore Road<br />
              Kolkata – 700023, India
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#0B0B0B] mb-6">2. Scope of Services</h2>
            <p>
              Legal Success India (“LSI”) is an independent consultancy providing informational support, documentation assistance, and compliance guidance related to legal and regulatory services. We do not represent any government agency and do not directly process or issue government licenses or approvals.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#0B0B0B] mb-6">3. Payments</h2>
            <p>All payments for services must be made in full before commencement of work unless otherwise agreed in writing.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#0B0B0B] mb-6">4. Refund & Cancellation Policy</h2>
            <ul className="space-y-4 list-disc pl-5">
              <li>If no work has been initiated, a full refund may be issued within 15 working days from the date of payment.</li>
              <li>Once work has commenced, refunds are subject to evaluation and are not guaranteed.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#0B0B0B] mb-6">5. Privacy & Data Protection</h2>
            <p>
              Legal Success India is committed to protecting your privacy. Personal information collected through our website, services, or advertising platforms is handled in accordance with our Privacy Policy. We do not sell or misuse personal data and take reasonable measures to safeguard user information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#0B0B0B] mb-6">6. Disclaimer & Limitation of Liability</h2>
            <p>
              While we strive to provide accurate and updated information, Legal Success India makes no warranties regarding the completeness, reliability, or accuracy of any content. Use of our website and services is at your own risk. Legal Success India shall not be liable for any direct, indirect, incidental, consequential, or special damages arising from the use of our services or reliance on provided information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#0B0B0B] mb-6">7. Support & Contact</h2>
            <p className="mb-4">For inquiries or support, you may contact us at:</p>
            <div className="space-y-2">
               <p><span className="font-bold text-[#0B0B0B]">Phone:</span> +91 90072 99384, +91 62906 34766</p>
               <p><span className="font-bold text-[#0B0B0B]">Email:</span> info@legalsuccessindia.com</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#0B0B0B] mb-6">8. Governing Law</h2>
            <p>These Terms & Conditions shall be governed and interpreted in accordance with the laws of India.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#0B0B0B] mb-6">9. Updates to Terms</h2>
            <p>Legal Success India reserves the right to modify or update these Terms & Conditions at any time without prior notice. Users are responsible for reviewing them periodically.</p>
          </section>

          <section className="bg-black text-white p-12 rounded-[3rem]">
            <h2 className="text-2xl font-bold mb-6">Acceptance</h2>
            <p className="font-medium text-gray-400">
              By using this website or our services, you acknowledge that you have read, understood, and agreed to these Terms & Conditions.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Terms;
