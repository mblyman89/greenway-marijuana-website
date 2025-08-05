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
    
    // Prevent scrolling of the background
    document.body.style.overflow = 'hidden';
    
    return () => {
      // Restore scrolling when component unmounts
      document.body.style.overflow = '';
    };
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
    
    // Restore scrolling
    document.body.style.overflow = '';
    
    onVerify(isAdult);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gradient-to-br from-green-900 to-green-950 overflow-auto">
      <div className="relative bg-black border border-green-500 p-4 sm:p-6 md:p-8 text-center max-w-md w-full mx-2 sm:mx-4 my-auto flex flex-col min-h-[500px] justify-between">
        {/* Logo */}
        <div className="mb-2 sm:mb-4">
          <img 
            src="/images/cloud-logo.png" 
            alt="Greenway Marijuana Logo" 
            className="w-32 sm:w-40 md:w-48 mx-auto"
          />
        </div>
        
        {/* Content */}
        <div className="space-y-2 sm:space-y-4 flex-grow flex flex-col justify-center">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-green-400">
            Welcome to Greenway Marijuana
          </h1>
          
          <p className="text-white text-sm sm:text-base">
            You must be 21 years or older to enter this website.
            <br />Please verify your age to continue.
          </p>
          
          <div className="flex flex-col gap-3 sm:gap-4 mt-4">
            <button 
              className="bg-green-500 text-white py-2 sm:py-3 px-4 sm:px-6 font-bold text-base sm:text-lg hover:bg-green-600 transition-colors duration-300"
              onClick={() => handleVerify(true)}
            >
              YES, I AM 21 OR OLDER
            </button>
            
            <button 
              className="bg-transparent text-white border border-white py-2 sm:py-3 px-4 sm:px-6 font-bold text-base sm:text-lg hover:bg-white hover:bg-opacity-10 transition-colors duration-300"
              onClick={() => handleVerify(false)}
            >
              NO, I AM UNDER 21
            </button>
          </div>
          
          <div className="flex items-center justify-center mt-3 sm:mt-4">
            <input 
              type="checkbox" 
              id="rememberMe" 
              className="w-4 h-4"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label htmlFor="rememberMe" className="text-white ml-2 text-xs sm:text-sm">
              Remember me for 30 days
            </label>
          </div>
        </div>
        
        {/* Legal text */}
        <div className="mt-4 sm:mt-6 pt-2 sm:pt-4 border-t border-gray-700">
          <p className="text-gray-400 text-xs text-center">
            By entering this site you are agreeing to the Terms of Use and Privacy Policy. 
            Cannabis products are for use only by adults 21 years of age or older. 
            Cannabis use during pregnancy or breastfeeding poses potential harms. It is 
            illegal to drive while under the influence of cannabis.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AgeVerification;
