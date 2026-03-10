import React, { useState, useRef } from 'react';
import { projects } from '../../data/portfolioData';
import { Github, ExternalLink, Award } from 'lucide-react';
import { motion } from 'framer-motion';

interface ProjectCardProps {
  project: typeof projects[0];
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
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

  const isPathfinding = project.title.includes("Pathfinding");
  const isAgro = project.title.includes("Agro Guide");
  
  const showTopLeftIcon = !isPathfinding && !isAgro;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8 transition-colors"
    >
      {/* Background Spotlight Effect */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(16, 185, 129, 0.1), transparent 40%)`,
        }}
      />
      {/* Border Spotlight */}
       <div
        className="pointer-events-none absolute -inset-px z-10 opacity-0 transition duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(16, 185, 129, 0.4), transparent 40%)`,
          maskImage: "linear-gradient(black, black), linear-gradient(black, black)",
          maskClip: "content-box, border-box",
          WebkitMaskClip: "content-box, border-box",
          maskComposite: "exclude",
          WebkitMaskComposite: "xor",
        }}
      />

      <div className="relative z-20 flex h-full flex-col">
        {/* Combined Header: Title + Icons */}
        <div className="mb-4 flex items-start justify-between gap-4">
            <div className="flex flex-col gap-3">
                 {showTopLeftIcon && (
                    <div className="w-fit rounded-lg bg-zinc-800/50 p-2 text-emerald-400 backdrop-blur-md">
                        {project.category === 'ML/AI' ? <Award size={24}/> : <ExternalLink size={24} />}
                    </div>
                 )}
                 
                 <h3 className="text-2xl font-bold text-white transition-colors group-hover:text-emerald-400 leading-tight">
                    {project.title}
                 </h3>
            </div>

            <div className="flex items-center gap-3 shrink-0 pt-1">
                {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-zinc-400 transition-colors hover:text-white" aria-label="GitHub Repo">
                    <Github size={20} />
                </a>
                )}

                {showTopLeftIcon && project.link && (
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-zinc-400 transition-colors hover:text-white">
                    <ExternalLink size={20} />
                </a>
                )}
            </div>
        </div>
        
        <p className="mb-6 flex-grow text-zinc-400 leading-relaxed">
          {project.description}
        </p>

        <ul className="mb-6 space-y-2">
            {project.features.map((feature, idx) => (
                <li key={idx} className="flex items-start text-sm text-zinc-500">
                     <span className="mr-2 mt-1.5 h-1 w-1 shrink-0 rounded-full bg-emerald-500"></span>
                     {feature}
                </li>
            ))}
        </ul>

        {/* Footer Section: Tags (Left) and Buttons (Right) */}
        <div className="mt-auto flex items-end justify-between gap-4 pt-4">
            <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
                <span
                key={tag}
                className="rounded bg-zinc-800/80 px-2.5 py-1 text-xs font-medium text-zinc-300 border border-zinc-700/50 backdrop-blur-sm"
                >
                {tag}
                </span>
            ))}
            </div>

            {isPathfinding && project.link && (
                <a 
                href={project.link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex shrink-0 items-center gap-1.5 rounded-full bg-emerald-500/10 px-4 py-2 text-xs font-bold uppercase tracking-wide text-emerald-400 border border-emerald-500/20 transition-all hover:bg-emerald-500/20 hover:shadow-[0_0_15px_rgba(16,185,129,0.3)] z-30"
                >
                Show Project
                <ExternalLink size={12} strokeWidth={2.5} />
                </a>
            )}

            {isAgro && (
                <div className="flex shrink-0 items-center gap-1.5 rounded-full bg-amber-500/10 px-4 py-2 text-xs font-bold uppercase tracking-wide text-amber-400 border border-amber-500/20 z-30 select-none shadow-[0_0_10px_rgba(245,158,11,0.1)]">
                <Award size={12} strokeWidth={2.5} />
                Patent Issued
                </div>
            )}
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  return (
    <section id="projects" className="relative overflow-hidden px-6 py-24 md:px-12 lg:px-24">
      {/* Background Decor */}
      <div className="absolute right-0 top-0 -z-10 h-[500px] w-[500px] rounded-full bg-emerald-500/5 blur-[120px]"></div>

      <div className="mb-12 flex flex-col items-center justify-center gap-8">
        <div className="text-center">
            <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">Featured Projects</h2>
            <div className="mx-auto h-1 w-20 bg-emerald-500"></div>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </section>
  );
};

export default Projects;