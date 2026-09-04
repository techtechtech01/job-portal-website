import React, { useState } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Search,
  HelpCircle,
  User,
  Briefcase,
  Building2,
  FileText,
  CreditCard,
  ChevronDown,
  ChevronUp,
  Mail,
  Phone,
  MessageCircle,
} from 'lucide-react'

const HelpCenter = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [openFaq, setOpenFaq] = useState(null)

  const categories = [
    {
      icon: <User size={24} />,
      title: 'Account & Profile',
      description: 'Manage your account settings, profile information, and login preferences.',
    },
    {
      icon: <Briefcase size={24} />,
      title: 'Job Searching',
      description: 'Tips and guidance for finding and applying to your dream job.',
    },
    {
      icon: <Building2 size={24} />,
      title: 'For Employers',
      description: 'Post jobs, manage applications, and connect with top talent.',
    },
    {
      icon: <FileText size={24} />,
      title: 'Resumes & Applications',
      description: 'Create effective resumes and track your job applications.',
    },
    {
      icon: <CreditCard size={24} />,
      title: 'Billing & Payments',
      description: 'Manage subscriptions, invoices, and payment methods.',
    },
    {
      icon: <HelpCircle size={24} />,
      title: 'Technical Support',
      description: 'Resolve technical issues with the platform, login problems, or bug reports.',
    },
  ]

  const faqs = [
    {
      question: 'How do I create an account?',
      answer:
        'To create an account, click the "Register" button in the top navigation bar. Fill in your name, email address, and create a secure password. Once registered, you can build your professional profile and start browsing jobs immediately.',
    },
    {
      question: 'How do I apply for a job?',
      answer:
        'Browse or search for jobs that match your skills and interests. When you find a position you like, click on it to view the full details, then click the "Apply" button. You can upload your resume and customize your application before submitting.',
    },
    {
      question: 'How do I upload or update my resume?',
      answer:
        'Go to your profile page and navigate to the "Resume" section. You can upload a new resume file (PDF, DOC, or DOCX format) or edit your existing resume details. Make sure to keep your resume up to date for the best results.',
    },
    {
      question: 'How do I reset my password?',
      answer:
        'On the login page, click the "Forgot Password" link. Enter the email address associated with your account, and we will send you a secure link to reset your password. Follow the instructions in the email to create a new password.',
    },
    {
      question: 'How can employers contact me?',
      answer:
        'When you apply for a job, your contact information and profile are shared with the employer. You may be contacted via email or phone for interviews. You can also manage your communication preferences in your account settings.',
    },
    {
      question: 'Is my personal information secure?',
      answer:
        'Yes. We take data security very seriously and use encryption, secure server technology, and access controls to protect your information. Please refer to our Privacy Policy for more details about how we handle your data.',
    },
    {
      question: 'How do I delete my account?',
      answer:
        'To delete your account, go to your account settings and select "Delete Account." Please note that this action is permanent and will remove your profile, applications, and resume data. If you need assistance, contact our support team.',
    },
    {
      question: 'How do I report a problem or bug?',
      answer:
        'If you encounter any issues while using the platform, please contact our technical support team through the contact information below. Include a detailed description of the problem, any error messages, and the steps you took so we can resolve it quickly.',
    },
  ]

  const filteredFaqs = faqs.filter((faq) =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  const popularTopics = [
    'Creating an account',
    'Applying for jobs',
    'Uploading a resume',
    'Resetting password',
    'Posting a job',
    'Contacting support',
  ]

  return (
    <div>
      <Navbar />
      <div className='bg-gray-50 min-h-screen'>
        {/* Hero / Search section */}
        <div className='bg-linear-to-r from-blue-600 to-blue-500 text-white'>
          <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center'>
            <div className='flex items-center justify-center gap-3 mb-4'>
              <div className='flex h-12 w-12 items-center justify-center rounded-full bg-white/20'>
                <HelpCircle size={24} />
              </div>
            </div>
            <h1 className='text-4xl font-bold mb-3'>How can we help you?</h1>
            <p className='text-blue-100 text-lg mb-8'>
              Search our help center for answers to common questions or explore categories below.
            </p>
            <div className='relative max-w-2xl mx-auto'>
              <Search className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400' size={20} />
              <Input
                type='text'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder='Search for help articles, FAQs...'
                className='pl-12 py-6 rounded-full bg-white text-gray-800 border-none shadow-lg placeholder:text-gray-400'
              />
            </div>
            <div className='flex flex-wrap items-center justify-center gap-2 mt-6'>
              <span className='text-sm text-blue-100 mr-1'>Popular:</span>
              {popularTopics.map((topic) => (
                <button
                  key={topic}
                  onClick={() => setSearchTerm(topic)}
                  className='text-sm bg-white/20 hover:bg-white/30 transition-colors px-3 py-1 rounded-full'
                >
                  {topic}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Help categories */}
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
          <h2 className='text-2xl font-bold text-gray-900 mb-6 text-center'>
            Browse Help Topics
          </h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            {categories.map((category) => (
              <div
                key={category.title}
                className='bg-white rounded-xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer'
              >
                <div className='flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-blue-600 mb-4'>
                  {category.icon}
                </div>
                <h3 className='text-lg font-semibold text-gray-900 mb-2'>
                  {category.title}
                </h3>
                <p className='text-gray-600 text-sm leading-relaxed'>
                  {category.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ section */}
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12'>
          <h2 className='text-2xl font-bold text-gray-900 mb-6 text-center'>
            Frequently Asked Questions
          </h2>
          {filteredFaqs.length > 0 ? (
            <div className='space-y-3'>
              {filteredFaqs.map((faq, index) => (
                <div
                  key={faq.question}
                  className='bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden'
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className='w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors'
                  >
                    <span className='font-medium text-gray-900 pr-4'>{faq.question}</span>
                    {openFaq === index ? (
                      <ChevronUp className='shrink-0 text-blue-500' size={20} />
                    ) : (
                      <ChevronDown className='shrink-0 text-gray-400' size={20} />
                    )}
                  </button>
                  {openFaq === index && (
                    <div className='px-5 pb-5 text-gray-600 leading-relaxed'>
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className='text-center py-12 bg-white rounded-xl border border-gray-100'>
              <HelpCircle className='mx-auto text-gray-300 mb-3' size={48} />
              <p className='text-gray-500 font-medium'>
                No results found for "{searchTerm}"
              </p>
              <p className='text-sm text-gray-400 mt-1'>
                Try a different search term or contact our support team.
              </p>
            </div>
          )}
        </div>

        {/* Contact / Support section */}
        <div className='bg-white border-t border-gray-100'>
          <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
            <h2 className='text-2xl font-bold text-gray-900 mb-6 text-center'>
              Still Need Help?
            </h2>
            <p className='text-gray-600 text-center mb-8'>
              Our support team is ready to assist you. Reach out through any of the following channels.
            </p>
            <div className='grid grid-cols-1 sm:grid-cols-3 gap-6'>
              <div className='text-center'>
                <div className='flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600 mx-auto mb-3'>
                  <Mail size={22} />
                </div>
                <h3 className='font-semibold text-gray-900 mb-1'>Email Support</h3>
                <p className='text-sm text-gray-500'>support@jobportal.com</p>
                <p className='text-sm text-gray-400'>Response within 24 hours</p>
              </div>
              <div className='text-center'>
                <div className='flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600 mx-auto mb-3'>
                  <Phone size={22} />
                </div>
                <h3 className='font-semibold text-gray-900 mb-1'>Phone Support</h3>
                <p className='text-sm text-gray-500'>+1 (555) 123-4567</p>
                <p className='text-sm text-gray-400'>Mon-Fri, 9am - 6pm EST</p>
              </div>
              <div className='text-center'>
                <div className='flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600 mx-auto mb-3'>
                  <MessageCircle size={22} />
                </div>
                <h3 className='font-semibold text-gray-900 mb-1'>Live Chat</h3>
                <p className='text-sm text-gray-500'>Available 24/7</p>
                <Button variant='outline' className='mt-3'>
                  Start Chat
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default HelpCenter
