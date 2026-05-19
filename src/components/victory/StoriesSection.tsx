import Icon from "@/components/ui/icon";
import AnimatedSection from "./AnimatedSection";
import { useLang } from "./LangContext";

interface Comment {
  id: number;
  author: string;
  text: string;
  time: string;
}

interface Story {
  id: number;
  name: string;
  category: string;
  title: string;
  text: string;
  emoji: string;
  color: string;
  comments: Comment[];
}

interface StoriesSectionProps {
  storyComments: Story[];
  openStory: number | null;
  setOpenStory: (id: number | null) => void;
  commentTexts: Record<number, string>;
  setCommentTexts: React.Dispatch<React.SetStateAction<Record<number, string>>>;
  addComment: (storyId: number) => void;
}

export default function StoriesSection({
  storyComments,
  openStory,
  setOpenStory,
  commentTexts,
  setCommentTexts,
  addComment,
}: StoriesSectionProps) {
  const { tr } = useLang();
  const s = tr.stories;

  return (
    <section id="stories" className="py-24 max-w-6xl mx-auto px-4">
      <AnimatedSection>
        <div className="mb-16">
          <span className="font-oswald text-xs tracking-[0.3em] uppercase text-neon-orange">{s.badge}</span>
          <h2 className="font-oswald font-bold text-5xl md:text-6xl text-white mt-2">
            {s.title1} <span className="text-neon-yellow">{s.title2}</span>
          </h2>
          <div className="section-divider w-24 mt-4" />
        </div>
      </AnimatedSection>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {storyComments.map((story) => (
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
                  <span>{s.inspire}</span>
                </button>
                <button className="flex items-center gap-1.5 text-white/40 hover:text-neon-cyan transition-colors text-xs" onClick={e => { e.stopPropagation(); setOpenStory(openStory === story.id ? null : story.id); }}>
                  <Icon name="MessageCircle" size={14} />
                  <span>{s.commentCount(story.comments.length)}</span>
                </button>
                <button className="flex items-center gap-1.5 text-white/40 hover:text-neon-orange transition-colors text-xs ml-auto" onClick={e => e.stopPropagation()}>
                  <Icon name="Share2" size={14} />
                </button>
              </div>

              {openStory === story.id && (
                <div className="mt-5 pt-5 border-t border-white/10" onClick={e => e.stopPropagation()}>
                  <h4 className="font-oswald text-sm uppercase tracking-wider text-white/50 mb-4">{s.comments}</h4>
                  <div className="space-y-3 mb-4">
                    {story.comments.length === 0 && (
                      <p className="text-white/30 text-sm">{s.noComments}</p>
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
                      placeholder={s.placeholder}
                      value={commentTexts[story.id] || ""}
                      onChange={e => setCommentTexts(prev => ({ ...prev, [story.id]: e.target.value }))}
                      onKeyDown={e => e.key === "Enter" && addComment(story.id)}
                      className="flex-1 bg-white/5 border border-white/10 rounded px-3 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:border-neon-yellow/40"
                    />
                    <button
                      onClick={() => addComment(story.id)}
                      className="btn-victory px-4 py-2 text-xs rounded"
                    >
                      {s.send}
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
          {s.loadMore}
        </button>
      </AnimatedSection>
    </section>
  );
}
