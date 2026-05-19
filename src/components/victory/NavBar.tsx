import Icon from "@/components/ui/icon";
import { navItems, tickerItems } from "./data";

interface NavBarProps {
  activeSection: string;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  scrollTo: (id: string) => void;
}

export default function NavBar({ activeSection, mobileMenuOpen, setMobileMenuOpen, scrollTo }: NavBarProps) {
  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0d0d0d]/90 backdrop-blur-sm border-b border-[#FFE500]/10">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <button onClick={() => scrollTo("hero")} className="font-oswald font-bold text-xl tracking-widest text-neon-yellow text-glow-yellow">
            ПОБЕДЫ
          </button>
          <div className="hidden md:flex items-center gap-8">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`font-oswald text-sm tracking-wider uppercase transition-all duration-200 ${activeSection === item.id ? "text-neon-yellow text-glow-yellow" : "text-white/60 hover:text-white"}`}
              >
                {item.label}
              </button>
            ))}
          </div>
          <button className="btn-victory px-5 py-2 text-sm rounded hidden md:block" onClick={() => scrollTo("stories")}>
            Поделиться победой
          </button>
          <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <Icon name={mobileMenuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#111] border-t border-[#FFE500]/10 px-4 py-4 flex flex-col gap-4">
            {navItems.map(item => (
              <button key={item.id} onClick={() => scrollTo(item.id)} className="font-oswald text-sm tracking-wider uppercase text-left text-white/70">
                {item.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      <div className="fixed top-16 left-0 right-0 z-40 bg-neon-yellow overflow-hidden h-8 flex items-center">
        <div className="flex animate-ticker whitespace-nowrap">
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <span key={i} className="font-oswald font-bold text-[#0d0d0d] text-xs tracking-widest uppercase mx-8">{item}</span>
          ))}
        </div>
      </div>
    </>
  );
}
