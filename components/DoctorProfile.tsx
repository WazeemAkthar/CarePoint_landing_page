// components/DoctorProfile.tsx
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
    console.log("Book appointment for:", doctor.name);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-green-600 text-white">
        <div className="flex items-center px-4 py-4">
          <button
            onClick={handleBack}
            className="mr-4 p-2 hover:bg-green-700 rounded-full transition-colors"
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
          <h1 className="text-lg font-semibold">Doctor Profile</h1>
        </div>
      </div>

      <div className="px-4 py-6">
        {/* Doctor Profile Section */}
        <div className="bg-white rounded-lg p-6 mb-6">
          <div className="flex flex-col items-center text-center mb-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
              {doctor.profileImage ? (
                        <img
                          src={doctor.profileImage}
                          alt={doctor.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      ) : (
                        <svg
                          className="w-8 h-8 text-gray-400"
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
            <h2 className="text-xl font-bold text-gray-900 mb-1">
              {doctor.name}
            </h2>
            <p className="text-gray-600">{doctor.specialization}</p>
          </div>

          {/* Doctor Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-center mb-2">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <div className="text-lg font-bold text-gray-900">
              </div>
              <div className="text-sm text-gray-600">Patients</div>
            </div>

            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-center mb-2">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="text-lg font-bold text-gray-900">
                {doctor.experience} Yrs
              </div>
              <div className="text-sm text-gray-600">Experience</div>
            </div>

            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-center mb-2">
                <svg
                  className="w-6 h-6 text-yellow-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <div className="text-lg font-bold text-gray-900">
                {doctor.rating}
              </div>
              <div className="text-sm text-gray-600">Ratings</div>
            </div>
          </div>
        </div>

        {/* Hospital Information */}
        <div className="bg-white rounded-lg p-4 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Hospital</h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gray-100 rounded-lg mr-3 overflow-hidden">
                <img
                  src={hospital.profileImage}
                  alt={hospital.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">{hospital.name}</h4>
                <div className="flex items-center text-gray-600 text-sm">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>{hospital.address.city}</span>
                </div>
              </div>
            </div>
            <svg
              className="w-5 h-5 text-gray-400"
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

        {/* Working Days */}
        <div className="bg-white rounded-lg p-4 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            Working Days
          </h3>
          <p className="text-gray-600">
            {Object.entries(doctor.availableSlots)
              .map(([day]) => {
                const formattedSlots = doctor.availableSlots[day]
                
                  .join(", ");
                return `${day}`;
              })
              .join(", ")}
          </p>
        </div>

        {/* Qualifications */}
        {/* {doctor.qualifications && doctor.qualifications.length > 
        0 && (
          <div className="bg-white rounded-lg p-4 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Qualifications
            </h3>
            <div className="flex flex-wrap gap-2">
              {doctor.qualifications.map((qualification, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium"
                >
                  {qualification}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* About Doctor */}
        {/* {doctor.about && (
          <div className="bg-white rounded-lg p-4 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              About Doctor
            </h3>
            <p className="text-gray-600 leading-relaxed">{doctor.about}</p>
          </div>
        )} */}

        {/* Book Appointment Button */}
        <button
          onClick={handleBookAppointment}
          className="w-full bg-green-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-green-700 transition-colors"
        >
          Book Appointment
        </button>
      </div>

      {/* Bottom Navigation */}
      <div className="pb-20">
        <BottomNavigation activeTab="hospitals" />
      </div>
    </div>
  );
};

export default DoctorProfile;