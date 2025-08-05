import React, { useState, useEffect } from 'react';
import useResponsive from '../hooks/useResponsive';

interface AgeVerificationProps {
  onVerify: (isAdult: boolean) => void;
}

const AgeVerification: React.FC<AgeVerificationProps> = ({ onVerify }) => {
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const { isMobile, isTablet } = useResponsive();

  useEffect(() => {
    // Check if age has been verified before
    const checkAgeVerification = () => {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith('ageVerified=')) {
          const value = cookie.substring('ageVerified='.length, cookie.length);
          if (value === 'true') {
            onVerify(true);
            return;
          }
        }
      }
    };

    checkAgeVerification();
  }, [onVerify]);

  const handleVerify = (isAdult: boolean) => {
    if (isAdult) {
      // Set cookie if remember me is checked
      if (rememberMe) {
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + 30);
        document.cookie = `ageVerified=true; expires=${expiryDate.toUTCString()}; path=/`;
      } else {
        // Set session cookie
        document.cookie = 'ageVerified=true; path=/';
      }
    }
    
    onVerify(isAdult);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-gradient-to-b from-green-900 to-black">
      <div className="relative bg-black bg-opacity-80 border-2 border-green-500 rounded-xl p-8 md:p-10 text-center max-w-md w-full shadow-2xl">
        {/* Decorative cannabis leaf patterns - top left and right corners */}
        <div className="absolute top-0 left-0 w-16 h-16 opacity-20 -translate-x-1/2 -translate-y-1/2">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-green-500">
            <path d="M12,3.9c0,0-4.1,3.9-4.1,8.1c0,4.2,4.1,8.1,4.1,8.1s4.1-3.9,4.1-8.1C16.1,7.8,12,3.9,12,3.9z M12,18.5 c-0.8-0.9-2.7-3.3-2.7-6.5c0-3.2,1.9-5.6,2.7-6.5c0.8,0.9,2.7,3.3,2.7,6.5C14.7,15.2,12.8,17.6,12,18.5z"/>
            <path d="M12,3.9c0,0-4.1,3.9-4.1,8.1c0,4.2,4.1,8.1,4.1,8.1s4.1-3.9,4.1-8.1C16.1,7.8,12,3.9,12,3.9z M12,18.5 c-0.8-0.9-2.7-3.3-2.7-6.5c0-3.2,1.9-5.6,2.7-6.5c0.8,0.9,2.7,3.3,2.7,6.5C14.7,15.2,12.8,17.6,12,18.5z"/>
          </svg>
        </div>
        <div className="absolute top-0 right-0 w-16 h-16 opacity-20 translate-x-1/2 -translate-y-1/2">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-green-500">
            <path d="M12,3.9c0,0-4.1,3.9-4.1,8.1c0,4.2,4.1,8.1,4.1,8.1s4.1-3.9,4.1-8.1C16.1,7.8,12,3.9,12,3.9z M12,18.5 c-0.8-0.9-2.7-3.3-2.7-6.5c0-3.2,1.9-5.6,2.7-6.5c0.8,0.9,2.7,3.3,2.7,6.5C14.7,15.2,12.8,17.6,12,18.5z"/>
            <path d="M12,3.9c0,0-4.1,3.9-4.1,8.1c0,4.2,4.1,8.1,4.1,8.1s4.1-3.9,4.1-8.1C16.1,7.8,12,3.9,12,3.9z M12,18.5 c-0.8-0.9-2.7-3.3-2.7-6.5c0-3.2,1.9-5.6,2.7-6.5c0.8,0.9,2.7,3.3,2.7,6.5C14.7,15.2,12.8,17.6,12,18.5z"/>
          </svg>
        </div>
        
        {/* Logo */}
        <div className="mb-6 transform hover:scale-105 transition-transform duration-300">
          <img 
            src="/images/cloud-logo.png" 
            alt="Greenway Marijuana Logo" 
            className="w-48 md:w-64 mx-auto drop-shadow-2xl"
          />
        </div>
        
        {/* Content */}
        <div className="space-y-6">
          <h1 className="text-2xl md:text-3xl font-bold text-green-400 mb-2">
            Welcome to Greenway Marijuana
          </h1>
          
          <p className="text-white text-lg">
            You must be 21 years or older to enter this website.
            <br />Please verify your age to continue.
          </p>
          
          <div className="flex flex-col gap-4 mt-6">
            <button 
              className="bg-gradient-to-r from-green-500 to-green-600 text-white border-none py-4 px-8 rounded-lg font-bold text-lg hover:from-green-600 hover:to-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
              onClick={() => handleVerify(true)}
            >
              YES, I AM 21 OR OLDER
            </button>
            
            <button 
              className="bg-transparent text-white border-2 border-white py-4 px-8 rounded-lg font-bold text-lg hover:bg-white hover:bg-opacity-10 transition-all duration-300"
              onClick={() => handleVerify(false)}
            >
              NO, I AM UNDER 21
            </button>
          </div>
          
          <div className="flex items-center justify-center mt-6">
            <input 
              type="checkbox" 
              id="rememberMe" 
              className="w-5 h-5 accent-green-500"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label htmlFor="rememberMe" className="text-white ml-2 text-lg">
              Remember me for 30 days
            </label>
          </div>
        </div>
        
        {/* Legal text */}
        <div className="mt-8 pt-6 border-t border-gray-700">
          <p className="text-gray-400 text-sm">
            By entering this site you are agreeing to the Terms of Use and Privacy Policy. 
            Cannabis products are for use only by adults 21 years of age or older. 
            Cannabis use during pregnancy or breastfeeding poses potential harms. 
            It is illegal to drive while under the influence of cannabis.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AgeVerification;
