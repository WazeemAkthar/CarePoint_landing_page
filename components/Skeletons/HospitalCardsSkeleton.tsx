import React from 'react';

const HospitalCardsSkeleton: React.FC = () => {
  return (
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
                
                {/* Specialties */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {[...Array(3)].map((_, specIndex) => (
                    <div
                      key={specIndex}
                      className="h-6 bg-gray-200 rounded-full animate-pulse"
                      style={{ width: `${Math.random() * 40 + 60}px` }}
                    ></div>
                  ))}
                </div>
                
                {/* Stats */}
                <div className="flex justify-between mb-4">
                  <div className="text-center">
                    <div className="h-6 bg-gray-200 rounded w-8 mx-auto mb-1 animate-pulse"></div>
                    <div className="h-3 bg-gray-200 rounded w-12 animate-pulse"></div>
                  </div>
                  <div className="text-center">
                    <div className="h-6 bg-gray-200 rounded w-8 mx-auto mb-1 animate-pulse"></div>
                    <div className="h-3 bg-gray-200 rounded w-16 animate-pulse"></div>
                  </div>
                  <div className="text-center">
                    <div className="h-6 bg-gray-200 rounded w-8 mx-auto mb-1 animate-pulse"></div>
                    <div className="h-3 bg-gray-200 rounded w-12 animate-pulse"></div>
                  </div>
                </div>
                
                {/* Button */}
                <div className="h-12 bg-gray-200 rounded-xl animate-pulse"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HospitalCardsSkeleton;