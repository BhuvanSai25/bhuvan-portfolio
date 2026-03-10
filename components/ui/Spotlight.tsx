import React, { useEffect, useRef } from 'react';

const Spotlight = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const { clientX, clientY } = e;
      containerRef.current.style.setProperty('--x', `${clientX}px`);
      containerRef.current.style.setProperty('--y', `${clientY}px`);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-zinc-950"
      style={{
        ['--x' as any]: '-100px', // Default off-screen
        ['--y' as any]: '-100px',
      }}
    >
      {/* Base Grid Pattern (Faint) */}
      <div 
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #71717a 1px, transparent 1px),
            linear-gradient(to bottom, #71717a 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Mouse Follower Gradient (Glow Effect) */}
      <div 
        className="absolute inset-0 opacity-30 transition-opacity duration-300"
        style={{
          background: `
            radial-gradient(
              600px circle at var(--x) var(--y), 
              rgba(16, 185, 129, 0.4), 
              rgba(59, 130, 246, 0.1), 
              transparent 40%
            )
          `,
        }}
      />
      
      {/* Secondary Glow for Depth */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          background: `
            radial-gradient(
              400px circle at var(--x) var(--y), 
              rgba(255, 255, 255, 0.3), 
              transparent 40%
            )
          `,
        }}
      />
    </div>
  );
};

export default Spotlight;