
export type Theme = 'light' | 'dark' | 'system';

export interface ThemeConfig {
  theme: Theme;
  isDark: boolean;
  isThemeMenuOpen: boolean;
}

export interface ThemeActions {
  setTheme: (theme: Theme) => void;
  setIsThemeMenuOpen: (isOpen: boolean) => void;
  handleThemeChange: (newTheme: Theme) => void;
  toggleThemeMenu: () => void;
}

export interface UseThemeReturn extends ThemeConfig, ThemeActions {}

export interface ThemeOption {
  key: Theme;
  label: string;
  Icon: React.ComponentType<{ className?: string }>;
}