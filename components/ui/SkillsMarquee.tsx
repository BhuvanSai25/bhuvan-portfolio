import React, { useRef, useEffect, useState } from 'react';
import { skills } from '../../data/portfolioData';
import { Skill } from '../../types';
import { 
  Code2, Database, Layout, Server, Cloud, 
  Terminal, Cpu, GitBranch, Globe, Settings, Layers,
  ChevronLeft, ChevronRight, Box, RefreshCw, GitMerge,
  Workflow, Network, Blocks
} from 'lucide-react';

const ConceptIconMap: Record<string, any> = {
  Algo: Cpu,
  Box: Box, // For OOPs
  Layers: Layers, // For LLD
  Globe: Globe, // For REST
  RefreshCw: RefreshCw, // For Agile
  Workflow: Workflow, // For SDLC
  GitMerge: GitMerge,
  Network: Network,
  Blocks: Blocks,
};

const ConceptColorMap: Record<string, string> = {
  DSA: "text-blue-400",
  OOPs: "text-orange-400",
  LLD: "text-purple-400",
  "Microservices Architecture": "text-pink-400",
  "REST APIs": "text-green-400",
  Agile: "text-yellow-400",
  SDLC: "text-red-400",
};

// Map for Tech Logos (URLs)
const getLogoUrl = (iconKey: string | undefined): string => {
  if (!iconKey) return '';
  
  const map: Record<string, string> = {
    python: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
    java: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
    javascript: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
    sql: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg', 
    html5: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
    css3: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
    react: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    aws: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg',
    azure: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg',
    docker: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
    flask: 'https://cdn.simpleicons.org/flask/white',
    django: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg',
    git: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
    servicenow: 'https://www.vectorlogo.zone/logos/servicenow/servicenow-icon.svg',
  };
  return map[iconKey] || '';
};

interface SkillCardProps {
  skill: Skill;
}

const SkillCard: React.FC<SkillCardProps> = ({ skill }) => {
  const isConcept = skill.isConcept;
  const ConceptIcon = isConcept ? (ConceptIconMap[skill.icon || 'Algo'] || Cpu) : null;
  const logoUrl = !isConcept ? getLogoUrl(skill.icon) : '';
  const conceptColorClass = isConcept ? (ConceptColorMap[skill.name] || "text-emerald-400") : "";

  return (
    <div className="group relative flex w-24 flex-col items-center justify-center gap-2 rounded-xl border border-white/60 bg-zinc-950 py-4 px-2 shadow-[0_0_15px_rgba(255,255,255,0.3)] transition-all duration-300 md:w-28 md:py-5 md:px-3 hover:scale-105 hover:border-emerald-500 hover:shadow-[0_0_25px_rgba(16,185,129,0.6)]">
      
      {/* Internal gradient: White glow -> Emerald on hover */}
      <div className="absolute inset-0 rounded-xl bg-white/5 opacity-100 transition-colors duration-300 group-hover:bg-emerald-500/10"></div>

      {/* Icon Container */}
      <div className="relative z-10 flex items-center justify-center rounded-full bg-zinc-900 p-2.5 ring-1 ring-white/30 shadow-[0_0_10px_rgba(255,255,255,0.3)] transition-all duration-300 md:p-3 group-hover:scale-110 group-hover:ring-emerald-500 group-hover:shadow-[0_0_20px_rgba(16,185,129,0.5)]">
        {isConcept && ConceptIcon ? (
           <ConceptIcon size={24} strokeWidth={1.5} className={`md:h-8 md:w-8 ${conceptColorClass}`} />
        ) : (
           <img src={logoUrl} alt={skill.name} className="h-6 w-6 object-contain md:h-8 md:w-8" />
        )}
      </div>
      
      {/* Text */}
      <span className="relative z-10 whitespace-nowrap text-center text-[10px] font-semibold tracking-wide text-zinc-200 transition-colors duration-300 md:text-xs group-hover:text-emerald-400 shadow-black drop-shadow-md">
        {skill.name}
      </span>
    </div>
  );
};

interface CategoryBoxProps {
  title: string;
  skills: Skill[];
}

const CategoryBox: React.FC<CategoryBoxProps> = ({ title, skills }) => {
  return (
    <div className="mx-4 flex flex-shrink-0 flex-col items-center justify-start rounded-2xl border border-emerald-500/50 bg-zinc-900/50 p-5 shadow-[0_0_20px_-5px_rgba(16,185,129,0.3)] backdrop-blur-sm transition-all duration-300 hover:border-emerald-500 hover:bg-zinc-900/80 hover:shadow-[0_0_30px_-5px_rgba(16,185,129,0.5)] md:mx-6 md:p-6">
      <h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-emerald-500 md:text-base drop-shadow-[0_0_5px_rgba(16,185,129,0.5)]">
        {title}
      </h3>
      <div className="flex gap-3 md:gap-4">
        {skills.map((skill, idx) => (
          <SkillCard key={`${skill.name}-${idx}`} skill={skill} />
        ))}
      </div>
    </div>
  );
};

