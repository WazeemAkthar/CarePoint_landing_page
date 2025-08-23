"use client";
import React from 'react';

export interface Hospital {
  id: number;
  name: string;
  location: string;
  rating: number;
  specialty: string;
}

interface HospitalCardProps {
  hospital: Hospital;
  onViewDetails?: (hospital: Hospital) => void;
}

const HospitalCard: React.FC<HospitalCardProps> = ({ hospital, onViewDetails }) => {
  const handleViewDetails = () => {
    if (onViewDetails) {
      onViewDetails(hospital);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-4 hover:shadow-md transition-shadow">
      {/* Hospital Image */}
      <div className="aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
        {/* Modern hospital room illustration */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50">
          {/* Hospital bed */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-20 h-12 bg-white rounded-lg shadow-lg relative">
              {/* Bed frame */}
              <div className="absolute bottom-0 left-1 right-1 h-2 bg-gray-200 rounded-b-lg"></div>
              {/* Pillow */}
              <div className="absolute top-1 left-2 w-6 h-3 bg-green-100 rounded"></div>
              {/* Blanket */}
              <div className="absolute top-4 left-1 right-1 h-6 bg-blue-100 rounded"></div>
            </div>
            {/* Chair */}
            <div className="absolute -right-8 top-2 w-8 h-8 bg-blue-600 rounded-lg opacity-80"></div>
            <div className="absolute -right-6 top-6 w-4 h-4 bg-blue-700 rounded opacity-80"></div>
          </div>
        </div>
        
        {/* Rating Badge */}
        <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded-full shadow-sm flex items-center gap-1">
          <span className="text-yellow-500 text-sm">⭐</span>
          <span className="text-sm font-semibold text-gray-800">{hospital.rating}</span>
        </div>
      </div>
      
      {/* Hospital Info */}
      <div className="p-4">
        <h3 className="font-bold text-gray-900 text-lg mb-2 line-clamp-2">
          {hospital.name}
        </h3>
        
        <div className="flex items-center gap-1 mb-3">
          <svg className="w-4 h-4 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path 
              fillRule="evenodd" 
              d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" 
              clipRule="evenodd" 
            />
          </svg>
          <span className="text-sm text-gray-600 line-clamp-1">{hospital.location}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="inline-block bg-green-100 text-green-800 text-xs font-medium px-3 py-1 rounded-full">
            {hospital.specialty}
          </span>
          <button 
            onClick={handleViewDetails}
            className="text-green-600 text-sm font-medium hover:text-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded px-2 py-1"
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