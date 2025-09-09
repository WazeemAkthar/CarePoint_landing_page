"use client";
import React, { useState, useEffect } from "react";
import {
  User,
  Mail,
  Phone,
  Calendar,
  FileText,
  LogOut,
  Edit,
  Camera,
} from "lucide-react";
import { UserProfile, SettingsItem } from "../types/profile";
import BottomNavigation from "@/components/SideNavigation";
import { apiClient } from "@/lib/apiClient";
import ConditionalSidebar from '@/components/ConditionalSidebar';

interface UserResponse {
  success: boolean;
  data: UserProfile;
  message?: string;
}
interface UpdateUserResponse {
  success: boolean;
  message: string;
  user: UserProfile;
}

const settingsItems: SettingsItem[] = [
  {
    id: "1",
    title: "My Appointments",
    icon: "calendar",
    route: "/appointments",
  },
  {
    id: "2",
    title: "Terms & Privacy Policy",
    icon: "document",
    route: "/terms-privacy",
  },
  { id: "3", title: "Logout", icon: "logout", route: "/logout" },
];

type ViewState = "profile";

const ProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("profile");
  const [currentView, setCurrentView] = useState<ViewState>("profile");
  const [userId, setUserId] = useState<string | null>(null);

  // Get userId from localStorage
  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (!storedUserId) {
      alert("User not logged in. Redirecting to login.");
      window.location.href = "/login";
      return;
    }
    setUserId(storedUserId);
  }, []);

  // Fetch profile whenever userId is set
  useEffect(() => {
    if (!userId) return;

    const fetchProfile = async () => {
      try {
        const response = await apiClient.get<{
          success: boolean;
          user: UserProfile;
        }>(`/users/${userId}`);
        setProfile(response.user); // not response.data, not response directly
      } catch (error: any) {
        console.error("Profile fetch error:", error);
        alert("Could not fetch profile. Please login again.");
        window.location.href = "/login";
      }
    };

    fetchProfile();
  }, [userId]);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    if (tabId === "profile") setCurrentView("profile");
  };

  const handleEdit = () => setIsEditing(!isEditing);

  const handleSave = async () => {
    if (!profile) return;

    try {
      const response = await apiClient.patch<UpdateUserResponse>(
        `/users/profile/${profile.id}`,
        {
          username: profile.username,
          email: profile.email,
          phone: profile.phone,
        }
      );

      if (response.success) {
        setProfile(response.user);
        setIsEditing(false);
        alert("Profile updated successfully.");
        localStorage.setItem("user", JSON.stringify(response.user));
      } else {
        alert(response.message || "Failed to update profile.");
      }
    } catch (error) {
      console.error("Failed to update profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  };

  const handleInputChange = (field: keyof UserProfile, value: string) => {
    setProfile((prev) => (prev ? { ...prev, [field]: value } : null));
  };

  const handleSettingsItemClick = (item: SettingsItem) => {
    if (item.id === "3") {
      localStorage.removeItem("authToken");
      alert("You have been logged out. Redirecting to login.");
      window.location.href = "/login";
      return;
    }
    window.location.href = item.route;
  };

  const renderIcon = (iconName: string, className: string = "") => {
    const iconProps = { size: 20, className };
    switch (iconName) {
      case "calendar":
        return <Calendar {...iconProps} />;
      case "document":
        return <FileText {...iconProps} />;
      case "logout":
        return <LogOut {...iconProps} />;
      default:
        return null;
    }
  };

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <ConditionalSidebar>
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Layout - unchanged */}
      <div className="lg:hidden">
        {/* Header */}
        <div className="bg-green-500 text-white px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold">My Profile</h1>
            <button
              onClick={isEditing ? handleSave : handleEdit}
              className="p-2 rounded-full hover:bg-green-600 transition-colors"
            >
              <Edit size={20} />
            </button>
          </div>
        </div>

        {/* Profile Header */}
        <div className="bg-green-500 px-4 pb-8">
          <div className="flex flex-col items-center">
            <div className="relative mb-4">
              <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <User size={40} className="text-white" />
              </div>
              <button className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow">
                <Camera size={16} className="text-gray-600" />
              </button>
            </div>
            <h2 className="text-xl font-semibold text-white mb-1">
              {profile?.username}
            </h2>
            <p className="text-green-100 text-sm">{profile?.email}</p>
          </div>
        </div>

        {/* Content Container */}
        <div className="px-4 -mt-6 pb-6">
          {/* Personal Information */}
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
            <div className="flex items-center mb-6">
              <User size={20} className="text-green-500 mr-3" />
              <h3 className="text-lg font-semibold text-gray-800">
                Personal Information
              </h3>
            </div>

            <div className="space-y-6">
              {/* Full Name */}
              <div>
                <div className="flex items-center mb-2">
                  <User size={16} className="text-green-500 mr-2" />
                  <label className="text-sm font-medium text-gray-600">
                    Full Name
                  </label>
                </div>
                {isEditing ? (
                  <input
                    type="text"
                    value={profile.username}
                    onChange={(e) =>
                      handleInputChange("username", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                  />
                ) : (
                  <div className="w-full px-4 py-3 bg-gray-50 rounded-xl text-gray-800">
                    {profile.username}
                  </div>
                )}
              </div>

              {/* Email */}
              <div>
                <div className="flex items-center mb-2">
                  <Mail size={16} className="text-green-500 mr-2" />
                  <label className="text-sm font-medium text-gray-600">
                    Email Address
                  </label>
                </div>
                <div className="relative">
                  {isEditing ? (
                    <input
                      type="email"
                      value={profile.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all pr-10"
                    />
                  ) : (
                    <div className="w-full px-4 py-3 bg-gray-50 rounded-xl text-gray-800 pr-10">
                      {profile.email}
                    </div>
                  )}
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <div className="w-4 h-4 text-gray-400">🔒</div>
                  </div>
                </div>
              </div>

              {/* Phone Number */}
              <div>
                <div className="flex items-center mb-2">
                  <Phone size={16} className="text-green-500 mr-2" />
                  <label className="text-sm font-medium text-gray-600">
                    Phone Number
                  </label>
                </div>
                {isEditing ? (
                  <input
                    type="tel"
                    value={profile.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                  />
                ) : (
                  <div className="w-full px-4 py-3 bg-gray-50 rounded-xl text-gray-800">
                    {profile.phone}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Settings */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">
              Settings
            </h3>

            <div className="space-y-1">
              {settingsItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleSettingsItemClick(item)}
                  className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition-colors text-left"
                >
                  <div className="flex items-center">
                    {renderIcon(
                      item.icon,
                      item.id === "3"
                        ? "text-red-500 mr-4"
                        : "text-gray-600 mr-4"
                    )}
                    <span
                      className={`font-medium ${
                        item.id === "3" ? "text-red-500" : "text-gray-800"
                      }`}
                    >
                      {item.title}
                    </span>
                  </div>
                  <svg
                    className={`w-5 h-5 ${
                      item.id === "3" ? "text-red-500" : "text-gray-400"
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Layout - Grid/Flexbox Design */}
      <div className="hidden lg:block">
        {/* Desktop Header */}
        <div className="bg-white border-b border-gray-200 px-8 py-6">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
            <button
              onClick={isEditing ? handleSave : handleEdit}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                isEditing
                  ? "bg-green-500 text-white hover:bg-green-600"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {isEditing ? "Save Changes" : "Edit Profile"}
            </button>
          </div>
        </div>

        {/* Desktop Grid Layout */}
        <div className="max-w-6xl mx-auto px-8 py-8">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Left Column - Profile Card */}
            <div className="xl:col-span-1">
              <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-8 text-white mb-6">
                <div className="flex flex-col items-center text-center">
                  <div className="relative mb-6">
                    <div className="w-32 h-32 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                      {profile.profileImage ? (
                        <img
                          src={profile.profileImage}
                          alt="Profile"
                          className="w-32 h-32 rounded-full object-cover"
                        />
                      ) : (
                        <User size={50} className="text-white" />
                      )}
                    </div>
                    <button className="absolute bottom-2 right-2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow">
                      <Camera size={18} className="text-gray-600" />
                      <input
                        type="file"
                        accept="image/*"
                        style={{ display: "none" }}
                        id="profile-image-upload"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (!file || !profile) return;
                          const formData = new FormData();
                          formData.append("profileImage", file);
                          try {
                            const response =
                              await apiClient.patch<UpdateUserResponse>(
                                `/users/profile/${profile.id}/profile-image`,
                                formData,
                                {
                                  headers: {
                                    "Content-Type": "multipart/form-data",
                                  },
                                }
                              );
                            if (response.success) {
                              setProfile(response.user);
                              localStorage.setItem(
                                "user",
                                JSON.stringify(response.user)
                              );
                              alert("Profile image updated successfully.");
                            } else {
                              alert(
                                response.message ||
                                  "Failed to update profile image."
                              );
                            }
                          } catch (error) {
                            console.error("Failed to upload image:", error);
                            alert("Failed to upload image. Please try again.");
                          }
                        }}
                      />
                      <label
                        htmlFor="profile-image-upload"
                        className="absolute inset-0 w-full h-full cursor-pointer"
                      ></label>
                    </button>
                  </div>
                  <h2 className="text-2xl font-bold mb-2">
                    {profile?.username}
                  </h2>
                  <p className="text-green-100 mb-4">{profile?.email}</p>
                  <div className="bg-white bg-opacity-20 rounded-lg p-3 flex items-center">
                    <Phone size={16} className="mr-2" />
                    <span className="text-sm">{profile?.phone}</span>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              {/* <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white rounded-xl p-4 text-center shadow-sm">
                  <div className="text-2xl font-bold text-green-500">12</div>
                  <div className="text-sm text-gray-600">Appointments</div>
                </div>
                <div className="bg-white rounded-xl p-4 text-center shadow-sm">
                  <div className="text-2xl font-bold text-blue-500">3</div>
                  <div className="text-sm text-gray-600">Hospitals</div>
                </div>
              </div> */}
            </div>

            {/* Right Column - Personal Information & Settings */}
            <div className="xl:col-span-2 space-y-6">
              {/* Personal Information */}
              <div className="bg-white rounded-2xl shadow-sm p-8">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center">
                    <User size={24} className="text-green-500 mr-3" />
                    <h3 className="text-xl font-semibold text-gray-800">
                      Personal Information
                    </h3>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div className="md:col-span-2">
                    <div className="flex items-center mb-3">
                      <User size={18} className="text-green-500 mr-2" />
                      <label className="text-sm font-medium text-gray-600">
                        Full Name
                      </label>
                    </div>
                    {isEditing ? (
                      <input
                        type="text"
                        value={profile.username}
                        onChange={(e) =>
                          handleInputChange("username", e.target.value)
                        }
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                      />
                    ) : (
                      <div className="w-full px-4 py-3 bg-gray-50 rounded-xl text-gray-800 font-medium">
                        {profile.username}
                      </div>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <div className="flex items-center mb-3">
                      <Mail size={18} className="text-green-500 mr-2" />
                      <label className="text-sm font-medium text-gray-600">
                        Email Address
                      </label>
                    </div>
                    <div className="relative">
                      {isEditing ? (
                        <input
                          type="email"
                          value={profile.email}
                          onChange={(e) =>
                            handleInputChange("email", e.target.value)
                          }
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all pr-10"
                        />
                      ) : (
                        <div className="w-full px-4 py-3 bg-gray-50 rounded-xl text-gray-800 pr-10">
                          {profile.email}
                        </div>
                      )}
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <div className="w-4 h-4 text-gray-400">🔒</div>
                      </div>
                    </div>
                  </div>

                  {/* Phone Number */}
                  <div>
                    <div className="flex items-center mb-3">
                      <Phone size={18} className="text-green-500 mr-2" />
                      <label className="text-sm font-medium text-gray-600">
                        Phone Number
                      </label>
                    </div>
                    {isEditing ? (
                      <input
                        type="tel"
                        value={profile.phone}
                        onChange={(e) =>
                          handleInputChange("phone", e.target.value)
                        }
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                      />
                    ) : (
                      <div className="w-full px-4 py-3 bg-gray-50 rounded-xl text-gray-800">
                        {profile.phone}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Settings */}
              <div className="bg-white rounded-2xl shadow-sm p-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-6">
                  Settings & Actions
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {settingsItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleSettingsItemClick(item)}
                      className={`p-6 rounded-xl border-2 transition-all text-left hover:shadow-md ${
                        item.id === "3"
                          ? "border-red-200 hover:border-red-300 hover:bg-red-50"
                          : "border-gray-200 hover:border-green-300 hover:bg-green-50"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        {renderIcon(
                          item.icon,
                          item.id === "3" ? "text-red-500" : "text-green-500"
                        )}
                        <svg
                          className={`w-5 h-5 ${
                            item.id === "3" ? "text-red-400" : "text-gray-400"
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                      <h4
                        className={`font-semibold mb-1 ${
                          item.id === "3" ? "text-red-600" : "text-gray-800"
                        }`}
                      >
                        {item.title}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {item.id === "1" && "View and manage your appointments"}
                        {item.id === "2" &&
                          "Read terms of service and privacy policy"}
                        {item.id === "3" && "Sign out of your account"}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </ConditionalSidebar>
  );
};

export default ProfilePage;
