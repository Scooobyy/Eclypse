import React from 'react';
import { motion } from 'framer-motion';

const BrandInfo: React.FC = () => {
  return (
    <section className="py-20 bg-black">
      <div className="container-custom">
        <motion.div 
          className="max-w-3xl"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-secondary font-bold text-white mb-8">
            Crafted for the Future
          </h2>
          <p className="text-lg text-gray-300 leading-relaxed">
            Eclypse represents a new era in fashion—where innovative design meets sustainable practices. 
            Our collections are created with meticulous attention to detail, using only the finest materials 
            sourced with respect for the environment and the communities that produce them.
          </p>
          <p className="text-lg text-gray-300 leading-relaxed mt-4">
            We believe that fashion should transcend seasons and trends. Each Eclypse piece is designed 
            to become a timeless part of your wardrobe, evolving with you through the years.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default BrandInfo;