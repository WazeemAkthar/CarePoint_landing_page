// components/HospitalDetail.tsx
"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Hospital, Doctor } from "@/types/hospital";
import BottomNavigation from "@/components/SideNavigation";
import { encryptId } from "@/lib/cryptoUtils";

interface HospitalDetailProps {
  hospital: Hospital;
  onDoctorSelect: (doctor: Doctor) => void;
}

const HospitalDetail: React.FC<HospitalDetailProps> = ({
  hospital,
  onDoctorSelect,
}) => {
  const router = useRouter();
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
          <h1 className="text-lg font-semibold">Book Appointment</h1>
        </div>
      </div>

      {/* Hospital Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={hospital.profileImage}
          alt={hospital.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Hospital Info */}
      <div className="px-4 py-6 bg-white">
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          {hospital.name}
        </h2>
        <div className="flex items-center text-gray-600 mb-4">
          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-sm">
            {hospital.address.city}, {hospital.address.state}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={handleCall}
            className="flex-1 flex flex-col items-center py-3 px-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <svg
              className="w-6 h-6 text-green-600 mb-1"
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
            <span className="text-sm font-medium text-green-600">Call</span>
          </button>

          <button
            onClick={handleEmail}
            className="flex-1 flex flex-col items-center py-3 px-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <svg
              className="w-6 h-6 text-green-600 mb-1"
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
            <span className="text-sm font-medium text-green-600">Email</span>
          </button>

          <button
            onClick={handleDirections}
            className="flex-1 flex flex-col items-center py-3 px-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <svg
              className="w-6 h-6 text-green-600 mb-1"
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
            <span className="text-sm font-medium text-green-600">
              Directions
            </span>
          </button>
        </div>

        {/* Specialties */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            Specialties
          </h3>
          <div className="flex flex-wrap gap-2">
            {hospital.specialties.map((specialty) => (
              <span
                key={specialty}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
              >
                {specialty}
              </span>
            ))}
          </div>
        </div>

        {/* Doctors Section */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Doctors</h3>
            <button
              onClick={() => {
                const encryptedHospitalId = encodeURIComponent(
                  encryptId(hospital.id)
                );
                router.push(`/Hospital/${encryptedHospitalId}/doctors`);
              }}
              className="text-green-600 text-sm font-medium"
            >
              See All
            </button>
          </div>

          {isLoadingDoctors ? (
            <div>Loading doctors...</div>
          ) : doctorError ? (
            <div>Error: {doctorError}</div>
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
                    className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                  >
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mr-4">
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
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">
                        {doctor.name}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {doctor.specialization}
                      </p>
                      <div className="flex items-center mt-1">
                        <svg
                          className="w-4 h-4 text-yellow-400 mr-1"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="text-sm text-gray-600">
                          {doctor.rating}
                        </span>
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
                ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
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
              </div>
              <p>No doctors available</p>
            </div>
          )}
        </div>

        {/* View All Doctors Button */}
        {doctors.length > 0 && (
          <button
            className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
            onClick={() => {
              // Encrypt hospital ID first
              const encryptedId = encryptId(hospital.id);
              // Encode it for safe URL usage
              const safeId = encodeURIComponent(encryptedId);
              // Navigate to doctors page with encrypted ID
              router.push(`/Hospital/${safeId}/doctors`);
            }}
          >
            View All Doctors
          </button>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="pb-20">
        <BottomNavigation activeTab="hospitals" />
      </div>
    </div>
  );
};

export default HospitalDetail;
