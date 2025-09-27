// Premium Glass Morphism Card Component
import React from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'elevated' | 'interactive' | 'subtle';
  onClick?: () => void;
  hover?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className,
  variant = 'default',
  onClick,
  hover = false
}) => {
  const baseStyles = "glass-card rounded-lg transition-all duration-300";
  
  const variantStyles = {
    default: "p-6",
    elevated: "p-8 shadow-glass-hover",
    interactive: "p-6 cursor-pointer hover:shadow-glass-hover hover:-translate-y-1 active:scale-[0.98]",
    subtle: "p-4 bg-opacity-60"
  };

  const hoverStyles = hover ? "hover:shadow-glass-hover hover:-translate-y-1" : "";

  return (
    <div 
      className={cn(
        baseStyles,
        variantStyles[variant],
        hoverStyles,
        onClick && "cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default GlassCard;