import { Label } from "./Shared";
import { motion } from "motion/react";

export function HierarchySection({ id }: { id: string }) {
  return (
    <section id={id} className="min-h-screen py-24 flex flex-col items-center justify-center">
      <div className="text-center mb-16">
        <Label text="MEMORY HIERARCHY" className="mb-4 !text-[#636E72]" />
        <h2 className="font-serif text-4xl md:text-6xl italic font-light text-[#1a1a1a] mb-4">
          Where Does Cache Live?
        </h2>
      </div>

      <div className="relative flex flex-col items-center gap-4 w-full max-w-2xl px-12 md:px-0">
        <div className="absolute left-0 md:-left-12 top-0 bottom-0 w-px bg-black opacity-20 hidden sm:block border-dashed border-l" />
        <div className="absolute left-4 md:-left-32 top-8 md:top-1/4 hidden sm:block font-mono text-[11px] font-bold text-white bg-[#1a1a1a] p-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] uppercase writing-vertical rotate-180 md:rotate-0 md:writing-horizontal md:text-center w-8 md:w-32">↑ FASTER<br className="hidden md:block"/>SMALLER<br className="hidden md:block"/>$$$</div>
        <div className="absolute left-4 md:-left-32 bottom-8 md:bottom-1/4 hidden sm:block font-mono text-[11px] font-bold text-white bg-[#1a1a1a] p-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] uppercase writing-vertical rotate-180 md:rotate-0 md:writing-horizontal md:text-center w-8 md:w-32">↓ SLOWER<br className="hidden md:block"/>LARGER<br className="hidden md:block"/>$</div>

        <Layer title="REGISTERS" width="w-32" opacity="bg-[#e2e2da]/30" delay={0.1} />
        <Layer title="L1 CACHE" width="w-48" opacity="bg-[#55EFC4] border-black" textClass="text-[#1a1a1a]" delay={0.2} />
        <Layer title="L2 CACHE" width="w-64" opacity="bg-[#55EFC4]/70 border-black" textClass="text-[#1a1a1a]" delay={0.3} />
        <Layer title="L3 CACHE" width="w-80" opacity="bg-[#55EFC4]/40 border-black" textClass="text-[#1a1a1a]" delay={0.4} />
        <Layer title="MAIN MEMORY" width="w-[22rem] md:w-96" opacity="bg-[#fdfdfd]" delay={0.5} />
        <Layer title="SECONDARY STORAGE" width="w-full max-w-lg" opacity="bg-white" delay={0.6} />
      </div>
    </section>
  )
}

function Layer({ title, width, opacity, textClass = "text-[#1a1a1a]", delay }: { title: string, width: string, opacity: string, textClass?: string, delay: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
      className={`${width} h-16 ${opacity} border-2 border-black flex items-center justify-center relative shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-transform`}
    >
      <span className={`font-mono text-[11px] sm:text-xs font-bold tracking-widest uppercase ${textClass}`}>{title}</span>
    </motion.div>
  )
}
