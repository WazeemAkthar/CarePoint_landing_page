"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { apiClient } from "@/lib/apiClient";
import { Doctor } from "@/types/hospital";
import { AxiosResponse } from "axios";

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
        const response: AxiosResponse<DoctorsResponse> = await apiClient.get(`/doctors?hospital=${id}`);
        if (response.data && response.data.doctors) {
          console.log('Fetched doctors:', response.data.doctors);
          setDoctors(response.data.doctors);
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
                className="p-4 bg-gray-100 rounded-lg shadow-sm flex items-center gap-4"
              >
                {doctor.profileImage ? (
                  <img
                    src={doctor.profileImage}
                    alt={doctor.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 text-xl font-bold">
                    {doctor.name.slice(0, 1)}
                  </div>
                )}
                <div>
                  <h2 className="font-semibold">{doctor.name}</h2>
                  <p className="text-sm text-gray-600">{doctor.specialization}</p>
                  <p className="text-sm text-yellow-600">⭐ {doctor.rating}</p>
                  <p className="text-sm text-gray-500">{doctor.email}</p>
                  <p className="text-sm text-gray-500">{doctor.phone}</p>
                </div>
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
