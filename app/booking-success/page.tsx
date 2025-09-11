'use client';

import React from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { ChevronLeft, Calendar, Clock, Phone, User } from 'lucide-react';

const AppointmentConfirmation = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const patientName = searchParams.get('patientName') || '';
  const date = searchParams.get('date') || '';
  const time = searchParams.get('time') || '';
  const phone = searchParams.get('phone') || '';
  const symptoms = searchParams.get('symptoms') || '';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-4 flex items-center shadow-lg">
        <button 
          onClick={() => router.back()}
          className="mr-4 p-2 hover:bg-green-600 rounded-full transition-colors"
        >
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-lg font-semibold">Appointment Confirmed</h1>
      </div>

      <div className="px-4 py-6 space-y-6">
        <div className="bg-white rounded-xl shadow-sm p-6 text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Thank You, {patientName}!</h2>
          <p className="text-gray-600 mb-4">Your appointment has been successfully booked.</p>

          <div className="bg-green-50 rounded-xl p-4 space-y-3">
            <div className="flex items-center space-x-2">
              <User className="w-5 h-5 text-green-600" />
              <span className="font-medium text-gray-900">Patient:</span>
              <span className="text-gray-700">{patientName}</span>
            </div>

            <div className="flex items-center space-x-2">
              <Phone className="w-5 h-5 text-green-600" />
              <span className="font-medium text-gray-900">Phone:</span>
              <span className="text-gray-700">{phone}</span>
            </div>

            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-green-600" />
              <span className="font-medium text-gray-900">Date:</span>
              <span className="text-gray-700">{new Date(date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>

            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-green-600" />
              <span className="font-medium text-gray-900">Time:</span>
              <span className="text-gray-700">{time}</span>
            </div>

            {symptoms && (
              <div className="flex flex-col items-start space-y-1">
                <span className="font-medium text-gray-900">Symptoms:</span>
                <span className="text-gray-700">{symptoms}</span>
              </div>
            )}
          </div>

          <button
            onClick={() => router.push('/dashboard')}
            className="mt-6 w-full py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentConfirmation;
