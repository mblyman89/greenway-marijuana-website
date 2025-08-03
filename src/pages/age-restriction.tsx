import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import useResponsive from '../hooks/useResponsive';

const AgeRestriction: React.FC = () => {
  const { isMobile, isTablet } = useResponsive();
  
  return (
    <>
      <Head>
        <title>Age Restriction - Greenway Marijuana</title>
        <meta name="description" content="You must be 21 years or older to access this website." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-center px-4">
        <div className="max-w-md">
          <img 
            src="/images/logo.png" 
            alt="Greenway Marijuana Logo" 
            className={`${isMobile ? 'w-32' : 'w-40'} mx-auto mb-8`}
          />
          
          <h1 className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold text-white mb-6`}>
            Age Restriction
          </h1>
          
          <div className="bg-red-600 text-white p-4 rounded-lg mb-8">
            <p className={`${isMobile ? 'text-base' : 'text-lg'} font-medium`}>
              You must be 21 years or older to access this website.
            </p>
          </div>
          
          <p className="text-gray-300 mb-8">
            Greenway Marijuana sells cannabis products that are only available to adults 
            21 years of age or older. Please come back when you're 21.
          </p>
          
          <div className="flex justify-center">
            <a 
              href="https://www.google.com" 
              className="bg-white text-black py-3 px-8 rounded font-medium hover:bg-gray-200 transition"
            >
              Exit to Google
            </a>
          </div>
          
          <p className="text-gray-500 text-sm mt-12">
            Cannabis products may be purchased or possessed only by persons 21 years of age or older.
          </p>
        </div>
      </div>
    </>
  );
};

export default AgeRestriction;