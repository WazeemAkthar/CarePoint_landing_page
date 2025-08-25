"use client";
import React, { useState } from 'react';
import { X, Droplets, Heart, Apple, Moon, Phone, Calendar, Activity, User } from 'lucide-react';
import BottomNavigation from "@/components/BottomNavigation";

// Types
interface HealthTip {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  category: string;
  icon: React.ReactNode;
  color: string;
}

interface Language {
  code: string;
  name: string;
  isActive: boolean;
}

// Mock data
const mockHealthTips: HealthTip[] = [
  {
    id: '1',
    title: 'Stay Hydrated',
    description: 'Drink at least 8 glasses of water daily to maintain good health an...',
    fullDescription: 'Drink at least 8 glasses of water daily to maintain good health and proper body function.',
    category: 'Hydration',
    icon: <Droplets className="w-6 h-6 text-blue-500" />,
    color: 'border-l-blue-500'
  },
  {
    id: '2',
    title: 'Regular Exercise',
    description: 'Engage in at least 30 minutes of physical activity daily to keep yo...',
    fullDescription: 'Engage in at least 30 minutes of physical activity daily to keep your body healthy and maintain cardiovascular fitness.',
    category: 'Exercise',
    icon: <Heart className="w-6 h-6 text-green-500" />,
    color: 'border-l-green-500'
  },
  {
    id: '3',
    title: 'Balanced Diet',
    description: 'Include fruits, vegetables, whole grains, and lean proteins in your ...',
    fullDescription: 'Include fruits, vegetables, whole grains, and lean proteins in your daily meals to ensure proper nutrition and energy levels.',
    category: 'Nutrition',
    icon: <Apple className="w-6 h-6 text-orange-500" />,
    color: 'border-l-orange-500'
  },
  {
    id: '4',
    title: 'Quality Sleep',
    description: 'Get 7-9 hours of quality sleep each night to allow your body to ...',
    fullDescription: 'Get 7-9 hours of quality sleep each night to allow your body to rest, repair, and recharge for optimal health.',
    category: 'Sleep',
    icon: <Moon className="w-6 h-6 text-purple-500" />,
    color: 'border-l-purple-500'
  }
];

const languages: Language[] = [
  { code: 'en', name: 'English', isActive: true },
  { code: 'ta', name: 'தமிழ்', isActive: false },
  { code: 'si', name: 'සිංහල', isActive: false }
];

type ViewState = "health-tips";

const HealthTips: React.FC = () => {
  const [selectedTip, setSelectedTip] = useState<HealthTip | null>(null);
  const [activeLanguage, setActiveLanguage] = useState('en');
  const [activeTab, setActiveTab] = useState<string>("health-tips");
    const [currentView, setCurrentView] = useState<ViewState>("health-tips");
      const handleTabChange = (tabId: string): void => {
      setActiveTab(tabId);
      if (tabId === "health-tips") {
        setCurrentView("health-tips");
      }
      // Handle other tab navigation here
      console.log("Navigate to:", tabId);
    };

  const handleTipClick = (tip: HealthTip) => {
    setSelectedTip(tip);
  };

  const handleCloseModal = () => {
    setSelectedTip(null);
  };

  const handleLanguageChange = (langCode: string) => {
    setActiveLanguage(langCode);
  };

  return (
    <div className="min-h-screen bg-gray-50 mx-auto relative">
     {/* Header */}
      <div className="bg-green-500 text-white text-center py-6">
        <h1 className="text-xl font-semibold">Health Tips</h1>
      </div>

      {/* Language Selector */}
      <div className="bg-white px-4 py-4">
        <div className="flex space-x-2">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                activeLanguage === lang.code
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
              }`}
            >
              {lang.name}
            </button>
          ))}
        </div>
      </div>

      {/* Health Tips List */}
      <div className="px-4 py-2 space-y-4">
        {mockHealthTips.map((tip) => (
          <div
            key={tip.id}
            onClick={() => handleTipClick(tip)}
            className={`bg-white rounded-lg p-4 shadow-sm border-l-4 ${tip.color} cursor-pointer hover:shadow-md transition-shadow`}
          >
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                {tip.icon}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{tip.title}</h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{tip.description}</p>
                <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                  {tip.category}
                </span>
              </div>
              <div className="text-gray-400">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Navigation */}
  <BottomNavigation 
        activeTab={activeTab} 
        onTabChange={handleTabChange} 
      />

      {/* Modal */}
      {selectedTip && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm mx-auto">
            <div className="flex justify-end mb-4">
              <button
                onClick={handleCloseModal}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>
            
            <div className="text-center mb-6">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                <Droplets className="w-8 h-8 text-blue-500" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">{selectedTip.title}</h2>
              <span className="inline-block px-4 py-2 bg-blue-100 text-blue-700 text-sm rounded-full mb-4">
                {selectedTip.category}
              </span>
              <p className="text-gray-600 leading-relaxed">
                {selectedTip.fullDescription}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Bottom padding to account for fixed navigation */}
      <div className="h-20"></div>
    </div>
  );
};

export default HealthTips;