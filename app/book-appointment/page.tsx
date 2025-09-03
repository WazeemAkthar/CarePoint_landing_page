'use client';

import React, { Suspense } from 'react';
import BookAppointmentForm from '../../components/BookAppointmentForm';

// Loading component for Suspense fallback
const BookingFormLoader = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Skeleton */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-4 flex items-center shadow-lg">
        <div className="mr-4 p-2 w-10 h-10 bg-green-600 rounded-full animate-pulse"></div>
        <div className="h-6 bg-green-600 rounded w-32 animate-pulse"></div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Doctor Info Skeleton */}
        <div className="bg-white rounded-xl shadow-sm p-5">
          <div className="flex items-start space-x-4">
            <div className="w-16 h-16 bg-gray-200 rounded-xl animate-pulse"></div>
            <div className="flex-1 space-y-2">
              <div className="h-5 bg-gray-200 rounded w-3/4 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-1/3 animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Date Selection Skeleton */}
        <div className="bg-white rounded-xl shadow-sm p-5">
          <div className="h-6 bg-gray-200 rounded w-32 mb-4 animate-pulse"></div>
          <div className="flex space-x-3">
            {[1, 2, 3, 4, 5, 6, 7].map((i) => (
              <div key={i} className="flex-shrink-0 p-4 rounded-xl bg-gray-100 min-w-[80px] animate-pulse">
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-6 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Time Selection Skeleton */}
        <div className="bg-white rounded-xl shadow-sm p-5">
          <div className="h-6 bg-gray-200 rounded w-40 mb-4 animate-pulse"></div>
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-48 mx-auto mb-2 animate-pulse"></div>
            <div className="h-3 bg-gray-200 rounded w-32 mx-auto animate-pulse"></div>
          </div>
        </div>

        {/* Form Skeleton */}
        <div className="bg-white rounded-xl shadow-sm p-5">
          <div className="h-6 bg-gray-200 rounded w-48 mb-4 animate-pulse"></div>
          <div className="space-y-4">
            <div>
              <div className="h-4 bg-gray-200 rounded w-32 mb-2 animate-pulse"></div>
              <div className="h-12 bg-gray-100 rounded-xl animate-pulse"></div>
            </div>
            <div>
              <div className="h-4 bg-gray-200 rounded w-32 mb-2 animate-pulse"></div>
              <div className="h-12 bg-gray-100 rounded-xl animate-pulse"></div>
            </div>
            <div>
              <div className="h-4 bg-gray-200 rounded w-32 mb-2 animate-pulse"></div>
              <div className="h-12 bg-gray-100 rounded-xl animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Summary Skeleton */}
        <div className="bg-white rounded-xl shadow-sm p-5">
          <div className="h-6 bg-gray-200 rounded w-48 mb-4 animate-pulse"></div>
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i}>
                  <div className="h-3 bg-gray-200 rounded w-20 mb-1 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Button Skeleton */}
        <div className="pb-6">
          <div className="w-full h-12 bg-gray-300 rounded-xl animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

const BookAppointmentPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Suspense fallback={<BookingFormLoader />}>
        <BookAppointmentForm />
      </Suspense>
    </div>
  );
};

export default BookAppointmentPage;