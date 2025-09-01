// types/hospital.ts
export type Specialty = "Cardiology" | "Neurology" | "Pediatrics" | "Orthopedics";

export interface Doctor {
  id: number;
  name: string;
  specialty: Specialty;
  rating: number;
  experience: number;
  patients: number;
  workingDays: string[];
  image?: string;
  qualifications: string[];
  about: string;
}

export interface Hospital {
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
  image: string;
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

// // Mock data for hospitals with doctors
// export const hospitalsData: Hospital[] = [
//   {
//     id: 1,
//     name: "National Hospital of Sri Lanka",
//     location: "Colombo, Western Province",
//     rating: 4.5,
//     specialty: "Cardiology",
//     phone: "+94-11-2691111",
//     email: "info@nhsl.health.gov.lk",
//     isEmergencyAvailable: true,
//     image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=500",
//     description: "The premier government hospital in Sri Lanka, providing comprehensive healthcare services with state-of-the-art facilities.",
//     specialties: ["Cardiology", "Neurology", "Pediatrics", "Orthopedics"],
//     facilities: ["24/7 Emergency", "ICU", "Pharmacy", "Laboratory", "Radiology"],
//     doctors: [
//       {
//         id: 1,
//         name: "Dr. Sunil Perera",
//         specialty: "Cardiology",
//         rating: 4.8,
//         experience: 15,
//         patients: 2500,
//         workingDays: ["Monday", "Wednesday", "Friday"],
//         qualifications: ["MBBS", "MD Cardiology", "FRCP"],
//         about: "Senior Consultant Cardiologist with extensive experience in interventional cardiology and heart surgery."
//       },
//       {
//         id: 2,
//         name: "Dr. Kamani Silva",
//         specialty: "Neurology",
//         rating: 4.7,
//         experience: 12,
//         patients: 1800,
//         workingDays: ["Tuesday", "Thursday", "Saturday"],
//         qualifications: ["MBBS", "MD Neurology", "FRCP"],
//         about: "Specialist in neurological disorders with focus on stroke management and epilepsy treatment."
//       }
//     ]
//   },
//   {
//     id: 2,
//     name: "Asiri Central Hospital",
//     location: "Colombo, Western Province",
//     rating: 4.7,
//     specialty: "Cardiology",
//     phone: "+94-11-4665500",
//     email: "info@asirihealth.com",
//     isEmergencyAvailable: true,
//     image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=500",
//     description: "Leading private hospital chain offering world-class healthcare with modern technology and expert medical professionals.",
//     specialties: ["Cardiology", "Orthopedics", "Pediatrics"],
//     facilities: ["24/7 Emergency", "ICU", "Pharmacy", "Laboratory", "MRI", "CT Scan"],
//     doctors: [
//       {
//         id: 3,
//         name: "Dr. Oshani Ekanayaka",
//         specialty: "Orthopedics",
//         rating: 4.8,
//         experience: 5,
//         patients: 1000,
//         workingDays: ["Monday", "Friday"],
//         qualifications: ["MBBS", "MS Orthopedics"],
//         about: "Young and dynamic orthopedic surgeon specializing in sports injuries and joint replacements."
//       },
//       {
//         id: 4,
//         name: "Dr. Ranjan Fernando",
//         specialty: "Cardiology",
//         rating: 4.9,
//         experience: 20,
//         patients: 3500,
//         workingDays: ["Monday", "Tuesday", "Wednesday", "Thursday"],
//         qualifications: ["MBBS", "MD Cardiology", "FRCP", "FACC"],
//         about: "Leading cardiologist with expertise in cardiac catheterization and complex heart procedures."
//       }
//     ]
//   },
//   {
//     id: 3,
//     name: "Nawaloka Hospitals",
//     location: "Colombo, Western Province",
//     rating: 4.6,
//     specialty: "Cardiology",
//     phone: "+94-11-2577777",
//     email: "info@nawaloka.com",
//     isEmergencyAvailable: true,
//     image: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=500",
//     description: "Premier healthcare provider with cutting-edge medical technology and internationally trained specialists.",
//     specialties: ["Cardiology", "Neurology", "Pediatrics"],
//     facilities: ["24/7 Emergency", "ICU", "NICU", "Pharmacy", "Laboratory", "Radiology"],
//     doctors: [
//       {
//         id: 5,
//         name: "Dr. Priya Jayawardena",
//         specialty: "Pediatrics",
//         rating: 4.9,
//         experience: 18,
//         patients: 4200,
//         workingDays: ["Monday", "Tuesday", "Wednesday", "Friday"],
//         qualifications: ["MBBS", "MD Pediatrics", "MRCPCH"],
//         about: "Senior consultant pediatrician with special interest in neonatology and child development."
//       },
//       {
//         id: 6,
//         name: "Dr. Mahesh Rodrigo",
//         specialty: "Neurology",
//         rating: 4.6,
//         experience: 10,
//         patients: 1500,
//         workingDays: ["Thursday", "Friday", "Saturday"],
//         qualifications: ["MBBS", "MD Neurology"],
//         about: "Neurologist specializing in movement disorders and neuromuscular diseases."
//       }
//     ]
//   },
//   {
//     id: 4,
//     name: "Lanka Hospitals",
//     location: "Colombo, Western Province",
//     rating: 4.4,
//     specialty: "Cardiology",
//     phone: "+94-11-5430000",
//     email: "info@lankahospitals.com",
//     isEmergencyAvailable: true,
//     image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=500",
//     description: "Trusted healthcare institution providing comprehensive medical care with a focus on patient satisfaction.",
//     specialties: ["Cardiology", "Orthopedics"],
//     facilities: ["Emergency Care", "ICU", "Pharmacy", "Laboratory", "Physiotherapy"],
//     doctors: [
//       {
//         id: 7,
//         name: "Dr. Nimal Bandara",
//         specialty: "Orthopedics",
//         rating: 4.5,
//         experience: 22,
//         patients: 3800,
//         workingDays: ["Monday", "Wednesday", "Friday", "Saturday"],
//         qualifications: ["MBBS", "MS Orthopedics", "FRCS"],
//         about: "Senior orthopedic surgeon with expertise in spine surgery and trauma care."
//       }
//     ]
//   },
//   {
//     id: 5,
//     name: "Durdans Hospital",
//     location: "Colombo, Western Province",
//     rating: 4.8,
//     specialty: "Cardiology",
//     phone: "+94-11-2140000",
//     email: "info@durdans.com",
//     isEmergencyAvailable: true,
//     image: "https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?w=500",
//     description: "Historic hospital with modern facilities, known for excellence in medical care and patient service.",
//     specialties: ["Cardiology", "Neurology", "Pediatrics", "Orthopedics"],
//     facilities: ["24/7 Emergency", "ICU", "CCU", "Pharmacy", "Laboratory", "Radiology", "MRI"],
//     doctors: [
//       {
//         id: 8,
//         name: "Dr. Anjali Wickramasinghe",
//         specialty: "Cardiology",
//         rating: 4.7,
//         experience: 14,
//         patients: 2200,
//         workingDays: ["Tuesday", "Thursday", "Saturday"],
//         qualifications: ["MBBS", "MD Cardiology", "FRCP"],
//         about: "Consultant cardiologist with special interest in women's heart health and preventive cardiology."
//       },
//       {
//         id: 9,
//         name: "Dr. Chamara Gunawardena",
//         specialty: "Pediatrics",
//         rating: 4.8,
//         experience: 16,
//         patients: 3600,
//         workingDays: ["Monday", "Wednesday", "Thursday", "Friday"],
//         qualifications: ["MBBS", "MD Pediatrics", "MRCPCH"],
//         about: "Pediatric specialist with expertise in infectious diseases and pediatric emergency care."
//       }
//     ]
//   },
//   {
//     id: 6,
//     name: "Apollo Hospitals",
//     location: "Colombo, Western Province",
//     rating: 4.5,
//     specialty: "Cardiology",
//     phone: "+94-11-5430000",
//     email: "info@apollohospitals.lk",
//     isEmergencyAvailable: true,
//     image: "https://images.unsplash.com/photo-1632833239869-a37e3a5806d2?w=500",
//     description: "Part of the renowned Apollo Healthcare Group, offering world-class medical care with international standards.",
//     specialties: ["Cardiology", "Neurology", "Orthopedics"],
//     facilities: ["24/7 Emergency", "ICU", "Pharmacy", "Laboratory", "CT Scan", "MRI", "Cath Lab"],
//     doctors: [
//       {
//         id: 10,
//         name: "Dr. Roshan Mendis",
//         specialty: "Neurology",
//         rating: 4.6,
//         experience: 13,
//         patients: 1900,
//         workingDays: ["Monday", "Tuesday", "Friday"],
//         qualifications: ["MBBS", "MD Neurology", "FRCP"],
//         about: "Neurologist with special focus on headache disorders and sleep medicine."
//       }
//     ]
//   },
//   {
//     id: 7,
//     name: "Hemas Hospital",
//     location: "Wattala, Western Province",
//     rating: 4.3,
//     specialty: "Cardiology",
//     phone: "+94-11-2952000",
//     email: "info@hemashospitals.com",
//     isEmergencyAvailable: false,
//     image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=500",
//     description: "Quality healthcare provider focusing on personalized care and modern medical treatments.",
//     specialties: ["Cardiology", "Orthopedics", "Pediatrics"],
//     facilities: ["Outpatient Care", "Pharmacy", "Laboratory", "Radiology"],
//     doctors: [
//       {
//         id: 11,
//         name: "Dr. Samanthi Rathnayake",
//         specialty: "Pediatrics",
//         rating: 4.4,
//         experience: 8,
//         patients: 1200,
//         workingDays: ["Tuesday", "Wednesday", "Saturday"],
//         qualifications: ["MBBS", "MD Pediatrics"],
//         about: "Pediatrician with special interest in childhood allergies and respiratory disorders."
//       }
//     ]
//   }
// ];