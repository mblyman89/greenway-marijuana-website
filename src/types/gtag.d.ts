// Type definitions for Google Analytics gtag.js
interface Window {
  gtag?: (...args: any[]) => void;
}

// Google Analytics gtag function
declare function gtag(...args: any[]): void;
