"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { apiClient } from "@/lib/apiClient";
import { Doctor } from "@/types/hospital";

const AllDoctorsPage = () => {
  type DoctorsResponse = {
    doctors: Doctor[];
  };
  const { id } = useParams(); // hospital id from URL
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await apiClient.get<DoctorsResponse>(`/doctors?hospital=${id}`);
        if (response && response.doctors) {
          setDoctors(response.doctors);
        } else {
          setDoctors([]);
        }
      } catch (error) {
        console.error("Error fetching doctors", error);
        setDoctors([]);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchDoctors();
  }, [id]);

  if (loading) return <div className="p-6">Loading doctors...</div>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">All Doctors</h1>
      {doctors.length > 0 ? (
        <div className="space-y-4">
          {doctors.map((doctor) => (
            <div
              key={doctor.id}
              className="p-4 bg-gray-100 rounded-lg shadow-sm"
            >
              <h2 className="font-semibold">{doctor.name}</h2>
              <p className="text-sm text-gray-600">{doctor.specialty}</p>
              <p className="text-sm text-yellow-600">⭐ {doctor.rating}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No doctors found.</p>
      )}
    </div>
  );
};

export default AllDoctorsPage;
