import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const GlowCursor = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const updateMouse = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', updateMouse);
    return () => window.removeEventListener('mousemove', updateMouse);
  }, []);

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-10 h-[400px] w-[400px] rounded-full opacity-30 mix-blend-screen"
      style={{
        background: 'radial-gradient(circle, rgba(16, 185, 129, 0.2) 0%, rgba(16, 185, 129, 0) 60%)',
      }}
      animate={{ 
        x: position.x - 200, // Center the cursor (400px width / 2)
        y: position.y - 200, // Center the cursor (400px height / 2)
      }}
      transition={{ 
        type: 'tween', 
        ease: 'backOut', 
        duration: 0.1 
      }}
    />
  );
};

export default GlowCursor;