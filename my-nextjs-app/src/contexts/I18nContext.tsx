"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Language = "en" | "fr";

// Define translations directly to avoid import issues
const translations = {
  en: {
    welcome: "Welcome",
    rakhamiGroup: "Rakhami Group",
    
    // Navigation
    home: "Home",
    industry: "Industry",
    services: "Services",
    about: "About",
    robots: "Robots",
    faq: "FAQ",
    contact: "Contact",
    
    // Page content
    heroSubtitle: "This text will automatically translate when you click the language button!",
    industryTitle: "Industry",
    industrySubtitle: "Discover our industry solutions and innovations.",
    servicesTitle: "Services",
    servicesSubtitle: "Explore our comprehensive service offerings.",
    aboutTitle: "About",
    aboutSubtitle: "Learn more about our company and mission.",
    robotsTitle: "Robots",
    robotsSubtitle: "Meet our advanced robotic solutions.",
    faqTitle: "FAQ",
    faqSubtitle: "Find answers to frequently asked questions.",
    contactTitle: "Contact Us",
    contactSubtitle: "Get in touch with our team.",
    
    // Common
    languageToggle: "Toggle Language",
    themeToggle: "Toggle Theme",
  },
  fr: {
    welcome: "Bienvenue",
    rakhamiGroup: "Groupe Rakhami",
    
    // Navigation
    home: "Accueil",
    industry: "Industrie",
    services: "Services",
    about: "À propos",
    robots: "Robots",
    faq: "FAQ",
    contact: "Contact",
    
    // Page content
    heroSubtitle: "Ce texte se traduira automatiquement lorsque vous cliquerez sur le bouton de langue !",
    industryTitle: "Industrie",
    industrySubtitle: "Découvrez nos solutions et innovations industrielles.",
    servicesTitle: "Services",
    servicesSubtitle: "Explorez nos offres de services complètes.",
    aboutTitle: "À propos",
    aboutSubtitle: "En savoir plus sur notre entreprise et notre mission.",
    robotsTitle: "Robots",
    robotsSubtitle: "Découvrez nos solutions robotiques avancées.",
    faqTitle: "FAQ",
    faqSubtitle: "Trouvez des réponses aux questions fréquemment posées.",
    contactTitle: "Contactez-nous",
    contactSubtitle: "Contactez notre équipe.",
    
    // Common
    languageToggle: "Basculer la langue",
    themeToggle: "Basculer le thème",
  }
};

interface I18nContextType {
  language: Language;
  changeLanguage: (newLanguage: Language) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
  mounted: boolean;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export const useI18n = (): I18nContextType => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return context;
};

interface I18nProviderProps {
  children: ReactNode;
}

export const I18nProvider: React.FC<I18nProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>("en");
  const [mounted, setMounted] = useState(false);

  // Initialize language from localStorage or browser preference
  useEffect(() => {
    setMounted(true);
    const savedLanguage = localStorage.getItem("language") as Language | null;
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "fr")) {
      setLanguage(savedLanguage);
      document.documentElement.setAttribute("lang", savedLanguage);
    } else {
      // Detect browser language
      const browserLang = navigator.language.split("-")[0] as Language;
      const defaultLang = browserLang === "fr" ? "fr" : "en";
      setLanguage(defaultLang);
      document.documentElement.setAttribute("lang", defaultLang);
      localStorage.setItem("language", defaultLang);
    }
  }, []);

  // Change language function
  const changeLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage);
    localStorage.setItem("language", newLanguage);
    document.documentElement.setAttribute("lang", newLanguage);
  };

  // Translation function
  const t = (key: string, params?: Record<string, string | number>): string => {
    if (!mounted) return key; // Return key during SSR
    
    const keys = key.split(".");
    let value: any = translations[language];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    if (!value) {
      console.warn(`Translation key not found: ${key}`);
      return key;
    }

    // Replace parameters if provided
    if (params) {
      return Object.entries(params).reduce((str, [key, val]) => {
        return str.replace(new RegExp(`{{${key}}}`, "g"), String(val));
      }, value);
    }

    return value;
  };

  const value: I18nContextType = {
    language,
    changeLanguage,
    t,
    mounted,
  };

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};
