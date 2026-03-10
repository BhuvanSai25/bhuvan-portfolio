import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Award, Trophy, Zap, ShieldCheck } from 'lucide-react';

const achievements = [
  {
    title: "Microsoft Certified",
    subtitle: "Azure Fundamentals",
    description: "Deep dive into Cloud concepts, Azure services, security, and privacy foundations.",
    icon: ShieldCheck,
    color: "blue",
  },
  {
    title: "'Pat on the Back' Award",
    subtitle: "Recognition at CDW",
    description: "Awarded for consistent high performance, dedication, and impactful contributions to the team.",
    icon: Award,
    color: "emerald",
  },
  {
    title: "500+ DSA Problems",
    subtitle: "Leetcode & GFG",
    description: "Consistent problem solving across various platforms, mastering advanced data structures and algorithms.",
    icon: Trophy,
    color: "amber",
  },
  {
    title: "Bug Reduction Success",
    subtitle: "35% Reduction Achieved",
    description: "Significantly decreased bug count post-code reviews by strictly applying SOLID principles and design patterns.",
    icon: Zap,
    color: "purple",
  }
];

interface CertCardProps {
  item: typeof achievements[0];
  index: number;
}

const CertCard: React.FC<CertCardProps> = ({ item, index }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const colors = {
    blue: "rgba(59, 130, 246, 0.4)",
    emerald: "rgba(16, 185, 129, 0.4)",
    amber: "rgba(245, 158, 11, 0.4)",
    purple: "rgba(168, 85, 247, 0.4)",
  };

  const iconColors = {
    blue: "text-blue-400",
    emerald: "text-emerald-400",
    amber: "text-amber-400",
    purple: "text-purple-400",
  };

  const glowColor = colors[item.color as keyof typeof colors];
  const iconColor = iconColors[item.color as keyof typeof iconColors];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className="group relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8 transition-all duration-300 hover:border-zinc-700 hover:shadow-[0_0_30px_rgba(16,185,129,0.05)]"
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
        style={{
          opacity,
          background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, ${glowColor.replace('0.4', '0.08')}, transparent 40%)`,
        }}
      />
      <div
        className="pointer-events-none absolute -inset-px z-10 opacity-0 transition duration-300"
        style={{
          opacity,
          background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, ${glowColor}, transparent 40%)`,
          maskImage: "linear-gradient(black, black), linear-gradient(black, black)",
          maskClip: "content-box, border-box",
          WebkitMaskClip: "content-box, border-box",
          maskComposite: "exclude",
          WebkitMaskComposite: "xor",
        }}
      />

      <div className="relative z-20">
        <div className={`mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-zinc-900/80 border border-zinc-800 ${iconColor} shadow-[inset_0_0_15px_rgba(0,0,0,0.5)]`}>
          <item.icon size={30} strokeWidth={1.5} />
        </div>
        <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors duration-300">{item.title}</h3>
        <p className={`text-xs font-bold ${iconColor} mb-4 uppercase tracking-[0.15em]`}>{item.subtitle}</p>
        <p className="text-sm leading-relaxed text-zinc-400 group-hover:text-zinc-300 transition-colors duration-300">
          {item.description}
        </p>
      </div>
    </motion.div>
  );
};

const Certifications = () => {
  return (
    <section id="certifications" className="px-6 py-24 md:px-12 lg:px-24">
      <div className="mb-16 flex flex-col items-center justify-center text-center">
        <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">Certifications & Achievements</h2>
        <div className="h-1 w-24 bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.4)]"></div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto">
        {achievements.map((item, idx) => (
          <CertCard key={`${item.title}-${idx}`} item={item} index={idx} />
        ))}
      </div>
    </section>
  );
};

export default Certifications;