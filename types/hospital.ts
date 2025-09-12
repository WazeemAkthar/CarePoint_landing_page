import { ReactNode } from "react";

export type Specialty = "All" | "Cardiology" | "Neurology" | "Pediatrics" | "Orthopedics";

export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  hospital: string | { id: string; name: string; address?: any };
  rating: number;
  profileImage?: string;
  email: string;
  phone: string;
  experience: number; // in years
   availableSlots: {
    [day: string]: { from: string }[];
  };

}

export interface Hospital {
  location: ReactNode;
  id: number;
  name: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country?: string;
  };

  rating: number;
  specialty: Specialty;
  phone: string;
  email: string;
  isEmergencyAvailable: boolean;
  profileImage: string;
  doctors: Doctor[];
  specialties: Specialty[];
  description: string;
  facilities: string[];
  isActive: boolean;
}

export interface User {
  id: number;
  username: string;
  fullName: string;
  email: string;
  phone?: string;
}
