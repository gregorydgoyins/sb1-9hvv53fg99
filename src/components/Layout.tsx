import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search, Bell, User, LogIn, UserPlus } from 'lucide-react';
import { GlobalSearch } from './GlobalSearch';
import { NewsTicker } from './news/NewsTicker';
import { useAuthStore } from '../store/authStore';

export function Layout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, user } = useAuthStore();

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <NewsTicker />
      
      <header className="bg-slate-800/90 backdrop-blur-md border-b border-slate-700/50 sticky top-0 z-40">
        <div className="container-responsive mx-auto">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Mobile Menu Button */}
            <div className="flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
                aria-expanded={isMenuOpen}
              >
                <span className="sr-only">Open main menu</span>
                {isMenuOpen ? (
                  <X className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
              
              <Link to="/" className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-white">Panel Profits</span>
              </Link>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <Link to="/markets" className="nav-link">Markets</Link>
              <Link to="/portfolio" className="nav-link">Portfolio</Link>
              <Link to="/trading" className="nav-link">Trading</Link>
              <Link to="/news" className="nav-link">News</Link>
              <Link to="/learn" className="nav-link">Learn</Link>
            </nav>
            
            {/* Right Side Icons */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </button>
              
              <button
                className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                aria-label="Notifications"
              >
                <Bell className="h-5 w-5" />
              </button>
              
              {isAuthenticated ? (
                <Link
                  to="/profile"
                  className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  aria-label="Profile"
                >
                  <User className="h-5 w-5" />
                </Link>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link
                    to="/login"
                    className="flex items-center space-x-1 text-sm text-gray-300 hover:text-white"
                  >
                    <LogIn className="h-4 w-4" />
                    <span>Login</span>
                  </Link>
                  <Link
                    to="/register"
                    className="flex items-center space-x-1 bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded-lg text-sm transition-colors"
                  >
                    <UserPlus className="h-4 w-4" />
                    <span>Sign Up</span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
      
      {/* Mobile Menu */}
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
        <div className="bg-slate-800 border-b border-slate-700 px-2 pt-2 pb-3 space-y-1">
          <Link to="/markets" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-slate-700">
            Markets
          </Link>
          <Link to="/portfolio" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-slate-700">
            Portfolio
          </Link>
          <Link to="/trading" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-slate-700">
            Trading
          </Link>
          <Link to="/news" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-slate-700">
            News
          </Link>
          <Link to="/learn" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-slate-700">
            Learn
          </Link>
        </div>
      </div>
      
      {/* Global Search Modal */}
      <GlobalSearch isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      
      {/* Main Content */}
      <main className="container-responsive mx-auto py-6">
        {children}
      </main>
      
      {/* Footer */}
      <footer className="bg-slate-800/90 backdrop-blur-md border-t border-slate-700/50 py-8">
        <div className="container-responsive mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Panel Profits</h3>
              <p className="text-gray-400">The premier comic book trading platform.</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/markets" className="text-gray-400 hover:text-white">Markets</Link></li>
                <li><Link to="/portfolio" className="text-gray-400 hover:text-white">Portfolio</Link></li>
                <li><Link to="/trading" className="text-gray-400 hover:text-white">Trading</Link></li>
                <li><Link to="/news" className="text-gray-400 hover:text-white">News</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><Link to="/learn" className="text-gray-400 hover:text-white">Learning Center</Link></li>
                <li><Link to="/market-index" className="text-gray-400 hover:text-white">Market Index</Link></li>
                <li><Link to="/price-trends" className="text-gray-400 hover:text-white">Price Trends</Link></li>
                <li><Link to="/research" className="text-gray-400 hover:text-white">Research</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Account</h3>
              <ul className="space-y-2">
                {isAuthenticated ? (
                  <>
                    <li><Link to="/profile" className="text-gray-400 hover:text-white">Profile</Link></li>
                    <li><Link to="/portfolio" className="text-gray-400 hover:text-white">My Portfolio</Link></li>
                    <li><Link to="/portfolio/watchlist" className="text-gray-400 hover:text-white">Watchlist</Link></li>
                  </>
                ) : (
                  <>
                    <li><Link to="/login" className="text-gray-400 hover:text-white">Login</Link></li>
                    <li><Link to="/register" className="text-gray-400 hover:text-white">Register</Link></li>
                  </>
                )}
              </ul>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-slate-700/50 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">© 2025 Panel Profits. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/terms" className="text-gray-400 hover:text-white text-sm">Terms of Service</Link>
              <Link to="/privacy" className="text-gray-400 hover:text-white text-sm">Privacy Policy</Link>
              <Link to="/contact" className="text-gray-400 hover:text-white text-sm">Contact Us</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}