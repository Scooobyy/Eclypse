import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { auth, db } from '../../firebase';  // Adjust path as needed
import { doc, getDoc, setDoc, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import toast from 'react-hot-toast';

interface FormState {
  firstName: string;
  lastName: string;
  address: string;
  apartment: string;
  city: string;
  state: string;
  zip: string;
  email: string;
  phone: string;
}

interface CartItem {
  id: string;
  name: string;
  quantity: number;
  price: number; // Price per unit
}

const ShippingPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Get cartItems and totalPrice from location.state safely
  const { cartItems: locationCartItems, totalPrice: locationTotalPrice } = (location.state as {
    cartItems: CartItem[];
    totalPrice: number;
  }) || { cartItems: [], totalPrice: 0 };

  // If cart data not passed or empty, redirect to /cart
  useEffect(() => {
    if (!location.state || !locationCartItems.length) {
      navigate('/cart');
    }
  }, [location.state, locationCartItems.length, navigate]);

  // Form state
  const [formState, setFormState] = useState<FormState>({
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    zip: '',
    email: '',
    phone: '',
  });

  // Cart items and total price from location.state
  const [cartItems] = useState<CartItem[]>(locationCartItems);
  const totalPrice = locationTotalPrice ?? 0;

  // Load user shipping data on mount
  useEffect(() => {
    const fetchShippingData = async () => {
      if (!auth.currentUser) {
        console.log('User not logged in');
        return;
      }
      try {
        const docRef = doc(db, 'shippingAddresses', auth.currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setFormState(docSnap.data() as FormState);
        }
      } catch (error) {
        console.error('Error fetching shipping data:', error);
        toast.error('Failed to load shipping data.');
      }
    };
    fetchShippingData();
  }, []);

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  // Save shipping info to Firestore
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!auth.currentUser) {
      toast.error('You must be logged in to save shipping information.');
      return;
    }

    try {
      await setDoc(doc(db, 'shippingAddresses', auth.currentUser.uid), formState);
      toast.success('🚚 Shipping information saved successfully!', {
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
        iconTheme: {
          primary: '#4ade80',
          secondary: '#000',
        },
      });
    } catch (error) {
      console.error('Error saving shipping information:', error);
      toast.error('Failed to save shipping information.');
    }
  };

  // Place order and save to Firestore
  const placeOrder = async () => {
    if (!auth.currentUser) {
      toast.error('You must be logged in to place an order.');
      return;
    }

    try {
      const orderData = {
        userId: auth.currentUser.uid,
        items: cartItems,
        shipping: formState,
        totalPrice,
        createdAt: serverTimestamp(),
        status: 'pending',
      };

      await addDoc(collection(db, 'orders'), orderData);

      toast.success('Order placed successfully!');

      // Clear cart by navigating with empty state or implement your cart context clearing here
      navigate('/', { state: { cartItems: [], totalPrice: 0 } });
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error('Failed to place order. Please try again.');
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <header className="py-6 border-b border-gray-200">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="text-black mr-6" aria-label="Go back">
              <ArrowLeft size={20} />
            </Link>
            <Link to="/" className="text-2xl font-secondary text-black">
              ECLYPSE
            </Link>
          </div>
        </div>
      </header>

      <main className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row lg:space-x-8">
            {/* Shipping Address Form */}
            <div className="w-full lg:w-[731px] mb-10 lg:mb-0">
              <h1 className="text-2xl font-semibold mb-6">Shipping Address</h1>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formState.firstName}
                      onChange={handleChange}
                      className="w-full border border-gray-300 px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-gray-500"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formState.lastName}
                      onChange={handleChange}
                      className="w-full border border-gray-300 px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-gray-500"
                      required
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                    Street Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formState.address}
                    onChange={handleChange}
                    className="w-full border border-gray-300 px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-gray-500"
                    required
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="apartment" className="block text-sm font-medium text-gray-700 mb-1">
                    Apartment, suite, etc. (optional)
                  </label>
                  <input
                    type="text"
                    id="apartment"
                    name="apartment"
                    value={formState.apartment}
                    onChange={handleChange}
                    className="w-full border border-gray-300 px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-gray-500"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formState.city}
                      onChange={handleChange}
                      className="w-full border border-gray-300 px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-gray-500"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                      State
                    </label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      value={formState.state}
                      onChange={handleChange}
                      className="w-full border border-gray-300 px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-gray-500"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="zip" className="block text-sm font-medium text-gray-700 mb-1">
                      ZIP Code
                    </label>
                    <input
                      type="text"
                      id="zip"
                      name="zip"
                      value={formState.zip}
                      onChange={handleChange}
                      className="w-full border border-gray-300 px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-gray-500"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      className="w-full border border-gray-300 px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-gray-500"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formState.phone}
                      onChange={handleChange}
                      className="w-full border border-gray-300 px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-gray-500"
                      required
                    />
                  </div>
                </div>

                <div className="flex space-x-4 mb-10">
                  <Link
                    to="/"
                    className="px-6 py-3 border border-gray-300 text-black hover:bg-gray-100 transition-colors"
                  >
                    Cancel
                  </Link>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-black text-white hover:bg-gray-800 transition-colors"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>

            {/* Order Summary with black background and white text */}
            <div className="w-full lg:w-[490px] bg-black text-white rounded-md p-8">
              <h2 className="text-2xl font-semibold mb-6">Order Summary</h2>

              <div className="mb-6 max-h-[240px] overflow-auto">
                {cartItems.length === 0 ? (
                  <p>Your cart is empty.</p>
                ) : (
                  cartItems.map(item => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between mb-4"
                    >
                      <div>
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-sm text-gray-300">Quantity: {item.quantity}</p>
                      </div>
                      <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))
                )}
              </div>

              <div className="flex justify-between border-t border-gray-600 pt-6">
                <span className="text-xl font-semibold">Total Price</span>
                <span className="text-xl font-semibold">${totalPrice.toFixed(2)}</span>
              </div>

              <button
                onClick={placeOrder}
                className="mt-6 w-full bg-white text-black py-3 rounded hover:bg-gray-200 transition"
              >
                Proceed to payment
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ShippingPage;
