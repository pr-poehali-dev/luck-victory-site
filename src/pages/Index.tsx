import { useState, useEffect } from "react";
import { LangProvider, useLang } from "@/components/victory/LangContext";
import NavBar from "@/components/victory/NavBar";
import HeroSection from "@/components/victory/HeroSection";
import StoriesSection from "@/components/victory/StoriesSection";
import GalleryTipsStatsFooter from "@/components/victory/GalleryTipsStatsFooter";

const navSectionIds = ["hero", "stories", "gallery", "tips", "stats"];

function IndexContent() {
  const { tr } = useLang();

  const [activeSection, setActiveSection] = useState("hero");
  const [openStory, setOpenStory] = useState<number | null>(null);
  const [commentTexts, setCommentTexts] = useState<Record<number, string>>({});
  const [storyComments, setStoryComments] = useState(tr.storiesData);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setStoryComments(tr.storiesData);
    setOpenStory(null);
    setCommentTexts({});
  }, [tr]);

  useEffect(() => {
    const handleScroll = () => {
      for (const id of [...navSectionIds].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(id);
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
        comments: [...s.comments, { id: Date.now(), author: tr.stories.you, text, time: tr.stories.justNow }]
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

export default function Index() {
  return (
    <LangProvider>
      <IndexContent />
    </LangProvider>
  );
}
