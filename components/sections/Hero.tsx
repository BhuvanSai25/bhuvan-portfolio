import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown, ChevronDown } from 'lucide-react';
import { personalInfo } from '../../data/portfolioData';

const words = [
  "Software Engineer",
  "Backend Developer",
  "Problem Solver"
];

const Hero = () => {
  const [index, setIndex] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2500);

    const handleScrollListener = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScrollListener);

    return () => {
        clearInterval(interval);
        window.removeEventListener('scroll', handleScrollListener);
    };
  }, []);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    
    if (element) {
        const offset = 80;
        const elementPosition = element.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
        });
    }
  };

  return (
    <section id="home" className="relative flex min-h-screen w-full flex-col justify-center items-center px-6 pt-32 pb-40 md:px-12 lg:px-24 text-center">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-zinc-950/20 to-zinc-950/80 pointer-events-none"></div>

      <div className="z-10 w-full max-w-4xl mx-auto flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="mb-6 text-2xl md:text-3xl font-medium text-zinc-500">
            Hi, I'm
          </h2>
          <h1 className="mb-6 text-7xl font-black tracking-tight md:text-8xl lg:text-9xl relative select-none">
            <span className="relative z-10 bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(16,185,129,0.3)]">
              {personalInfo.name}
            </span>
            <span className="absolute left-0 top-0 -z-10 w-full text-transparent blur-2xl opacity-30 bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text" aria-hidden="true">
               {personalInfo.name}
            </span>
          </h1>
        </motion.div>

        <div className="mb-16 flex h-12 w-full items-center justify-center text-2xl font-bold md:text-4xl">
          <div className="relative w-full text-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={words[index]}
                initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="absolute inset-x-0 mx-auto w-full bg-gradient-to-r from-zinc-400 via-white to-zinc-400 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(255,255,255,0.6)]"
              >
                {words[index]}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mb-12 max-w-2xl text-lg leading-relaxed text-zinc-400"
        >
          {personalInfo.bio}
        </motion.p>

        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap gap-4 justify-center"
        >
          <a
            href="#projects"
            onClick={(e) => handleScroll(e, '#projects')}
            className="group flex items-center gap-2 rounded-full bg-white px-8 py-3 font-medium text-black transition-all hover:bg-zinc-200 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]"
          >
            View Projects
            <ArrowDown size={18} className="transition-transform group-hover:translate-y-1" />
          </a>
          <a
            href="#contact"
            onClick={(e) => handleScroll(e, '#contact')}
            className="flex items-center gap-2 rounded-full border border-zinc-700 px-8 py-3 font-medium text-white transition-all hover:border-zinc-500 hover:bg-zinc-800"
          >
            Contact Me
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ 
            opacity: isScrolled ? 0 : 1,
            y: [0, 10, 0] 
        }}
        transition={{
            opacity: { duration: 0.3 },
            y: { duration: 2, repeat: Infinity, ease: "easeInOut" }
        }}
        className="absolute bottom-10 left-0 right-0 mx-auto w-fit z-20 text-zinc-500 pointer-events-none"
      >
        <div className="flex flex-col items-center gap-2">
            <span className="text-xs uppercase tracking-widest text-zinc-500/80 whitespace-nowrap">Scroll to know more</span>
            <ChevronDown size={20} className="text-emerald-500/80" />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;