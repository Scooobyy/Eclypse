import React, { useState } from 'react';
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
  const [selectedReview, setSelectedReview] = useState<number>(1);

  const toggleSection = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };

  const sizes = ['XS', 'S', 'M', 'L', 'XL'];

  const reviews: Review[] = [
    {
      id: 1,
      name: "Random Woman",
      location: "NY, USA",
      avatar: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100",
      comment: "Understated, but unforgettable. It feels like it was made for me"
    },
    {
      id: 2,
      name: "Sarah Chen",
      location: "LA, USA",
      avatar: "https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg?auto=compress&cs=tinysrgb&w=100",
      comment: "The attention to detail in this piece is remarkable. Worth every penny."
    },
    {
      id: 3,
      name: "Emma Davis",
      location: "London, UK",
      avatar: "https://images.pexels.com/photos/1898555/pexels-photo-1898555.jpeg?auto=compress&cs=tinysrgb&w=100",
      comment: "Elegant, timeless, and incredibly comfortable. Exactly what I was looking for."
    }
  ];

  return (
    <section className="py-16 bg-black">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0" style={{ height: '862px' }}>
          {/* Left Video Section */}
          <div className="lg:col-span-6" style={{ height: '862px' }}>
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

          {/* Right Product Info Section */}
          <div className="lg:col-span-6 bg-white text-black" style={{ height: '862px' }}>
            <div className="p-10 h-full flex flex-col">
              <div className="mb-6">
                <h2 className="text-3xl font-secondary font-bold mb-2">Eclipse Signature Jacket</h2>
                <div className="bg-gray-100 p-3 mb-4" style={{ width: '374px', height: '48px' }}>
                  <p className="text-sm text-gray-700">
                    Handcrafted in Italy with premium materials
                  </p>
                </div>
              </div>

              {/* Product Images */}
              <div className="flex space-x-4 mb-8">
                {[1, 2, 3].map((num) => (
                  <div 
                    key={num} 
                    className="bg-gray-100" 
                    style={{ width: '158px', height: '215px' }}
                  >
                    <img 
                      src={`https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=215&w=158`} 
                      alt={`Product view ${num}`} 
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>

              {/* Price */}
              <div className="mb-6">
                <p className="text-2xl font-semibold">$1,295.00</p>
                <p className="text-sm text-gray-500">MRP incl. of all taxes</p>
              </div>

              {/* Size Selection */}
              <div className="mb-8">
                <p className="text-sm font-medium mb-2">Select Size</p>
                <div className="flex space-x-3 size-selector">
                  {sizes.map((size) => (
                    <div key={size} className="relative">
                      <input 
                        type="radio" 
                        name="size" 
                        id={`size-${size}`} 
                        value={size}
                        checked={selectedSize === size}
                        onChange={() => setSelectedSize(size)}
                        className="sr-only"
                      />
                      <label 
                        htmlFor={`size-${size}`}
                        className="flex items-center justify-center w-12 h-12 border border-gray-300 text-sm cursor-pointer bg-gray-100 hover:bg-gray-200 transition-colors"
                      >
                        {size}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4 mb-8">
                <button className="w-1/2 bg-gray-200 text-black py-3 hover:bg-gray-300 transition-colors">
                  Add to Cart
                </button>
                <Link 
                  to="/shipping" 
                  className="w-1/2 bg-black text-white py-3 flex items-center justify-center hover:bg-gray-800 transition-colors"
                >
                  Buy Now
                </Link>
              </div>

              {/* Dropdown Sections */}
              <div className="border-t border-gray-200">
                <div className={`py-4 border-b border-gray-200 ${expandedSection === 'size' ? 'dropdown-active' : ''}`}>
                  <button 
                    className="w-full flex justify-between items-center"
                    onClick={() => toggleSection('size')}
                  >
                    <span className="font-medium">Size & Fit</span>
                    {expandedSection === 'size' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                  <div className="dropdown-content pt-2">
                    <p className="text-sm text-gray-700">
                      The model is 5'10" and wears a size Small. This piece runs true to size with a tailored fit.
                    </p>
                  </div>
                </div>

                <div className={`py-4 border-b border-gray-200 ${expandedSection === 'delivery' ? 'dropdown-active' : ''}`}>
                  <button 
                    className="w-full flex justify-between items-center"
                    onClick={() => toggleSection('delivery')}
                  >
                    <span className="font-medium">Delivery & Returns</span>
                    {expandedSection === 'delivery' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                  <div className="dropdown-content pt-2">
                    <p className="text-sm text-gray-700">
                      Free shipping on all orders. Returns accepted within 30 days of delivery.
                    </p>
                  </div>
                </div>

                <div className={`py-4 border-b border-gray-200 ${expandedSection === 'made' ? 'dropdown-active' : ''}`}>
                  <button 
                    className="w-full flex justify-between items-center"
                    onClick={() => toggleSection('made')}
                  >
                    <span className="font-medium">How This Was Made</span>
                    {expandedSection === 'made' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                  <div className="dropdown-content pt-2">
                    <p className="text-sm text-gray-700">
                      Handcrafted in our atelier in Milan using traditional techniques. Each piece takes over 40 hours to complete.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Customer Reviews Section */}
        <div className="py-32 text-white">
          <div className="container mx-auto px-4">
            <h3 className="text-xl font-medium mb-6">OUR CUSTOMERS</h3>
            <div className="flex justify-between items-start">
              <div className="flex-1 pr-8">
                {selectedReview !== null && (
                  <div>
                    <div className="text-4xl font-light mb-6">
                      "{reviews[selectedReview - 1].comment}"
                    </div>
                    <div>
                      <p className="font-medium">{reviews[selectedReview - 1].name}</p>
                      <p className="text-gray-400">{reviews[selectedReview - 1].location}</p>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex flex-col space-y-4">
                {reviews.map((review) => (
                  <button 
                    key={review.id}
                    onClick={() => setSelectedReview(review.id)}
                    className={`w-16 h-16 rounded-full overflow-hidden transition-opacity ${
                      selectedReview === review.id ? 'opacity-100' : 'opacity-50'
                    }`}
                  >
                    <img 
                      src={review.avatar} 
                      alt={review.name}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;