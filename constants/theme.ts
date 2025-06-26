import { Sun, Moon, Monitor } from 'lucide-react';
import { Theme, ThemeOption } from '../types/theme';

export const THEME_OPTIONS: ThemeOption[] = [
  { key: 'light', label: 'Light', Icon: Sun },
  { key: 'dark', label: 'Dark', Icon: Moon },
  { key: 'system', label: 'System', Icon: Monitor },
];

export const THEME_ICONS = {
  light: Sun,
  dark: Moon,
  system: Monitor,
} as const;

export const DEFAULT_THEME: Theme = 'system';

export const THEME_STORAGE_KEY = 'theme';

// Theme-related CSS classes
export const THEME_CLASSES = {
  button: {
    base: 'p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200',
    active: 'text-[#00A733] dark:text-[#00D63F] bg-green-50 dark:bg-green-900/20',
    inactive: 'text-gray-700 dark:text-gray-300',
  },
  menu: {
    container: 'absolute bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl py-2 min-w-[140px] z-50',
    item: 'w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center space-x-3',
  },
  icon: 'w-5 h-5 text-gray-600 dark:text-gray-300',
  iconSmall: 'w-4 h-4',
} as const;