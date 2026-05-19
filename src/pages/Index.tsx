import { useState, useEffect } from "react";
import { navItems, stories } from "@/components/victory/data";
import NavBar from "@/components/victory/NavBar";
import HeroSection from "@/components/victory/HeroSection";
import StoriesSection from "@/components/victory/StoriesSection";
import GalleryTipsStatsFooter from "@/components/victory/GalleryTipsStatsFooter";

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
      <NavBar
        activeSection={activeSection}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        scrollTo={scrollTo}
      />
      <HeroSection scrollTo={scrollTo} />
      <StoriesSection
        storyComments={storyComments}
        openStory={openStory}
        setOpenStory={setOpenStory}
        commentTexts={commentTexts}
        setCommentTexts={setCommentTexts}
        addComment={addComment}
      />
      <GalleryTipsStatsFooter scrollTo={scrollTo} />
    </div>
  );
}
