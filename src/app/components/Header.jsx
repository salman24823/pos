'use client';
import { useState } from 'react';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { name: 'Dashboard', href: '/' },
    { name: 'Sales', href: '/sales' },
    { name: 'Inventory', href: '/inventory' },
    { name: 'Reports', href: '/reports' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-navy-900 text-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="flex items-center group">
              <svg className="w-12 h-12 mr-3 text-gold-400 group-hover:text-gold-300 transition-transform transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h18v18H3V3zM9 9h6v6H9V9z" />
              </svg>
              <span className="text-3xl font-extrabold text-gray-100 group-hover:text-gold-400 transition-colors">POSPro</span>
            </a>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-10">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="relative text-gray-200 text-lg font-semibold hover:text-gold-300 transition-all duration-300 group transform hover:scale-105"
              >
                {item.name}
                <span className="absolute left-0 bottom-0 w-0 h-1 bg-gold-400 group-hover:w-full transition-all duration-300 transform skew-x-[-30deg]"></span>
              </a>
            ))}
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="/login"
              className="text-gray-200 text-lg font-semibold px-4 py-2 rounded-full hover:text-gold-300 hover:bg-navy-800/50 transition-all duration-300 transform hover:scale-105"
            >
              Login
            </a>
            <a
              href="/signup"
              className="text-navy-900 text-lg font-semibold px-6 py-2 bg-gradient-to-r from-gold-400 to-gold-600 rounded-full hover:from-gold-300 hover:to-gold-500 shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Sign Up
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-gold-400 focus:outline-none p-2 rounded-full hover:bg-navy-800/50 transition-colors"
            aria-label="Toggle menu"
          >
            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden animate-slide-down bg-navy-800/95 border-t border-gray-700">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block px-6 py-3 text-gray-200 text-xl font-semibold hover:text-gold-300 hover:pl-4 transition-all duration-300 transform hover:scale-105 border-b border-gray-700/50"
                onClick={() => setMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <div className="px-6 py-3 flex flex-col gap-4">
              <a
                href="/login"
                className="text-gray-200 text-xl font-semibold hover:text-gold-300 hover:pl-4 transition-all duration-300 transform hover:scale-105"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </a>
              <a
                href="/signup"
                className="text-navy-900 text-xl font-semibold px-6 py-2 bg-gradient-to-r from-gold-400 to-gold-600 rounded-full hover:from-gold-300 hover:to-gold-500 text-center transition-all duration-300 transform hover:scale-105 shadow-md"
                onClick={() => setMenuOpen(false)}
              >
                Sign Up
              </a>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        header {
          background-color: #1e3a8a; /* navy-900 */
        }
        .animate-slide-down {
          animation: slide-down 0.3s ease-in-out;
        }
        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .transition-all {
          transition: all 0.3s ease-in-out;
        }
        .shadow-md {
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        }
        .shadow-xl {
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        }
        @media (max-width: 768px) {
          .md\\:hidden {
            display: block;
          }
          .md\\:flex {
            display: none;
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
        }
        @media (max-width: 640px) {
          .text-xl {
            font-size: 1.125rem;
          }
        }
      `}</style>
    </header>
  );
}  