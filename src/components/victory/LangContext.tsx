import { createContext, useContext, useState } from "react";
import { t, Lang, Translations } from "./i18n";

interface LangContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  tr: Translations;
}

const LangContext = createContext<LangContextType>({
  lang: "ru",
  setLang: () => {},
  tr: t.ru,
});

const LANGS: Lang[] = ["ru", "kz", "az"];

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("ru");
  const cycleLang = (current: Lang) => {
    const idx = LANGS.indexOf(current);
    return LANGS[(idx + 1) % LANGS.length];
  };
  return (
    <LangContext.Provider value={{ lang, setLang: (l) => setLang(cycleLang(l)), tr: t[lang] }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}