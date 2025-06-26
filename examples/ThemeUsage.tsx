// examples/ThemeUsage.tsx
import React from 'react';
import { ThemeSelector } from '../components/ThemeSelector';
import { useTheme } from '../hooks/useTheme';
import { THEME_ICONS } from '../constants/theme';

// Example 1: Using ThemeSelector component directly
export const ExampleWithThemeSelector: React.FC = () => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Theme Selector Examples</h2>
      
      {/* Basic theme selector */}
      <div className="mb-4">
        <span className="mr-4">Basic:</span>
        <ThemeSelector />
      </div>
      
      {/* Theme selector with label */}
      <div className="mb-4">
        <span className="mr-4">With Label:</span>
        <ThemeSelector showLabel size="default" />
      </div>
      
      {/* Left positioned theme selector */}
      <div className="mb-4">
        <span className="mr-4">Left Position:</span>
        <ThemeSelector position="left" />
      </div>
    </div>
  );
};

// Example 2: Using the hook directly for custom implementation
export const ExampleWithCustomTheme: React.FC = () => {
  const { theme, isDark, handleThemeChange } = useTheme();
  const ThemeIcon = THEME_ICONS[theme];

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Custom Theme Implementation</h2>
      
      <div className="space-y-4">
        <p>Current theme: <strong>{theme}</strong></p>
        <p>Is dark mode: <strong>{isDark ? 'Yes' : 'No'}</strong></p>
        
        <div className="flex items-center space-x-2">
          <ThemeIcon className="w-5 h-5" />
          <span>Current theme icon</span>
        </div>
        
        <div className="space-x-2">
          <button 
            onClick={() => handleThemeChange('light')}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded"
          >
            Light
          </button>
          <button 
            onClick={() => handleThemeChange('dark')}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded"
          >
            Dark
          </button>
          <button 
            onClick={() => handleThemeChange('system')}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded"
          >
            System
          </button>
        </div>
      </div>
    </div>
  );
};

// Example 3: Using with Context Provider
export const ExampleWithContext: React.FC = () => {
  // If using ThemeProvider, import useThemeContext instead
  // const { theme, isDark, handleThemeChange } = useThemeContext();
  
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Context Provider Usage</h2>
      <p>Wrap your app with ThemeProvider and use useThemeContext hook</p>
      
      {/* Example App Structure:
      <ThemeProvider>
        <YourApp />
      </ThemeProvider>
      */}
    </div>
  );
};

// Example 4: Complete implementation with error handling
export const ExampleWithErrorHandling: React.FC = () => {
  const themeState = useTheme();
  
  if (!themeState) {
    return <div>Error: Theme system not available</div>;
  }

  const { theme, isDark, handleThemeChange } = themeState;

  const handleSafeThemeChange = (newTheme: 'light' | 'dark' | 'system'): void => {
    try {
      handleThemeChange(newTheme);
    } catch (error) {
      console.error('Failed to change theme:', error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Safe Theme Implementation</h2>
      
      <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
        <p className="mb-2">Current state:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Theme: {theme}</li>
          <li>Dark mode: {isDark ? 'Enabled' : 'Disabled'}</li>
          <li>System preference: {
            window.matchMedia('(prefers-color-scheme: dark)').matches 
              ? 'Dark' 
              : 'Light'
          }</li>
        </ul>
        
        <div className="mt-4 space-x-2">
          {(['light', 'dark', 'system'] as const).map((themeOption) => (
            <button
              key={themeOption}
              onClick={() => handleSafeThemeChange(themeOption)}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                theme === themeOption
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {themeOption.charAt(0).toUpperCase() + themeOption.slice(1)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};