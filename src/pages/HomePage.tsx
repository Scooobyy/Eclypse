import React from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import BrandInfo from '../components/BrandInfo';
import ProductShowcase from '../components/ProductShowcase';
import ProductDetail from '../components/ProductDetail';
import Footer from '../components/Footer';

const HomePage: React.FC = () => {
  return (
    <div className="bg-black min-h-screen">
      <Navbar />
      <HeroSection />
      <BrandInfo />
      <ProductShowcase />
      <ProductDetail />
      <Footer />
    </div>
  );
};

export default HomePage;