const SkillsMarquee = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [manualSpeed, setManualSpeed] = useState<number | null>(null);
  const speedRef = useRef(0.8);

  const orderedCategories = [
    "Languages",
    "Core",
    "Frontend",
    "Cloud & Infra",
    "Others"
  ];

  const categoriesMap: Record<string, Skill[]> = {
    "Languages": [],
    "Core": [],
    "Frontend": [],
    "Cloud & Infra": [],
    "Others": []
  };

  skills.forEach(skill => {
    if (categoriesMap[skill.category]) {
        categoriesMap[skill.category].push(skill);
    }
  });

  const categoryList = orderedCategories
    .map(cat => ({ title: cat, skills: categoriesMap[cat] }))
    .filter(item => item.skills && item.skills.length > 0);

  const loopCategories = [...categoryList, ...categoryList, ...categoryList];

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationFrameId: number;
    const baseSpeed = 0.8; 

    const animate = () => {
      let targetSpeed = baseSpeed;
      
      if (manualSpeed !== null) {
        targetSpeed = manualSpeed;
      } else if (isPaused) {
        targetSpeed = 0;
      }

      speedRef.current += (targetSpeed - speedRef.current) * 0.05;

      if (Math.abs(speedRef.current) < 0.01) speedRef.current = 0;

      if (scrollContainer && Math.abs(speedRef.current) > 0) {
        scrollContainer.scrollLeft += speedRef.current;

        const totalWidth = scrollContainer.scrollWidth;
        const oneSetWidth = totalWidth / 3;
        
        if (scrollContainer.scrollLeft >= oneSetWidth * 2) {
           scrollContainer.scrollLeft = oneSetWidth;
        } else if (scrollContainer.scrollLeft <= 0) {
           scrollContainer.scrollLeft = oneSetWidth;
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    if (scrollContainer) {
        scrollContainer.scrollLeft = scrollContainer.scrollWidth / 3;
    }

    animate();

    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused, manualSpeed, categoryList.length]);

  return (
    <section className="relative w-full py-20">
      <div className="mb-12 flex flex-col items-center justify-center px-6 md:px-12 lg:px-24">
        <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">Technical Skills</h2>
        <div className="h-1 w-20 bg-emerald-500"></div>
      </div>

      <div className="relative w-full">
        <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent"></div>
        <div className="absolute bottom-0 w-full h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent"></div>

        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-zinc-950 via-zinc-950/80 to-transparent md:w-48"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-zinc-950 via-zinc-950/80 to-transparent md:w-48"></div>
        
        <div 
            ref={scrollRef}
            className="flex w-full overflow-x-hidden hide-scrollbar"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setIsPaused(false)}
            style={{ scrollBehavior: 'auto' }}
        >
            <div className="flex w-max items-stretch py-12 pl-4 md:py-16">
            {loopCategories.map((item, index) => (
                <CategoryBox key={`${item.title}-${index}`} title={item.title} skills={item.skills} />
            ))}
            </div>
        </div>

        <div className="absolute inset-y-0 left-0 z-20 hidden w-32 items-center justify-center transition-opacity duration-300 opacity-0 hover:opacity-100 md:flex">
            <button
                className="rounded-full bg-zinc-900/90 p-3 text-white shadow-[0_0_20px_rgba(255,255,255,0.2)] ring-1 ring-white/20 backdrop-blur-sm transition-transform hover:scale-110 active:scale-95"
                onMouseEnter={() => setManualSpeed(-4)} 
                onMouseLeave={() => setManualSpeed(null)}
                aria-label="Scroll Left"
            >
                <ChevronLeft size={28} />
            </button>
        </div>

        <div className="absolute inset-y-0 right-0 z-20 hidden w-32 items-center justify-center transition-opacity duration-300 opacity-0 hover:opacity-100 md:flex">
            <button
                className="rounded-full bg-zinc-900/90 p-3 text-white shadow-[0_0_20px_rgba(255,255,255,0.2)] ring-1 ring-white/20 backdrop-blur-sm transition-transform hover:scale-110 active:scale-95"
                onMouseEnter={() => setManualSpeed(4)} 
                onMouseLeave={() => setManualSpeed(null)}
                aria-label="Scroll Right"
            >
                <ChevronRight size={28} />
            </button>
        </div>
      </div>
    </section>
  );
};

export default SkillsMarquee;