// components/BottomNavigation.tsx
"use client";
import React from "react";

type NavItem = {
  id: string;
  label: string;
  icon: string;
  isActive?: boolean;
  onClick?: () => void;
};

interface BottomNavigationProps {
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({
  activeTab = "hospitals",
  onTabChange
}) => {
  const navItems: NavItem[] = [
    {
      id: "hospitals",
      label: "Hospitals",
      icon: "🏥",
      isActive: activeTab === "hospitals"
    },
    {
      id: "appointments",
      label: "Appointments",
      icon: "📅",
      isActive: activeTab === "appointments"
    },
    {
      id: "health-tips",
      label: "Health Tips",
      icon: "💡",
      isActive: activeTab === "health-tips"
    },
    {
      id: "profile",
      label: "Profile",
      icon: "👤",
      isActive: activeTab === "profile"
    }
  ];

  const handleTabClick = (tabId: string) => {
    onTabChange?.(tabId);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 safe-area-pb z-50">
      <div className="flex justify-around py-3">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleTabClick(item.id)}
            className={`flex flex-col items-center gap-1 focus:outline-none focus:ring-2 focus:ring-opacity-50 rounded p-2 transition-colors ${
              item.isActive
                ? "text-green-600 focus:ring-green-500"
                : "text-gray-400 hover:text-gray-600 focus:ring-gray-500"
            }`}
            aria-pressed={item.isActive}
          >
            <div
              className={`w-6 h-6 flex items-center justify-center rounded ${
                item.isActive ? "bg-green-600" : ""
              }`}
            >
              <span
                className={`text-xs ${
                  item.isActive ? "text-white" : ""
                }`}
                role="img"
                aria-label={item.label}
              >
                {item.icon}
              </span>
            </div>
            <span className={`text-xs ${item.isActive ? "font-medium" : ""}`}>
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default BottomNavigation;