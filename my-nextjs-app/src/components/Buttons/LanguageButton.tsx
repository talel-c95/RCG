"use client";

import { useI18n } from "@/contexts/I18nContext";

const LanguageButton = () => {
  const { language, changeLanguage, t } = useI18n();

  const toggleLanguage = () => {
    changeLanguage(language === "fr" ? "en" : "fr");
  };

  const getLanguageFlag = () => (language === "fr" ? "🇺🇸" : "🇫🇷");
  const getLanguageText = () => (language === "fr" ? "EN" : "FR");

  return (
    <button
      onClick={toggleLanguage}
      className="group relative flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium
                 bg-surface text-foreground border border-border/50
                 hover:bg-surface/80 hover:border-highlight/30
                 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-highlight/50
                 shadow-sm hover:shadow-md backdrop-blur-sm"
      aria-label={t("languageToggle")}
    >
      <span className="text-lg transition-transform duration-300 group-hover:scale-110">
        {getLanguageFlag()}
      </span>
      <span className="text-sm font-semibold text-foreground/90">{getLanguageText()}</span>
      
      {/* Subtle hover effect */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-highlight/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </button>
  );
};

export default LanguageButton;
