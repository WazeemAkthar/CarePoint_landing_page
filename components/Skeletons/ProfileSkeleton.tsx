import React from 'react';

const ProfileSkeleton: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Layout Skeleton */}
      <div className="lg:hidden">
        {/* Header Skeleton */}
        <div className="bg-green-500 text-white px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="h-6 bg-white bg-opacity-20 rounded w-24 animate-pulse"></div>
            <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Profile Header Skeleton */}
        <div className="bg-green-500 px-4 pb-8">
          <div className="flex flex-col items-center">
            <div className="relative mb-4">
              <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full animate-pulse"></div>
              <div className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full animate-pulse"></div>
            </div>
            <div className="h-5 bg-white bg-opacity-20 rounded w-32 mb-2 animate-pulse"></div>
            <div className="h-4 bg-white bg-opacity-20 rounded w-48 animate-pulse"></div>
          </div>
        </div>

        {/* Content Container Skeleton */}
        <div className="px-4 -mt-6 pb-6">
          {/* Personal Information Skeleton */}
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
            <div className="flex items-center mb-6">
              <div className="w-5 h-5 bg-gray-200 rounded animate-pulse mr-3"></div>
              <div className="h-5 bg-gray-200 rounded w-40 animate-pulse"></div>
            </div>

            <div className="space-y-6">
              {/* Full Name Skeleton */}
              <div>
                <div className="flex items-center mb-2">
                  <div className="w-4 h-4 bg-gray-200 rounded animate-pulse mr-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
                </div>
                <div className="w-full h-12 bg-gray-50 rounded-xl animate-pulse"></div>
              </div>

              {/* Email Skeleton */}
              <div>
                <div className="flex items-center mb-2">
                  <div className="w-4 h-4 bg-gray-200 rounded animate-pulse mr-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                </div>
                <div className="w-full h-12 bg-gray-50 rounded-xl animate-pulse"></div>
              </div>

              {/* Phone Skeleton */}
              <div>
                <div className="flex items-center mb-2">
                  <div className="w-4 h-4 bg-gray-200 rounded animate-pulse mr-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-28 animate-pulse"></div>
                </div>
                <div className="w-full h-12 bg-gray-50 rounded-xl animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Settings Skeleton */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="h-5 bg-gray-200 rounded w-16 mb-6 animate-pulse"></div>
            <div className="space-y-1">
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex items-center justify-between p-4 rounded-xl">
                  <div className="flex items-center">
                    <div className="w-5 h-5 bg-gray-200 rounded animate-pulse mr-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
                  </div>
                  <div className="w-5 h-5 bg-gray-200 rounded animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Layout Skeleton */}
      <div className="hidden lg:block">
        {/* Desktop Header Skeleton */}
        <div className="bg-white border-b border-gray-200 px-8 py-6">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div className="h-6 bg-gray-200 rounded w-32 animate-pulse"></div>
            <div className="h-10 bg-gray-200 rounded w-32 animate-pulse"></div>
          </div>
        </div>

        {/* Desktop Grid Layout Skeleton */}
        <div className="max-w-6xl mx-auto px-8 py-8">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Left Column Skeleton */}
            <div className="xl:col-span-1">
              <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-8 text-white mb-6">
                <div className="flex flex-col items-center text-center">
                  <div className="relative mb-6">
                    <div className="w-32 h-32 bg-white bg-opacity-20 rounded-full animate-pulse"></div>
                    <div className="absolute bottom-2 right-2 w-10 h-10 bg-white rounded-full animate-pulse"></div>
                  </div>
                  <div className="h-6 bg-white bg-opacity-20 rounded w-40 mb-2 animate-pulse"></div>
                  <div className="h-4 bg-white bg-opacity-20 rounded w-48 mb-4 animate-pulse"></div>
                  <div className="bg-white bg-opacity-20 rounded-lg p-3 w-full max-w-48 animate-pulse">
                    <div className="h-4 bg-white bg-opacity-20 rounded w-full animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column Skeleton */}
            <div className="xl:col-span-2 space-y-6">
              {/* Personal Information Skeleton */}
              <div className="bg-white rounded-2xl shadow-sm p-8">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-gray-200 rounded animate-pulse mr-3"></div>
                    <div className="h-6 bg-gray-200 rounded w-48 animate-pulse"></div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Full Name Skeleton */}
                  <div className="md:col-span-2">
                    <div className="flex items-center mb-3">
                      <div className="w-5 h-5 bg-gray-200 rounded animate-pulse mr-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
                    </div>
                    <div className="w-full h-12 bg-gray-50 rounded-xl animate-pulse"></div>
                  </div>

                  {/* Email Skeleton */}
                  <div>
                    <div className="flex items-center mb-3">
                      <div className="w-5 h-5 bg-gray-200 rounded animate-pulse mr-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                    </div>
                    <div className="w-full h-12 bg-gray-50 rounded-xl animate-pulse"></div>
                  </div>

                  {/* Phone Skeleton */}
                  <div>
                    <div className="flex items-center mb-3">
                      <div className="w-5 h-5 bg-gray-200 rounded animate-pulse mr-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-28 animate-pulse"></div>
                    </div>
                    <div className="w-full h-12 bg-gray-50 rounded-xl animate-pulse"></div>
                  </div>
                </div>
              </div>

              {/* Settings Skeleton */}
              <div className="bg-white rounded-2xl shadow-sm p-8">
                <div className="h-6 bg-gray-200 rounded w-40 mb-6 animate-pulse"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="p-6 rounded-xl border-2 border-gray-200">
                      <div className="flex items-center justify-between mb-2">
                        <div className="w-5 h-5 bg-gray-200 rounded animate-pulse"></div>
                        <div className="w-5 h-5 bg-gray-200 rounded animate-pulse"></div>
                      </div>
                      <div className="h-5 bg-gray-200 rounded w-32 mb-1 animate-pulse"></div>
                      <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSkeleton;