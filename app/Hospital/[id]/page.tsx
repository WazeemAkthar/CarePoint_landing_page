"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import HospitalDetail from "@/components/HospitalDetail";
import { Hospital } from "@/types/hospital";
import { decryptId } from "@/lib/cryptoUtils";

const HospitalPage: React.FC = () => {
  const params = useParams();
  const hospitalIdEncrypted = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const [hospital, setHospital] = useState<Hospital | null>(null);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    if (!hospitalIdEncrypted) return;

    let decryptedId: string;
    try {
      // Step 1: Decode URL
      const decodedId = decodeURIComponent(hospitalIdEncrypted);
      // Step 2: Decrypt to get real hospital ID
      decryptedId = decryptId(decodedId);
      if (!decryptedId) throw new Error("Invalid decrypted ID");
    } catch (err) {
      console.error("Failed to decrypt hospital ID:", err);
      setError("Invalid hospital ID");
      setIsLoading(false);
      return;
    }

    const fetchHospitalDetails = async (id: string) => {
      try {
        const { apiClient } = require("@/lib/apiClient");
        const response = await apiClient.get(`/hospitals/${id}`);
        setHospital(response.hospital || null);
      } catch (err) {
        console.error("Failed to fetch hospital details:", err);
        setError("Failed to load hospital details.");
      } finally {
        setIsLoading(false);
      }
    };

    // Fetch using decrypted real ID
    fetchHospitalDetails(decryptedId);
  }, [hospitalIdEncrypted]);
  
  if (isLoading) {
    return <div className="text-center py-20">Loading...</div>;
  }

  if (error || !hospital) {
    return <div className="text-center py-20">{error || "Hospital not found."}</div>;
  }

  return (
    <HospitalDetail
      hospital={hospital}
      onDoctorSelect={(doctor) => {
        console.log("Selected doctor:", doctor);
         router.push(`/Hospital/${hospital.id}/doctors/${doctor.id}`);
      }}
    />
  );
};

export default HospitalPage;
