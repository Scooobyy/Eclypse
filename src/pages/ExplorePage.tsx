import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import { useCart, Product } from '../context/CartContext'; // Adjust path as needed

const products: Product[] = [
  {
    id: 1,
    name: 'Midnight Jacket',
    price: 12999,
    image: 'Property 1=Default (2).png',
    description: 'Elegant midnight black jacket for all occasions.',
  },
  {
    id: 2,
    name: 'Urban Sneakers',
    price: 8999,
    image: 'https://images.pexels.com/photos/2681751/pexels-photo-2681751.jpeg',
    description: 'Street-inspired sneakers with comfort and style.',
  },
  {
    id: 3,
    name: 'Minimalist Watch',
    price: 19999,
    image: 'Property 1=Default (1).png',
    description: 'Luxury minimalist watch for discerning individuals.',
  },
  {
    id: 4,
    name: 'Avant-Garde',
    price: 15999,
    image: 'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg',
    description: 'Pushing boundaries with bold, experimental designs.',
  },
];

const ExplorePage: React.FC = () => {
  const { addToCart, cartItems } = useCart();
  const [cartPopup, setCartPopup] = useState<string | null>(null);

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    setCartPopup(`${product.name} added to cart!`);
  };

  useEffect(() => {
    if (cartPopup) {
      const timer = setTimeout(() => {
        setCartPopup(null);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [cartPopup]);

  return (
    <>
      <Navbar cartPopup={cartPopup} />

      <section className="bg-black min-h-screen pt-[72px]">
        <div className="container mx-auto px-6 py-12">
          <h2 className="text-3xl text-white font-bold mb-10 text-center">
            Explore Our Collection
          </h2>

          {/* Products Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {products.map((product) => (
              <div key={product.id} className="lg:col-span-4" style={{ height: '457px' }}>
                <div className="h-full relative group cursor-pointer overflow-hidden rounded-lg shadow-lg">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center text-center p-6">
                    <h3 className="text-xl font-secondary font-bold text-white mb-3">
                      {product.name}
                    </h3>
                    <p className="text-white text-sm mb-3">{product.description}</p>
                    <p className="text-yellow-400 font-bold text-lg mb-5">
                      {product.price.toLocaleString('en-IN', {
                        style: 'currency',
                        currency: 'INR',
                      })}
                    </p>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-6 rounded"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="mt-12 bg-gray-900 p-6 rounded-lg max-w-md mx-auto text-white">
            <h3 className="text-2xl font-semibold mb-4">Cart Items ({cartItems.length})</h3>
            {cartItems.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              <ul>
                {cartItems.map((item, index) => (
                  <li
                    key={index}
                    className="flex justify-between py-2 border-b border-gray-700"
                  >
                    <span>{item.name} x {item.quantity}</span>
                    <span>
                      {(item.price * item.quantity).toLocaleString('en-IN', {
                        style: 'currency',
                        currency: 'INR',
                      })}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Highlight Text Box */}
          <div
            className="mx-auto mt-20 border-t border-b border-white flex items-center justify-center"
            style={{ width: '750px', height: '35px' }}
          >
            <motion.h3
              className="text-xl font-semibold text-white tracking-widest"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              REDEFINING MODERN LUXURY
            </motion.h3>
          </div>
        </div>
      </section>
    </>
  );
};

export default ExplorePage;
