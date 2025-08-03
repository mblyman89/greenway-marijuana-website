import React, { useEffect } from 'react';
import Layout from '../components/Layout';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useResponsive from '../hooks/useResponsive';

const OrderConfirmationPage: React.FC = () => {
  const router = useRouter();
  const { orderId, pickupTime } = router.query;
  const { isMobile, isTablet } = useResponsive();

  // Redirect to home if no order ID is present
  useEffect(() => {
    if (!orderId && router.isReady) {
      router.push('/');
    }
  }, [orderId, router]);

  if (!orderId) {
    return null; // Don't render anything while redirecting
  }

  return (
    <Layout 
      title="Order Confirmation - Greenway Marijuana" 
      description="Your order has been confirmed at Greenway Marijuana."
    >
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-500 text-2xl mx-auto mb-4">
              ✓
            </div>
            <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
            <p className="text-gray-600">Thank you for your order.</p>
          </div>
          
          <div className="border-t border-b border-gray-200 py-6 mb-6">
            <div className={`flex flex-col ${isMobile ? 'space-y-4' : 'md:flex-row md:justify-between'} mb-4`}>
              <div>
                <h2 className="text-sm font-medium text-gray-500">Order Number</h2>
                <p className="font-bold">{orderId}</p>
              </div>
              <div>
                <h2 className="text-sm font-medium text-gray-500">Pickup Time</h2>
                <p className="font-bold">Today at {pickupTime}</p>
              </div>
            </div>
            
            <div>
              <h2 className="text-sm font-medium text-gray-500">Pickup Location</h2>
              <p className="font-medium">Greenway Marijuana</p>
              <p className="text-gray-600">1234 Cannabis Street, Port Orchard, WA 98366</p>
            </div>
          </div>
          
          <div className="bg-gray-100 p-4 rounded-md mb-8">
            <h2 className="font-medium mb-2">Important Information</h2>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>• You must bring a valid government-issued photo ID showing you are 21+ to pick up your order.</li>
              <li>• Your order will be held for 24 hours.</li>
              <li>• Payment is due at the time of pickup (cash only).</li>
              <li>• A confirmation email has been sent to your email address.</li>
            </ul>
          </div>
          
          <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} gap-4`}>
            <Link href="/">
              <a className="bg-primary text-white py-3 px-6 rounded-lg font-medium hover:bg-primary-dark transition text-center flex-grow">
                Continue Shopping
              </a>
            </Link>
            <Link href="/account/orders">
              <a className="bg-gray-200 text-gray-800 py-3 px-6 rounded-lg font-medium hover:bg-gray-300 transition text-center flex-grow">
                View Order History
              </a>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OrderConfirmationPage;