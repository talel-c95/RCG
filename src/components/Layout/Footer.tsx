"use client";

import React from 'react';
import Image from 'next/image';
import { useI18n } from '@/contexts/I18nContext';



import { MapPin, Mail, Phone } from 'lucide-react';
import logoPng from "@/images/craiyon_162456_image.png";
import CompanyMap from './CompanyMap';

const Footer: React.FC = () => {
  const { t } = useI18n();

  // Company locations data
  const companyLocations = [
    {
      id: 'tunis',
      name: t("tunisOffice"),
      address: t("Immeuble Carthage Palace, Bloc A, 5ème Etage App. A51, Centre Urbain Nord, 1082 Tunis, Tunisie"),
      lat: 36.84433481477672,
      lng: 10.199659296352694
    }
  ];

  return (
    <footer className="bg-primary border-t border-primary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
          
          {/* Left Side - Company Information & Contact */}
          <div className="space-y-8">
            {/* Company Logo and Info */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 border-2 border-white/30 rounded-2xl flex items-center justify-center p-2 sm:p-3 bg-white/10 backdrop-blur-sm">
                    <Image
                      src={logoPng}
                      alt="RCG Logo"
                      width={100}
                      height={100}
                      className="rounded-lg"
                    />
                  </div>
                <div className="flex flex-col">
                  <span className="text-2xl sm:text-3xl font-bold text-white">{t("rcg")}</span>
                  <span className="text-sm sm:text-base font-medium text-white/80">{t("rkhamiConsultingGroup")}</span>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              <h3 className="text-lg sm:text-xl font-bold text-white border-b border-white/20 pb-2">{t("contact")}</h3>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-white/90 text-xs sm:text-sm font-medium mb-1">{t("tunisOffice")}</p>
                    <p className="text-white/70 text-xs sm:text-sm leading-relaxed">
                      {t("Immeuble Carthage Palace, Bloc A, 5ème Etage App. A51, Centre Urbain Nord, 1082 Tunis, Tunisie")}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                  </div>
                  <a href="mailto:Wissem@rkhamiconsultinggroup.com" className="text-white/80 hover:text-white transition-colors text-xs sm:text-sm break-all">
                    Wissem@rkhamiconsultinggroup.com
                  </a>
                </div>
                
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                  </div>
                  <a href="tel:+21654064053" className="text-white/80 hover:text-white transition-colors text-xs sm:text-sm">
                    +216 54064053
                  </a>
                </div>
              </div>
            </div>

            {/* Social Media & Website */}
            <div className="space-y-4">
              <div className="flex space-x-3 sm:space-x-4">
                {/* Instagram */}
                <a href="https://www.instagram.com/rkhami_consulting_group/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-xl flex items-center justify-center hover:bg-white/30 transition-all duration-300 hover:scale-105">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                
                {/* Facebook */}
                <a href="https://www.facebook.com/p/Rkhami-Consulting-Group-61579115070882/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-xl flex items-center justify-center hover:bg-white/30 transition-all duration-300 hover:scale-105">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                
                {/* LinkedIn */}
                <a href="https://tn.linkedin.com/in/rkhami-consulting-group-10ab92378" target="_blank" rel="noopener noreferrer" className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-xl flex items-center justify-center hover:bg-white/30 transition-all duration-300 hover:scale-105">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
              
              
            </div>
          </div>

          {/* Right Side - Map Only */}
          <div className="w-full h-64 sm:h-80 lg:h-full">
            <div className="w-full h-full rounded-2xl overflow-hidden shadow-2xl border border-white/20">
              <CompanyMap locations={companyLocations} />
            </div>
          </div>
        </div>

        {/* Copyright Bar */}
        <div className="border-t border-white/20 mt-8 sm:mt-12 pt-4 sm:pt-6">
          <p className="text-center text-white/80 text-xs sm:text-sm">
            {t("copyright 2025")}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
