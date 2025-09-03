import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ 
  icon: Icon, 
  title, 
  description, 
  className = "" 
}) => {
  return (
    <div className={`
      bg-surface border border-border rounded-2xl sm:rounded-full px-4 sm:px-6 py-4
      hover:shadow-lg hover:border-highlight/30 transition-all duration-300
      group cursor-pointer flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4
      ${className}
    `}>
      {/* Circle Icon Container */}
      <div className="
        flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 
        bg-primary rounded-full
        flex items-center justify-center
        group-hover:bg-primary-hover transition-all duration-300
        shadow-md group-hover:shadow-lg
      ">
        <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
      </div>
      
      {/* Content */}
      <div className="flex-1 min-w-0">
        <h3 className="
          text-base sm:text-lg font-semibold text-foreground mb-1
          group-hover:text-primary transition-colors duration-300
        ">
          {title}
        </h3>
        <p className="
          text-xs sm:text-sm text-muted-foreground leading-relaxed
          group-hover:text-foreground/80 transition-colors duration-300
        ">
          {description}
        </p>
      </div>
    </div>
  );
};

export default ServiceCard;
