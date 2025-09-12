"use client";
import React from "react";
import { useParams, useRouter } from "next/navigation";
import { Doctor } from "@/types/hospital";
import { decryptId } from "@/lib/cryptoUtils";
import { encryptId } from "@/lib/cryptoUtils";
import ConditionalSidebar from "@/components/ConditionalSidebar";

// Skeleton Loader Component
const DoctorCardSkeleton: React.FC = () => (
  <div className="flex items-center p-4 bg-white rounded-lg shadow-md border border-gray-100 animate-pulse">
    <div className="w-12 sm:w-16 h-12 sm:h-16 bg-gray-200 rounded-full mr-3 sm:mr-4 flex-shrink-0"></div>
    <div className="flex-1 space-y-2 min-w-0">
      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
      <div className="h-3 bg-gray-200 rounded w-2/3"></div>
    </div>
    <div className="w-6 h-6 bg-gray-200 rounded ml-2 flex-shrink-0"></div>
  </div>
);

const AllDoctorsPage: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const hospitalIdEncrypted = params.id as string;

  const [doctors, setDoctors] = React.useState<Doctor[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!hospitalIdEncrypted) return;

    let decryptedId: string;
    try {
      // Step 1: Decode
      const decodedId = decodeURIComponent(hospitalIdEncrypted);
      // Step 2: Decrypt
      decryptedId = decryptId(decodedId);
      if (!decryptedId) throw new Error("Invalid decrypted ID");
    } catch (err) {
      console.error("Failed to decrypt hospital ID:", err);
      setError("Invalid hospital ID");
      setIsLoading(false);
      return;
    }

    const fetchAllDoctors = async (id: string) => {
      setIsLoading(true);
      setError(null);
      try {
        const { apiClient } = require("../../../../lib/apiClient");
        const response = await apiClient.get(`/doctors?hospital=${id}`);

        if (response && response.doctors) {
          // Client-side filtering fallback
          const filteredDoctors = response.doctors.filter(
            (doc: Doctor) =>
              typeof doc.hospital === "object" && doc.hospital?.id === id
          );
          setDoctors(filteredDoctors);
        } else {
          setDoctors([]);
        }
      } catch (err) {
        console.error("Failed to fetch doctors:", err);
        setError("Failed to load doctors.");
      } finally {
        setIsLoading(false);
      }
    };

    // Use decrypted **real hospital ID**
    fetchAllDoctors(decryptedId);
  }, [hospitalIdEncrypted]);

  const handleBack = () => {
    router.back();
  };

  return (
    <ConditionalSidebar>
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
        {/* Enhanced Header */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg">
          <div className="flex items-center px-4 sm:px-6 py-4 sm:py-5">
            <button
              onClick={handleBack}
              className="mr-3 sm:mr-4 p-2 hover:bg-white/20 rounded-full transition-all duration-200 ease-in-out transform hover:scale-105 flex-shrink-0"
              aria-label="Go back"
            >
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6"
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
            <div className="flex items-center min-w-0">
              <svg
                className="w-6 h-6 sm:w-8 sm:h-8 mr-2 sm:mr-3 text-green-200 flex-shrink-0"
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
              <h1 className="text-lg sm:text-xl font-bold truncate">All Doctors</h1>
            </div>
          </div>
          
          {/* Stats Bar */}
          {!isLoading && !error && (
            <div className="px-4 sm:px-6 pb-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-3 sm:px-4 py-2 inline-block">
                <span className="text-sm font-medium">
                  {doctors.length} {doctors.length === 1 ? 'Doctor' : 'Doctors'} Available
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="px-4 sm:px-6 py-6 sm:py-8 overflow-x-hidden">
          {isLoading ? (
            <div className="space-y-4">
              <div className="flex items-center justify-center py-8">
                <div className="flex items-center space-x-2 text-green-600">
                  <svg
                    className="animate-spin w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 2v4m0 12v4m8.485-8.485l-2.829 2.829M5.757 5.757l-2.829 2.829M22 12h-4M6 12H2m16.485 3.515l-2.829-2.829M5.757 18.243l-2.829-2.829"
                    />
                  </svg>
                  <span className="text-base sm:text-lg font-medium">Loading doctors...</span>
                </div>
              </div>
              
              {/* Skeleton Cards */}
              {[...Array(6)].map((_, index) => (
                <DoctorCardSkeleton key={index} />
              ))}
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-10 h-10 sm:w-12 sm:h-12 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2 text-center px-4">Error Loading Doctors</h3>
              <p className="text-gray-600 text-center max-w-md px-4 mb-4">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                Try Again
              </button>
            </div>
          ) : doctors.length > 0 ? (
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
              {doctors.map((doctor) => (
                <div
                  key={doctor.id}
                  onClick={() => {
                    // Encrypt and encode doctor.id
                    const encryptedDoctorId = encodeURIComponent(
                      encryptId(doctor.id)
                    );
                    router.push(
                      `/Hospital/${hospitalIdEncrypted}/doctors/${encryptedDoctorId}`
                    );
                  }}
                  className="group cursor-pointer bg-white rounded-xl shadow-md hover:shadow-xl border border-gray-100 transition-all duration-300 ease-in-out transform hover:-translate-y-1 p-4 sm:p-6 min-w-0"
                >
                  {/* Doctor Avatar */}
                  <div className="flex items-start space-x-3 sm:space-x-4">
                    <div className="relative flex-shrink-0">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center overflow-hidden ring-2 ring-green-100 group-hover:ring-green-300 transition-all">
                        {doctor.profileImage ? (
                          <img
                            src={doctor.profileImage}
                            alt={doctor.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <svg
                            className="w-6 h-6 sm:w-8 sm:h-8 text-green-600"
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
                      {/* Online Status Indicator */}
                      <div className="absolute -bottom-0.5 -right-0.5 sm:-bottom-1 sm:-right-1 w-4 h-4 sm:w-5 sm:h-5 bg-green-500 rounded-full border-2 border-white"></div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-gray-900 text-base sm:text-lg group-hover:text-green-700 transition-colors truncate">
                        {doctor.name}
                      </h4>
                      <p className="text-green-600 font-medium text-sm mt-1 truncate">
                        {doctor.specialization}
                      </p>
                      <p className="text-gray-500 text-xs mt-1 sm:mt-2 flex items-center truncate">
                        <svg
                          className="w-3 h-3 mr-1 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h3M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                          />
                        </svg>
                        <span className="truncate">
                          {typeof doctor.hospital === "object" &&
                          doctor.hospital !== null
                            ? doctor.hospital.name
                            : "Unknown Hospital"}
                        </span>
                      </p>
                    </div>

                    {/* Arrow Icon */}
                    <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
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
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Available
                      </span>
                      <button className="text-sm text-green-600 hover:text-green-700 font-medium">
                        View Profile
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                <svg
                  className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400"
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
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 text-center px-4">No Doctors Found</h3>
              <p className="text-gray-600 text-center max-w-md mb-6 px-4">
                There are currently no doctors registered for this hospital. Please check back later or contact the hospital administration.
              </p>
              <button
                onClick={handleBack}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                Go Back
              </button>
            </div>
          )}
        </div>
      </div>
    </ConditionalSidebar>
  );
};

export default AllDoctorsPage;