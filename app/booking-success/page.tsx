'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { 
  CheckCircle, 
  Calendar, 
  Clock, 
  User, 
  MapPin, 
  Phone, 
  FileText, 
  CreditCard,
  Home,
  Download,
  Share2
} from 'lucide-react';

interface BookingDetails {
  appointmentId: string;
  patientName: string;
  doctorName: string;
  specialization: string;
  hospitalName: string;
  hospitalAddress: string;
  date: string;
  time: string;
  phoneNumber: string;
  consultationFee: string;
  paymentMethod: string;
  symptoms?: string;
  bookingDate: string;
  bookingTime: string;
}

const BookingSuccessPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real app, you would fetch booking details from API using appointment ID
    // For now, we'll use mock data or search params
    const mockBookingDetails: BookingDetails = {
      appointmentId: "APT-2025-000123",
      patientName: searchParams.get('patientName') || "John Doe",
      doctorName: "Dr. J.I.P. Herath",
      specialization: "Cardiology",
      hospitalName: "Sri Jayewardenepura General Hospital (SJGH)",
      hospitalAddress: "Sri Jayewardenepura Kotte, Western Province",
      date: searchParams.get('date') || "2025-09-05",
      time: searchParams.get('time') || "02:00 PM",
      phoneNumber: searchParams.get('phone') || "+94771234567",
      consultationFee: "2000",
      paymentMethod: "Pay at Hospital",
      symptoms: searchParams.get('symptoms') || "",
      bookingDate: new Date().toISOString().split('T')[0],
      bookingTime: new Date().toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      })
    };

    // Simulate loading delay
    setTimeout(() => {
      setBookingDetails(mockBookingDetails);
      setIsLoading(false);
    }, 1000);
  }, [searchParams]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleDownloadReceipt = () => {
    // In a real app, this would generate and download a PDF receipt
    alert('Receipt download feature would be implemented here');
  };

  const handleShareAppointment = () => {
    if (navigator.share && bookingDetails) {
      navigator.share({
        title: 'Appointment Booking Confirmation',
        text: `Appointment booked with ${bookingDetails.doctorName} on ${formatDate(bookingDetails.date)} at ${bookingDetails.time}`,
        url: window.location.href
      }).catch((error) => {
        console.log('Error sharing:', error);
        // Fallback to copying to clipboard
        copyToClipboard();
      });
    } else {
      copyToClipboard();
    }
  };

  const copyToClipboard = () => {
    if (bookingDetails) {
      const appointmentText = `
Appointment Confirmation
Appointment ID: ${bookingDetails.appointmentId}
Patient: ${bookingDetails.patientName}
Doctor: ${bookingDetails.doctorName}
Date: ${formatDate(bookingDetails.date)}
Time: ${bookingDetails.time}
Hospital: ${bookingDetails.hospitalName}
      `.trim();
      
      navigator.clipboard.writeText(appointmentText).then(() => {
        alert('Appointment details copied to clipboard!');
      }).catch(() => {
        alert('Unable to copy to clipboard');
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-200 border-t-green-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Processing your booking...</p>
        </div>
      </div>
    );
  }

  if (!bookingDetails) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">Unable to load booking details</p>
          <button 
            onClick={() => router.push('/')}
            className="mt-4 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Success Animation & Header */}
      <div className="bg-gradient-to-br from-green-500 to-green-600 text-white px-4 py-8 text-center relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -translate-x-16 -translate-y-16"></div>
          <div className="absolute top-0 right-0 w-24 h-24 bg-white rounded-full translate-x-12 -translate-y-12"></div>
          <div className="absolute bottom-0 left-1/4 w-20 h-20 bg-white rounded-full translate-y-10"></div>
          <div className="absolute bottom-0 right-1/4 w-16 h-16 bg-white rounded-full translate-y-8"></div>
        </div>
        
        <div className="relative z-10">
          {/* Success Icon with Animation */}
          <div className="mb-6">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg animate-bounce">
              <CheckCircle className="w-12 h-12 text-green-500" />
            </div>
          </div>
          
          <h1 className="text-2xl font-bold mb-2">Booking Confirmed!</h1>
          <p className="text-green-100 text-lg">Your appointment has been successfully booked</p>
          <p className="text-green-200 text-sm mt-2">Appointment ID: {bookingDetails.appointmentId}</p>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6 -mt-4 relative z-20">
        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex space-x-3">
            <button
              onClick={handleDownloadReceipt}
              className="flex-1 flex items-center justify-center space-x-2 py-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors font-medium"
            >
              <Download className="w-5 h-5" />
              <span>Download</span>
            </button>
            <button
              onClick={handleShareAppointment}
              className="flex-1 flex items-center justify-center space-x-2 py-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors font-medium"
            >
              <Share2 className="w-5 h-5" />
              <span>Share</span>
            </button>
          </div>
        </div>

        {/* Appointment Details */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="bg-gradient-to-r from-green-50 to-green-100 px-5 py-4 border-b">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-green-600" />
              Appointment Details
            </h2>
          </div>
          
          <div className="p-5 space-y-4">
            {/* Doctor Info */}
            <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-lg flex items-center justify-center flex-shrink-0">
                <User className="w-6 h-6 text-green-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{bookingDetails.doctorName}</h3>
                <p className="text-green-600 font-medium">{bookingDetails.specialization}</p>
                <div className="flex items-center space-x-2 text-gray-600 mt-1">
                  <MapPin size={14} />
                  <span className="text-sm">{bookingDetails.hospitalName}</span>
                </div>
                <p className="text-sm text-gray-500 mt-1">{bookingDetails.hospitalAddress}</p>
              </div>
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-2 text-blue-600 mb-2">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm font-medium">Date</span>
                </div>
                <p className="font-semibold text-gray-900">{formatDate(bookingDetails.date)}</p>
              </div>
              
              <div className="p-4 bg-purple-50 rounded-lg">
                <div className="flex items-center space-x-2 text-purple-600 mb-2">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm font-medium">Time</span>
                </div>
                <p className="font-semibold text-gray-900">{bookingDetails.time}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Patient Information */}
        <div className="bg-white rounded-xl shadow-sm p-5">
          <h3 className="text-lg font-semibold mb-4 text-gray-900 flex items-center">
            <User className="w-5 h-5 mr-2 text-green-600" />
            Patient Information
          </h3>
          
          <div className="space-y-4">
            <div>
              <span className="text-sm text-gray-600 block">PATIENT NAME</span>
              <span className="font-medium text-gray-900">{bookingDetails.patientName}</span>
            </div>
            
            <div>
              <span className="text-sm text-gray-600 block">CONTACT NUMBER</span>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-gray-400" />
                <span className="font-medium text-gray-900">{bookingDetails.phoneNumber}</span>
              </div>
            </div>

            {bookingDetails.symptoms && (
              <div>
                <span className="text-sm text-gray-600 block">SYMPTOMS</span>
                <span className="text-gray-900">{bookingDetails.symptoms}</span>
              </div>
            )}
          </div>
        </div>

        {/* Payment Information */}
        <div className="bg-white rounded-xl shadow-sm p-5">
          <h3 className="text-lg font-semibold mb-4 text-gray-900 flex items-center">
            <CreditCard className="w-5 h-5 mr-2 text-green-600" />
            Payment Information
          </h3>
          
          <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-700">Consultation Fee:</span>
              <span className="text-xl font-bold text-green-600">Rs {bookingDetails.consultationFee}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Payment Method:</span>
              <span className="text-sm font-medium text-gray-900 bg-white px-3 py-1 rounded-full">
                {bookingDetails.paymentMethod}
              </span>
            </div>
          </div>
        </div>

        {/* Important Notes */}
        <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-5">
          <h3 className="text-lg font-semibold mb-3 text-amber-800 flex items-center">
            <FileText className="w-5 h-5 mr-2" />
            Important Notes
          </h3>
          <div className="space-y-2 text-sm text-amber-700">
            <p>• Please arrive 15 minutes before your scheduled appointment time</p>
            <p>• Bring a valid ID and any previous medical records</p>
            <p>• Payment can be made at the hospital reception</p>
            <p>• For any changes or cancellations, contact the hospital directly</p>
          </div>
        </div>

        {/* Booking Details Footer */}
        <div className="bg-gray-100 rounded-xl p-4">
          <div className="text-center text-sm text-gray-600">
            <p>Booking confirmed on {formatDate(bookingDetails.bookingDate)} at {bookingDetails.bookingTime}</p>
            <p className="mt-1">Reference ID: {bookingDetails.appointmentId}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pb-6">
          <button
            onClick={() => router.push('/appointments')}
            className="w-full py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            View My Appointments
          </button>
          
          <button
            onClick={() => router.push('/')}
            className="w-full py-4 bg-white text-gray-700 rounded-xl font-semibold border-2 border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 flex items-center justify-center space-x-2"
          >
            <Home className="w-5 h-5" />
            <span>Back to Home</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingSuccessPage;