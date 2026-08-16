import { Label, Chip } from "./Shared";
import { useState } from "react";
import { motion } from "motion/react";

export function MappingSection({ id }: { id: string }) {
  return (
    <section id={id} className="min-h-screen pt-24">
       <div className="mb-24">
        <Label text="CACHE MAPPING" className="mb-4 !text-[#636E72]" />
        <h2 className="font-serif text-4xl md:text-6xl italic font-light text-[#1a1a1a] mb-6 max-w-2xl">
          But Where Does a Block Go?
        </h2>
        <p className="font-sans text-xl text-[#333333] max-w-2xl italic">
          Main memory has thousands of blocks. Cache has very few lines. We need a mapping rule to decide where a memory block is allowed to be placed.
        </p>
      </div>

      <DirectMapping />
      <AssociativeMapping />
      <SetAssociativeMapping />
      <ComparisonSpectrum />
    </section>
  )
}

function DirectMapping() {
  const [activeBlock, setActiveBlock] = useState<number | null>(null);

  return (
    <div className="py-16 border-t border-[#e2e2da] grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      <div>
        <h3 className="font-serif text-3xl italic mb-4 bg-[#ffffff] inline-block px-2">Direct Mapping</h3>
        <p className="font-sans text-lg text-[#333333] mb-8">
          One memory block maps to exactly one specific cache line. It's fixed, rigid, and simple to implement in hardware.
        </p>
        <div className="bg-[#1a1a1a] text-white p-6 font-mono text-[11px] border-l-4 border-[#0984E3] mb-8 shadow-[4px_4px_0px_0px_#e2e2da]">
          i = j mod m<br/><br/>
          <span className="opacity-50">i = cache line<br/>j = memory block<br/>m = total cache lines (4)</span>
        </div>
        <p className="font-mono text-[9px] text-[#0984E3] font-bold uppercase tracking-widest">Hover a memory block to see its specific destination</p>
      </div>

      <div className="w-full overflow-x-auto pb-4 hide-scrollbar">
        <div className="min-w-[500px] relative bg-white/50 border border-[#e2e2da] rounded-xl p-8 flex justify-between items-center h-[450px] shadow-sm">
         {/* Main Memory */}
         <div className="flex flex-col gap-2 z-10 items-start">
           <Label text="MAIN MEMORY" className="!text-[#1a1a1a] border-2 border-[#1a1a1a] px-2 py-1 font-bold bg-white mb-2" />
           {Array.from({length: 8}).map((_, i) => (
             <button 
               key={i} 
               onMouseEnter={() => setActiveBlock(i)}
               onMouseLeave={() => setActiveBlock(null)}
               className={`w-16 h-8 border-2 font-mono text-xs font-bold transition-colors ${activeBlock === i ? 'bg-[#0984E3] text-white border-[#0984E3]' : 'bg-white border-black hover:bg-[#e2e2da]/20'}`}
             >
               B{i}
             </button>
           ))}
         </div>

         {/* Connection lines using SVG */}
         <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
            {activeBlock !== null && (
              <motion.line 
                x1="100px" y1={`${(activeBlock * 40) + 102}px`} 
                x2="calc(100% - 130px)" y2={`${((activeBlock % 4) * 56) + 162}px`} 
                stroke="#0984E3" strokeWidth="2" strokeDasharray="4 4"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.3 }}
              />
            )}
         </svg>

         {/* Cache */}
         <div className="flex flex-col gap-4 justify-center z-10 h-full items-end">
           <Label text="CACHE" className="!text-[#1a1a1a] border-2 border-[#1a1a1a] px-2 py-1 font-bold bg-white" />
           {Array.from({length: 4}).map((_, i) => (
             <div 
               key={i} 
               className={`w-24 h-10 border-2 flex items-center justify-center font-mono text-xs font-bold transition-colors shadow-[2px_2px_0px_0px_#000] ${activeBlock !== null && activeBlock % 4 === i ? 'bg-[#55EFC4] border-black shadow-[2px_2px_0px_0px_#55EFC4]' : 'bg-white border-black'}`}
             >
               L{i}
             </div>
           ))}
         </div>
      </div>
     </div>
    </div>
  )
}

