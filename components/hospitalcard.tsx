"use client";
import React from 'react';

// Final, unified Hospital interface
export interface Hospital {
  id: number;
  name: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country?: string;
  };  
  rating: number;
  specialty: string;
  profileImage?: string; // Use the more descriptive name and make it optional
}

interface HospitalCardProps {
  hospital: Hospital;
  onViewDetails?: (hospital: Hospital) => void;
}

const HospitalCard: React.FC<HospitalCardProps> = ({ hospital, onViewDetails }) => {
  
  const handleViewDetails = async () => {
    if (onViewDetails) {
      try {
        // Fetch full hospital details from backend using hospital.id
        const { apiClient } = require("../lib/apiClient");
        const response = await apiClient.get(`/hospitals/${hospital.id}`);
        if (response && response.hospital) {
          onViewDetails(response.hospital);
        } else {
          // fallback to current hospital if backend fails
          onViewDetails(hospital);
        }
      } catch (error) {
        // fallback to current hospital if error
        onViewDetails(hospital);
      }
    }
  };

  console.log("Rendering HospitalCard for:", hospital);

  return (
    <div 
      className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow w-full max-w-sm mx-auto lg:mx-0 cursor-pointer" 
      onClick={handleViewDetails}
    >
      {/* Hospital Image or Illustration */}
      <div className="aspect-[4/3] md:aspect-[3/2] lg:aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
        {hospital.profileImage ? (
          <img
            src={hospital.profileImage}
            alt={hospital.name}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center">
            {/* Hospital bed illustration */}
            <div className="relative transform scale-75 lg:scale-90">
              <div className="w-20 h-12 bg-white rounded-lg shadow-lg relative">
                <div className="absolute bottom-0 left-1 right-1 h-2 bg-gray-200 rounded-b-lg"></div>
                <div className="absolute top-1 left-2 w-6 h-3 bg-green-100 rounded"></div>
                <div className="absolute top-4 left-1 right-1 h-6 bg-blue-100 rounded"></div>
              </div>
              <div className="absolute -right-8 top-2 w-8 h-8 bg-blue-600 rounded-lg opacity-80"></div>
              <div className="absolute -right-6 top-6 w-4 h-4 bg-blue-700 rounded opacity-80"></div>
            </div>
          </div>
        )}
        
        {/* Rating Badge */}
        <div className="absolute top-3 right-3 bg-white px-2 py-1 rounded-full shadow-sm flex items-center gap-1">
          <span className="text-yellow-500 text-xs lg:text-sm">⭐</span>
          <span className="text-xs lg:text-sm font-semibold text-gray-800">{hospital.rating}</span>
        </div>
      </div>
      
      {/* Hospital Info */}
      <div className="p-4 lg:p-3">
        <h3 className="font-bold text-gray-900 text-lg lg:text-base mb-2 line-clamp-2 leading-tight">
          {hospital.name}
        </h3>
        
        <div className="flex items-center gap-1 mb-3 lg:mb-2">
          <svg className="w-4 h-4 lg:w-3.5 lg:h-3.5 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path 
              fillRule="evenodd" 
              d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" 
              clipRule="evenodd" 
            />
          </svg>
          <span className="text-sm lg:text-xs text-gray-600 line-clamp-1">{hospital.address?.city || "N/A"}, {hospital.address?.state || "N/A"}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="inline-block bg-green-100 text-green-800 text-xs lg:text-[10px] font-medium px-2.5 lg:px-2 py-1 rounded-full line-clamp-1">
            {hospital.specialty}
          </span>
          <button 
            onClick={handleViewDetails}
            className="text-green-600 text-sm lg:text-xs font-medium hover:text-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded px-2 py-1 whitespace-nowrap"
            aria-label={`View details for ${hospital.name}`}
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default HospitalCard;