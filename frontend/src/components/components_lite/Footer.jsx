import React from 'react'
import { Link } from 'react-router-dom'
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from 'react-icons/fa'
import {
  Home,
  Briefcase,
  Building2,
  ShieldCheck,
  HelpCircle,
  Mail,
  Phone,
  MapPin,
} from 'lucide-react'

const Footer = () => {
  const year = new Date().getFullYear()

  const socialIcons = [
    { icon: <FaFacebookF />, label: 'Facebook' },
    { icon: <FaTwitter />, label: 'Twitter' },
    { icon: <FaLinkedinIn />, label: 'LinkedIn' },
    { icon: <FaInstagram />, label: 'Instagram' },
  ]

  const quickLinks = [
    { label: 'Home', icon: <Home size={16} />, to: '/' },
    { label: 'Browse Jobs', icon: <Briefcase size={16} />, to: '/browse' },
  ]


  const supportLinks = [
    
    { label: 'Privacy Policy', icon: <ShieldCheck size={16} />, to: '/privacy' },
  
  ]

  return (
    <footer className='bg-gray-900 text-gray-300 mt-16'>
      {/* Main footer content */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <div className='grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4'>
          {/* Brand section */}
          <div>
            <h2 className='text-2xl font-bold text-white mb-4'>
              Job<span className='text-blue-500'>Portal</span>
            </h2>
            <p className='text-sm leading-relaxed mb-6'>
              Find your dream job and discover life-changing career opportunities.
              Connecting top talent with amazing companies around the world.
            </p>
            <div className='flex gap-3'>
              {socialIcons.map((social) => (
                <a
                  key={social.label}
                  href='#'
                  aria-label={social.label}
                  className='flex h-9 w-9 items-center justify-center rounded-full bg-gray-800 text-gray-400 transition-colors hover:bg-blue-500 hover:text-white'
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className='text-white font-semibold mb-4'>Quick Links</h3>
            <ul className='space-y-3'>
              {quickLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    className='flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-blue-500'
                  >
                    {item.icon}
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        
          

          {/* Support / Contact */}
          <div>
            <h3 className='text-white font-semibold mb-4'>Get in Touch</h3>
            <ul className='space-y-3'>
              <li className='flex items-center gap-2 text-sm text-gray-400'>
                <MapPin size={16} className='text-blue-500' />
                New York, USA
              </li>
              <li className='flex items-center gap-2 text-sm text-gray-400'>
                <Phone size={16} className='text-blue-500' />
                +1 (555) 123-4567
              </li>
              <li className='flex items-center gap-2 text-sm text-gray-400'>
                <Mail size={16} className='text-blue-500' />
                support@jobportal.com
              </li>
            </ul>
            <ul className='space-y-3 mt-6'>
              {supportLinks.slice(0, 2).map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    className='flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-blue-500'
                  >
                    {item.icon}
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className='border-t border-gray-800'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3'>
          <p className='text-sm text-gray-500'>
            &copy; {year} Job<span className='text-blue-500'>Portal</span>. All
            rights reserved.
          </p>
          
        </div>
      </div>
    </footer>
  )
}

export default Footer
