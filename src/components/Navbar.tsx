import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ShoppingCart, User } from 'lucide-react';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glassmorphism py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container-custom flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-secondary tracking-wider">
          ECLYPSE
        </Link>

        {/* Mobile menu button */}
        <button 
          className="md:hidden text-white" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-white hover:text-gray-300 transition-colors">
            About Us
          </Link>
          <Link to="/" className="text-white hover:text-gray-300 transition-colors">
            Waitlist
          </Link>
          <Link to="/" className="text-white hover:text-gray-300 transition-colors">
            <ShoppingCart size={20} />
          </Link>
          <Link to="/login" className="text-white hover:text-gray-300 transition-colors">
            <User size={20} />
          </Link>
          <Link 
            to="/" 
            className="text-white border border-white px-6 py-2 hover:bg-white hover:text-black transition-colors"
          >
            Buy
          </Link>
        </div>

        {/* Mobile menu */}
        <div 
          className={`fixed inset-0 glassmorphism z-40 flex flex-col justify-center items-center space-y-8 md:hidden transition-all duration-300 ${
            mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
        >
          <Link 
            to="/" 
            className="text-white text-xl" 
            onClick={() => setMobileMenuOpen(false)}
          >
            About Us
          </Link>
          <Link 
            to="/" 
            className="text-white text-xl" 
            onClick={() => setMobileMenuOpen(false)}
          >
            Waitlist
          </Link>
          <Link 
            to="/" 
            className="text-white text-xl" 
            onClick={() => setMobileMenuOpen(false)}
          >
            <ShoppingCart size={24} />
          </Link>
          <Link 
            to="/login" 
            className="text-white text-xl" 
            onClick={() => setMobileMenuOpen(false)}
          >
            <User size={24} />
          </Link>
          <Link 
            to="/" 
            className="text-white border border-white px-8 py-3 text-xl hover:bg-white hover:text-black transition-colors" 
            onClick={() => setMobileMenuOpen(false)}
          >
            Buy
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;