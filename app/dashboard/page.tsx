"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import HospitalCard from "@/components/hospitalcard";
import HospitalDetail from "@/components/HospitalDetail";
import DoctorProfile from "@/components/DoctorProfile";
import BottomNavigation from "@/components/BottomNavigation";
import { Hospital, User, Specialty, Doctor } from "@/types/hospital";
import { UserProfile } from "@/types/profile";
import { encryptId } from "@/lib/cryptoUtils";


type ViewState = "dashboard" | "hospital-detail" | "doctor-profile";

const Dashboard: React.FC = () => {
  const router = useRouter();
  const [user, setUser] =  useState<UserProfile | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedSpecialty, setSelectedSpecialty] =
    useState<Specialty>("Cardiology");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentView, setCurrentView] = useState<ViewState>("dashboard");
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(
    null
  );
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [activeTab, setActiveTab] = useState<string>("hospitals");

  const [specialties, setSpecialties] = useState<Specialty[]>([]);

  const [hospitals, setHospitals] = useState<Hospital[]>([]);

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      console.warn("No auth token found. Redirecting to login.");
      router.push("/login");
    }
  }, [router]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Read user from localStorage (set on login/signup)
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        } else {
          router.push("/login");
          return;
        }
        // Fetch hospitals from backend with specialty and limit
        const { apiClient } = require("../../lib/apiClient");
        const params = new URLSearchParams({
          specialty: selectedSpecialty,
          limit: "50",
        });
        const response = await apiClient.get(`/hospitals?${params.toString()}`);
        if (response && response.hospitals) {
          setHospitals(response.hospitals);
          // Extract unique specialties from hospitals
          const specialtySet = new Set<string>();
          response.hospitals.forEach((hospital: Hospital) => {
            hospital.specialties.forEach((spec: string) =>
              specialtySet.add(spec)
            );
          });
          setSpecialties(Array.from(specialtySet) as Specialty[]);
        } else {
          setHospitals([]);
          setSpecialties([]);
        }
      } catch (error) {
        console.error("Error loading dashboard data:", error);
        setHospitals([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDashboardData();
  }, [router, selectedSpecialty]);

  // const handleLogout = (): void => {
  //   try {
  //     // Clear user data and navigate to login
  //     setUser(null);
  //     router.push("/login");
  //   } catch (error) {
  //     console.error("Error during logout:", error);
  //     router.push("/login");
  //   }
  // };

  const handleHospitalViewDetails = (hospital: Hospital): void => {
  const encryptedId = encryptId(hospital.id);
  const safeId = encodeURIComponent(encryptedId);
  router.push(`/Hospital/${safeId}`);
};


  const handleDoctorSelect = (doctor: Doctor): void => {
    setSelectedDoctor(doctor);
    setCurrentView("doctor-profile");
  };

  const handleTabChange = (tabId: string): void => {
    setActiveTab(tabId);
    if (tabId === "hospitals") {
      setCurrentView("dashboard");
    }
    // Handle other tab navigation here
    console.log("Navigate to:", tabId);
  };

  const filteredHospitals = hospitals.filter(
    (hospital: Hospital) =>
          hospital.isActive && // only active hospitals

      hospital.specialties.includes(selectedSpecialty) &&
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

  // Render Hospital Detail View
  if (currentView === "hospital-detail" && selectedHospital) {
    return (
      <HospitalDetail
        hospital={selectedHospital}
        onDoctorSelect={handleDoctorSelect}
      />
    );
  }

  // Render Doctor Profile View
  if (currentView === "doctor-profile" && selectedDoctor && selectedHospital) {
    return (
      <DoctorProfile
        doctor={selectedDoctor}
        hospital={selectedHospital}
        onBookAppointment={() => {
          console.log("Book appointment for:", selectedDoctor.name);
        }}
      />
    );
  }

  // Render Main Dashboard
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white px-4 py-1 sm:px-6 shadow-sm">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Hello {user?.username}
            </h1>
            <p className="text-gray-600 text-base">
              Find the best hospital for you
            </p>
          </div>
          <div className="flex items-center gap-3">
            {/* <button
              onClick={handleLogout}
              className="text-sm text-red-500 font-medium hover:text-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 rounded px-2 py-1"
              aria-label="Logout"
            >
              Logout
            </button> */}
            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
              {user?.profileImage ? (
                <img
                  src={user.profileImage}
                  alt="Profile"
                  className="w-14 h-14 rounded-full object-cover"
                />
              ) : (
                <span
                  className="text-gray-600 text-sm"
                  role="img"
                  aria-label="User avatar"
                >
                  {user?.username ? user.username.slice(0,1).toUpperCase() : "U"}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
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
            className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm transition-all"
            aria-label="Search hospitals"
          />
        </div>

        {/* Specialties */}
        <div className="">
          <h2 className="text-lg font-semibold text-gray-900">Specialties</h2>
          <div className="flex gap-3 overflow-x-auto  [&::-webkit-scrollbar]:hidden p-2">
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
        <h2 className="text-lg font-semibold text-gray-900">
          {filteredHospitals.length} Hospital
          {filteredHospitals.length !== 1 ? "s" : ""} Found
        </h2>
      </header>

      {/* Hospital Results */}
      <div className="px-4 sm:px-6 pb-20 mt-3">
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
              <div
                className="w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.667rem)] xl:w-[calc(25%-0.75rem)] hover:cursor-pointer"
                key={hospital.id}
              >
                <HospitalCard
                  key={hospital.id}
                  hospital={hospital}
                  onViewDetails={(h: any) =>
                    handleHospitalViewDetails(h as Hospital)
                  }
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  );
};

export default Dashboard;
