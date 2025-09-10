"use client";
import React from "react";
import { useParams, useRouter } from "next/navigation";
import { Doctor } from "@/types/hospital";
import BottomNavigation from "@/components/SideNavigation";
import { decryptId } from "@/lib/cryptoUtils";
import { encryptId } from "@/lib/cryptoUtils";
import ConditionalSidebar from "@/components/ConditionalSidebar";

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
    <div className="min-h-screen bg-gray-50">
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
                onClick={() => {
                  // Encrypt and encode doctor.id
                  const encryptedDoctorId = encodeURIComponent(
                    encryptId(doctor.id)
                  );
                  router.push(
                    `/Hospital/${hospitalIdEncrypted}/doctors/${encryptedDoctorId}`
                  );
                }}
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
                  <p className="text-sm text-gray-600">
                    {doctor.specialization}
                  </p>
                  <p className="text-xs text-gray-500">
                    {typeof doctor.hospital === "object" &&
                    doctor.hospital !== null
                      ? doctor.hospital.name
                      : "Unknown Hospital"}
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
    </div>
    </ConditionalSidebar>
  );
};

export default AllDoctorsPage;
