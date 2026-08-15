import { motion } from "motion/react";
import { useState } from "react";
import { Label, Chip } from "./Shared";

export function SpeedGapSection({ id }: { id: string }) {
  const [hoveredWord, setHoveredWord] = useState<'cash' | 'cache' | null>(null);

  return (
    <section id={id} className="min-h-screen py-24 flex flex-col lg:flex-row gap-16 items-center">
      <div className="flex-1">
        <Label text="THE SPEED GAP" className="mb-4 !text-[#636E72]" />
        <h2 className="font-serif text-4xl md:text-6xl italic font-light text-[#1a1a1a] mb-6">
          The CPU Has a Problem
        </h2>
        <p className="font-sans text-xl text-[#333333] mb-8 max-w-lg italic">
          The CPU can process data exponentially faster than main memory can provide it. This creates a severe performance bottleneck.
        </p>
        
        <div className="flex gap-4 items-start mt-4 mb-16">
          <div 
            className="relative flex flex-col items-center cursor-crosshair group"
            onMouseEnter={() => setHoveredWord('cash')}
            onMouseLeave={() => setHoveredWord(null)}
          >
            <div className={`font-mono text-3xl font-bold transition-colors uppercase tracking-tight ${hoveredWord === 'cash' ? 'text-[#1a1a1a]' : 'text-[#636E72]'}`}>
              CASH
            </div>
            <p className={`absolute top-full mt-2 left-1/2 -translate-x-1/2 font-mono text-[11px] leading-relaxed text-[#444444] transition-opacity w-[140px] text-center pointer-events-none ${hoveredWord === 'cash' ? 'opacity-100' : 'opacity-0'}`}>
              Physical currency. (Useless to a CPU).
            </p>
          </div>
          
          <div className="font-mono text-3xl font-bold text-[#636E72] opacity-50 select-none">
            ≠
          </div>

          <div 
            className="relative flex flex-col items-center cursor-crosshair group"
            onMouseEnter={() => setHoveredWord('cache')}
            onMouseLeave={() => setHoveredWord(null)}
          >
            <div className={`font-mono text-3xl font-bold transition-colors uppercase tracking-tight ${hoveredWord === 'cache' ? 'text-[#1a1a1a]' : 'text-[#636E72]'}`}>
              CACHE
            </div>
            <p className={`absolute top-full mt-2 left-1/2 -translate-x-1/2 font-mono text-[11px] leading-relaxed text-[#444444] transition-opacity w-[180px] text-center pointer-events-none ${hoveredWord === 'cache' ? 'opacity-100' : 'opacity-0'}`}>
              Small, high-speed memory that stores copies of portions of main memory.
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 relative h-[500px] lg:h-[600px] w-full border border-[#e2e2da] rounded-xl bg-white/50 p-8 flex flex-col justify-between overflow-hidden shadow-sm">
        <Chip title="CPU" className="w-32 self-center z-10" />
        
        <div className="absolute top-24 bottom-24 left-1/2 w-0.5 bg-black opacity-10 -translate-x-1/2 border-dashed border-l" />
        
        {/* Slow Packet */}
        <motion.div 
          className="absolute left-1/2 w-4 h-4 bg-[#1a1a1a] rounded-sm -translate-x-1/2"
          animate={{ top: ["100px", "500px", "100px"] }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        />
        <Label text="WAITING..." className="absolute top-1/2 left-1/2 ml-4 -translate-y-1/2 opacity-50" />
        
        <Chip title="MAIN MEMORY" className="w-64 self-center z-10" />

        {/* Cache slides in */}
        <motion.div 
          className="absolute top-1/2 left-1/2 z-20"
          style={{ x: "-50%", y: "-50%" }}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ margin: "-200px" }}
          transition={{ type: "spring", bounce: 0.2, duration: 1 }}
        >
          <Chip title="CACHE" subtitle="ENTER" className="w-48 h-24 border-black shadow-[4px_4px_0px_0px_#0984E3]" />
        </motion.div>
      </div>
    </section>
  )
}
