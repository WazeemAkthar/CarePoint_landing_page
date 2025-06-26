import { useState, useEffect } from 'react';
import { Theme, UseThemeReturn } from '../types/theme';

export const useTheme = (): UseThemeReturn => {
  const [theme, setTheme] = useState<Theme>('system');
  const [isDark, setIsDark] = useState<boolean>(true);
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    // Get saved theme from localStorage or default to 'system'
    const savedTheme = (localStorage.getItem('theme') as Theme) || 'system';
    setTheme(savedTheme);
    
    const updateTheme = (): void => {
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const shouldBeDark = savedTheme === 'dark' || (savedTheme === 'system' && systemPrefersDark);
      
      setIsDark(shouldBeDark);
      
      if (shouldBeDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    };
    
    updateTheme();
    
    // Listen for system theme changes only if theme is set to 'system'
    if (savedTheme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = (): void => updateTheme();
      
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [theme]);

  const handleThemeChange = (newTheme: Theme): void => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    setIsThemeMenuOpen(false);
    
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    let shouldBeDark: boolean;
    
    switch (newTheme) {
      case 'dark':
        shouldBeDark = true;
        break;
      case 'light':
        shouldBeDark = false;
        break;
      case 'system':
        shouldBeDark = systemPrefersDark;
        break;
      default:
        shouldBeDark = true;
    }
    
    setIsDark(shouldBeDark);
    
    if (shouldBeDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const toggleThemeMenu = (): void => {
    setIsThemeMenuOpen(prev => !prev);
  };

  return {
    theme,
    isDark,
    isThemeMenuOpen,
    setTheme,
    setIsThemeMenuOpen,
    handleThemeChange,
    toggleThemeMenu,
  };
};