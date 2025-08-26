"use client";

import { useState, useEffect } from "react";
import { useI18n } from "@/contexts/I18nContext";
import ThemeToggleButton from "@/components/Buttons/ThemeButton";
import LanguageButton from "@/components/Buttons/LanguageButton";

const Navbar = () => {
  const { t } = useI18n();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navigationItems = [
    { name: t("home"), href: "#home" },
    { name: t("industry"), href: "#industry" },
    { name: t("services"), href: "#services" },
    { name: t("about"), href: "#about" },
    { name: t("robots"), href: "#robots" },
    { name: t("faq"), href: "#faq" },
    { name: t("contact"), href: "#contact" },
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out
                    ${isScrolled 
                      ? 'mx-8 mt-4 bg-background/90 backdrop-blur-xl shadow-lg shadow-black/10 border border-border/30 rounded-2xl' 
                      : 'bg-background/60 backdrop-blur-md border-b border-border/10'
                    }`}>
      <div className={`transition-all duration-500 ${isScrolled ? 'max-w-7xl mx-auto px-6' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'}`}>
        <div className={`flex justify-between items-center transition-all duration-500
                        ${isScrolled ? 'h-14' : 'h-16'}`}>
                     {/* Logo */}
           <div className="flex items-center space-x-3">
             <div className={`relative transition-all duration-500
                            ${isScrolled ? 'w-7 h-7' : 'w-8 h-8'}`}>
               <img
                 src="/logo.png"
                 alt="Rakhami Group Logo"
                 className="w-full h-full object-contain"
               />
             </div>
             <span className={`font-bold bg-gradient-to-r from-primary to-highlight bg-clip-text text-transparent transition-all duration-500
                             ${isScrolled ? 'text-lg' : 'text-xl'}`}>
               {t("rakhamiGroup")}
             </span>
           </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`group relative font-medium transition-all duration-300
                         ${isScrolled 
                           ? 'text-foreground/90 hover:text-foreground text-sm' 
                           : 'text-foreground/80 hover:text-foreground text-base'
                         }
                         after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 
                         after:bg-gradient-to-r after:from-primary after:to-highlight
                         after:transition-all after:duration-300 hover:after:w-full`}
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Right side buttons */}
          <div className="flex items-center space-x-3">
            <LanguageButton />
            <ThemeToggleButton />
            
            {/* Mobile menu button */}
            <button
              onClick={toggleMenu}
              className={`md:hidden rounded-lg border text-foreground transition-all duration-300
                       ${isScrolled 
                         ? 'p-1.5 bg-surface/60 border-border/40 hover:bg-surface/80 hover:border-highlight/40' 
                         : 'p-2 bg-surface/50 border-border/50 hover:bg-surface hover:border-highlight/30'
                       }`}
              aria-label="Toggle menu"
            >
              <svg
                className={`transition-all duration-300 ${isScrolled ? 'w-4 h-4' : 'w-5 h-5'}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className={`md:hidden border-t bg-background/95 backdrop-blur-xl transition-all duration-300
                          ${isScrolled ? 'border-border/30' : 'border-border/20'}`}>
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigationItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 rounded-lg text-foreground/80 hover:text-foreground hover:bg-surface/50
                           font-medium transition-all duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
