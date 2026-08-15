import { Label, Chip } from "./Shared";

export function MultiLevelSection({ id }: { id: string }) {
  return (
    <section id={id} className="min-h-screen py-24 flex flex-col justify-center">
      <div className="mb-16 lg:mb-24">
        <Label text="MULTI-LEVEL CACHE" className="mb-4 !text-[#636E72]" />
        <h2 className="font-serif text-4xl md:text-6xl italic font-light text-[#1a1a1a] mb-6">
          One Cache Is Not Enough
        </h2>
        <p className="font-sans text-xl text-[#333333] max-w-xl italic">
          Modern CPUs use multiple layers of cache. Closer to the CPU = Faster, but smaller capacity.
        </p>
      </div>

      <div className="w-full">
        <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-4 lg:justify-center">
          <Chip title="CPU" className="w-24 shrink-0" />
          
          <div className="w-px h-8 lg:w-8 lg:h-px bg-black opacity-30 shrink-0 relative">
             <div className="hidden lg:block absolute top-1/2 right-0 -translate-y-1/2 border-t-4 border-l-4 border-b-4 border-transparent border-l-black" />
             <div className="block lg:hidden absolute bottom-0 left-1/2 -translate-x-1/2 border-l-4 border-r-4 border-t-4 border-transparent border-t-black" />
          </div>
          
          <div className="flex flex-col items-center gap-4 shrink-0">
            <Label text="FASTEST" className="!text-[#1a1a1a] border-2 border-[#1a1a1a] px-2 py-1 font-bold bg-white/50" />
            <Chip title="L1" className="w-24 h-16 shadow-[4px_4px_0px_0px_#55EFC4]" />
          </div>

          <div className="w-px h-12 lg:w-12 lg:h-px bg-black opacity-30 shrink-0 relative">
             <div className="hidden lg:block absolute top-1/2 right-0 -translate-y-1/2 border-t-4 border-l-4 border-b-4 border-transparent border-l-black" />
             <div className="block lg:hidden absolute bottom-0 left-1/2 -translate-x-1/2 border-l-4 border-r-4 border-t-4 border-transparent border-t-black" />
          </div>

          <div className="flex flex-col items-center gap-4 shrink-0">
            <Label text="LARGER" className="!text-[#1a1a1a] border-2 border-[#1a1a1a] px-2 py-1 font-bold bg-white/50" />
            <Chip title="L2" className="w-32 h-24 border-[#e2e2da] shadow-none" />
          </div>

          <div className="w-px h-16 lg:w-16 lg:h-px bg-black opacity-30 shrink-0 relative">
             <div className="hidden lg:block absolute top-1/2 right-0 -translate-y-1/2 border-t-4 border-l-4 border-b-4 border-transparent border-l-black" />
             <div className="block lg:hidden absolute bottom-0 left-1/2 -translate-x-1/2 border-l-4 border-r-4 border-t-4 border-transparent border-t-black" />
          </div>

          <div className="flex flex-col items-center gap-4 shrink-0">
            <Label text="LARGEST CACHE" className="!text-[#1a1a1a] border-2 border-[#1a1a1a] px-2 py-1 font-bold bg-white/50" />
            <Chip title="L3" className="w-40 h-32 border-[#e2e2da] shadow-none" />
          </div>

          <div className="w-px h-24 lg:w-24 lg:h-px bg-black opacity-30 shrink-0 relative">
             <div className="hidden lg:block absolute top-1/2 right-0 -translate-y-1/2 border-t-4 border-l-4 border-b-4 border-transparent border-l-black" />
             <div className="block lg:hidden absolute bottom-0 left-1/2 -translate-x-1/2 border-l-4 border-r-4 border-t-4 border-transparent border-t-black" />
          </div>

          <div className="flex flex-col items-center gap-4 shrink-0">
            <Label text="MASSIVE, SLOW" className="!text-[#1a1a1a] border-2 border-[#1a1a1a] px-2 py-1 font-bold bg-white/50" />
            <Chip title="MAIN MEMORY" className="w-48 h-48 border-[#e2e2da] shadow-none" />
          </div>
        </div>
      </div>
    </section>
  )
}
