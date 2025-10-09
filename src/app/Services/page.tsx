"use client";

import React from 'react';
import { useI18n } from '@/contexts/I18nContext';
import { 
  UserCheck, 
  Globe, 
  Bot, 
  GraduationCap, 
  FileText
} from 'lucide-react';
import ServiceCard from '@/components/Cards/servicesCard';
import Image from 'next/image';

const ServicesPage: React.FC = () => {
  const { t } = useI18n();
  const services = [
    {
      icon: UserCheck,
      title: t('services.items.automationStrategyTitle'),
      description: t('services.items.automationStrategyDesc')
    },
    {
      icon: Globe,
      title: t('services.items.changeManagementTitle'),
      description: t('services.items.changeManagementDesc')
    },
    {
      icon: Bot,
      title: t('services.items.processOptimizationTitle'),
      description: t('services.items.processOptimizationDesc')
    },
    {
      icon: GraduationCap,
      title: t('services.items.trainingTitle'),
      description: t('services.items.trainingDesc')
    },
    {
      icon: FileText,
      title: t('services.items.feasibilityTitle'),
      description: t('services.items.feasibilityDesc')
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-surface/20 py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <div className="inline-block mb-4 sm:mb-6">
            <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-primary to-primary/60 rounded-full mx-auto"></div>
          </div>
          <h3 className="text-base sm:text-lg font-semibold text-primary mb-3 sm:mb-4 uppercase tracking-wider">
            {t('services.topLabel')}
          </h3>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-3 sm:mb-4">
            {t('services.title')}
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground mb-4 sm:mb-6">
            {t('services.subtitle1')}
          </p>
          <p className="text-base sm:text-lg text-muted-foreground/80 max-w-4xl mx-auto leading-relaxed px-4">
            {t('services.subtitle2')}
          </p>
        </div>

        {/* Main Content - Services + Image */}
        <div className="flex flex-col lg:flex-row gap-8 sm:gap-10 lg:gap-12 items-start">
          {/* Left Side - Services List */}
          <div className="flex-1 space-y-4 sm:space-y-6">
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                icon={service.icon}
                title={service.title}
                description={service.description}
                className="w-full"
              />
            ))}
          </div>

          {/* Right Side - Bigger Image */}
          <div className="flex-shrink-0 w-full lg:w-[500px] flex justify-center lg:justify-end">
            <div className="flex justify-center items-center">
              <Image
                src="/images/craiyon_225631_image.png"
                alt="Technology Services"
                width={0}
                height={0}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 500px"
                className="w-auto h-auto max-w-[400px] sm:max-w-[500px] lg:max-w-[600px]"
                style={{ objectFit: 'contain' }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
