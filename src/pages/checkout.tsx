import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { useCart } from '../context/CartContext';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useResponsive from '../hooks/useResponsive';

interface CheckoutFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  pickupTime: string;
  agreeTerms: boolean;
}

const CheckoutPage: React.FC = () => {
  const { cartItems, subtotal, clearCart } = useCart();
  const router = useRouter();
  const { isMobile, isTablet } = useResponsive();
  const [formData, setFormData] = useState<CheckoutFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    pickupTime: '',
    agreeTerms: false,
  });
  const [errors, setErrors] = useState<Partial<CheckoutFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Generate pickup time options (every 30 minutes from now until closing time)
  const generatePickupTimes = () => {
    const times = [];
    const now = new Date();
    const closing = new Date();
    closing.setHours(21, 0, 0); // 9:00 PM closing time
    
    // Round up to the nearest 30 minutes
    const minutes = now.getMinutes();
    const roundedMinutes = minutes < 30 ? 30 : 60;
    now.setMinutes(roundedMinutes, 0, 0);
    
    // Add 30 minute increments until closing time
    let current = new Date(now);
    while (current <= closing) {
      const timeString = current.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      times.push(timeString);
      current.setMinutes(current.getMinutes() + 30);
    }
    
    return times;
  };

  const pickupTimes = generatePickupTimes();

  useEffect(() => {
    // Redirect to cart if cart is empty
    if (cartItems.length === 0) {
      router.push('/cart');
    }
  }, [cartItems, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Clear error when field is edited
    if (errors[name as keyof CheckoutFormData]) {
      setErrors({
        ...errors,
        [name]: undefined,
      });
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      [name]: checked,
    });
    
    // Clear error when field is edited
    if (errors[name as keyof CheckoutFormData]) {
      setErrors({
        ...errors,
        [name]: undefined,
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<CheckoutFormData> = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }
    
    if (!formData.pickupTime) {
      newErrors.pickupTime = 'Pickup time is required';
    }
    
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = 'You must agree to the terms';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Simulate order processing
      setTimeout(() => {
        // In a real app, this would submit to an API
        console.log('Order submitted:', { items: cartItems, customer: formData });
        
        // Clear cart and redirect to confirmation page
        clearCart();
        router.push({
          pathname: '/order-confirmation',
          query: { 
            orderId: `GW-${Date.now().toString().slice(-6)}`,
            pickupTime: formData.pickupTime
          }
        });
      }, 1500);
    }
  };

  // Calculate tax (assume 10% for cannabis products)
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  return (
    <Layout title="Checkout - Greenway Marijuana" description="Complete your order at Greenway Marijuana.">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        
        <div className={`flex flex-col ${isMobile || isTablet ? '' : 'lg:flex-row'} gap-8`}>
          {/* Checkout Form */}
          <div className={`w-full ${isMobile || isTablet ? '' : 'lg:w-2/3'}`}>
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-6">Customer Information</h2>
              
              <div className={`grid grid-cols-1 ${isMobile ? '' : 'md:grid-cols-2'} gap-6 mb-6`}>
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                    First Name*
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`w-full border ${errors.firstName ? 'border-red-500' : 'border-gray-300'} rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name*
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={`w-full border ${errors.lastName ? 'border-red-500' : 'border-gray-300'} rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                  )}
                </div>
              </div>
              
              <div className={`grid grid-cols-1 ${isMobile ? '' : 'md:grid-cols-2'} gap-6 mb-6`}>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address*
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number*
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                  )}
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="pickupTime" className="block text-sm font-medium text-gray-700 mb-1">
                  Pickup Time*
                </label>
                <select
                  id="pickupTime"
                  name="pickupTime"
                  value={formData.pickupTime}
                  onChange={handleChange}
                  className={`w-full border ${errors.pickupTime ? 'border-red-500' : 'border-gray-300'} rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
                >
                  <option value="">Select a pickup time</option>
                  {pickupTimes.map((time, index) => (
                    <option key={index} value={time}>
                      Today at {time}
                    </option>
                  ))}
                </select>
                {errors.pickupTime && (
                  <p className="text-red-500 text-sm mt-1">{errors.pickupTime}</p>
                )}
              </div>
              
              <div className="mb-6">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="agreeTerms"
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={handleCheckboxChange}
                    className={`w-4 h-4 ${errors.agreeTerms ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  <label htmlFor="agreeTerms" className="ml-2 text-sm text-gray-700">
                    I confirm I am 21 years of age or older and agree to the <a href="/terms-of-service" className="text-primary hover:underline">Terms of Service</a>*
                  </label>
                </div>
                {errors.agreeTerms && (
                  <p className="text-red-500 text-sm mt-1">{errors.agreeTerms}</p>
                )}
              </div>
              
              <div className="bg-gray-100 p-4 rounded-md mb-6">
                <h3 className="font-medium mb-2">Important Information</h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• You must bring a valid government-issued photo ID showing you are 21+ to pick up your order.</li>
                  <li>• Orders not picked up within 24 hours will be canceled.</li>
                  <li>• Payment is due at the time of pickup (cash only).</li>
                </ul>
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-primary-dark transition ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? 'Processing...' : 'Place Order'}
              </button>
            </form>
          </div>
          
          {/* Order Summary */}
          <div className={`w-full ${isMobile || isTablet ? '' : 'lg:w-1/3'}`}>
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>
              
              <div className="max-h-80 overflow-y-auto mb-6">
                {cartItems.map((item) => (
                  <div key={item.productId} className="flex items-center py-4 border-b border-gray-200">
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
                    <div className="flex-grow">
                      <h3 className="font-medium">{item.product.name}</h3>
                      <div className="text-sm text-gray-600">Qty: {item.quantity}</div>
                    </div>
                    <div className="font-medium">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax (10%)</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 pt-3 mt-3">
                  <div className="flex justify-between">
                    <span className="font-bold">Total</span>
                    <span className="font-bold">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              <Link href="/cart">
                <a className="block w-full text-center text-primary hover:underline">
                  Edit Cart
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CheckoutPage;