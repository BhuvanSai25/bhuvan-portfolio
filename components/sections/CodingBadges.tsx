import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Database } from 'lucide-react';

// Badge Data
const badges = [
  {
    id: "hr-python",
    title: "Python",
    subtitle: "Gold Badge",
    img: "/badges/hackerrank-python.png", 
    type: "hackerrank",
    icon: "python",
    stars: 5
  },
  {
    id: "hr-sql",
    title: "SQL",
    subtitle: "Gold Badge",
    img: "/badges/hackerrank-sql.png",
    type: "hackerrank",
    icon: "sql",
    stars: 5
  },
  {
    id: "lc-2022",
    title: "50 Days Badge",
    subtitle: "2022",
    img: "/badges/leetcode-2022.png",
    type: "leetcode",
    year: "2022"
  },
  {
    id: "lc-2025",
    title: "50 Days Badge",
    subtitle: "2025",
    img: "/badges/leetcode-2025.png",
    type: "leetcode",
    year: "2025"
  }
];

const HackerRankVisual = ({ icon }: { icon: string }) => (
  <div className="flex flex-col items-center justify-center transform scale-110">
    {/* Hexagon Container */}
    <div className="relative h-32 w-28 filter drop-shadow-[0_0_10px_rgba(234,179,8,0.3)]">
      
      {/* 1. Outer Gold Gradient (Border) */}
      <div 
        className="absolute inset-0 bg-gradient-to-tr from-yellow-600 via-yellow-300 to-yellow-600"
        style={{ clipPath: "polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%)" }}
      />

      {/* 2. Inner Dark Background */}
      <div 
        className="absolute inset-[3px] flex flex-col items-center bg-zinc-900"
        style={{ clipPath: "polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%)" }}
      >
        {/* Top Highlight/Glow inside badge */}
        <div className="absolute top-0 h-1/2 w-full bg-gradient-to-b from-white/10 to-transparent pointer-events-none"></div>

        {/* Badge Content */}
        <div className="z-10 flex h-full w-full flex-col items-center justify-between pt-5 pb-5">
           
           {/* Top Label */}
           <span className="text-[10px] font-bold tracking-widest text-yellow-400/90 uppercase">
             {icon === 'python' ? 'Python' : 'SQL'}
           </span>

           {/* Icon */}
           <div className="mb-1">
             {icon === 'python' ? (
               <img 
                 src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" 
                 alt="Python" 
                 className="h-10 w-10 drop-shadow-md" 
               />
             ) : (
                <div className="relative flex items-center justify-center">
                    <Database size={36} className="text-emerald-500 fill-emerald-500/20" strokeWidth={1.5} />
                    {/* Shine effect on DB */}
                    <div className="absolute top-1 right-2 h-2 w-2 bg-emerald-300 rounded-full blur-[2px] opacity-60"></div>
                </div>
             )}
           </div>

           {/* Bottom Gold Ribbon */}
           <div className="w-full bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-600 py-[2px] text-center shadow-lg translate-y-2">
             <span className="block text-[8px] font-black uppercase tracking-wider text-black">
               Gold Badge
             </span>
           </div>
        </div>
      </div>
    </div>

    {/* Footer Logo text (outside hexagon) */}
    <div className="mt-3 flex items-center gap-1.5">
        <span className="text-sm font-bold text-white tracking-tight">HackerRank</span>
        <span className="h-1.5 w-1.5 rounded-[1px] bg-green-500"></span>
    </div>
  </div>
);

