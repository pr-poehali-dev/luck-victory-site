import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/c9c970ac-5552-4558-b320-1ae4ff69233f/files/220d91e2-7307-4743-8508-6c6cd3b844cf.jpg";
const GALLERY_IMG = "https://cdn.poehali.dev/projects/c9c970ac-5552-4558-b320-1ae4ff69233f/files/6401f289-fb99-47ad-a16a-2f311006eabd.jpg";
const LUCKY_IMG = "https://cdn.poehali.dev/projects/c9c970ac-5552-4558-b320-1ae4ff69233f/files/d2671be8-c838-459c-9cb1-0ca07f8ab39d.jpg";

const stories = [
  {
    id: 1,
    name: "Алексей М.",
    category: "Бизнес",
    title: "Запустил стартап с нуля за 6 месяцев",
    text: "Я уволился с работы без накоплений и идеи. Через полгода мой сервис обслуживает 3000 клиентов. Главное — не ждать идеального момента.",
    emoji: "🚀",
    color: "#FFE500",
    comments: [
      { id: 1, author: "Мария К.", text: "Невероятно вдохновляет! Какую нишу выбрали?", time: "2 часа назад" },
      { id: 2, author: "Дмитрий", text: "Ты доказал что всё возможно 🔥", time: "1 час назад" },
    ]
  },
  {
    id: 2,
    name: "Светлана Т.",
    category: "Спорт",
    title: "Пробежала марафон в 47 лет",
    text: "Три года назад врачи сказали, что у меня больные колени. Я не сдалась — и финишировала с личным рекордом.",
    emoji: "🏆",
    color: "#FF6B00",
    comments: [
      { id: 1, author: "Олег", text: "Это настоящая победа над собой!", time: "5 часов назад" },
    ]
  },
  {
    id: 3,
    name: "Иван Р.",
    category: "Карьера",
    title: "Вырос от стажёра до директора за 4 года",
    text: "Пришёл без опыта в небольшую компанию. Брался за любые задачи, учился каждый день. Сегодня управляю командой из 40 человек.",
    emoji: "⚡",
    color: "#FF2D78",
    comments: []
  },
  {
    id: 4,
    name: "Анна В.",
    category: "Творчество",
    title: "Издала первую книгу в 52 года",
    text: "Писала в стол 20 лет. Дочь уговорила опубликовать. Сейчас книга в топ-10 bestsellers на Ozon.",
    emoji: "✨",
    color: "#00F5FF",
    comments: [
      { id: 1, author: "Татьяна", text: "Мечта сбылась! Как называется книга?", time: "1 день назад" },
      { id: 2, author: "Роман", text: "Никогда не поздно начать 🌟", time: "20 часов назад" },
    ]
  },
];

const tips = [
  { icon: "Sun", title: "Утренний ритуал", text: "Начинайте день с 3 вещей, за которые благодарны. Это перестраивает мозг на позитивный лад и притягивает удачу.", color: "#FFE500" },
  { icon: "Target", title: "Конкретные цели", text: "Записывайте цели от руки. Исследования показывают: письменные цели в 42% чаще становятся реальностью.", color: "#FF6B00" },
  { icon: "Zap", title: "Действуй первым", text: "Удача любит смелых. Первый шаг открывает цепочку событий, которую нельзя увидеть заранее.", color: "#FF2D78" },
  { icon: "Users", title: "Окружение решает", text: "Вы — среднее пяти людей рядом. Окружите себя победителями и сами станете победителем.", color: "#00F5FF" },
  { icon: "TrendingUp", title: "Системность", text: "Маленькое действие каждый день мощнее одного грандиозного рывка. 1% роста в день = 37× за год.", color: "#FFE500" },
  { icon: "Heart", title: "Любите процесс", text: "Самые везучие люди делают то, что любят. Страсть к делу создаёт энергию, которую замечают другие.", color: "#FF6B00" },
];

const stats = [
  { value: "73%", label: "людей верят, что позитивный настрой влияет на удачу", icon: "TrendingUp" },
  { value: "8 из 10", label: "успешных людей ведут дневник целей", icon: "BookOpen" },
  { value: "92%", label: "везунчиков регулярно выходят из зоны комфорта", icon: "Zap" },
  { value: "3×", label: "чаще добиваются целей те, кто делится планами с другими", icon: "Users" },
  { value: "67%", label: "победителей пережили серьёзную неудачу до главного успеха", icon: "Award" },
  { value: "10 000", label: "часов практики — путь к мастерству в любом деле", icon: "Clock" },
];

