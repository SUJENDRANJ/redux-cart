import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { removeFromCart, clearCart } from '../store/cartSlice';
import { Minus, ShoppingCart, Trash2 } from 'lucide-react';

export const Cart: React.FC = () => {
  const cart = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-center gap-2 text-gray-500">
          <ShoppingCart size={24} />
          <p>Your cart is empty</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Shopping Cart</h2>
        <button
          onClick={() => dispatch(clearCart())}
          className="text-red-600 hover:text-red-700 flex items-center gap-1"
        >
          <Trash2 size={16} />
          Clear Cart
        </button>
      </div>
      <div className="divide-y">
        {cart.map((item) => (
          <div key={item.id} className="py-4 flex items-center gap-4">
            <img
              src={item.image}
              alt={item.title}
              className="w-16 h-16 object-cover rounded"
            />
            <div className="flex-1">
              <h3 className="font-medium">{item.title}</h3>
              <p className="text-gray-600">
                ${item.price.toFixed(2)} x {item.quantity}
              </p>
            </div>
            <button
              onClick={() => dispatch(removeFromCart(item.id))}
              className="p-2 text-red-600 hover:bg-red-50 rounded-full"
            >
              <Minus size={16} />
            </button>
          </div>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t">
        <div className="flex items-center justify-between text-xl font-semibold">
          <span>Total:</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};