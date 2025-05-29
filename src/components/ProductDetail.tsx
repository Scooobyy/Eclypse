import React, { useState } from 'react';
import { useCart, Product } from '../context/CartContext'; // Adjust path as needed
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface Review {
  id: number;
  name: string;
  location: string;
  avatar: string;
  comment: string;
}

const ProductDetail: React.FC = () => {
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [selectedReview, setSelectedReview] = useState<number>(0);
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState<number>(0);

  const { addToCart } = useCart();

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const sizes = ['XS', 'S', 'M', 'L', 'XL'];
  const price = 129500;
  const productName = 'Eclipse Signature Jacket';
  const imageUrl = 'Property 1=Default (2).png';
  const images = [imageUrl, imageUrl, imageUrl];
  const description = 'Handcrafted in Italy with premium materials';

  // Create product object matching CartContext's Product interface
  const productToAdd: Product = {
    id: 1, // Use a stable ID for the product, not Date.now(), so it matches for quantity increases
    name: productName,
    price,
    image: imageUrl,
    description,
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size before adding to cart.');
      return;
    }

    // Since your CartContext Product does not include size,
    // but you want to store size in cart, you have two options:
    // 1) Extend Product to include size (recommended).
    // 2) Pass size separately or encode it in product name or id.

    // Let's update Product to include size for cart use:
    // For now, let's create a new product object with size included dynamically

    const productWithSize: Product & { size: string } = {
      ...productToAdd,
      size: selectedSize,
    };

    // Since your CartContext Product interface doesn't have 'size',
    // you can either update CartContext to accept it or ignore this detail.
    // If your CartContext is strict, you should update Product interface like this:

    // interface Product {
    //   id: number;
    //   name: string;
    //   price: number;
    //   image: string;
    //   description: string;
    //   size?: string;
    // }

    // For now, we'll just cast to any to avoid TS error (quick fix):
    addToCart(productWithSize as Product);

    setSuccessMessage('Added to cart!');
    setTimeout(() => setSuccessMessage(''), 2000);
  };

  const reviews: Review[] = [
    {
      id: 1,
      name: 'Random Woman',
      location: 'NY, USA',
      avatar:
        'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100',
      comment: 'Understated, but unforgettable. It feels like it was made for me',
    },
    {
      id: 2,
      name: 'Sarah Chen',
      location: 'LA, USA',
      avatar:
        'https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg?auto=compress&cs=tinysrgb&w=100',
      comment: 'The attention to detail in this piece is remarkable. Worth every penny.',
    },
    {
      id: 3,
      name: 'Emma Davis',
      location: 'London, UK',
      avatar:
        'https://images.pexels.com/photos/1898555/pexels-photo-1898555.jpeg?auto=compress&cs=tinysrgb&w=100',
      comment: 'Elegant, timeless, and incredibly comfortable. Exactly what I was looking for.',
    },
  ];

  const dropdownSections = [
    {
      key: 'size',
      label: 'Size & Fit',
      content: 'The model is 5\'10" and wears a size Small. This piece runs true to size with a tailored fit.',
    },
    {
      key: 'delivery',
      label: 'Delivery & Returns',
      content: 'Free shipping on all orders. Returns accepted within 30 days of delivery.',
    },
    {
      key: 'made',
      label: 'How This Was Made',
      content:
        'Handcrafted in our atelier in Milan using traditional techniques. Each piece takes over 40 hours to complete.',
    },
  ];

  return (
    <section className="py-16 bg-black text-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 min-h-[862px]">
          {/* Video Section */}
          <div className="lg:col-span-6">
            <div className="h-full bg-gray-900 overflow-hidden">
              <video className="h-full w-full object-cover" autoPlay muted loop playsInline>
                <source src="4937472-uhd_4096_2160_25fps.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>

          {/* Product Info */}
          <div className="lg:col-span-6 bg-white text-black p-10 flex flex-col">
            <h2 className="text-3xl font-bold mb-2">{productName}</h2>
            <div className="bg-gray-100 p-3 mb-4 max-w-md">
              <p className="text-sm text-gray-700">{description}</p>
            </div>

            {/* Product Images */}
            <div className="flex space-x-4 mb-8">
              {images.map((img, index) => (
                <div
                  key={index}
                  className={`border-2 ${
                    selectedImage === index ? 'border-black' : 'border-transparent'
                  } rounded`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img src={img} alt={`Product view ${index + 1}`} className="h-52 w-36 object-cover cursor-pointer" />
                </div>
              ))}
            </div>

            {/* Price */}
            <div className="mb-6">
              <p className="text-2xl font-semibold">
                {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(price)}
              </p>
              <p className="text-sm text-gray-500">MRP incl. of all taxes</p>
            </div>

            {/* Size Selection */}
            <div className="mb-8">
              <p className="text-sm font-medium mb-2">Select Size</p>
              <div className="flex space-x-3">
                {sizes.map((size) => (
                  <label key={size}>
                    <input
                      type="radio"
                      name="size"
                      value={size}
                      checked={selectedSize === size}
                      onChange={() => setSelectedSize(size)}
                      className="sr-only"
                    />
                    <span
                      className={`w-12 h-12 flex items-center justify-center border text-sm cursor-pointer ${
                        selectedSize === size ? 'bg-black text-white' : 'bg-gray-100'
                      } hover:bg-gray-200 transition-colors`}
                    >
                      {size}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex space-x-4 mb-4">
              <button
                onClick={handleAddToCart}
                className="w-1/2 bg-gray-200 text-black py-3 hover:bg-gray-300 transition-colors"
              >
                Add to Cart
              </button>
              <Link
                to="/shipping"
                className="w-1/2 bg-black text-white py-3 flex items-center justify-center hover:bg-gray-800 transition-colors"
              >
                Buy Now
              </Link>
            </div>
            {successMessage && <div className="text-green-600 text-sm mb-2">{successMessage}</div>}

            {/* Dropdown Sections */}
            <div className="border-t border-gray-200 mt-4">
              {dropdownSections.map((section) => (
                <div key={section.key} className="py-4 border-b border-gray-200">
                  <button className="w-full flex justify-between items-center" onClick={() => toggleSection(section.key)}>
                    <span className="font-medium">{section.label}</span>
                    {expandedSection === section.key ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                  {expandedSection === section.key && (
                    <div className="pt-2">
                      <p className="text-sm text-gray-700">{section.content}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Reviews Section */}
            <div className="mt-6">
              <p className="text-xl font-semibold mb-4">Customer Reviews</p>
              <div className="flex items-center space-x-4">
                {reviews.map((review, index) => (
                  <button
                    key={review.id}
                    onClick={() => setSelectedReview(index)}
                    className={`flex items-center space-x-3 p-2 rounded cursor-pointer ${
                      selectedReview === index ? 'bg-gray-200 text-black' : 'bg-gray-800 text-white'
                    }`}
                  >
                    <img src={review.avatar} alt={review.name} className="w-10 h-10 rounded-full" />
                    <div className="text-left">
                      <p className="font-semibold">{review.name}</p>
                      <p className="text-xs">{review.location}</p>
                    </div>
                  </button>
                ))}
              </div>
              <div className="mt-4 p-4 bg-gray-100 rounded text-black max-w-md">
                <p>"{reviews[selectedReview].comment}"</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;
