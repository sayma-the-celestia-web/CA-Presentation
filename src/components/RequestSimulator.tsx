import { useState } from "react";
import { Label, Chip } from "./Shared";
import { motion, AnimatePresence } from "motion/react";

export function RequestSimulator({ id }: { id: string }) {
  const [status, setStatus] = useState<"idle" | "requesting" | "hit" | "miss" | "fetching">("idle");
  const activeBlock = "B04";

  const simulate = (type: "hit" | "miss") => {
    if (status !== "idle") return;
    setStatus("requesting");
    setTimeout(() => {
      setStatus(type);
      if (type === "miss") {
        setTimeout(() => setStatus("fetching"), 1500);
        setTimeout(() => setStatus("idle"), 3500);
      } else {
        setTimeout(() => setStatus("idle"), 2000);
      }
    }, 1000);
  };

  return (
    <section id={id} className="min-h-screen py-24 flex flex-col items-center justify-center">
      <div className="text-center mb-12">
        <Label text="INSIDE A MEMORY REQUEST" className="mb-4 !text-[#636E72]" />
        <h2 className="font-serif text-4xl md:text-6xl italic font-light text-[#1a1a1a] mb-4">
          Two Possible Outcomes
        </h2>
      </div>

      <div className="flex gap-4 mb-8 z-20">
        <button 
          onClick={() => simulate("hit")}
          disabled={status !== "idle"}
          className="px-4 sm:px-6 py-3 bg-white border-2 border-black font-mono text-xs sm:text-sm font-bold text-[#1a1a1a] hover:bg-[#55EFC4] transition-colors disabled:opacity-50 shadow-[4px_4px_0px_0px_#000]"
        >
          SIMULATE HIT
        </button>
        <button 
          onClick={() => simulate("miss")}
          disabled={status !== "idle"}
          className="px-4 sm:px-6 py-3 bg-white border-2 border-black font-mono text-xs sm:text-sm font-bold text-[#1a1a1a] hover:bg-[#FAB1A0] transition-colors disabled:opacity-50 shadow-[4px_4px_0px_0px_#000]"
        >
          SIMULATE MISS
        </button>
      </div>

      <div className="relative w-full max-w-4xl h-[600px] border border-[#e2e2da] rounded-xl bg-white/50 p-4 sm:p-8 shadow-sm overflow-hidden flex flex-col justify-between items-center">
        <Chip title="CPU" className="z-10 w-32 mt-4" />
        
        {/* Status Text - Repositioned to center-right or center for better visibility */}
        <div className="absolute top-1/2 left-1/2 md:left-2/3 -translate-x-1/2 -translate-y-1/2 z-30 w-[80%] md:w-auto text-center pointer-events-none">
          <AnimatePresence mode="wait">
             {status === "requesting" && <motion.div key="req" initial={{opacity:0, scale:0.9}} animate={{opacity:1, scale:1}} exit={{opacity:0, scale:0.9}} className="inline-block font-mono text-xs text-[#1a1a1a] bg-white px-3 py-2 border border-black shadow-[4px_4px_0px_0px_#000]">REQUESTING {activeBlock}</motion.div>}
             {status === "hit" && <motion.div key="hit" initial={{opacity:0, scale:0.9}} animate={{opacity:1, scale:1}} exit={{opacity:0, scale:0.9}} className="inline-block font-mono text-xs text-[#1a1a1a] font-bold bg-[#55EFC4] px-3 py-2 border border-black shadow-[4px_4px_0px_0px_#000]">CACHE HIT! FAST RETURN</motion.div>}
             {status === "miss" && <motion.div key="miss" initial={{opacity:0, scale:0.9}} animate={{opacity:1, scale:1}} exit={{opacity:0, scale:0.9}} className="inline-block font-mono text-xs text-[#1a1a1a] font-bold bg-[#FAB1A0] px-3 py-2 border border-black shadow-[4px_4px_0px_0px_#000]">CACHE MISS! NOT FOUND</motion.div>}
             {status === "fetching" && <motion.div key="fetch" initial={{opacity:0, scale:0.9}} animate={{opacity:1, scale:1}} exit={{opacity:0, scale:0.9}} className="inline-block font-mono text-xs text-[#1a1a1a] bg-white px-3 py-2 border border-black shadow-[4px_4px_0px_0px_#000]">FETCHING FROM MAIN MEMORY...</motion.div>}
          </AnimatePresence>
        </div>

        <Chip 
          title="CACHE" 
          className={`z-10 w-48 transition-colors duration-300 relative ${status === 'hit' ? 'border-black bg-[#55EFC4] shadow-[4px_4px_0px_0px_#000]' : status === 'miss' ? 'border-black bg-[#FAB1A0] shadow-[4px_4px_0px_0px_#000]' : 'bg-white'}`} 
        />
        
        <Chip title="MAIN MEMORY" className="z-10 w-64 mb-4 shadow-none bg-[#fdfdfd]" />

        {/* Paths - Using Flexbox relative positioning instead of absolute offsets */}
        <div className="absolute top-[80px] bottom-[50%] left-1/2 w-px bg-black opacity-20 -translate-x-1/2 border-dashed border-l z-0" />
        <div className="absolute top-[50%] bottom-[80px] left-1/2 w-px bg-black opacity-20 -translate-x-1/2 border-dashed border-l z-0" />

        {/* Packet Animation - Based on percentages to handle responsive height */}
        <AnimatePresence>
          {(status === "requesting" || status === "hit") && (
            <motion.div 
              className="absolute left-1/2 w-4 h-4 bg-[#0984E3] border border-black -translate-x-1/2 z-20 shadow-[2px_2px_0px_0px_#000]"
              initial={{ top: "10%" }}
              animate={{ top: status === "hit" ? ["50%", "10%"] : "50%" }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />
          )}
          {(status === "miss" || status === "fetching") && (
             <motion.div 
              className="absolute left-1/2 w-4 h-4 bg-black border border-black -translate-x-1/2 z-20 shadow-[2px_2px_0px_0px_#000]"
              initial={{ top: "50%" }}
              animate={{ top: status === "fetching" ? ["90%", "50%", "10%"] : "90%" }}
              transition={{ duration: status === "fetching" ? 1.5 : 0.8, ease: "easeInOut" }}
             />
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
