'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ChevronLeft, MapPin, Calendar, Clock, User, Phone, CreditCard, FileText, AlertCircle } from 'lucide-react';

interface Doctor {
  _id: string;
  id: string;
  name: string;
  specialization: string;
  hospital: {
    _id: string;
    id: string;
    name: string;
    address: {
      street: string;
      city: string;
      state: string;
      zipCode: string;
      country: string;
    };
  };
  email: string;
  phone: string;
  availableSlots: {
    [key: string]: string[];
  };
  consultationFee: string;
  status: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

interface AppointmentForm {
  patientName: string;
  phoneNumber: string;
  paymentMethod: string;
  symptoms: string;
  additionalNotes: string;
  selectedDate: string;
  selectedTime: string;
}

const BookAppointmentPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Sample doctor data - in real app, fetch from API based on doctor ID
  const [doctor] = useState<Doctor>({
    "_id": "68b42b8ae906a3ce9ff29c0e",
    "id": "1d1c88d9-46f8-4e43-985a-86f5d72f124d",
    "name": "Dr. J.I.P. Herath",
    "specialization": "Cardiology",
    "hospital": {
      "_id": "68b3f4deaafc575d82bb761d",
      "id": "2d9b897f-f591-401c-809f-5e50b22f60c9",
      "name": "Sri Jayewardenepura General Hospital (SJGH)",
      "address": {
        "street": "293 New Hospital Road",
        "city": "Sri Jayewardenepura Kotte",
        "state": "Western Province",
        "zipCode": "10100",
        "country": "Sri Lanka"
      }
    },
    "email": "srigh@gmail.com",
    "phone": "+94112778610",
    "availableSlots": {
      "Monday": ["01:00 PM"],
      "Tuesday": ["12:20 PM", "01:00 PM"],
      "Wednesday": [],
      "Thursday": ["10:00 AM", "02:00 PM"],
      "Friday": ["11:00 AM", "03:00 PM"],
      "Saturday": ["09:00 AM"],
      "Sunday": []
    },
    "consultationFee": "2000",
    "status": "Active",
    "createdAt": "2025-08-31T11:01:30.743Z",
    "updatedAt": "2025-09-02T07:15:04.206Z",
    "__v": 0
  });

  const [formData, setFormData] = useState<AppointmentForm>({
    patientName: '',
    phoneNumber: '',
    paymentMethod: 'pay-at-hospital',
    symptoms: '',
    additionalNotes: '',
    selectedDate: '',
    selectedTime: ''
  });

  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [currentStep, setCurrentStep] = useState(1);

