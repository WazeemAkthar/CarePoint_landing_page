// app/Hospital/[id]/doctors/[doctorId]/page.tsx
"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Doctor, Hospital } from "@/types/hospital";
import DoctorProfile from "@/components/DoctorProfile";
import BottomNavigation from "@/components/SideNavigation";
import { decryptId } from "@/lib/cryptoUtils";

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

  if (isLoading) {
    return <div className="text-center py-10">Loading profile...</div>;
  }

  if (error || !doctor || !hospital) {
    return (
      <div className="text-center py-10 text-red-500">
        {error || "Doctor or hospital not found."}
      </div>
    );
  }

  return (
    <>
      <DoctorProfile doctor={doctor} hospital={hospital} />
      <div className="pb-20">
        <BottomNavigation activeTab="hospitals" />
      </div>
    </>
  );
};

export default DoctorProfilePage;
