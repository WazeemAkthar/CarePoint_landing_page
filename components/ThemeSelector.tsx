// components/ThemeSelector.tsx
import React from 'react';
import { Button } from "@/components/ui/button";
import { useTheme } from '../hooks/useTheme';
import { THEME_OPTIONS, THEME_ICONS, THEME_CLASSES } from '../constants/theme';

interface ThemeSelectorProps {
  className?: string;
  position?: 'left' | 'right';
  size?: 'sm' | 'lg' | 'default' | 'icon';
  showLabel?: boolean;
}

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({
  className = '',
  position = 'right',
  size = 'sm',
  showLabel = false,
}) => {
  const {
    theme,
    isThemeMenuOpen,
    handleThemeChange,
    toggleThemeMenu,
  } = useTheme();

  const ThemeIcon = THEME_ICONS[theme];

  const getMenuPositionClass = (): string => {
    return position === 'left' ? 'left-0' : 'right-0';
  };

  const getTopPositionClass = (): string => {
    switch (size) {
      case 'lg':
        return 'top-14';
      case 'default':
        return 'top-12';
      case 'sm':
      case 'icon':
      default:
        return 'top-10';
    }
  };

  return (
    <div className={`relative ${className}`}>
      <Button
        variant="ghost"
        size={size}
        className={THEME_CLASSES.button.base}
        onClick={toggleThemeMenu}
        aria-label="Toggle theme menu"
        aria-expanded={isThemeMenuOpen}
      >
        <ThemeIcon className={THEME_CLASSES.icon} />
        {showLabel && (
          <span className="ml-2 font-medium">
            {THEME_OPTIONS.find(option => option.key === theme)?.label}
          </span>
        )}
      </Button>
      
      {isThemeMenuOpen && (
        <>
          {/* Backdrop for mobile */}
          <div 
            className="fixed inset-0 z-40 md:hidden"
            onClick={() => toggleThemeMenu()}
          />
          
          {/* Theme menu */}
          <div className={`
            ${THEME_CLASSES.menu.container}
            ${getMenuPositionClass()}
            ${getTopPositionClass()}
          `}>
            {THEME_OPTIONS.map(({ key, label, Icon }) => (
              <button
                key={key}
                className={`
                  ${THEME_CLASSES.menu.item}
                  ${theme === key 
                    ? THEME_CLASSES.button.active 
                    : THEME_CLASSES.button.inactive
                  }
                `}
                onClick={() => handleThemeChange(key)}
                aria-label={`Switch to ${label.toLowerCase()} theme`}
              >
                <Icon className={THEME_CLASSES.iconSmall} />
                <span className="font-medium">{label}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};