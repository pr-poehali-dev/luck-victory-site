import Icon from "@/components/ui/icon";
import { useLang } from "./LangContext";

interface NavBarProps {
  activeSection: string;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  scrollTo: (id: string) => void;
}

export default function NavBar({ activeSection, mobileMenuOpen, setMobileMenuOpen, scrollTo }: NavBarProps) {
  const { lang, setLang, tr } = useLang();

  const navItems = [
    { id: "hero",    label: tr.nav.hero },
    { id: "stories", label: tr.nav.stories },
    { id: "gallery", label: tr.nav.gallery },
    { id: "tips",    label: tr.nav.tips },
    { id: "stats",   label: tr.nav.stats },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0d0d0d]/90 backdrop-blur-sm border-b border-[#FFE500]/10">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <button onClick={() => scrollTo("hero")} className="font-oswald font-bold text-xl tracking-widest text-neon-yellow text-glow-yellow">
            {tr.brand}
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
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => setLang(lang)}
              className="font-oswald text-xs tracking-widest uppercase border border-white/20 text-white/60 hover:border-neon-yellow/50 hover:text-neon-yellow transition-all px-3 py-1.5 rounded"
            >
              {lang === "ru" ? "KZ" : lang === "kz" ? "AZ" : "RU"}
            </button>
            <button className="btn-victory px-5 py-2 text-sm rounded" onClick={() => scrollTo("stories")}>
              {tr.shareVictory}
            </button>
          </div>
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
            <button
              onClick={() => setLang(lang)}
              className="font-oswald text-sm tracking-wider uppercase text-left text-neon-yellow"
            >
              {lang === "ru" ? "Қазақша" : lang === "kz" ? "Azərbaycan" : "Русский"}
            </button>
          </div>
        )}
      </nav>

      <div className="fixed top-16 left-0 right-0 z-40 bg-neon-yellow overflow-hidden h-8 flex items-center">
        <div className="flex animate-ticker whitespace-nowrap">
          {[...tr.ticker, ...tr.ticker].map((item, i) => (
            <span key={i} className="font-oswald font-bold text-[#0d0d0d] text-xs tracking-widest uppercase mx-8">{item}</span>
          ))}
        </div>
      </div>
    </>
  );
}