  // Generate next 7 days for date selection
  const getNextSevenDays = () => {
    const days = [];
    const today = new Date();
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
      const dayNumber = date.getDate();
      const monthName = date.toLocaleDateString('en-US', { month: 'short' });
      const fullDate = date.toISOString().split('T')[0];
      const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });
      
      days.push({
        dayName,
        dayNumber,
        monthName,
        fullDate,
        dayOfWeek,
        isToday: i === 0
      });
    }
    
    return days;
  };

  const nextSevenDays = getNextSevenDays();

  const handleInputChange = (field: keyof AppointmentForm, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleDateSelect = (date: string, dayOfWeek: string) => {
    setFormData(prev => ({
      ...prev,
      selectedDate: date,
      selectedTime: '' // Reset time when date changes
    }));
  };

  const getAvailableTimesForSelectedDate = () => {
    if (!formData.selectedDate) return [];
    
    const selectedDay = nextSevenDays.find(day => day.fullDate === formData.selectedDate);
    if (!selectedDay) return [];
    
    return doctor.availableSlots[selectedDay.dayOfWeek] || [];
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.patientName.trim()) {
      newErrors.patientName = 'Patient name is required';
    }
    
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (formData.phoneNumber.length < 10) {
      newErrors.phoneNumber = 'Phone number must be at least 10 digits';
    }
    
    if (!formData.selectedDate) {
      newErrors.selectedDate = 'Please select a date';
    }
    
    if (!formData.selectedTime) {
      newErrors.selectedTime = 'Please select a time';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleConfirmBooking = () => {
    if (validateForm()) {
      // Here you would typically make an API call to book the appointment
      console.log('Booking appointment:', {
        doctor: doctor.name,
        patient: formData.patientName,
        date: formData.selectedDate,
        time: formData.selectedTime,
        phone: formData.phoneNumber,
        symptoms: formData.symptoms,
        notes: formData.additionalNotes,
        consultationFee: doctor.consultationFee
      });
      
      // Navigate to success page or show success message
      alert('Appointment booked successfully!');
      router.push('/appointments');
    }
  };

  const hasRequiredFields = formData.patientName && formData.phoneNumber && formData.selectedDate && formData.selectedTime;

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
        <h1 className="text-lg font-semibold">Book Appointment</h1>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Doctor Info */}
        <div className="bg-white rounded-xl shadow-sm p-5">
          <div className="flex items-start space-x-4">
            <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center">
              <User className="w-8 h-8 text-green-600" />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-gray-900">{doctor.name}</h2>
              <p className="text-green-600 font-medium mb-2">{doctor.specialization}</p>
              
              <div className="space-y-2">
                <h3 className="font-medium text-gray-900">{doctor.hospital.name}</h3>
                <div className="flex items-start space-x-2 text-gray-600">
                  <MapPin size={16} className="mt-0.5 flex-shrink-0" />
                  <span className="text-sm">
                    {doctor.hospital.address.city}, {doctor.hospital.address.state}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Date Selection */}
        <div className="bg-white rounded-xl shadow-sm p-5">
          <h3 className="text-lg font-semibold mb-4 text-gray-900 flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-green-600" />
            Select Date
          </h3>
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex space-x-3 pb-2" style={{ width: 'max-content' }}>
              {nextSevenDays.map((day) => (
                <button
                  key={day.fullDate}
                  onClick={() => handleDateSelect(day.fullDate, day.dayOfWeek)}
                  className={`flex-shrink-0 p-4 rounded-xl text-center transition-all duration-200 min-w-[80px] ${
                    formData.selectedDate === day.fullDate
                      ? 'bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg transform scale-105'
                      : day.isToday
                      ? 'bg-green-50 text-green-700 border-2 border-green-200 hover:bg-green-100'
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  <div className="font-medium text-sm">{day.dayName}</div>
                  <div className="text-xl font-bold my-1">{day.dayNumber}</div>
                  <div className="text-xs opacity-75">{day.monthName}</div>
                </button>
              ))}
            </div>
          </div>
          {errors.selectedDate && (
            <p className="text-red-500 text-sm mt-2 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.selectedDate}
            </p>
          )}
        </div>

        {/* Time Selection */}
        <div className="bg-white rounded-xl shadow-sm p-5">
          <h3 className="text-lg font-semibold mb-4 text-gray-900 flex items-center">
            <Clock className="w-5 h-5 mr-2 text-green-600" />
            Available Time *
          </h3>
          {formData.selectedDate ? (
            <div>
              {getAvailableTimesForSelectedDate().length > 0 ? (
                <div className="overflow-x-auto scrollbar-hide">
                  <div className="flex space-x-3 pb-2" style={{ width: 'max-content' }}>
                    {getAvailableTimesForSelectedDate().map((time) => (
                      <button
                        key={time}
                        onClick={() => handleInputChange('selectedTime', time)}
                        className={`flex-shrink-0 px-6 py-3 rounded-xl text-center transition-all duration-200 min-w-[120px] border-2 font-medium ${
                          formData.selectedTime === time
                            ? 'bg-gradient-to-br from-green-500 to-green-600 text-white border-green-500 shadow-lg transform scale-105'
                            : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100 hover:border-gray-300'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Calendar className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <p className="font-medium">No slots available</p>
                  <p className="text-sm">on {nextSevenDays.find(d => d.fullDate === formData.selectedDate)?.dayOfWeek}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <Clock className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <p className="font-medium">Please select a date first</p>
              <p className="text-sm">to view available time slots</p>
            </div>
          )}
          {errors.selectedTime && (
            <p className="text-red-500 text-sm mt-2 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.selectedTime}
            </p>
          )}
        </div>

        {/* Appointment Details Form */}
        <div className="bg-white rounded-xl shadow-sm p-5">
          <h3 className="text-lg font-semibold mb-4 text-gray-900 flex items-center">
            <FileText className="w-5 h-5 mr-2 text-green-600" />
            Appointment Details
          </h3>
          <p className="text-sm text-gray-600 mb-4">Fields marked with * are required</p>
          
          <div className="space-y-4">
            {/* Patient Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Patient Name *
              </label>
              <input
                type="text"
                value={formData.patientName}
                onChange={(e) => handleInputChange('patientName', e.target.value)}
                placeholder="Enter patient name"
                className={`w-full p-4 border-2 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors ${
                  errors.patientName ? 'border-red-500' : 'border-gray-200 hover:border-gray-300'
                }`}
              />
              {errors.patientName && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.patientName}
                </p>
              )}
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number *
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                  placeholder="Enter phone number (10+ digits)"
                  className={`w-full p-4 pl-12 border-2 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors ${
                    errors.phoneNumber ? 'border-red-500' : 'border-gray-200 hover:border-gray-300'
                  }`}
                />
              </div>
              {errors.phoneNumber && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.phoneNumber}
                </p>
              )}
            </div>

            {/* Payment Method */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Payment Method *
              </label>
              <div className="space-y-3">
                <label className="flex items-center space-x-4 p-4 border-2 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors border-gray-200">
                  <div className="relative">
                    <input
                      type="radio"
                      value="pay-at-hospital"
                      checked={formData.paymentMethod === 'pay-at-hospital'}
                      onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                      className="sr-only"
                    />
                    <div className={`w-5 h-5 rounded-full border-2 transition-colors ${
                      formData.paymentMethod === 'pay-at-hospital' 
                        ? 'border-green-500 bg-green-500' 
                        : 'border-gray-300'
                    }`}>
                      {formData.paymentMethod === 'pay-at-hospital' && (
                        <div className="w-3 h-3 bg-white rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                      )}
                    </div>
                  </div>
                  <CreditCard className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-700 font-medium">Pay at Hospital</span>
                </label>
              </div>
            </div>

            {/* Symptoms */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Symptoms
              </label>
              <textarea
                value={formData.symptoms}
                onChange={(e) => handleInputChange('symptoms', e.target.value)}
                placeholder="Describe your symptoms briefly"
                rows={4}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 resize-none hover:border-gray-300 transition-colors"
              />
            </div>

            {/* Additional Notes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Notes (Optional)
              </label>
              <textarea
                value={formData.additionalNotes}
                onChange={(e) => handleInputChange('additionalNotes', e.target.value)}
                placeholder="Any additional information for the doctor"
                rows={3}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 resize-none hover:border-gray-300 transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Appointment Summary */}
        <div className="bg-white rounded-xl shadow-sm p-5">
          <h3 className="text-lg font-semibold mb-4 text-gray-900">Appointment Summary</h3>
          
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4">
            <div className="flex items-center space-x-2 mb-4">
              <Calendar className="w-5 h-5 text-green-600" />
              <span className="font-medium text-gray-900">Booking Details</span>
            </div>
            
            <div className="space-y-3 text-sm">
              <div>
                <span className="text-gray-600 block">DOCTOR</span>
                <span className="font-medium text-gray-900">{doctor.name}</span>
              </div>
              
              <div>
                <span className="text-gray-600 block">HOSPITAL</span>
                <span className="font-medium text-gray-900">{doctor.hospital.name}</span>
              </div>
              
              <div>
                <span className="text-gray-600 block">DATE</span>
                <span className="font-medium text-gray-900">
                  {formData.selectedDate ? 
                    new Date(formData.selectedDate).toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    }) : 
                    'Not selected'
                  }
                </span>
              </div>
              
              <div>
                <span className="text-gray-600 block">TIME</span>
                <span className={`font-medium ${formData.selectedTime ? 'text-gray-900' : 'text-red-500'}`}>
                  {formData.selectedTime || 'Not selected'}
                </span>
              </div>
              
              <div>
                <span className="text-gray-600 block">CONSULTATION FEE</span>
                <span className="font-medium text-green-600">Rs {doctor.consultationFee}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {!hasRequiredFields && (
          <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 flex items-center space-x-3">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
            <span className="text-red-700 text-sm">Please fill all required fields to continue</span>
          </div>
        )}

        {/* Confirm Button */}
        <div className="pb-6">
          <button
            onClick={handleConfirmBooking}
            disabled={!hasRequiredFields}
            className={`w-full py-4 rounded-xl font-semibold text-white transition-all duration-200 ${
              hasRequiredFields
                ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 active:from-green-700 active:to-green-800 shadow-lg hover:shadow-xl transform hover:-translate-y-1'
                : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            {hasRequiredFields ? 'Confirm Booking' : 'Complete Required Fields'}
          </button>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default BookAppointmentPage;