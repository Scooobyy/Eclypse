// Navbar.tsx

import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, ShoppingCart, User, LogOut, CheckCircle2 } from 'lucide-react';
import { auth } from '../../firebase';
import toast from 'react-hot-toast';
import logo from '../../assets/Property 1=Default.png'; // 🔄 Replace with your actual logo path

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
};

type NavbarProps = {
  cartPopup: string | null;
};

const Navbar: React.FC<NavbarProps> = ({ cartPopup }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [cart] = useState<Product[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      setUser(null);
      setUserMenuOpen(false);
      toast.success('🚪 Logged out successfully!', {
        icon: '👋',
        style: {
          borderRadius: '8px',
          background: '#333',
          color: '#fff',
        },
      });
    } catch (error) {
      console.error('Logout failed:', error);
      toast.error('❌ Logout failed. Please try again.');
    }
  };

  const handleUserClick = () => {
    if (!user) {
      navigate('/login');
    } else {
      setUserMenuOpen(!userMenuOpen);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glassmorphism py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container-custom flex justify-between items-center relative">
        {/* Logo image */}
        <Link to="/" className="flex items-center space-x-2">
         <img src={logo} alt="Eclypse Logo" className="w-10 h-10 object-cover rounded-full" />

          <span className="text-white text-xl font-secondary tracking-wider hidden sm:inline">ECLYPSE</span>
        </Link>

        {/* Mobile menu toggle */}
        <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/explore" className="text-white hover:text-gray-300 transition-colors">
            Xplore
          </Link>
          <Link to="/" className="text-white hover:text-gray-300 transition-colors">
            About Us
          </Link>
          <Link to="/" className="text-white hover:text-gray-300 transition-colors">
            Waitlist
          </Link>

          <Link to="/cart" className="text-white hover:text-gray-300 transition-colors relative">
            <ShoppingCart size={20} />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-yellow-500 text-black rounded-full text-xs w-5 h-5 flex items-center justify-center font-bold">
                {cart.length}
              </span>
            )}
          </Link>

          {/* User menu */}
          <div className="relative">
            <button
              onClick={handleUserClick}
              className="text-white hover:text-gray-300 transition-colors focus:outline-none"
              aria-label="User menu"
            >
              <User size={20} />
            </button>

            {user && userMenuOpen && (
              <div className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg py-2 z-50">
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  aria-label="Logout"
                  title="Logout"
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>

          <Link
            to="/explore"
            className="text-white border border-white px-6 py-2 hover:bg-white hover:text-black transition-colors"
          >
            Buy
          </Link>
        </div>

        {/* Add to Cart popup notification from ExplorePage */}
        {cartPopup && (
          <div
            className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 flex items-center space-x-2 bg-yellow-400 text-black rounded px-4 py-2 shadow-lg z-50"
            style={{ minWidth: '250px' }}
          >
            <CheckCircle2 size={20} />
            <span>{cartPopup}</span>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
