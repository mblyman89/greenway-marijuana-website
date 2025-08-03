import React from 'react';
import Link from 'next/link';
import { useCart } from '../context/CartContext';
import useResponsive from '../hooks/useResponsive';
import LazyImage from './LazyImage';

interface ResponsiveProductCardProps {
  id: string;
  name: string;
  category: string;
  image: string;
  price: number;
  salePrice?: number;
  thcContent?: string;
  cbdContent?: string;
  strain?: string;
  quantity?: string;
}

const ResponsiveProductCard: React.FC<ResponsiveProductCardProps> = ({
  id,
  name,
  category,
  image,
  price,
  salePrice,
  thcContent,
  cbdContent,
  strain,
  quantity
}) => {
  const { addToCart } = useCart();
  const { isMobile, isTablet } = useResponsive();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(id, 1);
  };

  const isOnSale = salePrice !== undefined && salePrice < price;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition transform hover:-translate-y-1">
      <Link href={`/products/${id}`}>
        <a className="block">
          <div className="h-48 bg-gray-100 flex items-center justify-center overflow-hidden relative">
            {image ? (
              <LazyImage 
                src={image} 
                alt={name} 
                className="w-full h-full object-cover"
                placeholderColor="#f3f4f6"
              />
            ) : (
              <div className="text-gray-400">No Image</div>
            )}
            
            {isOnSale && (
              <div className="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 text-xs font-bold">
                SALE
              </div>
            )}
          </div>
          
          <div className="p-4">
            <div className="text-primary text-xs uppercase">{category}</div>
            <h3 className="font-medium text-lg mb-2 line-clamp-2">{name}</h3>
            
            {/* Responsive product details */}
            <div className={`flex ${isMobile ? 'flex-col gap-1' : 'justify-between'} text-sm text-gray-600 mb-3`}>
              {thcContent && <span>THC: {thcContent}</span>}
              {cbdContent && <span>CBD: {cbdContent}</span>}
              {strain && <span>{strain}</span>}
              {quantity && <span>{quantity}</span>}
            </div>
            
            <div className="font-bold text-lg mb-3">
              {isOnSale ? (
                <div className="flex items-center">
                  <span className="text-red-500">${salePrice.toFixed(2)}</span>
                  <span className="text-gray-400 line-through text-sm ml-2">${price.toFixed(2)}</span>
                </div>
              ) : (
                <span>${price.toFixed(2)}</span>
              )}
            </div>
            
            <button 
              onClick={handleAddToCart}
              className="w-full bg-primary text-white py-2 rounded font-medium hover:bg-primary-dark transition"
              aria-label={`Add ${name} to cart`}
            >
              Add to Cart
            </button>
          </div>
        </a>
      </Link>
    </div>
  );
};

export default ResponsiveProductCard;