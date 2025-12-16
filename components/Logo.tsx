import React from 'react';

export const Logo = ({ className = "w-12 h-12" }: { className?: string }) => (
  <svg 
    viewBox="0 0 100 100" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    className={className}
  >
    {/* Hexagon Background */}
    <path 
      d="M50 5 L93.3 30 V80 L50 105 L6.7 80 V30 L50 5Z" 
      className="fill-slate-900 stroke-cyber-primary" 
      strokeWidth="2"
    />
    
    {/* Inner Glow Shape */}
    <path 
      d="M50 15 L85 35 V75 L50 95 L15 75 V35 L50 15Z" 
      className="stroke-cyber-secondary opacity-50" 
      strokeWidth="1"
    />

    {/* The "Key" Shape */}
    <rect 
      x="30" y="35" width="40" height="30" rx="4" 
      className="fill-cyber-primary/20 stroke-cyber-primary" 
      strokeWidth="2"
    />
    
    {/* Letter M for Master */}
    <path 
      d="M40 55 L40 45 L50 52 L60 45 V55" 
      className="stroke-white dark:stroke-white" 
      strokeWidth="3" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    
    {/* Decorative circuit lines */}
    <circle cx="50" cy="50" r="2" className="fill-cyber-success animate-pulse" />
    <path d="M93 30 L100 25" className="stroke-cyber-accent" strokeWidth="2" />
    <path d="M6.7 80 L0 85" className="stroke-cyber-accent" strokeWidth="2" />
  </svg>
);