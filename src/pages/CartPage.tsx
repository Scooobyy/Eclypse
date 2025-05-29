import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Trash2, Plus, Minus } from 'lucide-react';
import { auth } from '../../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import toast from 'react-hot-toast';
import { useCart } from '../context/CartContext'; // adjust path as per your folder structure

const CartPage: React.FC = () => {
  const { cartItems, increaseQty, decreaseQty, deleteItem, totalPrice } = useCart();
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleCheckout = () => {
    if (!user) {
      toast.error('⚠️ Please log in to place an order.', {
        style: {
          borderRadius: '8px',
          background: '#333',
          color: '#fff',
        },
      });
      navigate('/login');
      return;
    }

    if (cartItems.length === 0) {
      toast.error('⚠️ Your cart is empty.');
      return;
    }

    navigate('/shipping', { state: { cartItems, totalPrice } });
  };

  return (
    <div className="bg-white min-h-screen">
      <header className="py-6 border-b border-gray-200">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/explore" className="text-black mr-6">
              <ArrowLeft size={20} />
            </Link>
            <Link to="/" className="text-2xl font-secondary text-black">
              ECLYPSE
            </Link>
          </div>
        </div>
      </header>

      <main className="py-12">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row lg:space-x-8">
          {/* Cart Items List */}
          <div className="w-full lg:w-[731px] mb-10 lg:mb-0">
            <h1 className="text-2xl font-semibold mb-6 text-black">Shopping Cart</h1>
            {cartItems.length === 0 ? (
              <p className="text-gray-600">Your cart is empty.</p>
            ) : (
              <div>
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between border-b border-gray-300 py-4"
                  >
                    <div>
                      <h2 className="text-lg font-semibold text-black">{item.name}</h2>
                      <p className="text-black">
                        Price:{' '}
                        {item.price.toLocaleString('en-IN', {
                          style: 'currency',
                          currency: 'INR',
                        })}
                      </p>
                    </div>

                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => decreaseQty(item.id)}
                        className="p-1 border border-gray-400 rounded hover:bg-gray-200"
                        aria-label={`Decrease quantity of ${item.name}`}
                      >
                        <Minus size={16} />
                      </button>

                      <span className="w-8 text-center text-lg font-medium text-black">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => increaseQty(item.id)}
                        className="p-1 border border-gray-400 rounded hover:bg-gray-200"
                        aria-label={`Increase quantity of ${item.name}`}
                      >
                        <Plus size={16} />
                      </button>

                      <button
                        onClick={() => deleteItem(item.id)}
                        className="p-1 text-red-600 hover:text-red-800"
                        aria-label={`Remove ${item.name} from cart`}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-[572px] bg-gray-100 p-8 text-black rounded">
            <h2 className="text-2xl font-semibold mb-6">Order Summary</h2>

            {cartItems.length === 0 ? (
              <p className="text-gray-600">Add some items to your cart.</p>
            ) : (
              <>
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between mb-4 border-b border-gray-300 pb-2"
                  >
                    <span>
                      {item.name} × {item.quantity}
                    </span>
                    <span>
                      {(item.price * item.quantity).toLocaleString('en-IN', {
                        style: 'currency',
                        currency: 'INR',
                      })}
                    </span>
                  </div>
                ))}

                <div className="flex justify-between font-semibold text-lg border-t border-gray-300 pt-4 mt-4">
                  <span>Total</span>
                  <span>
                    {totalPrice.toLocaleString('en-IN', {
                      style: 'currency',
                      currency: 'INR',
                    })}
                  </span>
                </div>

                <button
                  className="w-full mt-6 bg-black text-white py-4 text-lg font-semibold hover:bg-gray-900 transition-colors"
                  onClick={handleCheckout}
                >
                  Proceed to Checkout
                </button>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default CartPage;
