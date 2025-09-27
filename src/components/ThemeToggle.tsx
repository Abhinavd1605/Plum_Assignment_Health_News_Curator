import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { cn } from '@/lib/utils';

interface ThemeToggleProps {
  className?: string;
  variant?: 'default' | 'glass' | 'compact';
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ 
  className,
  variant = 'default' 
}) => {
  const { theme, toggleTheme } = useTheme();

  const baseClasses = "relative inline-flex items-center justify-center transition-all duration-300 ease-in-out";
  
  const variants = {
    default: "p-3 rounded-xl bg-background hover:bg-muted border border-border shadow-sm hover:shadow-md",
    glass: "p-3 rounded-xl backdrop-blur-xl bg-glass-background/80 hover:bg-glass-background border border-glass-border shadow-glass hover:shadow-glass-hover",
    compact: "p-2 rounded-lg bg-background/80 hover:bg-muted/80 border border-border/50"
  };

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        baseClasses,
        variants[variant],
        "group focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2 focus:ring-offset-background",
        className
      )}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <div className="relative w-5 h-5 overflow-hidden">
        {/* Sun icon */}
        <Sun 
          className={cn(
            "absolute inset-0 w-5 h-5 text-amber-500 transition-all duration-300 transform",
            theme === 'light' 
              ? "rotate-0 scale-100 opacity-100" 
              : "rotate-90 scale-0 opacity-0"
          )}
        />
        
        {/* Moon icon */}
        <Moon 
          className={cn(
            "absolute inset-0 w-5 h-5 text-blue-400 transition-all duration-300 transform",
            theme === 'dark' 
              ? "rotate-0 scale-100 opacity-100" 
              : "-rotate-90 scale-0 opacity-0"
          )}
        />
      </div>
      
      {/* Ripple effect */}
      <div className="absolute inset-0 rounded-xl opacity-0 group-active:opacity-20 bg-primary transition-opacity duration-150" />
    </button>
  );
};

export default ThemeToggle;
