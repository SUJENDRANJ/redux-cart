import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { removeFromCart, clearCart } from '../store/cartSlice';
import { Link } from 'react-router-dom';
import { Minus, ShoppingBag, Trash2, ArrowLeft } from 'lucide-react';

export const CartPage: React.FC = () => {
  const cart = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <ShoppingBag size={48} className="mx-auto text-gray-400 mb-4" />
          <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Looks like you haven't added any items to your cart yet.</p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
          >
            <ArrowLeft size={20} />
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Shopping Cart</h1>
          <button
            onClick={() => dispatch(clearCart())}
            className="text-red-600 hover:text-red-700 flex items-center gap-1"
          >
            <Trash2 size={20} />
            Clear Cart
          </button>
        </div>
        <div className="divide-y">
          {cart.map((item) => (
            <div key={item.id} className="py-6 flex items-center gap-6">
              <img
                src={item.image}
                alt={item.title}
                className="w-24 h-24 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h3 className="text-lg font-medium">{item.title}</h3>
                <p className="text-gray-600 mt-1">{item.description}</p>
                <div className="mt-2 flex items-center gap-4">
                  <p className="text-lg font-semibold">${item.price.toFixed(2)}</p>
                  <span className="text-gray-500">×</span>
                  <p className="text-gray-600">{item.quantity}</p>
                </div>
              </div>
              <button
                onClick={() => dispatch(removeFromCart(item.id))}
                className="p-2 text-red-600 hover:bg-red-50 rounded-full"
              >
                <Minus size={20} />
              </button>
            </div>
          ))}
        </div>
        <div className="mt-8 pt-6 border-t">
          <div className="flex items-center justify-between text-2xl font-bold">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <button className="mt-6 w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors">
            Proceed to Checkout
          </button>
          <Link
            to="/"
            className="mt-4 w-full flex items-center justify-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft size={20} />
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};