"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import logoPng from "@/images/craiyon_162456_image.png";
import { useI18n } from "@/contexts/I18nContext";
import ThemeToggleButton from "@/components/Buttons/ThemeButton";
import LanguageButton from "@/components/Buttons/LanguageButton";

const Navbar = () => {
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
    { name: t("home") || "Home", href: "#home", isHash: true },
    { name: t("industry") || "Industry", href: "#Industries", isHash: true },
    { name: t("services") || "Services", href: "#Services", isHash: true },
    { name: t("about") || "About", href: "#About", isHash: true },
    { name: t("robots") || "Robots", href: "#Robots", isHash: true },
    { name: t("faq") || "FAQ", href: "#FQA", isHash: true },
    { name: t("contact") || "Contact", href: "/Contact", isHash: false },
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

  const handleNavigation = (item: { name: string; href: string; isHash: boolean }) => {
    if (item.isHash) {
      // If we're on Contact page, go to main page first
      if (pathname === '/Contact') {
        router.push('/');
        // Wait longer for page to load then scroll to section
        setTimeout(() => {
          const element = document.querySelector(item.href);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          } else {
            // If element not found, try again after a bit more time
            setTimeout(() => {
              const element = document.querySelector(item.href);
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }, 200);
          }
        }, 300);
      } else {
        // We're on main page, just scroll to section
        const element = document.querySelector(item.href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    } else {
      // Regular page navigation
      router.push(item.href);
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-background/95 backdrop-blur-md border-b border-border/20' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex justify-between items-center h-16">
          {/* Logo - Always visible on mobile */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <Link href="/" className="flex items-center space-x-2 sm:space-x-3">
              <div className="relative w-12 h-12 sm:w-16 sm:h-16">
                <Image
                  src={logoPng}
                  alt="Rakhami Group Logo"
                  fill
                  priority
                  className="object-contain"
                />
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className={`hidden md:flex items-center space-x-8 transition-all duration-300
                          ${isScrolled ? 'bg-black/55 dark:bg-gray-900/80 backdrop-blur-sm border border-white/10 rounded-full px-6 py-2 shadow-md' : ''}`}>
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
                    <div className={`w-56 rounded-xl text-white shadow-2xl backdrop-blur-sm border border-white/10 p-2
                                    ${isScrolled ? 'bg-black/70 dark:bg-gray-900/90' : 'bg-black/55 dark:bg-gray-900/80'}`}>
                      <Link
                        href="/robots/xbot"
                        className="block w-full text-left px-4 py-3 rounded-lg hover:bg-white/10 transition"
                      >
                        Robot Xbot
                      </Link>
                      <Link
                        href="/robots/amy"
                        className="block w-full text-left px-4 py-3 rounded-lg hover:bg-white/10 transition"
                      >
                        Robot Amy
                      </Link>
                      <Link
                        href="/robots/panda"
                        className="block w-full text-left px-4 py-3 rounded-lg hover:bg-white/10 transition"
                      >
                        Robot Panda
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

          {/* Right side buttons */}
          <div className="flex items-center space-x-2 sm:space-x-3">
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
                          Robot Xbot
                        </Link>
                        <Link
                          href="/robots/amy"
                          onClick={() => setIsMenuOpen(false)}
                          className="block px-3 py-2 rounded-lg text-foreground/70 hover:text-foreground hover:bg-surface/30 text-sm transition-all duration-300"
                        >
                          Robot Amy
                        </Link>
                        <Link
                          href="/robots/panda"
                          onClick={() => setIsMenuOpen(false)}
                          className="block px-3 py-2 rounded-lg text-foreground/70 hover:text-foreground hover:bg-surface/30 text-sm transition-all duration-300"
                        >
                          Robot Panda
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
