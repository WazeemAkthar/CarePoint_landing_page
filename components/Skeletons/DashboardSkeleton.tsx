import React from 'react';
import ConditionalSidebar from '../ConditionalSidebar';

const DashboardSkeleton: React.FC = () => {
  return (
    <ConditionalSidebar>
    <div className="min-h-screen bg-gray-50">
      {/* Header Skeleton */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 relative overflow-hidden">
        {/* Light green gradient overlay */}
        <div className="absolute left-0 right-0 h-100 bg-gradient-to-r from-green-200 via-green-300 to-green-200"></div>
        
        {/* User Profile and Greeting Skeleton */}
        <div className="flex justify-between items-start mb-6 pt-2">
          <div className="flex-1">
            <div className="h-8 bg-gray-200 rounded-lg w-64 mb-2 animate-pulse"></div>
            <div className="h-6 bg-gray-200 rounded-lg w-48 animate-pulse"></div>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-16 h-16 bg-gray-200 rounded-full animate-pulse"></div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gray-300 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Search Bar Skeleton */}
        <div className="relative mb-6">
          <div className="h-14 bg-gray-200 rounded-2xl animate-pulse"></div>
        </div>

        {/* Specialties Section Skeleton */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="h-6 bg-gray-200 rounded-lg w-48 animate-pulse"></div>
            <div className="h-6 bg-gray-200 rounded-full w-32 animate-pulse"></div>
          </div>
          
          <div className="flex gap-3 overflow-x-auto py-4 px-1">
            {/* Specialty buttons skeleton */}
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="h-12 bg-gray-200 rounded-2xl animate-pulse"
                style={{ width: `${Math.random() * 60 + 80}px` }}
              ></div>
            ))}
          </div>

          {/* Results Counter Skeleton */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-6 bg-gray-200 rounded-lg w-40 animate-pulse"></div>
              <div className="h-6 bg-gray-200 rounded-full w-24 animate-pulse"></div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 bg-gray-200 rounded animate-pulse"></div>
              <div className="w-9 h-9 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Hospital Cards Skeleton */}
      <div className="pb-20 mt-3">
        <div className="flex flex-wrap gap-4">
          {[...Array(8)].map((_, index) => (
            <div
              key={index}
              className="w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.667rem)] xl:w-[calc(25%-0.75rem)]"
            >
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                {/* Hospital Image Skeleton */}
                <div className="h-48 bg-gray-200 animate-pulse"></div>
                
                {/* Hospital Info Skeleton */}
                <div className="p-6">
                  {/* Hospital Name */}
                  <div className="h-6 bg-gray-200 rounded-lg w-3/4 mb-3 animate-pulse"></div>
                  
                  {/* Location */}
                  <div className="h-4 bg-gray-200 rounded w-2/3 mb-3 animate-pulse"></div>
                  
                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, starIndex) => (
                        <div key={starIndex} className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
                      ))}
                    </div>
                    <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
                  </div>
                  
                  
                  
                  
                  {/* Button */}
                  <div className="h-12 bg-gray-200 rounded-xl animate-pulse"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>

      
    </div>
    </ConditionalSidebar>
  );
};

export default DashboardSkeleton;