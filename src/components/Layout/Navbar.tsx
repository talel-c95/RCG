"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import logoPng from "@/images/craiyon_162456_image.png";
import { useI18n } from "@/contexts/I18nContext";
import ThemeToggleButton from "@/components/Buttons/ThemeButton";
import LanguageButton from "@/components/Buttons/LanguageButton";

interface NavbarProps {
  onNavigate?: (href: string) => void;
}

const Navbar = ({ onNavigate }: NavbarProps) => {
  const { t } = useI18n();
  const router = useRouter();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  // Ensure hydration is complete
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const navigationItems = [
    { name: t("nav.home"), href: "#home", isHash: true },
    { name: t("nav.industry"), href: "#Industries", isHash: true },
    { name: t("nav.services"), href: "#Services", isHash: true },
    { name: t("nav.robots"), href: "#Robots", isHash: true },
    { name: t("nav.about"), href: "#About", isHash: true },
    { name: t("nav.faq"), href: "#FQA", isHash: true },
    { name: t("nav.contact"), href: "/Contact", isHash: false },
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

  // Handle click outside to close mobile menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMenuOpen) {
        const target = event.target as Element;
        if (!target.closest('nav')) {
          setIsMenuOpen(false);
        }
      }
    };

    if (isMenuOpen) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Optimized navigation handler
  const handleNavigation = (item: { name: string; href: string; isHash: boolean }) => {
    // If onNavigate prop is provided, use it (for robot/contact pages)
    if (onNavigate) {
      onNavigate(item.href);
      return;
    }

    // For hash links, navigate to main page first if not already there
    if (item.isHash && pathname !== '/') {
      router.push('/');
      setTimeout(() => scrollToSection(item.href), 300);
    } else if (item.isHash) {
      // Already on main page, just scroll
      scrollToSection(item.href);
    } else {
      // Direct page navigation
      router.push(item.href);
    }
  };

  // Helper function to scroll to section with retry logic
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Retry after a short delay if element not found
      setTimeout(() => {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 200);
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-transparent' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`relative flex items-center h-16 transition-all duration-300 ${
          isScrolled ? 'md:justify-center' : 'justify-between'
        }`}>
          {/* Logo - Hidden when scrolled on desktop, always visible on mobile */}
          <div className={`flex items-center space-x-2 sm:space-x-3 transition-all duration-300 ${
            isScrolled ? 'md:opacity-0 md:pointer-events-none md:w-0 md:overflow-hidden' : 'opacity-100'
          }`}>
            <Link href="/" className="flex items-center space-x-2 sm:space-x-3">
              <div className="relative w-12 h-12 sm:w-16 sm:h-16">
                <Image
                  src={logoPng}
                  alt="Rkhami Group Logo"
                  fill
                  priority
                  className="object-contain"
                />
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className={`hidden md:flex items-center space-x-8 transition-all duration-300
                          ${isScrolled ? 'bg-black/70 dark:bg-gray-900/90 backdrop-blur-md border border-white/20 rounded-full px-8 py-3 shadow-lg' : ''}`}>
            {isHydrated && navigationItems.map((item) => (
              item.href === "#Robots" ? (
                <div key={item.name} className="relative group">
                  <button
                    onClick={() => handleNavigation(item)}
                    className={`group inline-flex items-center gap-1.5 relative font-medium transition-all duration-500 ease-in-out cursor-pointer
                             ${isScrolled 
                               ? 'text-white/90 hover:text-white text-base' 
                               : 'text-white/90 hover:text-white text-base'
                             }
                             after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 
                             after:bg-gradient-to-r after:from-primary after:to-highlight
                             after:transition-all after:duration-500 group-hover:after:w-full`}
                  >
                    {item.name}
                    <svg className="w-3.5 h-3.5 opacity-80 group-hover:opacity-100 transition" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 011.08 1.04l-4.25 4.25a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                    </svg>
                  </button>
                  {/* Invisible bridge to prevent dropdown from disappearing */}
                  <div className="absolute left-0 right-0 h-3 bg-transparent"></div>
                  <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 hidden group-hover:block">
                    <div className={`w-56 rounded-xl text-white shadow-2xl backdrop-blur-md border border-white/20 p-2
                                    ${isScrolled ? 'bg-black/80 dark:bg-gray-900/95' : 'bg-black/55 dark:bg-gray-900/80'}`}>
                      <Link
                        href="/robots/xbot"
                        className="block w-full text-left px-4 py-3 rounded-lg hover:bg-white/10 transition"
                      >
                        {t("nav.robotXbot")}
                      </Link>
                      <Link
                        href="/robots/amy"
                        className="block w-full text-left px-4 py-3 rounded-lg hover:bg-white/10 transition"
                      >
                        {t("nav.robotAmy")}
                      </Link>
                      <Link
                        href="/robots/panda"
                        className="block w-full text-left px-4 py-3 rounded-lg hover:bg-white/10 transition"
                      >
                        {t("nav.robotPanda")}
                      </Link>
                    </div>
                  </div>
                </div>
              ) : item.href === "#Services" ? (
                <div key={item.name} className="relative group">
                  <button
                    onClick={() => handleNavigation(item)}
                    className={`group inline-flex items-center gap-1.5 relative font-medium transition-all duration-500 ease-in-out cursor-pointer
                             ${isScrolled 
                               ? 'text-white/90 hover:text-white text-base' 
                               : 'text-white/90 hover:text-white text-base'
                             }
                             after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 
                             after:bg-gradient-to-r after:from-primary after:to-highlight
                             after:transition-all after:duration-500 group-hover:after:w-full`}
                  >
                    {item.name}
                    <svg className="w-3.5 h-3.5 opacity-80 group-hover:opacity-100 transition" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 011.08 1.04l-4.25 4.25a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                    </svg>
                  </button>
                  {/* Invisible bridge to prevent dropdown from disappearing */}
                  <div className="absolute left-0 right-0 h-3 bg-transparent"></div>
                  <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 hidden group-hover:block">
                    <div className={`w-56 rounded-xl text-white shadow-2xl backdrop-blur-md border border-white/20 p-2
                                    ${isScrolled ? 'bg-black/80 dark:bg-gray-900/95' : 'bg-black/55 dark:bg-gray-900/80'}`}>
                      <Link
                        href="/creation-web"
                        className="block w-full text-left px-4 py-3 rounded-lg hover:bg-white/10 transition"
                      >
                        {t("nav.creationWeb")}
                      </Link>
                      <Link
                        href="/qr-menu/emenu"
                        className="block w-full text-left px-4 py-3 rounded-lg hover:bg-white/10 transition"
                      >
                        {t("nav.emenu")}
                      </Link>
                    </div>
                  </div>
                </div>
              ) : (
                <button
                  key={item.name}
                  onClick={() => handleNavigation(item)}
                  className={`group relative font-medium transition-all duration-500 ease-in-out cursor-pointer
                           ${isScrolled 
                             ? 'text-white/90 hover:text-white text-base' 
                             : 'text-white/90 hover:text-white text-base'
                           }
                           after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 
                           after:bg-gradient-to-r after:from-primary after:to-highlight
                           after:transition-all after:duration-500 hover:after:w-full`}
                >
                  {item.name}
                </button>
              )
            ))}
          </div>

          {/* Right side buttons - Hidden when scrolled on desktop, always visible on mobile */}
          <div className={`flex items-center space-x-2 sm:space-x-3 transition-all duration-300 ${
            isScrolled ? 'md:opacity-0 md:pointer-events-none md:w-0 md:overflow-hidden' : 'opacity-100'
          }`}>
            {/* Desktop theme and language buttons */}
            <div className="hidden sm:flex items-center space-x-2 sm:space-x-3">
              <LanguageButton />
              <ThemeToggleButton />
            </div>
            
            {/* Mobile menu button - Always visible on mobile */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 rounded-lg border border-border/50 bg-surface/50 hover:bg-surface hover:border-highlight/30 text-foreground transition-all duration-300"
              aria-label="Toggle menu"
            >
              <svg
                className="w-5 h-5 transition-all duration-300"
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
        {isMenuOpen && isHydrated && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-xl border-t border-border/20 shadow-lg">
            <div className="px-4 py-4 space-y-2">
              {/* Mobile theme and language buttons */}
              <div className="flex items-center justify-center space-x-4 px-3 py-3 border-b border-border/20 mb-3">
                <LanguageButton />
                <ThemeToggleButton />
              </div>
              
              {navigationItems.map((item) => (
                <div key={item.name}>
                  {item.href === "#Robots" ? (
                    <div className="space-y-1">
                      <button
                        onClick={() => {
                          handleNavigation(item);
                          setIsMenuOpen(false);
                        }}
                        className="block w-full px-3 py-3 rounded-lg text-foreground/80 hover:text-foreground hover:bg-surface/50 font-medium transition-all duration-300 text-left"
                      >
                        {item.name}
                      </button>
                      {/* Mobile robot submenu */}
                      <div className="ml-4 space-y-1">
                        <Link
                          href="/robots/xbot"
                          onClick={() => setIsMenuOpen(false)}
                          className="block px-3 py-2 rounded-lg text-foreground/70 hover:text-foreground hover:bg-surface/30 text-sm transition-all duration-300"
                        >
                          {t("nav.robotXbot")}
                        </Link>
                        <Link
                          href="/robots/amy"
                          onClick={() => setIsMenuOpen(false)}
                          className="block px-3 py-2 rounded-lg text-foreground/70 hover:text-foreground hover:bg-surface/30 text-sm transition-all duration-300"
                        >
                          {t("nav.robotAmy")}
                        </Link>
                        <Link
                          href="/robots/panda"
                          onClick={() => setIsMenuOpen(false)}
                          className="block px-3 py-2 rounded-lg text-foreground/70 hover:text-foreground hover:bg-surface/30 text-sm transition-all duration-300"
                        >
                          {t("nav.robotPanda")}
                        </Link>
                      </div>
                    </div>
                  ) : item.href === "#Services" ? (
                    <div className="space-y-1">
                      <button
                        onClick={() => {
                          handleNavigation(item);
                          setIsMenuOpen(false);
                        }}
                        className="block w-full px-3 py-3 rounded-lg text-foreground/80 hover:text-foreground hover:bg-surface/50 font-medium transition-all duration-300 text-left"
                      >
                        {item.name}
                      </button>
                      {/* Mobile services submenu */}
                      <div className="ml-4 space-y-1">
                        <Link
                          href="/creation-web"
                          onClick={() => setIsMenuOpen(false)}
                          className="block px-3 py-2 rounded-lg text-foreground/70 hover:text-foreground hover:bg-surface/30 text-sm transition-all duration-300"
                        >
                          {t("nav.creationWeb")}
                        </Link>
                        <Link
                          href="/qr-menu/emenu"
                          onClick={() => setIsMenuOpen(false)}
                          className="block px-3 py-2 rounded-lg text-foreground/70 hover:text-foreground hover:bg-surface/30 text-sm transition-all duration-300"
                        >
                          {t("nav.emenu")}
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        handleNavigation(item);
                        setIsMenuOpen(false);
                      }}
                      className="block w-full px-3 py-3 rounded-lg text-foreground/80 hover:text-foreground hover:bg-surface/50 font-medium transition-all duration-300 text-left"
                    >
                      {item.name}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
