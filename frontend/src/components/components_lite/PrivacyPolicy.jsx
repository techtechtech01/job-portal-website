import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { ShieldCheck, FileText, Mail, Phone, MapPin } from 'lucide-react'

const PrivacyPolicy = () => {
  const sections = [
    {
      title: '1. Introduction',
      content: (
        <p>
          Welcome to <span className='font-semibold text-blue-600'>JobPortal</span>. Your
          privacy is important to us. This Privacy Policy explains how we collect, use,
          disclose, and safeguard your information when you visit our website or use our
          services. Please read this policy carefully. By accessing or using our platform,
          you acknowledge that you have read, understood, and agree to be bound by the
          terms of this Privacy Policy.
        </p>
      ),
    },
    {
      title: '2. Information We Collect',
      content: (
        <div className='space-y-3'>
          <p>
            We collect information that you provide directly to us and information that is
            collected automatically when you use our services.
          </p>
          <ul className='list-disc pl-6 space-y-2 text-gray-600'>
            <li>
              <span className='font-medium text-gray-800'>Personal Information:</span>{' '}
              Name, email address, phone number, and account credentials when you register
              or create a profile.
            </li>
            <li>
              <span className='font-medium text-gray-800'>Professional Information:</span>{' '}
              Resume, skills, work experience, education, and other details you provide to
              build your professional profile.
            </li>
            <li>
              <span className='font-medium text-gray-800'>Usage Data:</span> Information
              about how you interact with our website, such as pages visited, search
              queries, and time spent on the platform.
            </li>
            <li>
              <span className='font-medium text-gray-800'>Device Information:</span> IP
              address, browser type, operating system, and device identifiers.
            </li>
          </ul>
        </div>
      ),
    },
    {
      title: '3. How We Use Your Information',
      content: (
        <div className='space-y-3'>
          <p>
            We use the information we collect to provide, maintain, and improve our
            services, including:
          </p>
          <ul className='list-disc pl-6 space-y-2 text-gray-600'>
            <li>Creating and managing your account and professional profile.</li>
            <li>Matching you with relevant job opportunities and connecting you with employers.</li>
            <li>Personalizing your experience and recommending jobs based on your preferences.</li>
            <li>Processing job applications and facilitating communication between candidates and employers.</li>
            <li>Improving our website, services, and user experience.</li>
            <li>Sending you important notifications, updates, and marketing communications (with your consent).</li>
            <li>Ensuring the security and integrity of our platform.</li>
          </ul>
        </div>
      ),
    },
    {
      title: '4. Cookies and Tracking Technologies',
      content: (
        <div className='space-y-3'>
          <p>
            We use cookies and similar tracking technologies to enhance your browsing
            experience, analyze usage patterns, and personalize content. These
            technologies may include:
          </p>
          <ul className='list-disc pl-6 space-y-2 text-gray-600'>
            <li>
              <span className='font-medium text-gray-800'>Essential Cookies:</span> Required
              for the basic functionality of our website, such as keeping you logged in.
            </li>
            <li>
              <span className='font-medium text-gray-800'>Analytics Cookies:</span> Help us
              understand how visitors interact with our site so we can improve it.
            </li>
            <li>
              <span className='font-medium text-gray-800'>Preference Cookies:</span> Remember
              your settings and choices to provide a personalized experience.
            </li>
          </ul>
          <p>
            You can control and manage cookies through your browser settings. However,
            disabling certain cookies may affect the functionality of our website.
          </p>
        </div>
      ),
    },
    {
      title: '5. How We Share Your Information',
      content: (
        <div className='space-y-3'>
          <p>
            We do not sell your personal information. We may share your information in the
            following circumstances:
          </p>
          <ul className='list-disc pl-6 space-y-2 text-gray-600'>
            <li>
              <span className='font-medium text-gray-800'>With Employers:</span> When you
              apply for a job, your professional profile and application materials are
              shared with the relevant employer.
            </li>
            <li>
              <span className='font-medium text-gray-800'>With Service Providers:</span> We
              share information with trusted third-party vendors who assist us in operating
              our website, such as hosting, analytics, and customer support providers.
            </li>
            <li>
              <span className='font-medium text-gray-800'>Legal Compliance:</span> We may
              disclose information when required by law, regulation, or legal process, or
              to protect the rights and safety of our users and the public.
            </li>
          </ul>
        </div>
      ),
    },
    {
      title: '6. Data Security',
      content: (
        <p>
          We take reasonable and appropriate measures to protect your personal information
          from unauthorized access, alteration, disclosure, or destruction. We use
          encryption, secure server technology, and access controls to safeguard your data.
          However, no method of transmission over the internet or electronic storage is
          completely secure, and we cannot guarantee its absolute security.
        </p>
      ),
    },
    {
      title: '7. Your Rights and Choices',
      content: (
        <div className='space-y-3'>
          <p>
            Depending on your location, you may have certain rights regarding your personal
            information, including:
          </p>
          <ul className='list-disc pl-6 space-y-2 text-gray-600'>
            <li>
              <span className='font-medium text-gray-800'>Access:</span> Request a copy of
              the personal information we hold about you.
            </li>
            <li>
              <span className='font-medium text-gray-800'>Correction:</span> Update or
              correct inaccurate or incomplete information.
            </li>
            <li>
              <span className='font-medium text-gray-800'>Deletion:</span> Request the
              deletion of your personal information.
            </li>
            <li>
              <span className='font-medium text-gray-800'>Opt-Out:</span> Object to or
              restrict certain processing activities, including marketing communications.
            </li>
          </ul>
          <p>
            To exercise any of these rights, please contact us using the information
            provided below. We will respond to your request within a reasonable timeframe.
          </p>
        </div>
      ),
    },
    {
      title: '8. Third-Party Links',
      content: (
        <p>
          Our website may contain links to third-party websites or services that are not
          operated by us. We are not responsible for the privacy practices of these
          external sites. We encourage you to review the privacy policies of any third-party
          websites you visit.
        </p>
      ),
    },
    {
      title: '9. Children\'s Privacy',
      content: (
        <p>
          Our services are not directed to individuals under the age of 16. We do not
          knowingly collect personal information from children. If you believe that a child
          has provided us with personal information, please contact us, and we will take
          steps to remove such information and terminate the child's account if necessary.
        </p>
      ),
    },
    {
      title: '10. Changes to This Privacy Policy',
      content: (
        <p>
          We may update this Privacy Policy from time to time to reflect changes in our
          practices or legal requirements. We will notify you of any material changes by
          posting the updated policy on this page and updating the "Last Updated"
          date below. We encourage you to review this policy periodically.
        </p>
      ),
    },
    {
      title: '11. Contact Us',
      content: (
        <div className='space-y-3'>
          <p>
            If you have any questions, concerns, or requests regarding this Privacy Policy
            or our privacy practices, please contact us at:
          </p>
          <div className='space-y-2 text-gray-600'>
            <p className='flex items-center gap-2'>
              <Mail size={16} className='text-blue-500' />
              support@jobportal.com
            </p>
            <p className='flex items-center gap-2'>
              <Phone size={16} className='text-blue-500' />
              +1 (555) 123-4567
            </p>
            <p className='flex items-center gap-2'>
              <MapPin size={16} className='text-blue-500' />
              New York, USA
            </p>
          </div>
        </div>
      ),
    },
  ]

  return (
    <div>
      <Navbar />
      <div className='bg-gray-50 min-h-screen'>
        {/* Header section */}
        <div className='bg-white border-b border-gray-100'>
          <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
            <div className='flex items-center gap-3 mb-4'>
              <div className='flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600'>
                <ShieldCheck size={24} />
              </div>
              <span className='text-sm font-medium text-blue-600 uppercase tracking-wider'>
                Legal Information
              </span>
            </div>
            <h1 className='text-4xl font-bold text-gray-900 mb-3'>Privacy Policy</h1>
            <p className='text-gray-600 text-lg'>
              Your privacy matters to us. Learn how JobPortal collects, uses, and protects
              your personal information.
            </p>
            <p className='text-sm text-gray-400 mt-4'>
              Last Updated: January 2025
            </p>
          </div>
        </div>

        {/* Content sections */}
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
          <div className='space-y-6'>
            {sections.map((section) => (
              <div
                key={section.title}
                className='bg-white rounded-xl border border-gray-100 shadow-sm p-6 sm:p-8'
              >
                <h2 className='text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2'>
                  <FileText size={18} className='text-blue-500' />
                  {section.title}
                </h2>
                <div className='text-gray-600 leading-relaxed'>{section.content}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default PrivacyPolicy
