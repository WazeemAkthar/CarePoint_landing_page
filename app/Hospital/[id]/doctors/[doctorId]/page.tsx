// app/Hospital/[id]/doctors/[doctorId]/page.tsx
"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Doctor, Hospital } from "@/types/hospital";
import DoctorProfile, { DoctorProfileSkeleton } from "@/components/DoctorProfile";
import { decryptId } from "@/lib/cryptoUtils";
import ConditionalSidebar from "@/components/ConditionalSidebar";

const DoctorProfilePage = () => {
  const params = useParams();
  const hospitalIdEncrypted = params.id as string;
  const doctorIdEncrypted = params.doctorId as string;

  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [hospital, setHospital] = useState<Hospital | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let decryptedHospitalId: string;
    let decryptedDoctorId: string;

    try {
      // Decode + decrypt hospital ID
      const decodedHospitalId = decodeURIComponent(hospitalIdEncrypted);
      decryptedHospitalId = decryptId(decodedHospitalId);
      if (!decryptedHospitalId) throw new Error("Invalid hospital ID");

      // Decode + decrypt doctor ID
      const decodedDoctorId = decodeURIComponent(doctorIdEncrypted);
      decryptedDoctorId = decryptId(decodedDoctorId);
      if (!decryptedDoctorId) throw new Error("Invalid doctor ID");
    } catch (err) {
      console.error("Failed to decrypt IDs:", err);
      setError("Invalid hospital or doctor ID");
      setIsLoading(false);
      return;
    }

    const fetchDoctorAndHospital = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const { apiClient } = require("../../../../../lib/apiClient");

        // Fetch the specific doctor
        const doctorResponse = await apiClient.get(
          `/doctors/${decryptedDoctorId}`
        );
        setDoctor(doctorResponse.doctor || null);

        // Fetch the hospital details
        const hospitalResponse = await apiClient.get(
          `/hospitals/${decryptedHospitalId}`
        );
        setHospital(hospitalResponse.hospital || null);
      } catch (err) {
        console.error("Failed to load profile:", err);
        setError("Failed to load profile.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDoctorAndHospital();
  }, [hospitalIdEncrypted, doctorIdEncrypted]);

  return (
    <ConditionalSidebar>
      {/* Show loading skeleton while data is being fetched */}
      {isLoading && <DoctorProfileSkeleton />}

      {/* Show error state */}
      {error && !isLoading && (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center py-10">
            <div className="mb-4">
              <svg 
                className="w-16 h-16 text-red-500 mx-auto mb-4" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Profile</h2>
            <p className="text-red-500 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      )}

      {/* Show not found state */}
      {!doctor || !hospital && !isLoading && !error && (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center py-10">
            <div className="mb-4">
              <svg 
                className="w-16 h-16 text-gray-400 mx-auto mb-4" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.007-5.824-2.696M15 12a3 3 0 11-6 0 3 3 0 016 0z" 
                />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Profile Not Found</h2>
            <p className="text-gray-500 mb-4">Doctor or hospital information could not be found.</p>
            <button 
              onClick={() => window.history.back()} 
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Go Back
            </button>
          </div>
        </div>
      )}

      {/* Show the actual profile when data is loaded */}
      {doctor && hospital && !isLoading && !error && (
        <DoctorProfile doctor={doctor} hospital={hospital} />
      )}
    </ConditionalSidebar>
  );
};

export default DoctorProfilePage;