function AssociativeMapping() {
   const [active, setActive] = useState(false);
   
   return (
    <div className="py-16 border-t border-[#e2e2da] grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      <div className="w-full overflow-x-auto pb-4 hide-scrollbar order-2 lg:order-1">
        <div className="min-w-[500px] relative bg-white/50 border border-[#e2e2da] rounded-xl p-8 flex items-center justify-between h-[450px] shadow-sm"
          onMouseEnter={() => setActive(true)}
          onMouseLeave={() => setActive(false)}
        >
         <div className="z-10 flex flex-col items-start">
           <Label text="MEMORY BLOCK" className="!text-[#1a1a1a] border-2 border-[#1a1a1a] px-2 py-1 font-bold bg-white mb-2" />
           <div className={`w-16 h-16 border-2 flex items-center justify-center font-mono font-bold transition-colors shadow-[2px_2px_0px_0px_#000] ${active ? 'bg-[#0984E3] text-white border-[#0984E3]' : 'bg-white border-black'}`}>
             B4
           </div>
         </div>

         <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {active && Array.from({length: 4}).map((_, i) => (
              <motion.line 
                key={i}
                x1="100px" y1="242px" 
                x2="calc(100% - 130px)" y2={`${(i * 56) + 162}px`} 
                stroke="#0984E3" strokeWidth="2" strokeDasharray="4 4"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
              />
            ))}
         </svg>

         <div className="flex flex-col gap-4 justify-center z-10 h-full items-end">
           <Label text="CACHE" className="!text-[#1a1a1a] border-2 border-[#1a1a1a] px-2 py-1 font-bold bg-white" />
           {Array.from({length: 4}).map((_, i) => (
             <div 
               key={i} 
               className={`w-24 h-10 border-2 flex items-center justify-center font-mono text-xs font-bold transition-colors shadow-[2px_2px_0px_0px_#000] ${active ? 'bg-[#55EFC4] border-black shadow-[2px_2px_0px_0px_#55EFC4]' : 'bg-white border-black'}`}
             >
               L{i}
             </div>
           ))}
         </div>
      </div>
     </div>

      <div className="order-1 lg:order-2">
        <h3 className="font-serif text-3xl italic mb-4 inline-block pr-2 bg-[#ffffff]">Associative Mapping</h3>
        <p className="font-sans text-lg text-[#0a0606] mb-8">
          One block can go to <span className="font-bold text-[#1a1a1a]">any available cache line</span>. It is extremely flexible and reduces conflict misses, but searching the entire cache later takes more complex hardware.
        </p>
        <p className="font-mono text-[9px] text-[#0984E3] font-bold uppercase tracking-widest">Hover the block to see possibilities</p>
      </div>
    </div>
   )
}

