"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import HospitalDetail from "@/components/HospitalDetail";
import { Hospital } from "@/types/hospital";
import { decryptId } from "@/lib/cryptoUtils";
import ConditionalSidebar from "@/components/ConditionalSidebar";

// Skeleton Loading Component - Fixed to work properly with ConditionalSidebar
const HospitalPageSkeleton = () => (
  <ConditionalSidebar>
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 animate-pulse">
      {/* Header Skeleton */}
      <div className="bg-gray-300 h-16"></div>
      
      {/* Image Skeleton */}
      <div className="h-52 bg-gray-200"></div>
      
      {/* Content Skeleton */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Hospital Info Skeleton */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-100">
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-3"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
          
          {/* Action Buttons Skeleton */}
          <div className="grid grid-cols-3 gap-3 mb-8">
            <div className="h-20 bg-gray-100 rounded-xl"></div>
            <div className="h-20 bg-gray-100 rounded-xl"></div>
            <div className="h-20 bg-gray-100 rounded-xl"></div>
          </div>
          
          {/* Specialties Skeleton */}
          <div className="mb-8">
            <div className="h-6 bg-gray-200 rounded w-32 mb-4"></div>
            <div className="flex flex-wrap gap-3">
              <div className="h-8 bg-gray-100 rounded-full w-24"></div>
              <div className="h-8 bg-gray-100 rounded-full w-32"></div>
              <div className="h-8 bg-gray-100 rounded-full w-20"></div>
              <div className="h-8 bg-gray-100 rounded-full w-28"></div>
            </div>
          </div>
        </div>
        
        {/* Doctors Section Skeleton */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <div className="h-6 bg-gray-200 rounded w-32"></div>
            <div className="h-4 bg-gray-200 rounded w-16"></div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center p-4 bg-gray-50 rounded-xl">
              <div className="w-16 h-16 bg-gray-200 rounded-full mr-4"></div>
              <div className="flex-1 space-y-2">
                <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/3"></div>
              </div>
              <div className="w-6 h-6 bg-gray-200 rounded"></div>
            </div>
            <div className="flex items-center p-4 bg-gray-50 rounded-xl">
              <div className="w-16 h-16 bg-gray-200 rounded-full mr-4"></div>
              <div className="flex-1 space-y-2">
                <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/3"></div>
              </div>
              <div className="w-6 h-6 bg-gray-200 rounded"></div>
            </div>
          </div>
          
          <div className="mt-6 flex justify-center">
            <div className="h-12 bg-gray-200 rounded-xl w-48"></div>
          </div>
        </div>
      </div>
    </div>
  </ConditionalSidebar>
);

// Error Component - Fixed to work properly with ConditionalSidebar
const ErrorDisplay = ({ message }: { message: string }) => (
  <ConditionalSidebar>
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center py-20">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md mx-4 text-center border border-gray-100">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Oops! Something went wrong</h2>
        <p className="text-gray-600 mb-4">{message}</p>
        <button 
          onClick={() => window.history.back()}
          className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl font-semibold hover:from-green-700 hover:to-green-800 transition-all duration-200 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-green-300"
        >
          Go Back
        </button>
      </div>
    </div>
  </ConditionalSidebar>
);
 
const HospitalPage: React.FC = () => {
  const params = useParams();
  const hospitalIdEncrypted = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const [hospital, setHospital] = useState<Hospital | null>(null);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    if (!hospitalIdEncrypted) {
      setError("Hospital ID is required");
      setIsLoading(false);
      return;
    }

    let decryptedId: string;
    try {
      // Step 1: Decode URL
      const decodedId = decodeURIComponent(hospitalIdEncrypted);
      // Step 2: Decrypt to get real hospital ID
      decryptedId = decryptId(decodedId);
      if (!decryptedId) throw new Error("Invalid decrypted ID");
    } catch (err) {
      console.error("Failed to decrypt hospital ID:", err);
      setError("Invalid hospital ID. Please check the link and try again.");
      setIsLoading(false);
      return;
    }

    const fetchHospitalDetails = async (id: string) => {
      try {
        setIsLoading(true);
        setError("");
        const { apiClient } = require("@/lib/apiClient");
        const response = await apiClient.get(`/hospitals/${id}`);
        
        if (response && response.hospital) {
          setHospital(response.hospital);
        } else {
          setError("Hospital not found. It may have been moved or deleted.");
        }
      } catch (err) {
        console.error("Failed to fetch hospital details:", err);
        setError("Failed to load hospital details. Please check your connection and try again.");
      } finally {
        setIsLoading(false);
      }
    };

    // Fetch using decrypted real ID
    fetchHospitalDetails(decryptedId);
  }, [hospitalIdEncrypted]);

  if (isLoading) {
    return <HospitalPageSkeleton />;
  }

  if (error || !hospital) {
    return <ErrorDisplay message={error || "Hospital not found."} />;
  }

  return (
    <>
      <HospitalDetail
        hospital={hospital}
        onDoctorSelect={(doctor) => {
          console.log("Selected doctor:", doctor);
          router.push(`/Hospital/${hospitalIdEncrypted}/doctors/${doctor.id}`);
        }}
      />
    </>
  );
};

export default HospitalPage;