const LeetCodeVisual = ({ year }: { year: string }) => (
  <div className="flex flex-col items-center justify-center">
      {/* Hexagon Wrapper */}
      <div className="relative h-28 w-28 filter drop-shadow-[0_0_12px_rgba(255,255,255,0.15)]">
        
        {/* Outer Silver Gradient (Border) */}
        <div 
            className="absolute inset-0 bg-gradient-to-tr from-gray-500 via-gray-200 to-gray-500"
            style={{ clipPath: "polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%)" }}
        />

        {/* Inner Dark Background */}
        <div 
            className="absolute inset-[3px] bg-[#1a1a1a] flex flex-col items-center justify-center"
            style={{ clipPath: "polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%)" }}
        >
            {/* Top Gloss/Reflection for Silver Effect */}
            <div className="absolute top-0 inset-x-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none"></div>

            <div className="relative z-10 flex flex-col items-center justify-center">
                {/* "DAYS" Label - Silver/Gray */}
                <span className="text-[9px] font-bold text-gray-400 tracking-wider mb-0.5">DAYS</span>
                
                {/* 50 Number with Silver Gradient */}
                <span className="text-4xl font-black bg-gradient-to-b from-white via-gray-300 to-gray-500 bg-clip-text text-transparent italic leading-none drop-shadow-sm">
                    50
                </span>

                {/* LeetCode Accent (Orange) */}
                <div className="absolute bottom-4 right-4 h-8 w-8 rounded-full border-r-4 border-b-4 border-orange-500/80 opacity-60 blur-[1px]"></div>
            </div>
        </div>
      </div>

      {/* LeetCode Symbol and Brand */}
      <div className="mt-4 flex flex-col items-center">
          <div className="flex items-center gap-1.5 mb-0.5">
             <img src="https://cdn.simpleicons.org/leetcode/FFA116" alt="LeetCode" className="h-4 w-4" />
             <span className="text-sm font-bold text-zinc-300 tracking-tight">LeetCode</span>
          </div>
          <div className="text-[10px] font-medium text-zinc-500">{year}</div>
      </div>
  </div>
);

interface BadgeCardProps {
  badge: typeof badges[0];
  index: number;
}

const BadgeCard: React.FC<BadgeCardProps> = ({ badge, index }) => {
  const [imgError, setImgError] = useState(false);
  const isGold = badge.type === 'hackerrank';

  const hoverBorderClass = isGold ? "hover:border-yellow-500/30" : "hover:border-gray-400/30";
  const hoverShadowClass = isGold ? "hover:shadow-[0_0_30px_rgba(234,179,8,0.1)]" : "hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]";
  const hoverTitleClass = isGold ? "group-hover:text-yellow-400" : "group-hover:text-gray-200";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className={`group relative flex h-full flex-col items-center justify-between gap-6 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 transition-all duration-300 hover:scale-[1.02] ${hoverBorderClass} ${hoverShadowClass}`}
    >
      {/* Internal Glow on Hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

      {/* Visual Container */}
      <div className="relative z-10 flex h-56 w-full items-center justify-center rounded-xl bg-black/40 shadow-inner">
          {!imgError ? (
            <img 
              src={badge.img} 
              alt={badge.title} 
              className="h-full w-full object-contain p-4"
              onError={() => setImgError(true)}
            />
          ) : (
            badge.type === 'hackerrank' ? (
                <HackerRankVisual icon={badge.icon || 'python'} />
            ) : (
                <LeetCodeVisual year={badge.year || '2025'} />
            )
          )}
      </div>

      {/* Text Info */}
      <div className="relative z-10 text-center w-full">
        <h3 className={`text-lg font-bold text-white transition-colors ${hoverTitleClass}`}>
            {badge.title}
        </h3>
        <p className="text-sm font-medium text-zinc-500 group-hover:text-zinc-400 transition-colors">
            {badge.subtitle}
        </p>
      </div>
    </motion.div>
  );
};

const CodingBadges = () => {
  return (
    <section id="badges" className="px-6 py-24 md:px-12 lg:px-24">
      <div className="mb-16 flex flex-col items-center justify-center text-center">
        <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">Coding Badges</h2>
        <div className="h-1 w-20 bg-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.4)]"></div>
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto">
        {badges.map((badge, idx) => (
          <BadgeCard key={idx} badge={badge} index={idx} />
        ))}
      </div>
    </section>
  );
};

export default CodingBadges;