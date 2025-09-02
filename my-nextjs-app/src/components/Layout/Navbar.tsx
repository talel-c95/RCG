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

  const navigationItems = [
    { name: t("home"), href: "#home", isHash: true },
    { name: t("industry"), href: "#Industries", isHash: true },
    { name: t("services"), href: "#Services", isHash: true },
    { name: t("about"), href: "#About", isHash: true },
    { name: t("robots"), href: "#Robots", isHash: true },
    { name: t("faq"), href: "#FQA", isHash: true },
    { name: t("contact"), href: "/Contact", isHash: false },
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

  const handleNavigation = (item: any) => {
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
    <nav className={`fixed top-0 left-0 right-0 z-50 bg-transparent transition-opacity duration-700 ease-in-out`}>
      <div className={`transition-all duration-700 ease-in-out ${isScrolled ? 'max-w-7xl mx-auto px-6' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'}`}>
        <div className={`relative flex justify-center items-center transition-all duration-700 ease-in-out
                        ${isScrolled ? 'h-16' : 'h-16'}`}>
                     {/* Logo */}
           <div className={`absolute left-6 top-1/2 -translate-y-1/2 flex items-center space-x-3 transition-opacity duration-700 ease-in-out ${isScrolled ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
             <Link href="/" className="flex items-center space-x-3">
               <div className={`relative transition-all duration-500
                              ${isScrolled ? 'w-20 h-20' : 'w-22 h-22'}`}>
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
          <div className={`hidden md:flex items-center space-x-8 transition-all ${isScrolled ? 'duration-700 ease-in-out' : 'duration-0'}
                          ${isScrolled ? 'bg-black/55 dark:bg-gray-900/80 backdrop-blur-sm border border-white/10 rounded-full px-6 py-2 shadow-md' : ''}`}>
            {navigationItems.map((item) => (
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
            ))}
          </div>

          {/* Right side buttons */}
          <div className={`absolute right-6 top-1/2 -translate-y-1/2 flex items-center space-x-3 transition-opacity duration-700 ease-in-out ${isScrolled ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
            <LanguageButton />
            <ThemeToggleButton />
            
            {/* Mobile menu button */}
            <button
              onClick={toggleMenu}
              className={`md:hidden rounded-lg border text-foreground transition-all duration-500 ease-in-out
                       ${isScrolled 
                         ? 'p-1.5 bg-surface/60 border-border/40 hover:bg-surface/80 hover:border-highlight/40' 
                         : 'p-2 bg-surface/50 border-border/50 hover:bg-surface hover:border-highlight/30'
                       }`}
              aria-label="Toggle menu"
            >
              <svg
                className={`transition-all duration-500 ease-in-out ${isScrolled ? 'w-4 h-4' : 'w-5 h-5'}`}
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
                <button
                  key={item.name}
                  onClick={() => {
                    handleNavigation(item);
                    setIsMenuOpen(false);
                  }}
                  className="block px-3 py-3 rounded-lg text-foreground/80 hover:text-foreground hover:bg-surface/50
                           font-medium transition-all duration-300 w-full text-left"
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
