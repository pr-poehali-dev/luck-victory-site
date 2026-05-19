import Icon from "@/components/ui/icon";
import AnimatedSection from "./AnimatedSection";
import { GALLERY_IMG, LUCKY_IMG, galleryItems, tips, stats, navItems } from "./data";

interface GalleryTipsStatsFooterProps {
  scrollTo: (id: string) => void;
}

export default function GalleryTipsStatsFooter({ scrollTo }: GalleryTipsStatsFooterProps) {
  return (
    <>
      {/* GALLERY */}
      <section id="gallery" className="py-24 bg-[#0a0a0a] relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(circle at 50% 50%, #FFE500 0%, transparent 70%)" }} />

        <div className="max-w-6xl mx-auto px-4">
          <AnimatedSection className="mb-16">
            <span className="font-oswald text-xs tracking-[0.3em] uppercase text-neon-pink">Галерея</span>
            <h2 className="font-oswald font-bold text-5xl md:text-6xl text-white mt-2">
              ФОТО И ВИДЕО <span className="text-neon-pink">ПОБЕД</span>
            </h2>
            <div className="section-divider w-24 mt-4" />
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <AnimatedSection className="md:col-span-2">
              <div className="relative rounded-lg overflow-hidden aspect-video group cursor-pointer">
                <img src={GALLERY_IMG} alt="Галерея побед" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-transparent" />
                <div className="absolute bottom-4 left-4">
                  <span className="text-neon-pink font-oswald text-xs uppercase tracking-wider">Подборка недели</span>
                  <h3 className="font-oswald text-2xl text-white font-semibold mt-1">Лучшие победы мая 2026</h3>
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-16 h-16 rounded-full bg-neon-yellow/90 flex items-center justify-center">
                    <Icon name="Play" size={24} className="text-[#0d0d0d] ml-1" />
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection>
              <div className="relative rounded-lg overflow-hidden h-full group cursor-pointer" style={{ minHeight: "200px" }}>
                <img src={LUCKY_IMG} alt="Символы удачи" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-transparent" />
                <div className="absolute bottom-4 left-4">
                  <span className="text-neon-cyan font-oswald text-xs uppercase tracking-wider">Символы удачи</span>
                  <h3 className="font-oswald text-lg text-white font-semibold mt-1">Обереги победителей</h3>
                </div>
              </div>
            </AnimatedSection>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {galleryItems.map((item, i) => (
              <AnimatedSection key={i}>
                <div className="card-victory rounded-lg p-4 text-center cursor-pointer group">
                  <div className="text-4xl mb-3 group-hover:animate-float">{item.emoji}</div>
                  <div className="font-oswald text-xs text-white font-medium leading-snug mb-1">{item.title}</div>
                  <div className="text-white/30 text-xs">{item.author}</div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection className="text-center mt-10">
            <button className="btn-victory px-10 py-4 text-sm rounded">
              Добавить свою победу
            </button>
          </AnimatedSection>
        </div>
      </section>

      {/* TIPS */}
      <section id="tips" className="py-24 max-w-6xl mx-auto px-4">
        <AnimatedSection className="mb-16">
          <span className="font-oswald text-xs tracking-[0.3em] uppercase text-neon-yellow">Практические советы</span>
          <h2 className="font-oswald font-bold text-5xl md:text-6xl text-white mt-2">
            ПРИВЛЕКИ <span className="text-neon-yellow">УДАЧУ</span>
          </h2>
          <div className="section-divider w-24 mt-4" />
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tips.map((tip, i) => (
            <AnimatedSection key={i}>
              <div className="card-victory rounded-lg p-6 group">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-5" style={{ backgroundColor: tip.color + "15", border: `1px solid ${tip.color}30` }}>
                  <Icon name={tip.icon} size={22} style={{ color: tip.color } as React.CSSProperties} fallback="Star" />
                </div>
                <h3 className="font-oswald font-semibold text-lg text-white mb-3">{tip.title}</h3>
                <p className="text-white/55 text-sm leading-relaxed">{tip.text}</p>
                <div className="h-0.5 w-0 group-hover:w-full mt-4 transition-all duration-500 rounded" style={{ backgroundColor: tip.color }} />
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* STATS */}
      <section id="stats" className="py-24 bg-[#0a0a0a] relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(circle at 20% 80%, #FF2D78 0%, transparent 50%), radial-gradient(circle at 80% 20%, #00F5FF 0%, transparent 50%)" }} />

        <div className="max-w-6xl mx-auto px-4">
          <AnimatedSection className="mb-16">
            <span className="font-oswald text-xs tracking-[0.3em] uppercase text-neon-cyan">Данные и факты</span>
            <h2 className="font-oswald font-bold text-5xl md:text-6xl text-white mt-2">
              СТАТИСТИКА <span className="text-neon-cyan">ВЕЗЕНИЯ</span>
            </h2>
            <div className="section-divider w-24 mt-4" />
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stats.map((stat, i) => (
              <AnimatedSection key={i}>
                <div className="card-victory rounded-lg p-7 group">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded flex items-center justify-center flex-shrink-0 mt-1" style={{ backgroundColor: "rgba(0, 245, 255, 0.1)" }}>
                      <Icon name={stat.icon} size={18} className="text-neon-cyan" fallback="BarChart" />
                    </div>
                    <div>
                      <div className="font-oswald font-bold text-4xl text-neon-yellow text-glow-yellow leading-none mb-2">
                        {stat.value}
                      </div>
                      <p className="text-white/55 text-sm leading-relaxed">{stat.label}</p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection className="mt-16">
            <div className="relative rounded-2xl overflow-hidden p-8 md:p-12" style={{ background: "linear-gradient(135deg, rgba(255, 229, 0, 0.1) 0%, rgba(255, 107, 0, 0.1) 50%, rgba(255, 45, 120, 0.1) 100%)", border: "1px solid rgba(255, 229, 0, 0.2)" }}>
              <div className="max-w-2xl">
                <h3 className="font-oswald font-bold text-4xl md:text-5xl text-white mb-4">
                  ТВОЯ ПОБЕДА <span className="text-neon-yellow">ЖДЁТ</span>
                </h3>
                <p className="text-white/60 text-base leading-relaxed mb-8">
                  Присоединяйся к сообществу победителей. Делись своей историей, вдохновляй других и получай поддержку в пути к мечте.
                </p>
                <div className="flex gap-4 flex-wrap">
                  <button className="btn-victory px-8 py-4 text-sm rounded" onClick={() => scrollTo("stories")}>
                    Поделиться историей
                  </button>
                  <button className="border border-white/20 text-white font-oswald uppercase tracking-wider px-8 py-4 text-sm rounded hover:border-white/40 transition-all" onClick={() => scrollTo("tips")}>
                    Читать советы
                  </button>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#080808] border-t border-white/5 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <div className="font-oswald font-bold text-2xl tracking-widest text-neon-yellow text-glow-yellow mb-2">ПОБЕДЫ</div>
              <p className="text-white/30 text-sm">Платформа реальных историй успеха</p>
            </div>
            <div className="flex gap-6 flex-wrap justify-center">
              {navItems.map(item => (
                <button key={item.id} onClick={() => scrollTo(item.id)} className="font-oswald text-xs uppercase tracking-wider text-white/30 hover:text-white/70 transition-colors">
                  {item.label}
                </button>
              ))}
            </div>
          </div>
          <div className="section-divider w-full mt-8 mb-6" />
          <div className="text-center text-white/20 text-xs">
            © 2026 ПОБЕДЫ — Вдохновляем на великие дела
          </div>
        </div>
      </footer>
    </>
  );
}
