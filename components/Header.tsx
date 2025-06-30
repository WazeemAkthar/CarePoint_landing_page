import React, { JSX } from 'react';
import { Button } from "@/components/ui/button";
import { Stethoscope, Menu, X } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

interface NavigationItem {
  label: string;
  id: string;
}

const NAVIGATION_ITEMS: NavigationItem[] = [
  { label: 'Features', id: 'features' },
  { label: 'How It Works', id: 'how-it-works' },
  { label: 'Reviews', id: 'testimonials' },
//   { label: 'Pricing', id: 'pricing' },
//   { label: 'Contact', id: 'contact' }
];

export default function Header(): JSX.Element {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const scrollToSection = (sectionId: string): void => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  const toggleMenu = (): void => {
    setIsMenuOpen(prev => !prev);
  };

  return (
    <>
      {/* Backdrop for mobile menu */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
      
      <header className="border-b border-gray-200/50 dark:border-gray-800/50 sticky top-0 bg-white/80 dark:bg-gray-900 backdrop-blur-lg z-50 transition-all duration-300">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-[#00A733] to-[#00D63F] rounded-xl flex items-center justify-center shadow-lg shadow-green-500/25 dark:shadow-green-400/20">
                  {/* <Stethoscope className="w-5 h-5 lg:w-6 lg:h-6 text-white" /> */}
                  <Image
                    alt="CarePoint Logo"
                    width={24}
                    height={24}
                  className="w-5 h-5 lg:w-6 lg:h-6 text-white"
                    src="/logo.png"/>
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
              </div>
              <div>
                <span className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                  CarePoint
                </span>
                <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">Healthcare Booking</div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {NAVIGATION_ITEMS.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="relative uppercase text-gray-600 dark:text-gray-300 hover:text-[#00A733] dark:hover:text-[#00D63F] transition-all duration-300 cursor-pointer group font-medium"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.id);
                  }}
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#00A733] to-[#00D63F] transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center space-x-4">
              {/* Theme Selector */}
              
              
              <Button className="bg-gradient-to-r from-[#00A733] to-[#00D63F] hover:from-[#008A2B] hover:to-[#00B837] text-white font-semibold px-6 py-2.5 transform hover:scale-105 hover:shadow-lg hover:shadow-green-500/25 transition-all duration-200 rounded-[10px]">
                Download App
              </Button>
            </div>

            {/* Mobile Menu Button & Theme Toggle */}
            <div className="flex items-center space-x-2 lg:hidden">
              
              
              <Button
                variant="ghost"
                size="sm"
                className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={toggleMenu}
                aria-label="Toggle mobile menu"
                aria-expanded={isMenuOpen}
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                ) : (
                  <Menu className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={`lg:hidden absolute top-full left-0 right-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg border-b border-gray-200/50 dark:border-gray-800/50 transform transition-all duration-300 ${
          isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
        }`}>
          <div className="container mx-auto px-4 py-6 space-y-6">
            {/* Mobile Navigation Links */}
            <nav className="space-y-4">
              {NAVIGATION_ITEMS.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="block text-lg uppercase font-medium text-gray-700 dark:text-gray-300 hover:text-[#00A733] dark:hover:text-[#00D63F] transition-colors py-2 border-b border-gray-100 dark:border-gray-800"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.id);
                  }}
                >
                  {item.label}
                </a>
              ))}
            </nav>
            
            {/* Mobile Action Buttons */}
            <div className="space-y-3 pt-4">
              <Button className="w-full bg-gradient-to-r from-[#00A733] to-[#00D63F] hover:from-[#008A2B] hover:to-[#00B837] text-white font-semibold py-3 rounded-xl transform hover:scale-[1.02] transition-all duration-200">
                Download App
              </Button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}