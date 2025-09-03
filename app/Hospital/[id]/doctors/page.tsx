"use client";
import React from "react";
import { useParams, useRouter } from "next/navigation";
import { Doctor } from "@/types/hospital";
import BottomNavigation from "@/components/BottomNavigation";

const AllDoctorsPage: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const hospitalId = params.id as string;

  const [doctors, setDoctors] = React.useState<Doctor[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchAllDoctors = async () => {
      if (!hospitalId) return;

      setIsLoading(true);
      setError(null);
      try {
        const { apiClient } = require("../../../../lib/apiClient");
        const response = await apiClient.get(`/doctors?hospital=${hospitalId}`);
        if (response && response.doctors) {
          // Filter doctors by hospital ID on the client side just in case API doesn't filter.
          const filteredDoctors = response.doctors.filter(
            (doc: Doctor) => typeof doc.hospital === 'object' && doc.hospital.id === hospitalId
          );
          setDoctors(filteredDoctors);
        } else {
          setDoctors([]);
        }
      } catch (err) {
        setError("Failed to load doctors.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllDoctors();
  }, [hospitalId]);

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-green-600 text-white">
        <div className="flex items-center px-4 py-4">
          <button
            onClick={handleBack}
            className="mr-4 p-2 hover:bg-green-700 rounded-full transition-colors"
            aria-label="Go back"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-lg font-semibold">All Doctors</h1>
        </div>
      </div>

      <div className="px-4 py-6">
        {isLoading ? (
          <div className="text-center">Loading all doctors...</div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : doctors.length > 0 ? (
          <div className="space-y-4">
            {doctors.map((doctor) => (
              <div
                key={doctor.id}
                                      onClick={() => router.push(`/Hospital/${hospitalId}/doctors/${doctor.id}`)}

                className="flex items-center p-4 bg-gray-50 rounded-lg shadow"

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
                  <h4 className="font-medium text-gray-900">{doctor.name}</h4>
                <p className="text-sm text-gray-600">{doctor.specialization}</p>
                  <p className="text-xs text-gray-500">
                    {
                      typeof doctor.hospital === 'object' && doctor.hospital !== null 
                        ? doctor.hospital.name 
                        : 'Unknown Hospital'
                    }
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p>No doctors found for this hospital.</p>
          </div>
        )}
      </div>

      <div className="pb-20">
        <BottomNavigation activeTab="hospitals" />
      </div>
    </div>
  );
};

export default AllDoctorsPage;