function SetAssociativeMapping() {
   const [active, setActive] = useState(false);

   return (
    <div className="py-16 border-t border-[#e2e2da] grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      <div>
        <h3 className="font-serif text-3xl italic mb-4 bg-[#ffffff] border-none inline-block pr-2">Set-Associative Mapping</h3>
        <p className="font-sans text-lg text-[#100e0e] mb-8">
          The middle ground. Blocks are mapped to a specific <span className="font-bold text-[#1a1a1a]">Set</span> (like Direct Mapping), but can go in <span className="font-bold text-[#1a1a1a]">any Line</span> within that Set (like Associative Mapping).
        </p>
        <p className="font-mono text-[9px] text-[#0984E3] font-bold uppercase tracking-widest">Hover the block to see the hybrid approach</p>
      </div>

      <div className="w-full overflow-x-auto pb-4 hide-scrollbar">
        <div className="min-w-[500px] relative bg-white/50 border border-[#e2e2da] rounded-xl p-8 flex items-center justify-between h-[450px] shadow-sm"
          onMouseEnter={() => setActive(true)}
          onMouseLeave={() => setActive(false)}
        >
         <div className="z-10 flex flex-col items-start">
           <Label text="BLOCK" className="!text-[#1a1a1a] border-2 border-[#1a1a1a] px-2 py-1 font-bold bg-white mb-2" />
           <div className={`w-16 h-16 border-2 flex items-center justify-center font-mono font-bold transition-colors shadow-[2px_2px_0px_0px_#000] ${active ? 'bg-[#0984E3] text-white border-[#0984E3]' : 'bg-white border-black'}`}>
             B4
           </div>
         </div>

         <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {active && (
              <>
                <motion.line x1="100px" y1="242px" x2="calc(100% - 162px)" y2="141px" stroke="#0984E3" strokeWidth="2" strokeDasharray="4 4" initial={{pathLength:0}} animate={{pathLength:1}} />
                <motion.line x1="100px" y1="242px" x2="calc(100% - 162px)" y2="181px" stroke="#0984E3" strokeWidth="2" strokeDasharray="4 4" initial={{pathLength:0}} animate={{pathLength:1}} />
              </>
            )}
         </svg>

         <div className="flex flex-col gap-8 justify-center z-10 w-32 items-end">
           <div className={`border-2 border-dashed p-3 transition-colors w-full ${active ? 'border-[#0984E3] bg-[#0984E3]/5' : 'border-[#636E72] bg-white/50'}`}>
             <Label text="SET 0" className="text-center mb-3 !text-[#1a1a1a] border-2 border-[#1a1a1a] px-2 py-1 font-bold bg-white" />
             <div className="flex flex-col gap-2">
               <div className={`h-8 border-2 border-black flex items-center justify-center font-mono text-xs font-bold shadow-[2px_2px_0px_0px_#000] transition-colors ${active ? 'bg-[#55EFC4]' : 'bg-white'}`}>L0</div>
               <div className={`h-8 border-2 border-black flex items-center justify-center font-mono text-xs font-bold shadow-[2px_2px_0px_0px_#000] transition-colors ${active ? 'bg-[#55EFC4]' : 'bg-white'}`}>L1</div>
             </div>
           </div>
           
           <div className="border-2 border-dashed border-[#636E72] p-3 opacity-50 bg-white/50 w-full">
             <Label text="SET 1" className="text-center mb-3 !text-[#1a1a1a] border-2 border-[#1a1a1a] px-2 py-1 font-bold bg-white" />
             <div className="flex flex-col gap-2">
               <div className="h-8 border-2 border-black flex items-center justify-center font-mono text-xs font-bold bg-white shadow-[2px_2px_0px_0px_#000]">L2</div>
               <div className="h-8 border-2 border-black flex items-center justify-center font-mono text-xs font-bold bg-white shadow-[2px_2px_0px_0px_#000]">L3</div>
             </div>
           </div>
         </div>
      </div>
     </div>
    </div>
   )
}

