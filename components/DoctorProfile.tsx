"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Doctor, Hospital } from "@/types/hospital";
import BottomNavigation from "@/components/BottomNavigation";

interface DoctorProfileProps {
  doctor: Doctor;
  hospital: Hospital;
  onBookAppointment?: () => void;
}

const DoctorProfile: React.FC<DoctorProfileProps> = ({
  doctor,
  hospital,
  onBookAppointment
}) => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  const handleBookAppointment = () => {
    onBookAppointment?.();
    // Navigate to appointment booking page
    router.push(`/book-appointment?doctorId=${doctor.id}`);
    console.log("Book appointment for:", doctor.name);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with gradient */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 text-white">
        <div className="flex items-center justify-between px-4 py-4">
          <div className="flex items-center">
            <button
              onClick={handleBack}
              className="mr-3 p-1 hover:bg-white/10 rounded-full transition-colors"
              aria-label="Go back"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <h1 className="text-xl font-semibold">Doctor Profile</h1>
          </div>                
        </div>
      </div>

      <div className="px-4 py-6">
        {/* Doctor Profile Section with enhanced styling */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex flex-col items-center text-center mb-8">
            {/* Enhanced profile image with shadow */}
            <div className="relative mb-4">
              <div className="w-24 h-24 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center shadow-lg">
                {doctor.profileImage ? (
                  <img
                    src={doctor.profileImage}
                    alt={doctor.name}
                    className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-md"
                  />
                ) : (
                  <svg
                    className="w-10 h-10 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                )}
              </div>
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {doctor.name}
            </h2>
            <p className="text-gray-500 text-lg font-medium">{doctor.specialization}</p>
          </div>

          {/* Enhanced Doctor Stats with better spacing and icons */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center p-5 bg-gray-50 rounded-xl border border-gray-100">
              <div className="flex items-center justify-center mb-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-green-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"/>
                  </svg>
                </div>
              </div>
              <div className="text-xl font-bold text-gray-900 mb-1">
                1000+
              </div>
              <div className="text-sm text-gray-500 font-medium">Patients</div>
            </div>

            <div className="text-center p-5 bg-gray-50 rounded-xl border border-gray-100">
              <div className="flex items-center justify-center mb-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                    />
                  </svg>
                </div>
              </div>
              <div className="text-xl font-bold text-gray-900 mb-1">
                {doctor.experience} Yrs
              </div>
              <div className="text-sm text-gray-500 font-medium">Experience</div>
            </div>

            <div className="text-center p-5 bg-gray-50 rounded-xl border border-gray-100">
              <div className="flex items-center justify-center mb-3">
                <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-yellow-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
              </div>
              <div className="text-xl font-bold text-gray-900 mb-1">
                {doctor.rating}
              </div>
              <div className="text-sm text-gray-500 font-medium">Ratings</div>
            </div>
          </div>
        </div>

        {/* Enhanced Hospital Information */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Hospital</h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center flex-1">
              <div className="w-14 h-14 bg-gray-100 rounded-xl mr-4 overflow-hidden shadow-sm">
                <img
                  src={hospital.profileImage}
                  alt={hospital.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 text-base mb-1">
                  {hospital.name}
                </h4>
                <div className="flex items-center text-gray-500 text-sm">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="flex-1">{hospital.address.city}</span>
                </div>
              </div>
            </div>
            <svg
              className="w-5 h-5 text-gray-400 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>

        {/* Enhanced Working Days */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Working Days
          </h3>
          <p className="text-gray-600 font-medium">
            {Object.keys(doctor.availableSlots).join(", ")}
          </p>
        </div>

        {/* Enhanced Book Appointment Button */}
        <button
          onClick={handleBookAppointment}
          className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 rounded-2xl font-semibold text-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          Book Appointment
        </button>
      </div>

      {/* Enhanced Bottom Navigation with proper spacing */}
      <div className="pb-20">
        <BottomNavigation activeTab="hospitals" />
      </div>
    </div>
  );
};

export default DoctorProfile;