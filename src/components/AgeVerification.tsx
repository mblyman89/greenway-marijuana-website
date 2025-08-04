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
