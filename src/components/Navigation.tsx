import { useState, useEffect } from 'react';

const navItems = [
  { id: 'hero', label: 'Overview' },
  { id: 'why-cache', label: 'Why Cache' },
  { id: 'hierarchy', label: 'Hierarchy' },
  { id: 'cache-levels', label: 'Levels' },
  { id: 'cache-operation', label: 'How It Works' },
  { id: 'mapping', label: 'Mapping' },
  { id: 'summary', label: 'Summary' },
  { id: 'quiz', label: 'Quiz' },
];

export function Navigation() {
  const [active, setActive] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      let current = 'hero';
      for (const item of navItems) {
        const el = document.getElementById(item.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 3) {
            current = item.id;
          }
        }
      }
      setActive(current);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 p-4 bg-[#F9F8F3]/80 backdrop-blur-md border-b border-[#e2e2da]">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 sm:px-12 lg:px-24">
        <span className="font-mono text-[11px] tracking-[0.2em] text-[#1a1a1a] font-bold hidden sm:block uppercase">CACHE MEMORY</span>
        <div className="flex gap-4 sm:gap-6 overflow-x-auto hide-scrollbar">
          {navItems.map(item => (
            <a 
              key={item.id} 
              href={`#${item.id}`}
              className={`font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.1em] transition-colors shrink-0 py-1 ${active === item.id ? 'text-[#0984E3] font-bold border-b-2 border-[#0984E3]' : 'text-[#636E72] hover:text-[#1a1a1a]'}`}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}
