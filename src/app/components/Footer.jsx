"use client"
import Link from 'next/link';
import { useState } from 'react';

export default function Footer() {
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // Placeholder for newsletter submission logic
    alert('Subscribed with: ' + email);
    setEmail('');
  };

  return (
    <footer className="relative bg-navy-900 text-gray-200 overflow-hidden">
      {/* Wave Animation */}
      <div className="absolute inset-0">
        <svg className="wave" viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path
            d="M0,60 C320,100 720,20 1440,60 L1440,120 L0,120 Z"
            fill="rgba(255, 215, 0, 0.1)"
            className="wave-path"
          />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-4 space-y-6">
            <div className="flex items-center group">
              <svg className="w-12 h-12 mr-3 text-gold-400 group-hover:text-gold-300 transition-transform transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h18v18H3V3zM9 9h6v6H9V9z" />
              </svg>
              <span className="text-3xl font-extrabold text-gray-100 group-hover:text-gold-400 transition-colors">pospro</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed max-w-xs">
              Revolutionizing business operations with cutting-edge POS solutions for seamless sales and inventory management.
            </p>
            <div className="flex space-x-5">
              {['facebook', 'twitter', 'linkedin'].map((social) => (
                <a
                  key={social}
                  href={`https://${social}.com`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold-400 hover:text-gold-300 transition-transform transform hover:scale-125"
                >
                  <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                    <path
                      d={social === 'facebook'
                        ? 'M22 12c0-5.5-4.5-10-10-10S2 6.5 2 12c0 5 3.7 9.1 8.4 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.3v7C18.3 21.1 22 17 22 12z'
                        : social === 'twitter'
                        ? 'M22 4.2c-.8.3-1.6.6-2.5.7 0.9-.5 1.6-1.4 1.9-2.4-.8.5-1.7.8-2.7 1-0.8-.8-1.9-1.3-3.1-1.3-2.3 0-4.2 1.9-4.2 4.2 0 .3 0 .7.1 1-3.5-.2-6.6-1.9-8.7-4.5-.4.6-.6 1.4-.6 2.2 0 1.5.8 2.8 1.9 3.6-.7 0-1.3-.2-1.9-.5v.1c0 2.1 1.5 3.8 3.5 4.2-.4.1-.8.2-1.2.2-.3 0-.6 0-.9-.1.6 1.9 2.4 3.3 4.5 3.3-1.6 1.3-3.7 2.1-5.9 2.1-.4 0-.8 0-1.2-.1 2.1 1.4 4.6 2.2 7.3 2.2 8.8 0 13.6-7.3 13.6-13.6 0-.2 0-.4 0-.6.9-.6 1.7-1.4 2.3-2.3z'
                        : 'M20.5 2h-17C2.1 2 1 3.1 1 4.5v15C1 20.9 2.1 22 3.5 22h17c1.4 0 2.5-1.1 2.5-2.5v-15C23 3.1 21.9 2 20.5 2zM8.8 19H5.7V9.1h3.1V19zm-1.6-11.6c-1 0-1.8-.8-1.8-1.8s.8-1.8 1.8-1.8 1.8.8 1.8 1.8-.8 1.8-1.8 1.8zm12.1 11.6h-3.1v-5.5c0-1.3-.5-2.2-1.7-2.2-1.3 0-2 .9-2 2.2V19H9.4V9.1h3.1v1.3c.4-.6 1.2-1.4 2.7-1.4 2 0 3.5 1.3 3.5 4.1v5.9z'}
                    />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3">
            <h3 className="text-xl font-bold text-gold-400 mb-5 relative">
              Quick Links
              <span className="absolute left-0 bottom-0 w-16 h-1 bg-gold-400 transform skew-x-[-30deg]"></span>
            </h3>
            <ul className="grid grid-cols-2 gap-4">
              {['Dashboard', 'Sales', 'Inventory', 'Reports', 'Analytics', 'Settings'].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase()}`}
                    className="text-gray-300 hover:text-gold-300 hover:pl-3 transition-all duration-300 transform hover:scale-105"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="md:col-span-3">
            <h3 className="text-xl font-bold text-gold-400 mb-5 relative">
              Support
              <span className="absolute left-0 bottom-0 w-16 h-1 bg-gold-400 transform skew-x-[-30deg]"></span>
            </h3>
            <ul className="grid grid-cols-2 gap-4">
              {['Help Center', 'Contact Us', 'FAQs', 'Pricing', 'Tutorials', 'Community'].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase().replace(' ', '-')}`}
                    className="text-gray-300 hover:text-gold-300 hover:pl-3 transition-all duration-300 transform hover:scale-105"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div className="md:col-span-2">
            <h3 className="text-xl font-bold text-gold-400 mb-5 relative">
              Stay Updated
              <span className="absolute left-0 bottom-0 w-16 h-1 bg-gold-400 transform skew-x-[-30deg]"></span>
            </h3>
            <p className="text-gray-300 text-sm mb-4 max-w-sm">Join our newsletter for exclusive POS updates, tips, and offers.</p>
            <div
              className="flex"
              onSubmit={handleNewsletterSubmit}
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-5 py-3 rounded-l-full text-navy-900 bg-gray-100 border-none focus:outline-none focus:ring-2 focus:ring-gold-400 transition-all duration-300"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-gold-400 to-gold-600 text-navy-900 rounded-r-full font-semibold hover:from-gold-300 hover:to-gold-500 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-300 text-sm">
            © {new Date().getFullYear()} pospro. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase().replace(' ', '-')}`}
                className="text-gray-300 hover:text-gold-300 transition-colors transform hover:scale-105"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        footer {
          background-color: #1e3a8a; /* navy-900 */
        }
        .wave {
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
        }
        .wave-path {
          animation: wave 10s linear infinite;
        }
        @keyframes wave {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-1440px);
          }
        }
        .transition-all {
          transition: all 0.3s ease-in-out;
        }
        .shadow-lg {
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }
        .shadow-xl {
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.3);
        }
        @media (max-width: 768px) {
          .grid-cols-1 {
            grid-template-columns: 1fr;
          }
          .md\\:grid-cols-12 {
            grid-template-columns: 1fr;
          }
          .md\\:col-span-4, .md\\:col-span-3, .md\\:col-span-2 {
            grid-column: span 1;
          }
          .md\\:flex-row {
            flex-direction: column;
          }
          .md\\:mt-0 {
            margin-top: 1rem;
          }
          .text-3xl {
            font-size: 1.75rem;
          }
          .w-12 {
            width: 2.5rem;
          }
          .h-12 {
            height: 2.5rem;
          }
          .grid-cols-2 {
            grid-template-columns: 1fr;
          }
        }
        @media (max-width: 640px) {
          .text-xl {
            font-size: 1.125rem;
          }
          .text-sm {
            font-size: 0.875rem;
          }
        }
      `}</style>
    </footer>
  );
}