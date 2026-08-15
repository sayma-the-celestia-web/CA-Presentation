import { Label, Chip } from "./Shared";

export function SummarySection({ id }: { id: string }) {
  return (
    <section id={id} className="min-h-screen py-24 flex flex-col items-center justify-center border-t border-[#e2e2da]">
      <div className="text-center mb-16">
        <Label text="FINAL SUMMARY" className="mb-4 !text-[#636E72]" />
        <h2 className="font-serif text-4xl md:text-6xl italic font-light text-[#1a1a1a] mb-4">
          So, What Did We Learn?
        </h2>
      </div>

      <div className="flex flex-col lg:flex-row gap-16 items-center w-full max-w-5xl">
        {/* Core Architecture */}
        <div className="flex-1 flex flex-col items-center relative py-12">
          <Chip title="CPU" className="w-32 mb-12 z-10 shadow-none border-[#e2e2da] bg-[#f7f1ff]" />
          <div className="absolute top-20 bottom-20 w-px bg-black opacity-20 z-0 border-dashed border-l" />
          <Chip title="CACHE" subtitle="HIT / MISS" className="w-48 h-24 mb-12 z-10 border-black shadow-[4px_4px_0px_0px_#55EFC4] bg-[#ddf9dd]" />
          <Chip title="MAIN MEMORY" className="w-64 z-10 shadow-none border-[#e2e2da] bg-[#ffeaea]" />
        </div>

        {/* Takeaways */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
          <TakeawayCard num="01" text="Cache is small and fast. It acts as an intermediary between the CPU and slower main memory." bgColor="bg-[#F2F7F7]" />
          <TakeawayCard num="02" text="It significantly reduces the CPU-Main Memory speed gap by storing frequently used data." bgColor="bg-[#F2F7F7]" />
          <TakeawayCard num="03" text="The CPU checks Cache first. Hit = fast return. Miss = fetch from memory." bgColor="bg-[#F2F7F7]" />
          <TakeawayCard num="04" text="Mapping rules (Direct, Associative, Set) dictate where data is allowed to be placed." bgColor="bg-[#F2F7F7]" />
        </div>
      </div>

      <div className="mt-40 flex flex-col items-center text-center">
        <h3 className="font-serif text-3xl md:text-5xl text-[#1a1a1a] italic font-light mb-6 bg-[#ffffff] inline-block px-4 py-2 text-center">
          Cache is small in size.<br/>Big in impact.
        </h3>
        <p className="font-mono text-[14px] font-bold bg-[#e9f0f4] text-[#636E72] mb-16 tracking-widest uppercase inline-block px-4 py-2 text-center">
          Thank You • Any Questions?
        </p>
        
        <div className="text-[10px] text-[#636E72] font-mono max-w-md mx-auto text-left sm:text-center border-t border-[#e2e2da] pt-6 uppercase tracking-tight w-full">
          <span className="font-bold mb-2 block">REFERENCES:</span>
          <p className="text-[#2c3131] text-[13px] font-normal">Computer Architecture — Lecture 03: Cache Memory<br/>
          Md. Selim Reza, SWE, DIU</p>
        </div>
      </div>
    </section>
  )
}

function TakeawayCard({ num, text, bgColor }: { num: string, text: string, bgColor?: string }) {
  return (
    <div className={`p-6 border border-[#e2e2da] rounded-xl relative overflow-hidden group ${bgColor || 'bg-white/50'}`}>
      <div className="absolute -top-4 -right-4 font-mono text-8xl font-bold text-[#636E72] opacity-[0.08] group-hover:opacity-[0.15] transition-opacity select-none z-0">
        {num}
      </div>
      <div className="relative z-10">
        <span className="font-mono text-[12px] font-bold text-[#0984E3] mb-3 block">RULE {num}</span>
        <p className="font-sans text-[14px] text-[#030202] leading-relaxed italic">{text}</p>
      </div>
    </div>
  )
}
