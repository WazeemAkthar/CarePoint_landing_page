"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import HospitalCard from "@/components/hospitalcard";
import HospitalDetail from "@/components/HospitalDetail";
import DoctorProfile from "@/components/DoctorProfile";
import ConditionalSidebar from "@/components/ConditionalSidebar";
import DashboardSkeleton from "@/components/Skeletons/DashboardSkeleton";
import { Hospital, User, Specialty, Doctor } from "@/types/hospital";
import { UserProfile } from "@/types/profile";
import { encryptId } from "@/lib/cryptoUtils";
import HospitalCardsSkeleton from "@/components/Skeletons/HospitalCardsSkeleton";

type ViewState = "dashboard" | "hospital-detail" | "doctor-profile";

const Dashboard: React.FC = () => {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedSpecialty, setSelectedSpecialty] = useState<Specialty>("All");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentView, setCurrentView] = useState<ViewState>("dashboard");
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null);
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
        // Only show loading skeleton on initial load, not on filter changes
        if (hospitals.length === 0) {
          setIsLoading(true);
        }
        
        // Read user from localStorage (set on login/signup)
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        } else {
          router.push("/login");
          return;
        }
        
        // Fetch hospitals from backend
        const { apiClient } = require("../../lib/apiClient");
        
        // Build parameters properly
        const params = new URLSearchParams({
          limit: "50",
        });
        
        // Only add specialty parameter if it's not "All" and is a valid specialty
        if (selectedSpecialty !== "All" && selectedSpecialty.trim() !== "") {
          params.append("specialty", selectedSpecialty.trim());
        }
        
        console.log("Fetching hospitals with params:", params.toString());
        const response = await apiClient.get(`/hospitals?${params.toString()}`);
        
        if (response && response.hospitals) {
          setHospitals(response.hospitals);
          
          // Extract unique specialties from hospitals - normalize case
          const specialtySet = new Set<string>();
          response.hospitals.forEach((hospital: Hospital) => {
            if (hospital.specialties && Array.isArray(hospital.specialties)) {
              hospital.specialties.forEach((spec: string) => {
                if (spec && typeof spec === 'string') {
                  // Normalize specialty name (trim and proper case)
                  const normalizedSpec = spec.trim();
                  if (normalizedSpec) {
                    specialtySet.add(normalizedSpec);
                  }
                }
              });
            }
          });
          
          const uniqueSpecialties = Array.from(specialtySet).sort();
          setSpecialties(uniqueSpecialties as Specialty[]);
          console.log("Extracted specialties:", uniqueSpecialties);
        } else {
          console.warn("No hospitals data received:", response);
          setHospitals([]);
          setSpecialties([]);
        }
      } catch (error) {
        console.error("Error loading dashboard data:", error);
        setHospitals([]);
        setSpecialties([]);
      } finally {
        // Only set loading to false if it was true
        if (isLoading) {
          setIsLoading(false);
        }
      }
    };
    
    fetchDashboardData();
  }, [router, selectedSpecialty]);

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
    console.log("Navigate to:", tabId);
  };

  // Enhanced filtering logic with better matching
  const filteredHospitals = hospitals.filter((hospital: Hospital) => {
    // Check if hospital is active
    if (!hospital.isActive) return false;
    
    // Check specialty filter with better matching
    let matchesSpecialty = true;
    if (selectedSpecialty !== "All") {
      matchesSpecialty = false;
      if (hospital.specialties && Array.isArray(hospital.specialties)) {
        matchesSpecialty = hospital.specialties.some((spec: string) => {
          if (!spec || typeof spec !== 'string') return false;
          
          const normalizedSpec = spec.trim().toLowerCase();
          const normalizedSelected = selectedSpecialty.trim().toLowerCase();
          
          // Exact match or contains match for cases like "ENT"
          return normalizedSpec === normalizedSelected || 
                 normalizedSpec.includes(normalizedSelected) ||
                 normalizedSelected.includes(normalizedSpec);
        });
      }
    }
    
    // Check search query - search in name and location
    let matchesSearch = true;
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      const hospitalName = String(hospital.name ?? '').toLowerCase();
      const hospitalLocation = String(hospital.location ?? '').toLowerCase();
      const hospitalAddress = String(hospital.address ?? '').toLowerCase();
      
      matchesSearch = hospitalName.includes(query) || 
                     hospitalLocation.includes(query) ||
                     hospitalAddress.includes(query);
    }
    
    return matchesSpecialty && matchesSearch;
  });
  
  // Indicates whether a filtering/loading placeholder should be shown.
  // Currently set to false to preserve existing behavior where top-level isLoading
  // already returns a full DashboardSkeleton; adjust this flag if you want a
  // separate "cards loading" indicator while filtering.
  const isFilteringHospitals: boolean = false;

  // Function to render the main dashboard content
  const renderDashboardContent = () => (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 relative overflow-hidden">
        {/* Light green gradient overlay at top */}
        <div className="absolute left-0 right-0 h-100 bg-gradient-to-r from-green-200 via-green-300 to-green-200"></div>
        
        {/* User Profile and Greeting */}
        <div className="flex justify-between items-start mb-6 pt-2">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Hello {user?.username || 'User'} 👋
            </h1>
            <p className="text-gray-600 text-lg">
              Find the best hospital for you
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-lg">
                {user?.profileImage ? (
                  <img
                    src={user.profileImage}
                    alt="Profile"
                    className="w-14 h-14 rounded-full object-cover"
                  />
                ) : (
                  <span
                    className="text-white text-xl font-bold"
                    role="img"
                    aria-label="User avatar"
                  >
                    {user?.username
                      ? user.username.slice(0, 1).toUpperCase()
                      : "U"}
                  </span>
                )}
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-3 border-white flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Search Bar */}
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg
              className="h-6 w-6 text-gray-400"
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
            placeholder="Search hospitals, doctors, or treatments..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pl-12 pr-6 py-4 border-2 border-gray-100 rounded-2xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-base transition-all duration-200 hover:bg-white hover:border-gray-200"
            aria-label="Search hospitals"
          />
          <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
            <button 
              className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-xl transition-colors duration-200"
              onClick={() => {
                // Trigger search or filter
                console.log("Search triggered:", searchQuery);
              }}
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Enhanced Specialties Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">
              Medical Specialties
            </h2>
            <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              Choose your focus
            </span>
          </div>
          
          <div className="flex gap-3 overflow-x-auto py-4 px-1 scrollbar-hide">
            {/* All Button */}
            <button
              onClick={() => setSelectedSpecialty('All')}
              className={`px-6 py-3 rounded-2xl text-sm font-semibold whitespace-nowrap transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 shadow-sm ${
                selectedSpecialty === 'All'
                  ? "bg-green-600 text-white shadow-lg transform scale-105"
                  : "bg-white text-gray-700 hover:bg-gray-50 hover:shadow-md border border-gray-200"
              }`}
              aria-pressed={selectedSpecialty === 'All'}
            >
              ✨ All Specialties
            </button>
            
            {specialties.map((specialty) => (
              <button
                key={specialty}
                onClick={() => {
                  console.log("Selecting specialty:", specialty);
                  setSelectedSpecialty(specialty);
                }}
                className={`px-6 py-3 rounded-2xl text-sm font-semibold whitespace-nowrap transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 shadow-sm ${
                  selectedSpecialty === specialty
                    ? "bg-green-600 text-white shadow-lg transform scale-105"
                    : "bg-white text-gray-700 hover:bg-gray-50 hover:shadow-md border border-gray-200"
                }`}
                aria-pressed={selectedSpecialty === specialty}
              >
                {specialty}
              </button>
            ))}
          </div>
        

          {/* Results Counter */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h3 className="text-lg font-bold text-gray-900">
                {filteredHospitals.length} Hospital{filteredHospitals.length !== 1 ? "s" : ""} Found
              </h3>
              {selectedSpecialty !== 'All' && (
                <span className="bg-green-100/80 backdrop-blur-sm text-green-800 px-3 py-1 rounded-full text-sm font-medium border border-green-200/50">
                  {selectedSpecialty}
                </span>
              )}
              {searchQuery.trim() && (
                <span className="bg-blue-100/80 backdrop-blur-sm text-blue-800 px-3 py-1 rounded-full text-sm font-medium border border-blue-200/50">
                  "{searchQuery.trim()}"
                </span>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {isFilteringHospitals ? (
          <HospitalCardsSkeleton />
        ) : filteredHospitals.length === 0 ? (
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
              {searchQuery.trim() || selectedSpecialty !== 'All' 
                ? "Try adjusting your search or specialty filter."
                : "No hospitals available at the moment."}
            </p>
            {(searchQuery.trim() || selectedSpecialty !== 'All') && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedSpecialty("All");
                }}
                className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                Clear Filters
              </button>
            )}
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
                  hospital={hospital}
                  onViewDetails={(h: any) => handleHospitalViewDetails(h as Hospital)}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Hospital Results */}
      {/* <div className="pb-20 mt-3">
        
      </div> */}
    </div>
  );

  // Show skeleton loader without sidebar when loading
  if (isLoading) {
    return <DashboardSkeleton />;
  }

  // Main render with ConditionalSidebar always present
  return (
    <ConditionalSidebar>
      {/* Render Hospital Detail View */}
      {currentView === "hospital-detail" && selectedHospital && (
        <HospitalDetail
          hospital={selectedHospital}
          onDoctorSelect={handleDoctorSelect}
        />
      )}

      {/* Render Doctor Profile View */}
      {currentView === "doctor-profile" && selectedDoctor && selectedHospital && (
        <DoctorProfile
          doctor={selectedDoctor}
          hospital={selectedHospital}
          onBookAppointment={() => {
            console.log("Book appointment for:", selectedDoctor.name);
          }}
        />
      )}

      {/* Render Main Dashboard */}
      {currentView === "dashboard" && renderDashboardContent()}
    </ConditionalSidebar>
  );
};

export default Dashboard;