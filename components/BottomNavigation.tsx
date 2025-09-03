// components/BottomNavigation.tsx
"use client";
import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Calendar, Hospital, HeartPulse, User } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

type NavItem = {
  id: string;
  label: string;
  icon: LucideIcon;
  path: string;
};

interface BottomNavigationProps {
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({
  activeTab,
  onTabChange
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const navItems: NavItem[] = [
    {
      id: "hospitals",
      label: "Hospitals",
      icon: Hospital,
      path: "/dashboard"
    },
    {
      id: "appointments",
      label: "Appointments",
      icon: Calendar,
      path: "/appointments"
    },
    {
      id: "health-tips",
      label: "Health Tips",
      icon: HeartPulse,
      path: "/health-tips"
    },
    {
      id: "profile",
      label: "Profile",
      icon: User,
      path: "/profile"
    }
  ];

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleScroll = () => {
      // Show navigation when scrolling (either direction)
      setIsVisible(true);
      
      // Clear existing timeout
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      
      // Hide after 2 seconds of no scrolling
      timeoutId = setTimeout(() => {
        if (!isHovered) {
          setIsVisible(false);
        }
      }, 2000);
    };

    // Add scroll listener to window for global scroll detection
    const handleWindowScroll = () => {
      handleScroll();
    };

    // Add scroll listener to document body as well
    const handleDocumentScroll = () => {
      handleScroll();
    };

    window.addEventListener('scroll', handleWindowScroll, { passive: true });
    document.addEventListener('scroll', handleDocumentScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleWindowScroll);
      document.removeEventListener('scroll', handleDocumentScroll);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [isHovered]);

  const handleTabClick = (item: NavItem) => {
    // Call the onTabChange callback if provided
    onTabChange?.(item.id);
    
    // Navigate to the page
    router.push(item.path);
  };

  const isActiveTab = (item: NavItem): boolean => {
    // If activeTab prop is provided, use it
    if (activeTab) {
      return activeTab === item.id;
    }
    
    // Otherwise, determine active state based on current pathname
    return pathname === item.path;
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    setIsVisible(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div 
      className={`fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 safe-area-pb z-50 transition-transform duration-300 ease-in-out ${
        isVisible || isHovered ? "translate-y-0" : "translate-y-full"
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex justify-around py-2">
        {navItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = isActiveTab(item);
          
          return (
            <button
              key={item.id}
              onClick={() => handleTabClick(item)}
              className={`flex flex-col items-center py-2 px-4 transition-colors focus:outline-none focus:ring-2 focus:ring-opacity-50 rounded-md ${
                isActive
                  ? "text-green-500 focus:ring-green-500"
                  : "text-gray-500 hover:text-gray-700 focus:ring-gray-500"
              }`}
              aria-pressed={isActive}
              aria-label={`Navigate to ${item.label}`}
            >
              <IconComponent 
                className={`w-6 h-6 ${isActive ? 'text-green-500' : 'text-gray-500'}`} 
              />
              <span className={`text-xs mt-1 ${isActive ? "font-medium text-green-500" : "text-gray-500"}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavigation;