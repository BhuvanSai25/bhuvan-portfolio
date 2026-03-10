import React, { useRef, useState } from 'react';
import { experiences, education } from '../../data/portfolioData';
import { Briefcase, GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';

interface SpotlightCardProps {
  children: React.ReactNode;
  color?: string;
  className?: string;
  hoverContainerClass?: string;
}

const SpotlightCard: React.FC<SpotlightCardProps> = ({ 
  children, 
  color = "16, 185, 129", 
  className = "",
  hoverContainerClass = "hover:border-emerald-500/50 hover:shadow-[0_0_20px_-5px_rgba(16,185,129,0.3)]"
}) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`group relative overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 md:p-8 transition-all duration-300 ${hoverContainerClass} ${className}`}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(${color}, 0.1), transparent 40%)`,
        }}
      />
      <div
        className="pointer-events-none absolute -inset-px z-10 opacity-0 transition duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(${color}, 0.4), transparent 40%)`,
          maskImage: "linear-gradient(black, black), linear-gradient(black, black)",
          maskClip: "content-box, border-box",
          WebkitMaskClip: "content-box, border-box",
          maskComposite: "exclude",
          WebkitMaskComposite: "xor",
        }}
      />
      <div className="relative z-20 w-full">
        {children}
      </div>
    </div>
  );
};

const Experience = () => {
  return (
    <section id="experience" className="px-6 py-24 md:px-12 lg:px-24">
      
      {/* Work Experience Section */}
      <div className="mb-24">
        <div className="mb-16 flex flex-col items-center justify-center">
            <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">Experience</h2>
            <div className="h-1 w-20 bg-emerald-500"></div>
        </div>

        <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 -translate-x-1/2 bg-zinc-800 md:left-12" aria-hidden="true"></div>

            <div className="space-y-12">
                {experiences.map((exp, idx) => (
                <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="relative pl-24 md:pl-32"
                >
                    <span className="absolute left-8 top-6 z-10 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full border border-zinc-800 bg-zinc-950 text-emerald-500 shadow-[0_0_20px_-5px_rgba(16,185,129,0.3)] ring-4 ring-zinc-950 md:left-12 md:top-8">
                        <Briefcase size={18} />
                    </span>

                    <SpotlightCard 
                      color="16, 185, 129" 
                      hoverContainerClass="hover:border-emerald-500/50 hover:shadow-[0_0_30px_-5px_rgba(16,185,129,0.2)]"
                    >
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-bold text-white transition-colors group-hover:text-emerald-400">{exp.role}</h3>
                            <p className="text-lg text-emerald-400 font-medium">{exp.company}</p>
                          </div>
                          <span className="self-start rounded-full bg-emerald-500/10 px-4 py-1.5 text-sm font-semibold text-emerald-400 border border-emerald-500/20 whitespace-nowrap">
                            {exp.period}
                          </span>
                      </div>
                      
                      <ul className="space-y-3">
                          {exp.description.map((point, i) => (
                              <li key={i} className="flex items-start text-base leading-relaxed text-zinc-400">
                                  <span className="mr-3 mt-2 h-2 w-2 shrink-0 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]"></span>
                                  {point}
                              </li>
                          ))}
                      </ul>
                    </SpotlightCard>
                </motion.div>
                ))}
            </div>
        </div>
      </div>

      {/* Education Section */}
      <div>
        <div className="mb-16 flex flex-col items-center justify-center">
            <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">Education</h2>
            <div className="h-1 w-20 bg-blue-500"></div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
            {education.map((edu, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="h-full"
              >
                <SpotlightCard 
                  color="59, 130, 246" 
                  hoverContainerClass="hover:border-blue-500/50 hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.2)]"
                  className="h-full flex flex-col"
                >
                    <div className="flex flex-col gap-4 mb-4">
                       <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                                    <GraduationCap size={24} />
                                </div>
                                <h3 className="text-xl font-bold text-white transition-colors group-hover:text-blue-400 leading-tight">
                                    {edu.school}
                                </h3>
                            </div>
                        </div>
                        
                        <div className="flex flex-col gap-2 pl-1">
                             <p className="text-lg text-blue-400 font-medium">{edu.degree}</p>
                             <span className="w-fit rounded-full bg-blue-500/10 px-4 py-1 text-xs font-semibold text-blue-300 border border-blue-500/20 whitespace-nowrap">
                                {edu.year}
                            </span>
                        </div>
                    </div>
                    
                    <div className="mt-auto pt-4 border-t border-zinc-800/50">
                        <p className="text-sm text-zinc-400 font-medium flex items-center gap-2">
                           <span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]"></span>
                           <span className="text-zinc-300">Grade:</span> {edu.score}
                        </p>
                    </div>
                </SpotlightCard>
              </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;