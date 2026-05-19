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

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("ru");
  return (
    <LangContext.Provider value={{ lang, setLang, tr: t[lang] }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
