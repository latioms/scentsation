'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Heart, User } from 'lucide-react';
import { getLikedProducts } from '@/lib/likes';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [favoritesCount, setFavoritesCount] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Mettre à jour le compteur de favoris
    const updateFavoritesCount = () => {
      const likedProducts = getLikedProducts();
      setFavoritesCount(likedProducts.length);
    };

    // Vérifier l'authentification
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/check');
        const data = await response.json();
        setIsAuthenticated(data.authenticated);
      } catch {
        setIsAuthenticated(false);
      }
    };

    // Mettre à jour au montage
    updateFavoritesCount();
    checkAuth();

    // Écouter les changements de likes
    const handleLikesChanged = () => {
      updateFavoritesCount();
    };

    window.addEventListener('likesChanged', handleLikesChanged);

    return () => {
      window.removeEventListener('likesChanged', handleLikesChanged);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const menuItems = [
    { name: 'Collections', href: '/collections' },
    { name: 'Products', href: '/products' },
    { name: 'Brand', href: '/brand' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav className="bg-background border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 md:grid md:grid-cols-3 md:items-center md:gap-4 flex items-center justify-between">
          {/* Desktop Left Menu */}
          <div className="hidden md:flex items-center justify-start space-x-6">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-foreground hover:text-muted-foreground transition-colors duration-200 text-sm font-medium"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Logo - Center Desktop / Left Mobile */}
          <Link href="/" className="flex items-center md:justify-center">
            <span className="text-2xl font-serif text-foreground whitespace-nowrap">
              Scent<span className="italic">Sation</span><sup className="text-xs">by KK</sup>
            </span>
          </Link>

          {/* Desktop Right Section / Mobile Burger */}
          <div className="flex items-center md:justify-end">
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-6 lg:justify-end">
              {isAuthenticated ? (
                <Link
                  href="/account"
                  className="text-foreground hover:text-muted-foreground transition-colors duration-200 text-sm flex items-center gap-1"
                >
                  Account
                </Link>
              ) : (
                <Link
                  href="/login"
                  className="text-foreground hover:text-muted-foreground transition-colors duration-200 text-sm flex items-center gap-1"
                >
                  <User className="w-4 h-4" />
                  Login
                </Link>
              )}
              <Link
                href="/favorites"
                className="text-foreground hover:text-muted-foreground transition-colors duration-200 text-sm flex items-center gap-1"
              >
                Favorites
                {favoritesCount > 0 && (
                  <span className="ml-1 bg-primary text-primary-foreground text-xs font-semibold px-1.5 py-0.5 rounded-full">
                    {favoritesCount}
                  </span>
                )}
              </Link>
              <Link
                href="/search"
                className="text-foreground hover:text-muted-foreground transition-colors duration-200 text-sm"
              >
                Search
              </Link>
            </div>

            {/* Mobile Burger Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 rounded-md text-foreground hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring"
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
          className={`fixed top-0 right-0 h-full w-80 bg-background shadow-xl transform transition-transform duration-300 ease-in-out ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex flex-col h-full">
            {/* Drawer Header */}
            <div className="flex justify-between items-center p-4 border-b">
              <span className="text-xl font-serif text-foreground">
                Scent<span className="italic">Sation</span><sup className="text-xs">by KK</sup>
              </span>
              <button
                onClick={toggleMenu}
                className="p-2 rounded-md text-foreground hover:bg-accent"
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
                    className="block px-4 py-3 text-base font-medium text-foreground hover:bg-accent rounded-md transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              {/* Divider */}
              <div className="my-6 border-t" />

              {/* Secondary Navigation */}
              <div className="px-4 space-y-1">
                {isAuthenticated ? (
                  <Link
                    href="/account"
                    onClick={toggleMenu}
                    className="flex items-center gap-2 px-4 py-3 text-base text-foreground hover:bg-accent rounded-md transition-colors duration-200"
                  >
                    <User className="w-4 h-4" />
                    Account
                  </Link>
                ) : (
                  <Link
                    href="/login"
                    onClick={toggleMenu}
                    className="flex items-center gap-2 px-4 py-3 text-base text-foreground hover:bg-accent rounded-md transition-colors duration-200"
                  >
                    <User className="w-4 h-4" />
                    Login
                  </Link>
                )}
                <Link
                  href="/favorites"
                  onClick={toggleMenu}
                  className="flex items-center justify-between px-4 py-3 text-base text-foreground hover:bg-accent rounded-md transition-colors duration-200"
                >
                  <span>Favorites</span>
                  {favoritesCount > 0 && (
                    <span className="bg-primary text-primary-foreground text-xs font-semibold px-2 py-1 rounded-full">
                      {favoritesCount}
                    </span>
                  )}
                </Link>
                <Link
                  href="/search"
                  onClick={toggleMenu}
                  className="block px-4 py-3 text-base text-foreground hover:bg-accent rounded-md transition-colors duration-200"
                >
                  Search
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
