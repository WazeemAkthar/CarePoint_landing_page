"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import HospitalDetail from "@/components/HospitalDetail";
import { Hospital } from "@/types/hospital";


const HospitalPage = () => {
  const params = useParams();
  const hospitalId = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const [hospital, setHospital] = useState<Hospital | null>(null);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    if (!hospitalId) return;

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

    fetchHospitalDetails(hospitalId);
  }, [hospitalId]);

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
