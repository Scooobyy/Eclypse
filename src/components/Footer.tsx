import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, Instagram, Twitter, Facebook } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <h3 className="text-2xl font-secondary mb-6">ECLYPSE</h3>
            <p className="text-gray-400 mb-6">
              Premium fashion and lifestyle products designed for the modern individual.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-gray-300 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-white hover:text-gray-300 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-white hover:text-gray-300 transition-colors">
                <Facebook size={20} />
              </a>
            </div>
          </div>

          <div className="md:col-span-1">
            <h4 className="text-lg font-semibold mb-4">Shop</h4>
            <ul className="space-y-2">
              <li><Link to="/explore" className="text-gray-400 hover:text-white transition-colors">New Arrivals</Link></li>
              <li><Link to="/explore" className="text-gray-400 hover:text-white transition-colors">Best Sellers</Link></li>
              <li><Link to="/explore" className="text-gray-400 hover:text-white transition-colors">Collections</Link></li>
              <li><Link to="/explore" className="text-gray-400 hover:text-white transition-colors">Accessories</Link></li>
            </ul>
          </div>

          <div className="md:col-span-1">
            <h4 className="text-lg font-semibold mb-4">Help</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Customer Service</Link></li>
              <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Track Order</Link></li>
              <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Returns & Exchanges</Link></li>
              <li><Link to="/shipping" className="text-gray-400 hover:text-white transition-colors">Shipping Information</Link></li>
            </ul>
          </div>

          <div className="md:col-span-1">
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-center">
                <Mail size={16} className="mr-2" />
                <a href="mailto:contact@eclypse.com" className="text-gray-400 hover:text-white transition-colors">
                  pranavmane6666@gmail.com
                </a>
              </li>
              <li className="flex items-center">
                <Phone size={16} className="mr-2" />
                <a href="tel:+1234567890" className="text-gray-400 hover:text-white transition-colors">
                  +1 (234) 567-890
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Eclypse. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;