const galleryItems = [
  { emoji: "🏅", title: "Чемпион региона по боксу", author: "Максим, 24 года" },
  { emoji: "🎓", title: "Красный диплом МГУ", author: "Екатерина, 22 года" },
  { emoji: "💼", title: "Первый миллион оборота", author: "ИП Сергей" },
  { emoji: "🌍", title: "Посетил 30 стран", author: "Виктория, путешественник" },
  { emoji: "🏠", title: "Собственная квартира в 28 лет", author: "Павел" },
  { emoji: "🎸", title: "Концерт в Москве", author: "Группа «Порыв»" },
];

const navItems = [
  { id: "hero", label: "Главная" },
  { id: "stories", label: "Истории" },
  { id: "gallery", label: "Галерея" },
  { id: "tips", label: "Советы" },
  { id: "stats", label: "Статистика" },
];

const tickerItems = ["🏆 ПОБЕДА", "⚡ УСПЕХ", "🚀 ПРОРЫВ", "✨ УДАЧА", "🔥 ТРИУМФ", "💎 РЕЗУЛЬТАТ", "🎯 ЦЕЛЬ ДОСТИГНУТА"];

function useInView(ref: React.RefObject<Element>) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setInView(true);
    }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return inView;
}

function AnimatedSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref as React.RefObject<Element>);
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}
    >
      {children}
    </div>
  );
}

