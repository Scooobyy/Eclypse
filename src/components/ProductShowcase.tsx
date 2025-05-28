import React from 'react';
import { motion } from 'framer-motion';

const ProductShowcase: React.FC = () => {
  return (
    <section className="py-16 bg-black">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Video Box */}
          <div className="lg:col-span-7" style={{ height: '471px' }}>
            <div className="h-full bg-gray-900 overflow-hidden">
              <video 
                className="h-full w-full object-cover"
                autoPlay 
                muted 
                loop 
                playsInline
              >
                <source src="4937472-uhd_4096_2160_25fps.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>

          {/* Right Image Box with Hover Effect */}
          <div className="lg:col-span-5" style={{ height: '471px' }}>
            <div className="h-full hover-text-effect">
              <img 
                src="https://images.pexels.com/photos/1381556/pexels-photo-1381556.jpeg" 
                alt="Fashion model" 
                className="h-full w-full object-cover"
              />
              <div className="text-content">
                <h3 className="text-2xl font-secondary font-bold text-white mb-4">The Midnight Collection</h3>
                <p className="text-white text-center">
                  Elegance redefined for the modern era. Sophisticated silhouettes that command attention.
                </p>
              </div>
            </div>
          </div>

          {/* Three Smaller Boxes Below */}
          <div className="lg:col-span-4" style={{ height: '457px' }}>
            <div className="h-full hover-text-effect">
              <img 
                src="https://images.pexels.com/photos/2681751/pexels-photo-2681751.jpeg" 
                alt="Product" 
                className="h-full w-full object-cover"
              />
              <div className="text-content">
                <h3 className="text-xl font-secondary font-bold text-white mb-3">Urban Edge</h3>
                <p className="text-white text-center text-sm">
                  Street-inspired designs with premium execution.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4" style={{ height: '457px' }}>
            <div className="h-full hover-text-effect">
              <img 
                src="https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg" 
                alt="Product" 
                className="h-full w-full object-cover"
              />
              <div className="text-content">
                <h3 className="text-xl font-secondary font-bold text-white mb-3">Minimal Luxury</h3>
                <p className="text-white text-center text-sm">
                  Understated elegance for the discerning individual.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4" style={{ height: '457px' }}>
            <div className="h-full hover-text-effect">
              <img 
                src="https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg" 
                alt="Product" 
                className="h-full w-full object-cover"
              />
              <div className="text-content">
                <h3 className="text-xl font-secondary font-bold text-white mb-3">Avant-Garde</h3>
                <p className="text-white text-center text-sm">
                  Pushing boundaries with bold, experimental designs.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Highlighted Text Section */}
        <div className="mt-20 mx-auto" style={{ width: '730px', height: '35px' }}>
          <motion.div 
            className="h-full flex items-center justify-center border-t border-b border-white py-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <h3 className="text-xl md:text-2xl font-secondary text-white tracking-widest">
              REDEFINING MODERN LUXURY
            </h3>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;