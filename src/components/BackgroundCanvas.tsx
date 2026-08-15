import { motion, useScroll, useTransform } from "motion/react";

export function BackgroundCanvas() {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -150]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden bg-[#F9F8F3] bg-dot-grid">
      {/* Ghost CPU */}
      <motion.div style={{ y: y1 }} className="absolute top-[10%] left-[5%] opacity-[0.03]">
        <svg width="600" height="600" viewBox="0 0 100 100" fill="none" stroke="black" strokeWidth="1">
          <rect x="20" y="20" width="60" height="60" rx="4" />
          <rect x="30" y="30" width="40" height="40" rx="2" />
          {Array.from({length: 8}).map((_, i) => (
             <g key={i}>
               <line x1={25 + i*7} y1="15" x2={25 + i*7} y2="20" />
               <line x1={25 + i*7} y1="80" x2={25 + i*7} y2="85" />
               <line x1="15" y1={25 + i*7} x2="20" y2={25 + i*7} />
               <line x1="80" y1={25 + i*7} x2="85" y2={25 + i*7} />
             </g>
          ))}
        </svg>
      </motion.div>

      {/* Circuit Traces */}
      <motion.div style={{ y: y2 }} className="absolute top-[40%] right-[5%] opacity-10 hidden lg:block">
        <svg width="400" height="600" viewBox="0 0 100 100" fill="none" stroke="#636E72" strokeWidth="0.5">
           <path d="M 0,50 L 30,50 L 40,20 L 80,20" />
           <circle cx="80" cy="20" r="1.5" fill="#636E72" />
           <path d="M 10,70 L 40,70 L 50,90 L 90,90" />
           <circle cx="90" cy="90" r="1.5" fill="#636E72" />
           <path d="M 20,10 L 40,10 L 60,40 L 90,40" />
           <circle cx="90" cy="40" r="1.5" fill="#636E72" />
        </svg>
      </motion.div>
    </div>
  )
}
