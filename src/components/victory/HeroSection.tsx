import Icon from "@/components/ui/icon";
import { HERO_IMG } from "./data";
import { useLang } from "./LangContext";

interface HeroSectionProps {
  scrollTo: (id: string) => void;
}

export default function HeroSection({ scrollTo }: HeroSectionProps) {
  const { tr } = useLang();
  const h = tr.hero;

  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-24 overflow-hidden">
      <div className="absolute inset-0">
        <img src={HERO_IMG} alt="Победа" className="w-full h-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d0d0d] via-[#0d0d0d]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-transparent to-transparent" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 py-20">
        <div className="max-w-2xl">
          <div style={{ opacity: 0, animation: "fade-up 0.6s ease-out 0.1s forwards" }}>
            <span className="inline-block font-oswald text-xs tracking-[0.3em] uppercase text-neon-orange mb-4 border border-neon-orange/30 px-3 py-1">
              {h.badge}
            </span>
          </div>
          <h1 className="font-oswald font-bold text-7xl md:text-9xl leading-none mb-6 text-white opacity-0 animate-fade-up animate-delay-300">
            {h.line1}<br />
            <span className="text-neon-yellow text-glow-yellow">{h.line2}</span>
          </h1>
          <p className="text-white/70 text-lg md:text-xl leading-relaxed mb-10 max-w-lg opacity-0 animate-fade-up animate-delay-500">
            {h.desc}
          </p>
          <div className="flex gap-4 flex-wrap opacity-0 animate-fade-up animate-delay-700">
            <button className="btn-victory px-8 py-4 text-base rounded" onClick={() => scrollTo("stories")}>
              {h.btnStories}
            </button>
            <button
              className="px-8 py-4 text-base font-oswald uppercase tracking-wider border border-white/20 text-white hover:border-neon-yellow/50 hover:text-neon-yellow transition-all rounded"
              onClick={() => scrollTo("tips")}
            >
              {h.btnTips}
            </button>
          </div>
        </div>

        <div className="absolute right-4 bottom-20 hidden lg:flex flex-col gap-6 text-right">
          {[
            { val: h.stat1val, label: h.stat1label },
            { val: h.stat2val, label: h.stat2label },
            { val: h.stat3val, label: h.stat3label },
          ].map((stat, i) => (
            <div key={i} className="opacity-0 animate-fade-up" style={{ animationDelay: `${0.8 + i * 0.15}s`, animationFillMode: "forwards" }}>
              <div className="font-oswald text-3xl font-bold text-neon-yellow">{stat.val}</div>
              <div className="text-white/50 text-xs uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
        <Icon name="ChevronDown" size={28} className="text-neon-yellow/60" />
      </div>
    </section>
  );
}