"use client";

import React from 'react';


interface Location {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
}

interface CompanyMapProps {
  locations: Location[];
  height?: string;
}

const CompanyMap: React.FC<CompanyMapProps> = ({ locations }) => {
  
  // Use the first location for the map
  const mainLocation = locations[0];
  
  // Create Google Maps iframe URL with marker
  // Using the exact coordinates for precise pin placement
  const mapUrl = `https://www.google.com/maps?q=${mainLocation.lat},${mainLocation.lng}&z=16&output=embed`;

  return (
    <div className="w-full h-full flex flex-col">

      
      {/* Google Maps iframe */}
      <div className="w-full flex-1 rounded-lg overflow-hidden">
        <iframe
          src={mapUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={`Map showing ${mainLocation.name}`}
        />
      </div>
    </div>
  );
};

export default CompanyMap;
