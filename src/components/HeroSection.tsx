import { motion } from "motion/react";
import { Label, Chip } from "./Shared";

export function HeroSection({ id }: { id: string }) {
  return (
    <section id={id} className="min-h-screen flex flex-col justify-center py-24 relative pt-32">
      <div className="mb-16 max-w-2xl">
        <Label text="COMPUTER ARCHITECTURE • MEMORY SYSTEM" className="mb-4 !text-[#636E72]" />
        <h1 className="font-serif text-6xl md:text-7xl italic font-light text-[#1a1a1a] mb-6 leading-tight">
          Cache Memory
        </h1>
        <p className="font-sans text-xl md:text-2xl text-[#333333] mb-4 font-light italic">
          Small in size. <span className="font-semibold text-[#1a1a1a]">Big in performance.</span>
        </p>
        <p className="font-sans text-lg text-[#333333] max-w-md italic">
          A closer look at how Cache Memory helps the CPU access frequently needed data faster by reducing the speed gap.
        </p>
      </div>

      <div className="relative flex flex-col items-center max-w-lg mx-auto w-full">
        <Chip title="PROCESSOR" subtitle="CPU" className="w-48 h-24 mb-16 z-10" />
        
        {/* Connection Line */}
        <div className="absolute top-24 bottom-32 left-1/2 w-0.5 bg-black -translate-x-1/2" />
        
        {/* Animated Packet */}
        <motion.div 
          className="absolute top-24 left-1/2 w-3 h-3 bg-[#0984E3] rounded-full -translate-x-1/2 shadow-[0_0_10px_#0984E3]"
          animate={{ y: [0, 160, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />

        <Chip title="CACHE" subtitle="SRAM" className="w-64 h-32 mb-16 z-10 bg-white shadow-[4px_4px_0px_0px_#55EFC4]" />
        
        <motion.div 
          className="absolute top-64 bottom-0 left-1/2 w-0.5 border-dashed border-l-2 border-black opacity-30 -translate-x-1/2" 
        />

        <Chip title="MAIN MEMORY" subtitle="DRAM" className="w-80 h-40 z-10 bg-white" />
      </div>
    </section>
  )
}