function ComparisonSpectrum() {
  return (
    <div className="py-24 border-t border-[#e2e2da]">
      <div className="text-center mb-16">
        <h3 className="font-serif text-3xl italic mb-4">Three Rules. One Problem.</h3>
      </div>

      <div className="relative max-w-4xl mx-auto hidden md:flex items-center justify-between mb-16">
         <div className="absolute left-10 right-10 h-0.5 bg-[#e2e2da] z-0" />
         
         <div className="flex flex-col items-center gap-4 z-10 bg-[#F9F8F3] px-6">
           <span className="font-mono text-[11px] font-bold tracking-widest text-[#636E72]">FIXED</span>
           <Chip title="DIRECT" className="w-32 py-2 shadow-none border-[#e2e2da]" />
         </div>

         <div className="flex flex-col items-center gap-4 z-10 bg-[#F9F8F3] px-6">
           <span className="font-mono text-[11px] font-bold tracking-widest text-[#0984E3]">BALANCED</span>
           <Chip title="SET-ASSOC." className="w-40 py-2 border-[#0984E3] shadow-[4px_4px_0px_0px_#0984E3] text-[#0984E3]" />
         </div>

         <div className="flex flex-col items-center gap-4 z-10 bg-[#F9F8F3] px-6">
           <span className="font-mono text-[11px] font-bold tracking-widest text-[#636E72]">FLEXIBLE</span>
           <Chip title="ASSOCIATIVE" className="w-32 py-2 shadow-none border-[#e2e2da]" />
         </div>
      </div>
      
      {/* Mobile view top spectrum */}
      <div className="md:hidden flex flex-col gap-8 items-center mb-16">
         <Chip title="DIRECT" subtitle="FIXED" className="w-full max-w-xs py-2 shadow-none border-[#e2e2da]" />
         <Chip title="SET-ASSOCIATIVE" subtitle="BALANCED" className="w-full max-w-xs py-2 border-[#0984E3] shadow-[4px_4px_0px_0px_#0984E3]" />
         <Chip title="ASSOCIATIVE" subtitle="FLEXIBLE" className="w-full max-w-xs py-2 shadow-none border-[#e2e2da]" />
      </div>

      {/* Expanded Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        <ComparisonColumn
          title="DIRECT MAPPING"
          subtitle="Fixed & Simple"
          flexibilityLevel={1}
          type="direct"
          attributes={[
            { label: "Placement", value: "One specific cache line" },
            { label: "Flexibility", value: "Low" },
            { label: "Hardware Complexity", value: "Low" },
            { label: "Lookup", value: "Simple" },
            { label: "Conflict Chance", value: "Higher" },
            { label: "Cost", value: "Lower" }
          ]}
        />
        <ComparisonColumn
          title="SET-ASSOCIATIVE"
          subtitle="Balanced"
          flexibilityLevel={2}
          type="set-associative"
          attributes={[
            { label: "Placement", value: "Within a specific set" },
            { label: "Flexibility", value: "Medium" },
            { label: "Hardware Complexity", value: "Medium" },
            { label: "Lookup", value: "Within the selected set" },
            { label: "Conflict Chance", value: "Lower than Direct" },
            { label: "Cost", value: "Moderate" }
          ]}
        />
        <ComparisonColumn
          title="ASSOCIATIVE MAPPING"
          subtitle="Flexible"
          flexibilityLevel={3}
          type="associative"
          attributes={[
            { label: "Placement", value: "Any cache line" },
            { label: "Flexibility", value: "High" },
            { label: "Hardware Complexity", value: "High" },
            { label: "Lookup", value: "Multiple/all tags" },
            { label: "Conflict Chance", value: "Lowest" },
            { label: "Cost", value: "Higher" }
          ]}
        />
      </div>

      <div className="mt-16 text-center max-w-2xl mx-auto px-6">
        <p className="font-sans text-lg text-[#333333] italic border-t border-[#e2e2da] pt-8">
          "There is no single best mapping technique — each represents a trade-off between placement flexibility, complexity, conflict behavior, and cost."
        </p>
      </div>
    </div>
  )
}

function ComparisonColumn({ title, subtitle, flexibilityLevel, type, attributes }: any) {
  const [active, setActive] = useState(false);

  return (
    <div 
      className="bg-[#ffffff] border border-[#e2e2da] rounded-xl p-6 md:p-8 flex flex-col group hover:border-black transition-colors"
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
    >
      <div className="mb-6 flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <h4 className="font-mono text-[11px] font-bold tracking-widest text-[#1a1a1a]">{title}</h4>
          <div className="flex gap-1">
            {Array.from({length: 3}).map((_, i) => (
              <div key={i} className={`w-2 h-2 rounded-full border border-black ${i < flexibilityLevel ? 'bg-black' : 'bg-transparent'}`} />
            ))}
          </div>
        </div>
        <p className="font-serif text-lg italic text-[#636E72]">{subtitle}</p>
      </div>

      {/* Visual Diagram */}
      <div className={`h-40 flex flex-col items-center justify-center border border-[#e2e2da] rounded-lg mb-8 bg-[#F9F8F3] transition-colors ${active ? 'bg-white' : ''}`}>
        {type === 'direct' && (
          <div className="flex flex-col items-center gap-2">
            <div className={`font-mono text-xs font-bold border-2 px-2 py-1 transition-colors ${active ? 'bg-[#0984E3] text-white border-[#0984E3]' : 'bg-white border-black shadow-[2px_2px_0px_0px_#000]'}`}>BLOCK</div>
            <div className={`transition-colors ${active ? 'text-[#0984E3]' : 'text-[#636E72]'}`}>↓</div>
            <div className={`font-mono text-xs font-bold border-2 px-2 py-1 transition-colors ${active ? 'bg-[#55EFC4] border-black shadow-[2px_2px_0px_0px_#000]' : 'bg-white border-[#e2e2da]'}`}>L0</div>
          </div>
        )}
        {type === 'set-associative' && (
          <div className="flex flex-col items-center gap-2">
            <div className={`font-mono text-xs font-bold border-2 px-2 py-1 transition-colors ${active ? 'bg-[#0984E3] text-white border-[#0984E3]' : 'bg-white border-black shadow-[2px_2px_0px_0px_#000]'}`}>BLOCK</div>
            <div className={`transition-colors ${active ? 'text-[#0984E3]' : 'text-[#636E72]'}`}>↓</div>
            <div className={`font-mono text-[10px] font-bold border-2 border-dashed px-4 py-0.5 transition-colors ${active ? 'border-[#0984E3] bg-[#0984E3]/5 text-[#0984E3]' : 'border-[#e2e2da] text-[#636E72]'}`}>SET 1</div>
            <div className={`transition-colors ${active ? 'text-[#0984E3]' : 'text-[#636E72]'}`}>↓</div>
            <div className="flex gap-2">
              <div className={`font-mono text-xs font-bold border-2 px-2 py-1 transition-colors ${active ? 'bg-[#55EFC4] border-black shadow-[2px_2px_0px_0px_#000]' : 'bg-white border-[#e2e2da]'}`}>L0</div>
              <div className={`font-mono text-xs font-bold border-2 px-2 py-1 transition-colors ${active ? 'bg-[#55EFC4] border-black shadow-[2px_2px_0px_0px_#000]' : 'bg-white border-[#e2e2da]'}`}>L1</div>
            </div>
          </div>
        )}
        {type === 'associative' && (
          <div className="flex flex-col items-center gap-2">
            <div className={`font-mono text-xs font-bold border-2 px-2 py-1 transition-colors ${active ? 'bg-[#0984E3] text-white border-[#0984E3]' : 'bg-white border-black shadow-[2px_2px_0px_0px_#000]'}`}>BLOCK</div>
            <div className={`flex gap-3 text-[10px] transition-colors ${active ? 'text-[#0984E3]' : 'text-[#636E72]'}`}>
               <span>↙</span>
               <span>↓</span>
               <span>↘</span>
            </div>
            <div className="flex gap-1">
              <div className={`font-mono text-[9px] font-bold border-2 px-1 py-1 transition-colors ${active ? 'bg-[#55EFC4] border-black shadow-[2px_2px_0px_0px_#000]' : 'bg-white border-[#e2e2da]'}`}>L0</div>
              <div className={`font-mono text-[9px] font-bold border-2 px-1 py-1 transition-colors ${active ? 'bg-[#55EFC4] border-black shadow-[2px_2px_0px_0px_#000]' : 'bg-white border-[#e2e2da]'}`}>L1</div>
              <div className={`font-mono text-[9px] font-bold border-2 px-1 py-1 transition-colors ${active ? 'bg-[#55EFC4] border-black shadow-[2px_2px_0px_0px_#000]' : 'bg-white border-[#e2e2da]'}`}>L2</div>
              <div className={`font-mono text-[9px] font-bold border-2 px-1 py-1 transition-colors ${active ? 'bg-[#55EFC4] border-black shadow-[2px_2px_0px_0px_#000]' : 'bg-white border-[#e2e2da]'}`}>L3</div>
            </div>
          </div>
        )}
      </div>

      {/* Attributes */}
      <div className="flex flex-col gap-3 flex-1">
        {attributes.map((attr: any, idx: number) => (
          <div key={idx} className="flex flex-col border-b border-[#e2e2da]/50 pb-2 last:border-0 last:pb-0">
            <span className="font-mono text-[9px] font-bold text-[#636E72] uppercase tracking-wider mb-1">{attr.label}</span>
            <span className="font-sans text-[13px] text-[#1a1a1a]">{attr.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
