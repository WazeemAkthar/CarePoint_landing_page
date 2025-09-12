// components/HospitalDetail.tsx - FINAL VERSION
"use client";
import React from "react";
import { useRouter, usePathname } from "next/navigation";
import { Hospital, Doctor } from "@/types/hospital";
import BottomNavigation from "@/components/SideNavigation";
import { encryptId } from "@/lib/cryptoUtils";

interface HospitalDetailProps {
  hospital: Hospital;
  onDoctorSelect: (doctor: Doctor) => void;
}

// Skeleton Components
const DoctorSkeleton = () => (
  <div className="flex items-center p-4 bg-gray-50 rounded-xl animate-pulse">
    <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
    <div className="flex-1 space-y-2">
      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
      <div className="h-3 bg-gray-200 rounded w-1/3"></div>
    </div>
    <div className="w-5 h-5 bg-gray-200 rounded"></div>
  </div>
);

const DoctorsLoadingSkeleton = () => (
  <div className="space-y-4">
    <DoctorSkeleton />
    <DoctorSkeleton />
  </div>
);

const HospitalDetail: React.FC<HospitalDetailProps> = ({
  hospital,
  onDoctorSelect,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const [doctors, setDoctors] = React.useState<Doctor[]>([]);
  const [isLoadingDoctors, setIsLoadingDoctors] = React.useState<boolean>(true);
  const [doctorError, setDoctorError] = React.useState<string>("");

  React.useEffect(() => {
    const fetchDoctors = async () => {
      setIsLoadingDoctors(true);
      setDoctorError("");
      try {
        const { apiClient } = require("../lib/apiClient");
        const response = await apiClient.get(
          `/doctors?hospital=${hospital.id}`
        );
        if (response && response.doctors) {
          setDoctors(response.doctors);
        } else {
          setDoctors([]);
        }
      } catch (error) {
        setDoctorError("Failed to load doctors.");
        setDoctors([]);
      } finally {
        setIsLoadingDoctors(false);
      }
    };
    fetchDoctors();
  }, [hospital.id]);

  console.log("Rendering HospitalDetail for:", hospital);
  console.log("Current pathname:", pathname);

  const handleBack = () => {
    router.push("/dashboard");
  };

  const handleCall = () => {
    window.open(`tel:${hospital.phone}`);
  };

  const handleEmail = () => {
    window.open(`mailto:${hospital.email}`);
  };

  const handleDirections = () => {
    const query = encodeURIComponent(hospital.address.city);
    window.open(`https://maps.google.com/?q=${query}`, "_blank");
  };

  // Check if current route should show sidebar (Hospital routes)
  const shouldShowSidebar = pathname.startsWith('/Hospital') || pathname.includes('hospital') || pathname === '/dashboard';

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Conditional Sidebar - Force show for hospital routes */}
      {shouldShowSidebar && (
        <div className="hidden lg:block">
          <BottomNavigation />
        </div>
      )}
      
      {/* Main Content */}
      <div className={`flex-1 ${shouldShowSidebar ? 'lg:ml-0' : ''}`}>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg">
            <div className="flex items-center px-4 py-4">
              <button
                onClick={handleBack}
                className="mr-4 p-2 hover:bg-green-800 rounded-full transition-all duration-200 hover:scale-105"
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
              <h1 className="text-lg font-semibold">Book Appointment</h1>
            </div>
          </div>

          {/* Hospital Image */}
          <div className="relative h-52 overflow-hidden">
            <img
              src={hospital.profileImage}
              alt={hospital.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>

          {/* Main Content */}
          <div className="max-w-4xl mx-auto px-4 py-6">
            {/* Hospital Info Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                {hospital.name}
              </h2>
              <div className="flex items-center text-gray-600 mb-6">
                <svg className="w-5 h-5 mr-2 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm font-medium">
                  {hospital.address.city}, {hospital.address.state}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-3 gap-3 mb-8">
                <button
                  onClick={handleCall}
                  className="flex flex-col items-center py-4 px-3 bg-green-50 rounded-xl hover:bg-green-100 transition-all duration-200 hover:scale-105 hover:shadow-md group"
                >
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mb-2 group-hover:bg-green-700 transition-colors">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <span className="text-sm font-semibold text-green-700">Call</span>
                </button>

                <button
                  onClick={handleEmail}
                  className="flex flex-col items-center py-4 px-3 bg-blue-50 rounded-xl hover:bg-blue-100 transition-all duration-200 hover:scale-105 hover:shadow-md group"
                >
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-2 group-hover:bg-blue-700 transition-colors">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <span className="text-sm font-semibold text-blue-700">Email</span>
                </button>

                <button
                  onClick={handleDirections}
                  className="flex flex-col items-center py-4 px-3 bg-purple-50 rounded-xl hover:bg-purple-100 transition-all duration-200 hover:scale-105 hover:shadow-md group"
                >
                  <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mb-2 group-hover:bg-purple-700 transition-colors">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <span className="text-sm font-semibold text-purple-700">
                    Directions
                  </span>
                </button>
              </div>

              {/* Specialties */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <svg className="w-6 h-6 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  Specialties
                </h3>
                <div className="flex flex-wrap gap-3">
                  {hospital.specialties.map((specialty, index) => (
                    <span
                      key={specialty}
                      className={`px-4 py-2 rounded-full text-sm font-medium shadow-sm transition-all duration-200 hover:scale-105 ${
                        index % 4 === 0 
                          ? 'bg-green-100 text-green-800 border border-green-200'
                          : index % 4 === 1 
                          ? 'bg-blue-100 text-blue-800 border border-blue-200'
                          : index % 4 === 2 
                          ? 'bg-purple-100 text-purple-800 border border-purple-200'
                          : 'bg-orange-100 text-orange-800 border border-orange-200'
                      }`}
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Doctors Section */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900 flex items-center">
                  <svg className="w-6 h-6 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Our Doctors
                </h3>
                <button
                  onClick={() => {
                    const encryptedHospitalId = encodeURIComponent(
                      encryptId(hospital.id)
                    );
                    router.push(`/Hospital/${encryptedHospitalId}/doctors`);
                  }}
                  className="text-green-600 text-sm font-semibold hover:text-green-700 transition-colors flex items-center"
                >
                  See All
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              {isLoadingDoctors ? (
                <DoctorsLoadingSkeleton />
              ) : doctorError ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-red-600 font-medium">Error: {doctorError}</p>
                </div>
              ) : doctors.length > 0 ? (
                <div className="space-y-4">
                  {doctors
                    .filter(
                      (doctor) =>
                        typeof doctor.hospital === "object" &&
                        doctor.hospital.id === String(hospital.id)
                    )
                    .slice(0, 2)
                    .map((doctor) => (
                      <div
                        key={doctor.id}
                        onClick={() => {
                          const encryptedHospitalId = encodeURIComponent(
                            encryptId(hospital.id)
                          );
                          const encryptedDoctorId = encodeURIComponent(
                            encryptId(doctor.id)
                          );
                          router.push(
                            `/Hospital/${encryptedHospitalId}/doctors/${encryptedDoctorId}`
                          );
                        }}
                        className="flex items-center p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl hover:from-green-50 hover:to-green-100 transition-all duration-300 cursor-pointer hover:shadow-md border border-gray-200 hover:border-green-200 group"
                      >
                        <div className="relative mr-4">
                          {doctor.profileImage ? (
                            <img
                              src={doctor.profileImage}
                              alt={doctor.name}
                              className="w-16 h-16 rounded-full object-cover ring-2 ring-white shadow-md"
                            />
                          ) : (
                            <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-md">
                              <svg
                                className="w-8 h-8 text-white"
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
                            </div>
                          )}
                          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-900 text-lg mb-1 group-hover:text-green-700 transition-colors">
                            Dr. {doctor.name}
                          </h4>
                          <p className="text-gray-600 font-medium mb-2">
                            {doctor.specialization}
                          </p>
                          <div className="flex items-center">
                            <div className="flex items-center mr-4">
                              <svg
                                className="w-4 h-4 text-yellow-400 mr-1"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                              <span className="text-sm font-bold text-gray-700">
                                {doctor.rating}
                              </span>
                            </div>
                            <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full font-medium">
                              Available
                            </span>
                          </div>
                        </div>
                        <svg
                          className="w-6 h-6 text-gray-400 group-hover:text-green-600 transition-colors"
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
                    ))}
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-10 h-10 text-gray-400"
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
                  </div>
                  <p className="text-lg font-medium">No doctors available</p>
                  <p className="text-sm text-gray-400 mt-1">Check back later for updates</p>
                </div>
              )}

              {/* View All Doctors Button - Responsive sizing */}
              {doctors.length > 0 && (
                <div className="mt-6 flex justify-center">
                  <button
                    className="px-8 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl font-semibold hover:from-green-700 hover:to-green-800 transition-all duration-200 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-green-300 max-w-xs w-full sm:w-auto"
                    onClick={() => {
                      // Encrypt hospital ID first
                      const encryptedId = encryptId(hospital.id);
                      // Encode it for safe URL usage
                      const safeId = encodeURIComponent(encryptedId);
                      // Navigate to doctors page with encrypted ID
                      router.push(`/Hospital/${safeId}/doctors`);
                    }}
                  >
                    <span className="flex items-center justify-center">
                      View All Doctors
                      <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalDetail;