"use client";
import React from 'react';
import { Calendar, MapPin, Phone, Hospital, User, Heart, Building } from 'lucide-react';
import BottomNavigation from "@/components/BottomNavigation";
import { useState } from 'react';

const mockAppointments = [
  {
    id: 1,
    date: 'Mon, Aug 25, 2025',
    time: '10:00 AM',
    doctor: 'Dr. Oshani Ekanayaka',
    specialty: 'Orthopedics',
    hospital: 'Test hospital',
    location: 'Gjeh',
    status: 'Booked',
    canCancel: false,
    cancelReason: 'Cannot cancel (less than 2 hours to appointment)'
  },
  {
    id: 2,
    date: 'Wed, Aug 27, 2025',
    time: '2:30 PM',
    doctor: 'Dr. Samantha Silva',
    specialty: 'Cardiology',
    hospital: 'Central Medical Center',
    location: 'Colombo',
    status: 'Booked',
    canCancel: true,
    cancelReason: null
  }
];
type ViewState = "appointments";

const AppointmentsPage: React.FC = () => {

  const [activeTab, setActiveTab] = useState<string>("appointments");
  const [currentView, setCurrentView] = useState<ViewState>("appointments");
    const handleTabChange = (tabId: string): void => {
    setActiveTab(tabId);
    if (tabId === "appointments") {
      setCurrentView("appointments");
    }
    // Handle other tab navigation here
    console.log("Navigate to:", tabId);
  };
  const handleContactHospital = (appointment: any) => {
    // In a real app, this would open a contact modal or navigate to contact page
    alert(`Contacting ${appointment.hospital} for appointment with ${appointment.doctor}`);
  };

  const handleCancelAppointment = (appointment: any) => {
    if (appointment.canCancel) {
      alert(`Cancelling appointment with ${appointment.doctor}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-green-500 text-white text-center py-4">
        <h1 className="text-xl font-semibold">My Appointments</h1>
      </div>

      {/* Content */}
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Upcoming Appointments</h2>
        
        {mockAppointments.map((appointment) => (
          <div key={appointment.id} className="bg-white rounded-lg shadow-sm border border-gray-200 mb-4 p-4">
            {/* Date and Status */}
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="text-lg font-medium text-gray-900">{appointment.date}</h3>
                <p className="text-gray-600">{appointment.time}</p>
              </div>
              <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                {appointment.status}
              </span>
            </div>

            {/* Appointment Details */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center space-x-2 text-gray-700">
                <User className="w-4 h-4 text-green-500" />
                <span>{appointment.doctor}</span>
              </div>
              
              <div className="flex items-center space-x-2 text-gray-700">
                <Heart className="w-4 h-4 text-green-500" />
                <span>{appointment.specialty}</span>
              </div>
              
              <div className="flex items-center space-x-2 text-gray-700">
                <Hospital className="w-4 h-4 text-green-500" />
                <span>{appointment.hospital}</span>
              </div>
              
              <div className="flex items-center space-x-2 text-gray-700">
                <MapPin className="w-4 h-4 text-green-500" />
                <span>{appointment.location}</span>
              </div>
            </div>

            {/* Warning Message */}
            {appointment.cancelReason && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3 mb-3">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-yellow-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">!</span>
                  </div>
                  <span className="text-yellow-800 text-sm">{appointment.cancelReason}</span>
                </div>
              </div>
            )}

            {/* Contact Button */}
            <button
              onClick={() => handleContactHospital(appointment)}
              className="w-full bg-white border-2 border-green-500 text-green-500 py-3 rounded-lg flex items-center justify-center space-x-2 hover:bg-green-50 transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span className="font-medium">Contact Hospital</span>
            </button>
          </div>
        ))}
      </div>
      {/* Bottom Navigation */}
      <BottomNavigation 
        activeTab={activeTab} 
        onTabChange={handleTabChange} 
      />
    </div>
  );
};

export default AppointmentsPage;
