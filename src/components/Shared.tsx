import { motion } from "motion/react";
import React from "react";

export const Chip = ({ title, subtitle, className }: { title: string, subtitle?: string, className?: string }) => (
  <div className={`border-2 border-black bg-white p-4 flex flex-col items-center justify-center relative shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-transform ${className}`}>
    {subtitle && <span className="font-mono text-[9px] tracking-widest text-black opacity-50 mb-1 uppercase">{subtitle}</span>}
    <span className="font-sans font-bold tracking-tighter text-sm text-black text-center uppercase">{title}</span>
  </div>
);

export const Label = ({ text, className }: { text: string, className?: string }) => (
  <div className={`font-mono text-[10px] sm:text-xs text-[#636E72] uppercase tracking-widest ${className}`}>
    {text}
  </div>
);
