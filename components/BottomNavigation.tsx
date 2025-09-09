// components/SideNavigation.tsx
"use client";
import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Calendar, Hospital, HeartPulse, User, Menu, X } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

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
      {/* Mobile Menu Button - Fixed position */}
      <button
        id="menu-button"
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-[60] lg:hidden bg-white/90 backdrop-blur-lg border border-gray-200/50 rounded-xl p-3 shadow-lg hover:bg-white hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500/30"
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

      {/* Sidebar */}
      <aside
        id="mobile-sidebar"
        className={`fixed top-0 left-0 h-full z-50 transition-all duration-300 ease-out ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Glass morphism background */}
        <div className="relative h-full w-72 md:w-80">
          {/* Background blur layer */}
          <div className="absolute inset-0 bg-white/85 backdrop-blur-xl border-r border-gray-200/50" />
          
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent" />
          
          {/* Content */}
          <div className="relative h-full flex flex-col">
            {/* Header */}
            <div className="p-6 border-b border-gray-200/30">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-1">Navigation</h2>
                  <p className="text-sm text-gray-500">Quick access to your health tools</p>
                </div>
                {/* Close button for mobile */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="lg:hidden p-2 rounded-lg hover:bg-gray-100/50 transition-colors duration-200"
                  aria-label="Close sidebar"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>

            {/* Navigation Items */}
            <nav className="flex-1 p-4">
              <div className="space-y-2">
                {navItems.map((item, index) => {
                  const IconComponent = item.icon;
                  const isActive = isActiveTab(item);
                  
                  return (
                    <div key={item.id} className="relative">
                      {/* Active tab background indicator */}
                      {isActive && (
                        <div className="absolute inset-0 bg-green-50/80 rounded-xl shadow-sm" />
                      )}
                      
                      <button
                        onClick={() => handleTabClick(item)}
                        className={`relative w-full flex items-center gap-4 p-4 rounded-xl transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:ring-offset-2 focus:ring-offset-white/50 ${
                          isActive
                            ? "text-green-600 transform scale-[1.02] shadow-sm"
                            : "text-gray-600 hover:text-gray-800 hover:bg-gray-50/60 hover:scale-[1.01]"
                        }`}
                        aria-pressed={isActive}
                        aria-label={`Navigate to ${item.label}`}
                      >
                        {/* Icon container */}
                        <div className={`relative p-2.5 rounded-lg transition-all duration-300 ${
                          isActive 
                            ? "bg-green-100/80 shadow-sm ring-2 ring-green-500/20" 
                            : "bg-gray-50/60 hover:bg-gray-100/60"
                        }`}>
                          <IconComponent 
                            className={`w-6 h-6 transition-all duration-300 ${
                              isActive 
                                ? 'text-green-600 drop-shadow-sm' 
                                : 'text-gray-600'
                            }`}
                            strokeWidth={isActive ? 2.5 : 2}
                          />
                          
                          {/* Active indicator dot */}
                          {isActive && (
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full shadow-sm animate-pulse ring-2 ring-white" />
                          )}
                        </div>
                        
                        {/* Label */}
                        <div className="flex-1 text-left">
                          <span className={`block text-base transition-all duration-300 ${
                            isActive 
                              ? "font-semibold text-green-600 drop-shadow-sm" 
                              : "font-medium text-gray-600"
                          }`}>
                            {item.label}
                          </span>
                          {isActive && (
                            <span className="text-xs text-green-500 font-medium mt-0.5 block">
                              Currently active
                            </span>
                          )}
                        </div>

                        {/* Arrow indicator for active state */}
                        {isActive && (
                          <div className="w-2 h-2 bg-green-500 rounded-full shadow-sm" />
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            </nav>

            {/* Footer accent */}
            <div className="p-4 border-t border-gray-200/30">
              <div className="w-16 h-1 bg-gradient-to-r from-green-400 to-blue-400 rounded-full mx-auto" />
            </div>
          </div>
        </div>
      </aside>

      {/* Spacer for desktop to prevent content overlap */}
      <div className="hidden lg:block w-72 xl:w-80 flex-shrink-0" />
    </>
  );
};

export default SideNavigation;