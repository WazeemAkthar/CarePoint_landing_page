"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import HospitalCard from "@/components/hospitalcard";
import { Hospital, User, Specialty } from "@/types/hospital";

const Dashboard: React.FC = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedSpecialty, setSelectedSpecialty] =
    useState<Specialty>("Cardiology");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const specialties: Specialty[] = [
    "Cardiology",
    "Neurology",
    "Pediatrics",
    "Orthopedics",
  ];

  const hospitals: Hospital[] = [
    {
      id: 1,
      name: "National Hospital of Sri Lanka",
      location: "Colombo, Western Province",
      rating: 4.5,
      specialty: "Cardiology",
      phone: "+94-11-2691111",
      isEmergencyAvailable: true,
    },
    {
      id: 2,
      name: "Asiri Central Hospital",
      location: "Colombo, Western Province",
      rating: 4.7,
      specialty: "Cardiology",
      phone: "+94-11-4665500",
      isEmergencyAvailable: true,
    },
    {
      id: 3,
      name: "Nawaloka Hospitals",
      location: "Colombo, Western Province",
      rating: 4.6,
      specialty: "Cardiology",
      phone: "+94-11-2577777",
      isEmergencyAvailable: true,
    },
    {
      id: 4,
      name: "Lanka Hospitals",
      location: "Colombo, Western Province",
      rating: 4.4,
      specialty: "Cardiology",
      phone: "+94-11-5430000",
      isEmergencyAvailable: true,
    },
    {
      id: 5,
      name: "Durdans Hospital",
      location: "Colombo, Western Province",
      rating: 4.8,
      specialty: "Cardiology",
      phone: "+94-11-2140000",
      isEmergencyAvailable: true,
    },
    {
      id: 6,
      name: "Apollo Hospitals",
      location: "Colombo, Western Province",
      rating: 4.5,
      specialty: "Cardiology",
      phone: "+94-11-5430000",
      isEmergencyAvailable: true,
    },
    {
      id: 7,
      name: "Hemas Hospital",
      location: "Wattala, Western Province",
      rating: 4.3,
      specialty: "Cardiology",
      phone: "+94-11-2952000",
      isEmergencyAvailable: false,
    },
  ];

  useEffect(() => {
    const initializeUser = () => {
      try {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          const parsedUser: User = JSON.parse(storedUser);
          setUser(parsedUser);
        } else {
          router.push("/login");
        }
      } catch (error) {
        console.error("Error parsing user data:", error);
        router.push("/login");
      } finally {
        setIsLoading(false);
      }
    };

    initializeUser();
  }, [router]);

  const handleLogout = (): void => {
    try {
      localStorage.removeItem("user");
      router.push("/login");
    } catch (error) {
      console.error("Error during logout:", error);
      // Force navigation even if localStorage fails
      router.push("/login");
    }
  };

  const handleHospitalViewDetails = (hospital: Hospital): void => {
    console.log("View details for:", hospital);
    // Navigate to hospital details page
    // router.push(`/hospital/${hospital.id}`);
  };

  const filteredHospitals = hospitals.filter(
    (hospital: Hospital) =>
      hospital.specialty === selectedSpecialty &&
      hospital.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white px-4 py-6 sm:px-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">
              Hello {user?.fullName || "User"}
            </h1>
            <p className="text-gray-600 text-base">
              Find the best hospital for you
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleLogout}
              className="text-sm text-red-500 font-medium hover:text-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 rounded px-2 py-1"
              aria-label="Logout"
            >
              Logout
            </button>
            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
              <span
                className="text-gray-600 text-sm"
                role="img"
                aria-label="User avatar"
              >
                👤
              </span>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              className="h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search hospitals..."
            value={searchQuery}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearchQuery(e.target.value)
            }
            className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm transition-all"
            aria-label="Search hospitals"
          />
        </div>

        {/* Specialties */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            Specialties
          </h2>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {specialties.map((specialty: Specialty) => (
              <button
                key={specialty}
                onClick={() => setSelectedSpecialty(specialty)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 ${
                  selectedSpecialty === specialty
                    ? "bg-green-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                aria-pressed={selectedSpecialty === specialty}
              >
                {specialty}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Hospital Results */}
      <div className="px-4 sm:px-6 pb-20">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          {filteredHospitals.length} Hospital
          {filteredHospitals.length !== 1 ? "s" : ""} Found
        </h2>

        {filteredHospitals.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg
                className="mx-auto h-12 w-12"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No hospitals found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search or specialty filter.
            </p>
          </div>
        ) : (
          /* Vertical Hospital Cards */
          <div className="flex flex-wrap gap-4">
            {filteredHospitals.map((hospital: Hospital) => (
              <div className="w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.667rem)] xl:w-[calc(25%-0.75rem)] hover:cursor-pointer" key={hospital.id}>
                <HospitalCard
                  key={hospital.id}
                  hospital={hospital}
                  onViewDetails={handleHospitalViewDetails}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 safe-area-pb">
        <div className="flex justify-around py-3">
          <button className="flex flex-col items-center gap-1 text-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded p-2">
            <div className="w-6 h-6 bg-green-600 rounded flex items-center justify-center">
              <span
                className="text-white text-xs"
                role="img"
                aria-label="Hospitals"
              >
                🏥
              </span>
            </div>
            <span className="text-xs font-medium">Hospitals</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 rounded p-2">
            <div className="w-6 h-6 flex items-center justify-center">
              <span className="text-xs" role="img" aria-label="Appointments">
                📅
              </span>
            </div>
            <span className="text-xs">Appointments</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 rounded p-2">
            <div className="w-6 h-6 flex items-center justify-center">
              <span className="text-xs" role="img" aria-label="Health Tips">
                💡
              </span>
            </div>
            <span className="text-xs">Health Tips</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 rounded p-2">
            <div className="w-6 h-6 flex items-center justify-center">
              <span className="text-xs" role="img" aria-label="Profile">
                👤
              </span>
            </div>
            <span className="text-xs">Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
