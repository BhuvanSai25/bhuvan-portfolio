import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
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
      className="pointer-events-none fixed left-0 top-0 z-0 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/10 blur-[80px]"
      animate={{ 
        x: position.x, 
        y: position.y,
      }}
      transition={{ 
        type: 'tween', 
        ease: 'circOut', 
        duration: 0.2 
      }}
    />
  );
};

export default CustomCursor;