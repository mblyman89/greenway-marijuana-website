import React from 'react';
import Layout from '../components/Layout';
import { useCart } from '../context/CartContext';
import Link from 'next/link';
import useResponsive from '../hooks/useResponsive';

const CartPage: React.FC = () => {
  const { cartItems, removeFromCart, updateQuantity, subtotal, itemCount } = useCart();
  const { isMobile, isTablet } = useResponsive();

  return (
    <Layout title="Your Cart - Greenway Marijuana" description="View and manage your shopping cart at Greenway Marijuana.">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
        
        {cartItems.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Looks like you haven't added any products to your cart yet.</p>
            <Link href="/products">
              <a className="bg-primary text-white py-3 px-8 rounded-lg font-medium hover:bg-primary-dark transition">
                Browse Products
              </a>
            </Link>
          </div>
        ) : (
          <div className={`flex flex-col ${isMobile || isTablet ? '' : 'lg:flex-row'} gap-8`}>
            {/* Cart Items */}
            <div className={`w-full ${isMobile || isTablet ? '' : 'lg:w-2/3'}`}>
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                {/* Desktop Table View */}
                {!isMobile && (
                  <table className="w-full">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="py-4 px-6 text-left">Product</th>
                        <th className="py-4 px-6 text-center">Quantity</th>
                        <th className="py-4 px-6 text-right">Price</th>
                        <th className="py-4 px-6 text-right">Total</th>
                        <th className="py-4 px-6"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartItems.map((item) => (
                        <tr key={item.productId} className="border-b border-gray-200">
                          <td className="py-4 px-6">
                            <div className="flex items-center">
                              <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden mr-4">
                                {item.product.image ? (
                                  <img 
                                    src={item.product.image} 
                                    alt={item.product.name} 
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                                    No Image
                                  </div>
                                )}
                              </div>
                              <div>
                                <h3 className="font-medium">{item.product.name}</h3>
                                <div className="text-sm text-gray-600">{item.product.category}</div>
                                {item.product.strain && (
                                  <div className="text-sm text-gray-600">{item.product.strain}</div>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex items-center justify-center">
                              <button 
                                onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                                className="w-8 h-8 bg-gray-200 rounded-l flex items-center justify-center hover:bg-gray-300 transition"
                              >
                                -
                              </button>
                              <input 
                                type="number" 
                                value={item.quantity} 
                                onChange={(e) => updateQuantity(item.productId, parseInt(e.target.value) || 1)}
                                className="w-12 h-8 text-center border-t border-b border-gray-200"
                                min="1"
                              />
                              <button 
                                onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                                className="w-8 h-8 bg-gray-200 rounded-r flex items-center justify-center hover:bg-gray-300 transition"
                              >
                                +
                              </button>
                            </div>
                          </td>
                          <td className="py-4 px-6 text-right">
                            ${item.product.price.toFixed(2)}
                          </td>
                          <td className="py-4 px-6 text-right font-medium">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </td>
                          <td className="py-4 px-6 text-right">
                            <button 
                              onClick={() => removeFromCart(item.productId)}
                              className="text-red-500 hover:text-red-700 transition"
                            >
                              ✕
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
                
                {/* Mobile Card View */}
                {isMobile && (
                  <div className="divide-y divide-gray-200">
                    {cartItems.map((item) => (
                      <div key={item.productId} className="p-4">
                        <div className="flex items-start">
                          <div className="w-20 h-20 bg-gray-100 rounded-md overflow-hidden mr-4">
                            {item.product.image ? (
                              <img 
                                src={item.product.image} 
                                alt={item.product.name} 
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-gray-400">
                                No Image
                              </div>
                            )}
                          </div>
                          <div className="flex-grow">
                            <div className="flex justify-between">
                              <h3 className="font-medium">{item.product.name}</h3>
                              <button 
                                onClick={() => removeFromCart(item.productId)}
                                className="text-red-500 hover:text-red-700 transition"
                              >
                                ✕
                              </button>
                            </div>
                            <div className="text-sm text-gray-600">{item.product.category}</div>
                            {item.product.strain && (
                              <div className="text-sm text-gray-600">{item.product.strain}</div>
                            )}
                            <div className="mt-2 flex justify-between items-center">
                              <div className="flex items-center">
                                <button 
                                  onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                                  className="w-8 h-8 bg-gray-200 rounded-l flex items-center justify-center hover:bg-gray-300 transition"
                                >
                                  -
                                </button>
                                <input 
                                  type="number" 
                                  value={item.quantity} 
                                  onChange={(e) => updateQuantity(item.productId, parseInt(e.target.value) || 1)}
                                  className="w-10 h-8 text-center border-t border-b border-gray-200"
                                  min="1"
                                />
                                <button 
                                  onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                                  className="w-8 h-8 bg-gray-200 rounded-r flex items-center justify-center hover:bg-gray-300 transition"
                                >
                                  +
                                </button>
                              </div>
                              <div className="font-medium">
                                ${(item.product.price * item.quantity).toFixed(2)}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            {/* Order Summary */}
            <div className={`w-full ${isMobile || isTablet ? '' : 'lg:w-1/3'}`}>
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold mb-6">Order Summary</h2>
                
                <div className="flex justify-between mb-4">
                  <span className="text-gray-600">Subtotal ({itemCount} items)</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between mb-4">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">Calculated at checkout</span>
                </div>
                
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <div className="flex justify-between mb-6">
                    <span className="text-lg font-bold">Estimated Total</span>
                    <span className="text-lg font-bold">${subtotal.toFixed(2)}</span>
                  </div>
                  
                  <Link href="/checkout">
                    <a className="block w-full bg-primary text-white text-center py-3 rounded-lg font-medium hover:bg-primary-dark transition">
                      Proceed to Checkout
                    </a>
                  </Link>
                  
                  <Link href="/products">
                    <a className="block w-full text-center mt-4 text-primary hover:underline">
                      Continue Shopping
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CartPage;