"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<{ fullName?: string } | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("Cardiology");

  const specialties = ["Cardiology", "Neurology", "Pediatrics", "Orthopedics"];
  
  const hospitals = [
    {
      id: 1,
      name: "Central Medical Hospital",
      location: "Negombo, Western Province",
      rating: 4.5,
      specialty: "Cardiology",
      image: "/api/placeholder/300/200"
    },
    {
      id: 2,
      name: "Sunrise Healthcare Center",
      location: "Colombo, Western Province",
      rating: 4.3,
      specialty: "Cardiology",
      image: "/api/placeholder/300/200"
    },
    {
      id: 3,
      name: "Metro General Hospital",
      location: "Gampaha, Western Province",
      rating: 4.6,
      specialty: "Cardiology",
      image: "/api/placeholder/300/200"
    }
  ];

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      router.push("/login");
    }
  }, [router]);

  const filteredHospitals = hospitals.filter(hospital => 
    hospital.specialty === selectedSpecialty &&
    hospital.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white px-4 py-6 sm:px-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">
              Hello {user?.fullName || "User"}
            </h1>
            <p className="text-gray-600 text-base">Find the best hospital for you</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                localStorage.removeItem("user");
                router.push("/login");
              }}
              className="text-sm text-red-500 font-medium hover:text-red-600"
            >
              Logout
            </button>
            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-gray-600 text-sm">👤</span>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search hospitals..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
          />
        </div>

        {/* Specialties */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Specialties</h2>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {specialties.map((specialty) => (
              <button
                key={specialty}
                onClick={() => setSelectedSpecialty(specialty)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedSpecialty === specialty
                    ? "bg-green-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
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
          {filteredHospitals.length} Hospitals Found
        </h2>
        
        <div className="space-y-4">
          {filteredHospitals.map((hospital) => (
            <div key={hospital.id} className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="aspect-video bg-gradient-to-br from-green-100 to-blue-100 relative">
                {/* Hospital room illustration */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-24 h-16 bg-white rounded-lg shadow-md relative">
                    <div className="absolute top-2 left-2 w-4 h-2 bg-green-400 rounded-full"></div>
                    <div className="absolute bottom-2 right-2 w-6 h-3 bg-blue-400 rounded"></div>
                  </div>
                </div>
                <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded-full shadow-sm">
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-500 text-sm">⭐</span>
                    <span className="text-sm font-medium text-gray-700">{hospital.rating}</span>
                  </div>
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 text-lg mb-2">{hospital.name}</h3>
                <div className="flex items-center gap-1 mb-3">
                  <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-gray-600">{hospital.location}</span>
                </div>
                <span className="inline-block bg-green-100 text-green-800 text-xs font-medium px-3 py-1 rounded-full">
                  {hospital.specialty}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="flex justify-around py-3">
          <button className="flex flex-col items-center gap-1 text-green-600">
            <div className="w-6 h-6 bg-green-600 rounded flex items-center justify-center">
              <span className="text-white text-xs">🏥</span>
            </div>
            <span className="text-xs font-medium">Hospitals</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-gray-400">
            <div className="w-6 h-6 flex items-center justify-center">
              <span className="text-xs">📅</span>
            </div>
            <span className="text-xs">Appointments</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-gray-400">
            <div className="w-6 h-6 flex items-center justify-center">
              <span className="text-xs">💡</span>
            </div>
            <span className="text-xs">Health Tips</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-gray-400">
            <div className="w-6 h-6 flex items-center justify-center">
              <span className="text-xs">👤</span>
            </div>
            <span className="text-xs">Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
}