export default function Index() {
  const [activeSection, setActiveSection] = useState("hero");
  const [openStory, setOpenStory] = useState<number | null>(null);
  const [commentTexts, setCommentTexts] = useState<Record<number, string>>({});
  const [storyComments, setStoryComments] = useState(stories);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(n => ({ id: n.id, el: document.getElementById(n.id) }));
      for (const s of [...sections].reverse()) {
        if (s.el && window.scrollY >= s.el.offsetTop - 120) {
          setActiveSection(s.id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  const addComment = (storyId: number) => {
    const text = commentTexts[storyId]?.trim();
    if (!text) return;
    setStoryComments(prev =>
      prev.map(s => s.id === storyId ? {
        ...s,
        comments: [...s.comments, { id: Date.now(), author: "Вы", text, time: "только что" }]
      } : s)
    );
    setCommentTexts(prev => ({ ...prev, [storyId]: "" }));
  };

  return (
    <div className="min-h-screen bg-[#0d0d0d] font-rubik overflow-x-hidden">

      {/* NAV */}
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

      {/* TICKER */}
      <div className="fixed top-16 left-0 right-0 z-40 bg-neon-yellow overflow-hidden h-8 flex items-center">
        <div className="flex animate-ticker whitespace-nowrap">
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <span key={i} className="font-oswald font-bold text-[#0d0d0d] text-xs tracking-widest uppercase mx-8">{item}</span>
          ))}
        </div>
      </div>

      {/* HERO */}
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
                Платформа победителей
              </span>
            </div>
            <h1 className="font-oswald font-bold text-7xl md:text-9xl leading-none mb-6 text-white opacity-0 animate-fade-up animate-delay-300">
              КАЖДЫЙ<br />
              <span className="text-neon-yellow text-glow-yellow">ПОБЕДИТ</span>
            </h1>
            <p className="text-white/70 text-lg md:text-xl leading-relaxed mb-10 max-w-lg opacity-0 animate-fade-up animate-delay-500">
              Реальные истории людей, которые добились своего. Советы, которые работают. Цифры, которые вдохновляют.
            </p>
            <div className="flex gap-4 flex-wrap opacity-0 animate-fade-up animate-delay-700">
              <button className="btn-victory px-8 py-4 text-base rounded" onClick={() => scrollTo("stories")}>
                Читать истории
              </button>
              <button
                className="px-8 py-4 text-base font-oswald uppercase tracking-wider border border-white/20 text-white hover:border-neon-yellow/50 hover:text-neon-yellow transition-all rounded"
                onClick={() => scrollTo("tips")}
              >
                Советы по удаче
              </button>
            </div>
          </div>

          <div className="absolute right-4 bottom-20 hidden lg:flex flex-col gap-6 text-right">
            {[
              { val: "1200+", label: "историй" },
              { val: "94%", label: "достигли цели" },
              { val: "50K+", label: "победителей" },
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

      {/* STORIES */}
      <section id="stories" className="py-24 max-w-6xl mx-auto px-4">
        <AnimatedSection>
          <div className="mb-16">
            <span className="font-oswald text-xs tracking-[0.3em] uppercase text-neon-orange">Реальные люди</span>
            <h2 className="font-oswald font-bold text-5xl md:text-6xl text-white mt-2">
              ИСТОРИИ <span className="text-neon-yellow">УСПЕХА</span>
            </h2>
            <div className="section-divider w-24 mt-4" />
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {storyComments.map((story, idx) => (
            <AnimatedSection key={story.id}>
              <div className="card-victory rounded-lg p-6 cursor-pointer" onClick={() => setOpenStory(openStory === story.id ? null : story.id)}>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center text-2xl" style={{ backgroundColor: story.color + "20", border: `1px solid ${story.color}40` }}>
                      {story.emoji}
                    </div>
                    <div>
                      <div className="font-oswald font-medium text-white text-sm">{story.name}</div>
                      <div className="text-xs uppercase tracking-wider mt-0.5" style={{ color: story.color }}>{story.category}</div>
                    </div>
                  </div>
                  <Icon name={openStory === story.id ? "ChevronUp" : "ChevronDown"} size={18} className="text-white/40 mt-1" />
                </div>

                <h3 className="font-oswald font-semibold text-xl text-white mb-3 leading-snug">{story.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{story.text}</p>

                <div className="flex items-center gap-4 mt-4 pt-4 border-t border-white/5">
                  <button className="flex items-center gap-1.5 text-white/40 hover:text-neon-yellow transition-colors text-xs" onClick={e => e.stopPropagation()}>
                    <Icon name="Heart" size={14} />
                    <span>Вдохновляет</span>
                  </button>
                  <button className="flex items-center gap-1.5 text-white/40 hover:text-neon-cyan transition-colors text-xs" onClick={e => { e.stopPropagation(); setOpenStory(openStory === story.id ? null : story.id); }}>
                    <Icon name="MessageCircle" size={14} />
                    <span>{story.comments.length} комментариев</span>
                  </button>
                  <button className="flex items-center gap-1.5 text-white/40 hover:text-neon-orange transition-colors text-xs ml-auto" onClick={e => e.stopPropagation()}>
                    <Icon name="Share2" size={14} />
                  </button>
                </div>

                {openStory === story.id && (
                  <div className="mt-5 pt-5 border-t border-white/10" onClick={e => e.stopPropagation()}>
                    <h4 className="font-oswald text-sm uppercase tracking-wider text-white/50 mb-4">Комментарии</h4>
                    <div className="space-y-3 mb-4">
                      {story.comments.length === 0 && (
                        <p className="text-white/30 text-sm">Будьте первым, кто поддержит эту историю!</p>
                      )}
                      {story.comments.map(c => (
                        <div key={c.id} className="bg-white/5 rounded p-3">
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="font-oswald text-sm font-medium" style={{ color: story.color }}>{c.author}</span>
                            <span className="text-white/30 text-xs">{c.time}</span>
                          </div>
                          <p className="text-white/70 text-sm">{c.text}</p>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Напишите слова поддержки..."
                        value={commentTexts[story.id] || ""}
                        onChange={e => setCommentTexts(prev => ({ ...prev, [story.id]: e.target.value }))}
                        onKeyDown={e => e.key === "Enter" && addComment(story.id)}
                        className="flex-1 bg-white/5 border border-white/10 rounded px-3 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:border-neon-yellow/40"
                      />
                      <button
                        onClick={() => addComment(story.id)}
                        className="btn-victory px-4 py-2 text-xs rounded"
                      >
                        Отправить
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection className="text-center mt-12">
          <button className="border border-neon-yellow/30 text-neon-yellow font-oswald uppercase tracking-wider px-10 py-4 rounded hover:bg-neon-yellow/10 transition-all">
            Загрузить ещё истории
          </button>
        </AnimatedSection>
      </section>

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
    </div>
  );
}
