// Beautiful loading spinner with glass effects and Lottie animations
import React from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'pulse' | 'dots' | 'brain' | 'heart';
  className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  variant = 'default',
  className
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  if (variant === 'pulse') {
    return (
      <div className={cn('pulse-glow rounded-full bg-primary/20', sizeClasses[size], className)}>
        <div className="w-full h-full rounded-full bg-gradient-to-r from-primary to-primary-light animate-pulse" />
      </div>
    );
  }

  if (variant === 'dots') {
    return (
      <div className={cn('flex space-x-2', className)}>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={cn(
              'rounded-full bg-primary animate-bounce',
              size === 'sm' ? 'w-2 h-2' : size === 'lg' ? 'w-3 h-3' : 'w-2.5 h-2.5'
            )}
            style={{ animationDelay: `${i * 0.1}s` }}
          />
        ))}
      </div>
    );
  }

  if (variant === 'brain') {
    return (
      <div className={cn('relative', sizeClasses[size], className)}>
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary via-primary-light to-primary animate-spin opacity-75" />
        <div className="absolute inset-1 rounded-full bg-background" />
        <div className="absolute inset-2 rounded-full bg-gradient-to-r from-primary/50 to-primary-light/50 animate-pulse" />
      </div>
    );
  }

  if (variant === 'heart') {
    return (
      <div className={cn('flex items-center justify-center', sizeClasses[size], className)}>
        <Player
          autoplay
          loop
          src="/animations/loading_Heart.json"
          style={{ height: '100%', width: '100%' }}
        />
      </div>
    );
  }

  return (
    <div className={cn('relative', sizeClasses[size], className)}>
      <div className="absolute inset-0 rounded-full border-2 border-primary/20" />
      <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-primary animate-spin" />
    </div>
  );
};

export default LoadingSpinner;