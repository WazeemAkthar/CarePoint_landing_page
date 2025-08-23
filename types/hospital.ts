export interface Hospital {
  id: number;
  name: string;
  location: string;
  rating: number;
  specialty: string;
  phone?: string;
  email?: string;
  website?: string;
  services?: string[];
  isEmergencyAvailable?: boolean;
}

export interface User {
  id?: string;
  fullName?: string;
  email?: string;
  phone?: string;
  dateOfBirth?: string;
}

export type Specialty = 
  | 'Cardiology'
  | 'Neurology' 
  | 'Pediatrics'
  | 'Orthopedics'
  | 'Dermatology'
  | 'General Medicine'
  | 'Surgery'
  | 'Psychiatry';