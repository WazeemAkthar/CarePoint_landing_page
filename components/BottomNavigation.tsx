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
      className={`fixed bottom-0 left-0 right-0 safe-area-pb z-50 transition-all duration-300 ease-in-out ${
        isVisible || isHovered ? "translate-y-0" : "translate-y-full"
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Glass morphism background with subtle gradient */}
      <div className="relative">
        {/* Background blur layer */}
        <div className="absolute inset-0 bg-white/80 backdrop-blur-lg border-t border-gray-200/50" />
        
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent" />
        
        {/* Active tab indicator background */}
        <div className="relative px-4 py-3">
          <div className="flex justify-around items-center mx-auto">
            {navItems.map((item, index) => {
              const IconComponent = item.icon;
              const isActive = isActiveTab(item);
              
              return (
                <div key={item.id} className="relative md:flex-none flex-1 flex justify-center">
                  {/* Active tab background indicator */}
                  {isActive && (
                    <div className="absolute inset-0 bg-green-50 rounded-2xl scale-110 transition-all duration-300 ease-out shadow-lg" />
                  )}
                  
                  <button
                    onClick={() => handleTabClick(item)}
                    className={`relative flex flex-col items-center py-2 px-4 rounded-2xl transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:ring-offset-2 focus:ring-offset-white/50 ${
                      isActive
                        ? "text-green-600 transform scale-105"
                        : "text-gray-500 hover:text-gray-700 hover:scale-102 hover:bg-gray-50/50"
                    }`}
                    aria-pressed={isActive}
                    aria-label={`Navigate to ${item.label}`}
                  >
                    {/* Icon container with enhanced styling */}
                    <div className={`relative p-1 rounded-xl transition-all duration-300 ${
                      isActive 
                        ? "bg-green-100/70 shadow-sm" 
                        : "hover:bg-gray-100/50"
                    }`}>
                      <IconComponent 
                        className={`w-6 h-6 transition-all duration-300 ${
                          isActive 
                            ? 'text-green-600 drop-shadow-sm' 
                            : 'text-gray-500'
                        }`}
                        strokeWidth={isActive ? 2.5 : 2}
                      />
                      
                      {/* Active indicator dot */}
                      {isActive && (
                        <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full shadow-sm animate-pulse" />
                      )}
                    </div>
                    
                    {/* Enhanced label styling */}
                    <span className={`text-xs mt-1.5 transition-all duration-300 ${
                      isActive 
                        ? "font-semibold text-green-600 drop-shadow-sm" 
                        : "font-medium text-gray-500"
                    }`}>
                      {item.label}
                    </span>
                  </button>
                </div>
              );
            })}
          </div>
          
          {/* Bottom accent line */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default BottomNavigation;