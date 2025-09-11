// components/SideNavigation.tsx
"use client";
import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Calendar, Hospital, HeartPulse, User, Menu, X, LogOut } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import Image from "next/image";

type NavItem = {
  id: string;
  label: string;
  icon: LucideIcon;
  path: string;
};

interface SideNavigationProps {
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
}

const SideNavigation: React.FC<SideNavigationProps> = ({
  activeTab,
  onTabChange
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

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

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.getElementById('mobile-sidebar');
      const menuButton = document.getElementById('menu-button');
      
      if (isOpen && sidebar && menuButton && 
          !sidebar.contains(event.target as Node) && 
          !menuButton.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      // Prevent body scroll when sidebar is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close sidebar on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const handleTabClick = (item: NavItem) => {
    // Call the onTabChange callback if provided
    onTabChange?.(item.id);
    
    // Navigate to the page
    router.push(item.path);
    
    // Close sidebar on mobile after navigation
    setIsOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("user");
    router.push("/login");
    setIsOpen(false);
  };

  const isActiveTab = (item: NavItem): boolean => {
    // If activeTab prop is provided, use it
    if (activeTab) {
      return activeTab === item.id;
    }
    
    // Otherwise, determine active state based on current pathname
    return pathname === item.path;
  };

  return (
    <>
      {/* Mobile Menu Button - Keep original green theme */}
      <button
        id="menu-button"
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 right-4 z-[1000] lg:hidden bg-white/90 backdrop-blur-lg border border-gray-200/50 rounded-xl p-3 shadow-lg hover:bg-white hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500/30 position-absolute"
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-gray-700" strokeWidth={2} />
        ) : (
          <Menu className="w-6 h-6 text-gray-700" strokeWidth={2} />
        )}
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar - Mobile from right, Desktop from left */}
      <aside
        id="mobile-sidebar"
        className={`fixed top-0 h-full z-50 transition-all duration-300 ease-out ${
          // Mobile: slide from right, 70% width
          // Desktop: slide from left, fixed width
          isOpen 
            ? "right-0 lg:left-0 lg:translate-x-0" 
            : "right-0 translate-x-full lg:left-0 lg:translate-x-0"
        } ${
          // Mobile responsive width
          "w-[70%] lg:w-24"
        }`}
      >
        {/* Main Sidebar Container */}
        <div className="relative h-full bg-white border-l border-gray-200/50 lg:border-l-0 lg:border-r lg:border-gray-200/50 flex flex-col shadow-lg">
          
          {/* Logo/Brand Section - Responsive */}
          <div className="h-16 flex items-center lg:justify-center px-4 lg:px-0 border-b border-gray-200/30">
            <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-400 rounded-xl flex items-center justify-center">
              <Image
                alt="CarePoint Logo"
                width={24}
                height={24}
                className="w-5 h-5 lg:w-6 lg:h-6 text-white"
                src="/logo.png"
              />
            </div>
            {/* Brand text for mobile */}
            <span className="ml-3 text-xl font-bold text-gray-800 lg:hidden">
              CarePoint
            </span>
          </div>

          {/* Navigation Items - Responsive Layout */}
          <nav className="flex-1 px-2 lg:px-2 py-6">
            <div className="space-y-4 lg:space-y-4">
              {navItems.map((item, index) => {
                const IconComponent = item.icon;
                const isActive = isActiveTab(item);
                
                return (
                  <div key={item.id} className="relative">
                    <button
                      onClick={() => handleTabClick(item)}
                      className={`w-full flex items-center lg:flex-col lg:items-center gap-3 lg:gap-2 p-3 rounded-xl transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:ring-offset-2 group ${
                        isActive
                          ? "bg-green-50/80 text-green-600 shadow-sm"
                          : "text-gray-600 hover:text-gray-800 hover:bg-gray-50/60"
                      }`}
                      aria-pressed={isActive}
                      aria-label={`Navigate to ${item.label}`}
                    >
                      {/* Icon - Responsive positioning */}
                      <div className={`relative p-2 rounded-lg transition-all duration-300 flex-shrink-0 ${
                        isActive 
                          ? "bg-green-100/80 shadow-sm ring-2 ring-green-500/20" 
                          : "bg-gray-50/60 group-hover:bg-gray-100/60"
                      }`}>
                        <IconComponent 
                          className={`w-5 h-5 transition-all duration-300 ${
                            isActive 
                              ? 'text-green-600 drop-shadow-sm' 
                              : 'text-gray-600'
                          }`}
                          strokeWidth={isActive ? 2.5 : 2}
                        />
                        
                        {/* Active indicator dot */}
                        {isActive && (
                          <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-500 rounded-full shadow-sm ring-2 ring-white" />
                        )}
                      </div>
                      
                      {/* Text - Responsive positioning */}
                      <span className={`text-sm lg:text-xs font-medium lg:text-center lg:leading-tight transition-all duration-300 ${
                        isActive 
                          ? "text-green-600 drop-shadow-sm font-semibold" 
                          : "text-gray-600"
                      }`}>
                        {item.label}
                      </span>
                    </button>
                  </div>
                );
              })}
            </div>
          </nav>

          {/* Bottom Section - Logout Button */}
          <div className="p-2 border-t border-gray-200/30">
            <button
              onClick={handleLogout}
              className="w-full flex items-center lg:flex-col lg:items-center gap-3 lg:gap-2 p-3 rounded-xl hover:bg-red-50/60 text-red-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:ring-offset-2 group"
              aria-label="Logout"
            >
              <div className="relative p-2 rounded-lg transition-all duration-300 flex-shrink-0 bg-red-50/60 group-hover:bg-red-100/60">
                <LogOut className="w-5 h-5 text-red-600" strokeWidth={2} />
              </div>
              <span className="text-sm lg:text-xs text-red-600 font-medium lg:text-center lg:leading-tight">
                Logout
              </span>
            </button>
          </div>

          {/* Close button for mobile - positioned at top right */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-2 lg:hidden p-1.5 rounded-lg hover:bg-gray-100/50 transition-colors duration-200"
            aria-label="Close sidebar"
          >
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </div>
      </aside>

      {/* Spacer for desktop to prevent content overlap */}
      <div className="hidden lg:block w-20 lg:w-24 flex-shrink-0" />
    </>
  );
};

export default SideNavigation;