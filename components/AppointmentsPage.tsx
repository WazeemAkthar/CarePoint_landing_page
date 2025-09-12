"use client";
import React, { useEffect, useState } from "react";
import {
  Calendar,
  MapPin,
  Phone,
  Hospital,
  User,
  Heart,
} from "lucide-react";
import ConditionalSidebar from "./ConditionalSidebar";
import { apiClient } from "@/lib/apiClient";

interface Appointment {
  _id: string;
  appointmentDate: string;
  timeSlot: string;
  doctor: {
    name: string;
    specialization: string;
  };
  hospital: {
    name: string;
    address?: {
      city?: string;
    };
  };
  phone: string;
  status: string;
  canCancel: boolean;
  cancelReason?: string;
}

interface AppointmentResponse {
  success: boolean;
  message: string;
  data: Appointment[];
  total: number;
  currentPage: number;
  totalPages: number;
}


const AppointmentsPage: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchAppointments = async () => {
    try {
      setLoading(true);

      // Get userId from localStorage
      const userId = localStorage.getItem("userId");
      if (!userId) {
        console.error("User ID not found in localStorage");
        setAppointments([]);
        return;
      }

      // Fetch all appointments
      const response = await apiClient.get<AppointmentResponse>("/appointments");
      const allAppointments = response.data || [];

      // Filter appointments by userId
      const userAppointments = allAppointments.filter((apt: any) => {
        // If the backend returns user object or user ID string
        const appointmentUserId =
          typeof apt.user === "object" ? apt.user.id : apt.user;
        return appointmentUserId === userId;
      });

      setAppointments(userAppointments);
    } catch (err) {
      console.error("Error fetching appointments:", err);
      setAppointments([]);
    } finally {
      setLoading(false);
    }
  };

  fetchAppointments();
}, []);





  const handleContactHospital = (appointment: Appointment) => {
    alert(`Contacting ${appointment.hospital?.name} for appointment with ${appointment.doctor?.name}`);
  };

  if (loading) {
    return (
      <ConditionalSidebar>
        <div className="min-h-screen flex items-center justify-center text-gray-600">
          Loading appointments...
        </div>
      </ConditionalSidebar>
    );
  }

  return (
    <ConditionalSidebar>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-green-500 text-white text-center py-4">
          <h1 className="text-xl font-semibold">My Appointments</h1>
        </div>

        {/* Content */}
        <div className="p-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Upcoming Appointments
          </h2>

          {appointments.length === 0 && (
            <p className="text-gray-500">No appointments found.</p>
          )}

          {appointments.map((appointment) => (
            <div
              key={appointment._id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 mb-4 p-4"
            >
              {/* Date and Status */}
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    {new Date(appointment.appointmentDate).toDateString()}
                  </h3>
                  <p className="text-gray-600">{appointment.timeSlot}</p>
                </div>
                <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {appointment.status}
                </span>
              </div>

              {/* Appointment Details */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center space-x-2 text-gray-700">
                  <User className="w-4 h-4 text-green-500" />
                  <span>{appointment.doctor?.name}</span>
                </div>

                <div className="flex items-center space-x-2 text-gray-700">
                  <Heart className="w-4 h-4 text-green-500" />
                  <span>{appointment.doctor?.specialization}</span>
                </div>

                <div className="flex items-center space-x-2 text-gray-700">
                  <Hospital className="w-4 h-4 text-green-500" />
                  <span>{appointment.hospital?.name}</span>
                </div>

                <div className="flex items-center space-x-2 text-gray-700">
                  <MapPin className="w-4 h-4 text-green-500" />
                  <span>{appointment.hospital?.address?.city || "N/A"}</span>
                </div>
              </div>

              {/* Warning Message */}
              {appointment.cancelReason && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3 mb-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-yellow-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">!</span>
                    </div>
                    <span className="text-yellow-800 text-sm">
                      {appointment.cancelReason}
                    </span>
                  </div>
                </div>
              )}

              {/* Contact Button */}
              <button
                onClick={() => handleContactHospital(appointment)}
                className="w-full bg-white border-2 border-green-500 text-green-500 py-3 rounded-lg flex items-center justify-center space-x-2 hover:bg-green-50 transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span className="font-medium">Contact Hospital</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </ConditionalSidebar>
  );
};

export default AppointmentsPage;
