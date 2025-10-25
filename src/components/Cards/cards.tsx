import React from 'react';
import Image from 'next/image';

interface RetailCardProps {
  title: string;
  description: string;
  image?: string;
  className?: string;
  onClick?: () => void;
}

const RetailCard: React.FC<RetailCardProps> = ({ 
  title, 
  description, 
  image = "https://via.placeholder.com/400x600",
  className = "",
  onClick
}) => {
  return (
    <div 
      className={`w-80 sm:w-96 md:w-100 h-80 sm:h-96 md:h-120 rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden ${onClick ? 'cursor-pointer' : ''} ${className}`}
      onClick={onClick}
    >
      <div className="relative h-full w-full">
        {/* Background Image */}
        <Image 
          src={image}
          alt={title}
          fill
          className="object-cover"
          loading="lazy"
          quality={80}
          sizes="(max-width: 640px) 320px, (max-width: 768px) 384px, 400px"
        />
        
        {/* Overlay with Label and Description */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent">
          <div className="absolute bottom-0 left-0 p-4 sm:p-6 md:p-8 text-white">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3">{title}</h3>
            <p className="text-xs sm:text-sm leading-relaxed opacity-90 max-w-xs">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RetailCard;