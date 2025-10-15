'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const menuItems = [
    { name: 'Collections', href: '/collections' },
    { name: 'Products', href: '/products' },
    { name: 'Brand', href: '/brand' },
    { name: 'Journal', href: '/journal' },
  ];

  return (
    <nav className="bg-amber-50 border-b border-amber-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 md:grid md:grid-cols-3 md:items-center md:gap-4 flex items-center justify-between">
          {/* Desktop Left Menu */}
          <div className="hidden md:flex items-center justify-end space-x-6">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-amber-900 hover:text-amber-700 transition-colors duration-200 text-sm font-medium"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Logo - Center Desktop / Left Mobile */}
          <Link href="/" className="flex items-center md:justify-center">
            <span className="text-2xl font-serif text-amber-900 whitespace-nowrap">
              Scent<span className="italic">Sation</span><sup className="text-xs">™</sup>
            </span>
          </Link>

          {/* Desktop Right Section / Mobile Burger */}
          <div className="flex items-center md:justify-start">
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-6">
              <Link
                href="/account"
                className="text-amber-900 hover:text-amber-700 transition-colors duration-200 text-sm"
              >
                Account
              </Link>
              <Link
                href="/favorites"
                className="text-amber-900 hover:text-amber-700 transition-colors duration-200 text-sm"
              >
                Favorites
              </Link>
              <Link
                href="/search"
                className="text-amber-900 hover:text-amber-700 transition-colors duration-200 text-sm"
              >
                Search
              </Link>
              <Link
                href="/cart"
                className="text-amber-900 hover:text-amber-700 transition-colors duration-200 text-sm"
              >
                Bag (0)
              </Link>
            </div>

            {/* Mobile Burger Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 rounded-md text-amber-900 hover:bg-amber-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`md:hidden fixed inset-0 z-50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Overlay */}
        <div
          className="fixed inset-0 bg-black bg-opacity-50"
          onClick={toggleMenu}
        />

        {/* Drawer */}
        <div
          className={`fixed top-0 right-0 h-full w-80 bg-amber-50 shadow-xl transform transition-transform duration-300 ease-in-out ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex flex-col h-full">
            {/* Drawer Header */}
            <div className="flex justify-between items-center p-4 border-b border-amber-200">
              <span className="text-xl font-serif text-amber-900">
                Scent<span className="italic">Sation</span><sup className="text-xs">™</sup>
              </span>
              <button
                onClick={toggleMenu}
                className="p-2 rounded-md text-amber-900 hover:bg-amber-100"
                aria-label="Close menu"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Drawer Content */}
            <div className="flex-1 overflow-y-auto py-6">
              {/* Main Navigation */}
              <div className="px-4 space-y-1">
                {menuItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={toggleMenu}
                    className="block px-4 py-3 text-base font-medium text-amber-900 hover:bg-amber-100 rounded-md transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              {/* Divider */}
              <div className="my-6 border-t border-amber-200" />

              {/* Secondary Navigation */}
              <div className="px-4 space-y-1">
                <Link
                  href="/account"
                  onClick={toggleMenu}
                  className="block px-4 py-3 text-base text-amber-900 hover:bg-amber-100 rounded-md transition-colors duration-200"
                >
                  Account
                </Link>
                <Link
                  href="/favorites"
                  onClick={toggleMenu}
                  className="block px-4 py-3 text-base text-amber-900 hover:bg-amber-100 rounded-md transition-colors duration-200"
                >
                  Favorites
                </Link>
                <Link
                  href="/search"
                  onClick={toggleMenu}
                  className="block px-4 py-3 text-base text-amber-900 hover:bg-amber-100 rounded-md transition-colors duration-200"
                >
                  Search
                </Link>
                <Link
                  href="/cart"
                  onClick={toggleMenu}
                  className="block px-4 py-3 text-base text-amber-900 hover:bg-amber-100 rounded-md transition-colors duration-200"
                >
                  Bag (0)
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
