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
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
      <div className="bg-black border-2 border-primary rounded-lg p-6 md:p-10 text-center max-w-md w-full">
        <img 
          src="/images/logo.png" 
          alt="Greenway Marijuana Logo" 
          className={`${isMobile ? 'w-36' : 'w-48'} mx-auto mb-6`}
        />
        
        <h1 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold text-primary mb-4`}>
          Welcome to Greenway Marijuana
        </h1>
        
        <p className="text-white mb-6">
          You must be 21 years or older to enter this website. 
          Please verify your age to continue.
        </p>
        
        <div className="flex flex-col gap-4">
          <button 
            className="bg-primary text-white border-none py-3 px-6 rounded font-medium hover:bg-primary-dark transition"
            onClick={() => handleVerify(true)}
          >
            YES, I AM 21 OR OLDER
          </button>
          
          <button 
            className="bg-transparent text-gray-300 border border-gray-300 py-3 px-6 rounded font-medium hover:bg-gray-900 transition"
            onClick={() => handleVerify(false)}
          >
            NO, I AM UNDER 21
          </button>
        </div>
        
        <div className="flex items-center justify-center mt-6">
          <input 
            type="checkbox" 
            id="rememberMe" 
            className="w-4 h-4 accent-primary"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          <label htmlFor="rememberMe" className="text-white ml-2">
            Remember me for 30 days
          </label>
        </div>
        
        <p className="text-gray-400 text-xs mt-6">
          By entering this site you are agreeing to the Terms of Use and Privacy Policy. 
          Cannabis products are for use only by adults 21 years of age or older. 
          Cannabis use during pregnancy or breastfeeding poses potential harms. 
          It is illegal to drive while under the influence of cannabis.
        </p>
      </div>
    </div>
  );
};

export default AgeVerification;