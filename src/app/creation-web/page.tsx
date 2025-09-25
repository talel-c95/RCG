"use client";

import React, { useState, useEffect } from 'react';
import { useI18n } from '@/contexts/I18nContext';
import { useTheme } from '@/contexts/ThemeContext';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Globe, 
  Smartphone, 
  Zap, 
  Shield, 
  Search, 
  ShoppingCart,
  Building,
  User,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/Layout/Navbar';
import Footer from '@/components/Layout/Footer';

// Enterprise Dashboard Mockup with Dynamic Content
const EnterpriseDashboard = () => {
  const { t } = useI18n();
  const [revenue, setRevenue] = useState(2400000);
  const [growth, setGrowth] = useState(24);
  const [isTyping, setIsTyping] = useState(false);
  const [typedText, setTypedText] = useState('');

  useEffect(() => {
    // Real-time data updates
    const interval = setInterval(() => {
      setRevenue(prev => prev + Math.floor(Math.random() * 10000) - 5000);
      setGrowth(prev => Math.max(15, Math.min(35, prev + (Math.random() - 0.5) * 2)));
    }, 3000);

    // Typing animation
    const text = t('creationWeb.mockups.analyticsPro');
    let index = 0;
    setIsTyping(true);
    
    const typeInterval = setInterval(() => {
      if (index < text.length) {
        setTypedText(text.slice(0, index + 1));
        index++;
      } else {
        setIsTyping(false);
        clearInterval(typeInterval);
      }
    }, 100);

    return () => {
      clearInterval(interval);
      clearInterval(typeInterval);
    };
  }, [t]);

  return (
    <div className="h-full bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <div className="h-10 bg-white border-b border-gray-100 flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
            <div className="w-3 h-3 bg-white rounded-sm"></div>
          </div>
          <div className="text-sm font-bold text-gray-800">
            {typedText}
            {isTyping && <span className="animate-pulse">|</span>}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-blue-50 rounded-lg flex items-center justify-center">
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
          </div>
          <div className="w-6 h-6 bg-gray-100 rounded-lg"></div>
        </div>
      </div>
      
      {/* KPI Cards with Animated Values */}
      <div className="p-3 grid grid-cols-2 gap-2">
        <motion.div 
          className="h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-2 shadow-sm"
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="text-xs text-white font-semibold">{t('creationWeb.mockups.revenue')}</div>
          <motion.div 
            className="text-xs text-blue-100"
            key={revenue}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            ${(revenue / 1000000).toFixed(1)}M (+12%)
          </motion.div>
        </motion.div>
        <motion.div 
          className="h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg p-2 shadow-sm"
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
        >
          <div className="text-xs text-white font-semibold">{t('creationWeb.mockups.growth')}</div>
          <motion.div 
            className="text-xs text-emerald-100"
            key={growth}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            +{growth.toFixed(1)}%
          </motion.div>
        </motion.div>
      </div>
      
      {/* Animated Charts */}
      <div className="p-3 space-y-2">
        <motion.div 
          className="h-8 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-lg border border-indigo-200 flex items-center px-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="flex gap-1">
            {[4, 6, 3, 5, 4].map((height, index) => (
              <motion.div
                key={index}
                className="w-1 bg-indigo-400 rounded-full"
                initial={{ height: 0 }}
                animate={{ height: height * 4 }}
                transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
              />
            ))}
          </div>
        </motion.div>
        <motion.div 
          className="h-6 bg-gradient-to-r from-orange-100 to-amber-100 rounded-lg border border-orange-200 flex items-center px-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="flex gap-1">
            {[3, 4, 2].map((height, index) => (
              <motion.div
                key={index}
                className="w-1 bg-orange-400 rounded-full"
                initial={{ height: 0 }}
                animate={{ height: height * 4 }}
                transition={{ duration: 1, delay: 0.7 + index * 0.1 }}
              />
            ))}
          </div>
        </motion.div>
        <motion.div 
          className="h-6 bg-gradient-to-r from-teal-100 to-cyan-100 rounded-lg border border-teal-200 flex items-center px-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="flex gap-1">
            {[4, 3, 5].map((height, index) => (
              <motion.div
                key={index}
                className="w-1 bg-teal-400 rounded-full"
                initial={{ height: 0 }}
                animate={{ height: height * 4 }}
                transition={{ duration: 1, delay: 0.9 + index * 0.1 }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// Luxury E-commerce Mockup with Dynamic Content
const LuxuryEcommerce = () => {
  const { t } = useI18n();
  const [currentProduct, setCurrentProduct] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [viewCount, setViewCount] = useState(1247);

  const products = [
    { name: t('creationWeb.mockups.diamondRing'), price: "€2,499", color: "amber", image: "💍" },
    { name: t('creationWeb.mockups.goldWatch'), price: "€3,299", color: "yellow", image: "⌚" },
    { name: t('creationWeb.mockups.pearlNecklace'), price: "€1,899", color: "orange", image: "📿" }
  ];

  useEffect(() => {
    // Product rotation
    const productInterval = setInterval(() => {
      setCurrentProduct(prev => (prev + 1) % products.length);
    }, 4000);

    // Typing animation
    const text = t('creationWeb.mockups.luxe');
    let index = 0;
    setIsTyping(true);
    
    const typeInterval = setInterval(() => {
      if (index < text.length) {
        setTypedText(text.slice(0, index + 1));
        index++;
      } else {
        setIsTyping(false);
        clearInterval(typeInterval);
      }
    }, 150);

    // View count updates
    const viewInterval = setInterval(() => {
      setViewCount(prev => prev + Math.floor(Math.random() * 5) + 1);
    }, 2000);

    return () => {
      clearInterval(productInterval);
      clearInterval(typeInterval);
      clearInterval(viewInterval);
    };
  }, [t, products.length]);

  return (
    <div className="h-full bg-gradient-to-b from-white to-slate-50">
      {/* Header */}
      <div className="h-10 bg-white border-b border-gray-100 flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg flex items-center justify-center">
            <div className="w-3 h-3 bg-white rounded-sm"></div>
          </div>
          <div className="text-sm font-bold text-gray-800">
            {typedText}
            {isTyping && <span className="animate-pulse">|</span>}
          </div>
        </div>
        <div className="flex gap-3 text-xs text-gray-600">
          <motion.div 
            className="hover:text-amber-600 transition-colors cursor-pointer"
            whileHover={{ scale: 1.05 }}
          >
            Jewelry
          </motion.div>
          <motion.div 
            className="hover:text-amber-600 transition-colors cursor-pointer"
            whileHover={{ scale: 1.05 }}
          >
            Watches
          </motion.div>
        </div>
      </div>
      
      {/* Hero with Dynamic Content */}
      <motion.div 
        className="h-20 bg-gradient-to-r from-amber-50 to-yellow-50 flex items-center justify-center border-b border-amber-100 px-4"
        key={currentProduct}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center w-full">
          <motion.div 
            className="text-3xl mb-3"
            key={products[currentProduct].image}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            {products[currentProduct].image}
          </motion.div>
          <motion.div 
            className="text-base font-bold text-gray-800 mb-1"
            key={products[currentProduct].name}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {products[currentProduct].name}
          </motion.div>
          <motion.div 
            className="text-sm font-semibold text-gray-700"
            key={products[currentProduct].price}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            {products[currentProduct].price}
          </motion.div>
        </div>
      </motion.div>
      
      {/* Animated Product Grid */}
      <div className="p-3 grid grid-cols-3 gap-3">
        {products.map((product, index) => (
          <motion.div 
            key={index}
            className={`h-12 bg-gradient-to-br from-${product.color}-100 to-${product.color}-200 rounded-lg border border-${product.color}-200 shadow-sm flex flex-col items-center justify-center cursor-pointer p-2 ${
              currentProduct === index ? 'ring-2 ring-amber-400 ring-opacity-50' : ''
            }`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: 1, 
              scale: currentProduct === index ? 1.05 : 1
            }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setCurrentProduct(index)}
          >
            <motion.div 
              className="text-lg mb-1"
              animate={{ 
                scale: currentProduct === index ? 1.2 : 1,
                rotate: currentProduct === index ? 360 : 0
              }}
              transition={{ duration: 0.5 }}
            >
              {product.image}
            </motion.div>
            <div className="text-xs text-gray-600 font-medium text-center leading-tight">
              {product.name.split(' ')[0]}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Live View Counter */}
      <div className="px-3 pb-2">
        <motion.div 
          className="text-xs text-gray-500 flex items-center gap-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span>{viewCount.toLocaleString()} {t('creationWeb.mockups.viewingNow')}</span>
        </motion.div>
      </div>
    </div>
  );
};

// B2B Platform Mockup with Dynamic Content
const B2BPlatform = () => {
  const { t } = useI18n();
  const [currentService, setCurrentService] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [progress, setProgress] = useState(0);

  const services = [
    { name: t('creationWeb.mockups.cloudSolutions'), progress: 85, color: "blue", price: "€299/mo" },
    { name: t('creationWeb.mockups.dataAnalytics'), progress: 92, color: "indigo", price: "€199/mo" },
    { name: t('creationWeb.mockups.aiIntegration'), progress: 78, color: "purple", price: "€399/mo" }
  ];

  useEffect(() => {
    // Service rotation
    const serviceInterval = setInterval(() => {
      setCurrentService(prev => (prev + 1) % services.length);
    }, 3500);

    // Typing animation
    const text = "TechFlow";
    let index = 0;
    setIsTyping(true);
    
    const typeInterval = setInterval(() => {
      if (index < text.length) {
        setTypedText(text.slice(0, index + 1));
        index++;
      } else {
        setIsTyping(false);
        clearInterval(typeInterval);
      }
    }, 120);

    // Progress animation
    const progressInterval = setInterval(() => {
      setProgress(prev => (prev + 1) % 100);
    }, 100);

    return () => {
      clearInterval(serviceInterval);
      clearInterval(typeInterval);
      clearInterval(progressInterval);
    };
  }, [t, services.length]);

  return (
    <div className="h-full bg-gradient-to-b from-white to-slate-50">
      {/* Header */}
      <div className="h-10 bg-white border-b border-gray-100 flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
            <div className="w-3 h-3 bg-white rounded-sm"></div>
          </div>
          <div className="text-sm font-bold text-gray-800">
            {typedText}
            {isTyping && <span className="animate-pulse">|</span>}
          </div>
        </div>
        <div className="w-6 h-6 bg-blue-50 rounded-lg flex items-center justify-center">
          <motion.div 
            className="w-3 h-3 bg-blue-500 rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </div>
      
      {/* Hero with Dynamic Content */}
      <motion.div 
        className="h-16 bg-gradient-to-r from-blue-50 to-indigo-50 flex items-center justify-center border-b border-blue-100"
        key={currentService}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center">
          <motion.div 
            className="text-sm font-bold text-gray-800"
            key={services[currentService].name}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {services[currentService].name}
          </motion.div>
          <motion.div 
            className="text-xs text-gray-600"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            {t('creationWeb.mockups.implementationInProgress')}
          </motion.div>
        </div>
      </motion.div>
      
      {/* Animated Services with Progress */}
      <div className="p-3 space-y-2">
        {services.map((service, index) => (
          <motion.div 
            key={index}
            className={`h-6 bg-gradient-to-r from-${service.color}-100 to-${service.color}-200 rounded-lg border border-${service.color}-200 shadow-sm flex items-center px-2 cursor-pointer`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ 
              opacity: 1, 
              x: 0,
              scale: currentService === index ? 1.02 : 1
            }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setCurrentService(index)}
          >
            <motion.div 
              className={`w-2 h-2 bg-${service.color}-500 rounded-full mr-2`}
              animate={{ 
                scale: currentService === index ? 1.3 : 1,
                opacity: currentService === index ? 1 : 0.7
              }}
              transition={{ duration: 0.3 }}
            />
            <div className="text-xs text-gray-700 flex-1">{service.name}</div>
            <div className="text-xs text-gray-500 mr-2">{service.price}</div>
            <motion.div 
              className="text-xs text-gray-500"
              key={currentService === index ? progress : service.progress}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {currentService === index ? progress : service.progress}%
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="px-3 pb-2">
        <motion.div 
          className="w-full bg-gray-200 rounded-full h-1.5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <motion.div 
            className="bg-gradient-to-r from-blue-500 to-indigo-500 h-1.5 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${services[currentService].progress}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </motion.div>
      </div>
    </div>
  );
};

// Premium 3D Laptop Mockup with Multiple Scenarios
const PremiumLaptop = ({ scenario }: { scenario: number }) => {
  const { t } = useI18n();
  const scenarios = [
    { name: t('creationWeb.mockups.enterpriseDashboard'), component: EnterpriseDashboard },
    { name: t('creationWeb.mockups.luxuryEcommerce'), component: LuxuryEcommerce },
    { name: t('creationWeb.mockups.b2bPlatform'), component: B2BPlatform }
  ];

  const CurrentComponent = scenarios[scenario]?.component || EnterpriseDashboard;

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0, rotateY: -20 }}
      animate={{ scale: 1, opacity: 1, rotateY: 0 }}
      transition={{ duration: 1, delay: 0.5 }}
      className="relative w-96 h-64 perspective-1000"
    >
      {/* Laptop Base */}
      <motion.div
        animate={{ 
          rotateY: [0, 5, 0, -5, 0],
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        className="relative w-full h-40 bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800 rounded-xl shadow-2xl border border-slate-600"
        style={{
          background: 'linear-gradient(135deg, #1e293b 0%, #334155 50%, #1e293b 100%)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.15), inset 0 -1px 0 rgba(0, 0, 0, 0.2)'
        }}
      >
        {/* Keyboard Area */}
        <div className="absolute bottom-3 left-3 right-3 h-10 bg-slate-600 rounded-lg flex items-center justify-center shadow-inner">
          <div className="flex gap-1.5">
            {Array.from({ length: 15 }).map((_, i) => (
              <div key={i} className="w-2.5 h-2.5 bg-slate-500 rounded-sm shadow-sm hover:bg-slate-400 transition-colors"></div>
            ))}
          </div>
        </div>
        
        {/* Trackpad */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 w-20 h-12 bg-slate-500 rounded-lg border border-slate-400 shadow-inner hover:bg-slate-400 transition-colors"></div>
        
        {/* Brand Logo */}
        <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-10 h-10 bg-gradient-to-br from-highlight/30 to-primary/30 rounded-lg flex items-center justify-center shadow-lg">
          <div className="w-5 h-5 bg-gradient-to-br from-highlight to-primary rounded-sm"></div>
        </div>
      </motion.div>

      {/* Laptop Screen */}
      <motion.div
        initial={{ rotateX: -90 }}
        animate={{ rotateX: -20 }}
        transition={{ duration: 1, delay: 0.7 }}
        className="absolute top-0 left-0 w-full h-40 bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl shadow-2xl border border-slate-600 origin-bottom"
        style={{
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.15), inset 0 -1px 0 rgba(0, 0, 0, 0.3)'
        }}
      >
        {/* Screen Content */}
        <div className="absolute inset-3 bg-white rounded-lg overflow-hidden shadow-inner">
          {/* Browser Bar */}
          <div className="h-8 bg-gray-100 border-b border-gray-200 flex items-center px-3 gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <div className="flex-1 h-5 bg-white border border-gray-300 rounded mx-3 flex items-center px-2">
              <div className="text-xs text-gray-500">
                {scenarios[scenario]?.name.toLowerCase().replace(' ', '-')}.com
              </div>
            </div>
          </div>
          
          {/* Dynamic Content */}
          <CurrentComponent />
        </div>
      </motion.div>

      {/* Premium Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-highlight/10 to-primary/10 rounded-xl blur-xl -z-10"></div>
    </motion.div>
  );
};

// Mobile E-commerce Checkout with Dynamic Content
const MobileCheckout = () => {
  const { t } = useI18n();
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [t('creationWeb.mockups.cardDetails'), t('creationWeb.mockups.verification'), t('creationWeb.mockups.processing')];

  useEffect(() => {
    // Simulate checkout process
    const interval = setInterval(() => {
      if (isProcessing) {
        setProgress(prev => {
          if (prev >= 100) {
            setIsProcessing(false);
            setCurrentStep(0);
            return 0;
          }
          return prev + 2;
        });
      }
    }, 100);

    return () => clearInterval(interval);
  }, [isProcessing]);

  const handlePayNow = () => {
    setIsProcessing(true);
    setProgress(0);
    setCurrentStep(1);
  };

  return (
    <div className="h-full bg-gradient-to-b from-white to-slate-50">
      {/* Header */}
      <div className="h-8 bg-white border-b border-gray-100 flex items-center justify-between px-3">
        <div className="text-xs font-bold text-gray-800">{t('creationWeb.mockups.checkout')}</div>
        <div className="w-4 h-4 bg-gray-100 rounded-lg flex items-center justify-center">
          <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
        </div>
      </div>
      
      {/* Product */}
      <div className="p-2">
        <motion.div 
          className="h-16 bg-gradient-to-r from-amber-100 to-yellow-100 rounded-lg border border-amber-200 shadow-sm mb-2 flex items-center justify-center"
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div 
            className="w-8 h-8 bg-amber-400 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>
         <motion.div 
           className="text-sm font-semibold text-gray-800"
           initial={{ opacity: 0, y: 5 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.2 }}
         >
           💎 Diamond Ring
         </motion.div>
         <motion.div 
           className="text-sm text-gray-600 font-medium"
           initial={{ opacity: 0, y: 5 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.3 }}
         >
           €2,499.00
         </motion.div>
      </div>
      
       {/* Checkout Form */}
       <div className="p-2 space-y-3">
         <motion.div 
           className="h-6 bg-white rounded-lg border border-gray-200 px-3 flex items-center"
           initial={{ opacity: 0, x: -10 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ delay: 0.4 }}
         >
           <span className="text-xs text-gray-500">Card Number: **** **** **** 1234</span>
         </motion.div>
         <motion.div 
           className="h-6 bg-white rounded-lg border border-gray-200 px-3 flex items-center"
           initial={{ opacity: 0, x: -10 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ delay: 0.5 }}
         >
           <span className="text-xs text-gray-500">Expiry: 12/25</span>
         </motion.div>
        
        {/* Progress Bar (shown during processing) */}
        {isProcessing && (
          <motion.div 
            className="w-full bg-gray-200 rounded-full h-1"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 4 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div 
              className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-1 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </motion.div>
        )}
        
         <motion.button
           className={`h-8 rounded-lg flex items-center justify-center shadow-sm font-semibold transition-all duration-300 ${
             isProcessing 
               ? 'bg-gradient-to-r from-blue-500 to-blue-600' 
               : 'bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700'
           }`}
           initial={{ opacity: 0, y: 10 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.6 }}
           whileHover={{ scale: isProcessing ? 1 : 1.02 }}
           whileTap={{ scale: isProcessing ? 1 : 0.98 }}
           onClick={handlePayNow}
           disabled={isProcessing}
         >
           <motion.div 
             className="text-sm text-white"
             key={isProcessing ? 'processing' : 'pay'}
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ duration: 0.3 }}
           >
             {isProcessing ? `${steps[currentStep]}...` : t('creationWeb.mockups.payNow')}
           </motion.div>
         </motion.button>
      </div>
    </div>
  );
};

// Mobile Booking App with Dynamic Content
const MobileBooking = () => {
  const { t } = useI18n();
  const [selectedService, setSelectedService] = useState(0);
  const [selectedTime, setSelectedTime] = useState(1);
  const [isBooking, setIsBooking] = useState(false);
  const [bookingProgress, setBookingProgress] = useState(0);

  const services = [
    { name: t('creationWeb.mockups.consultation'), color: "blue", duration: "30 min", price: "€150" },
    { name: t('creationWeb.mockups.designReview'), color: "indigo", duration: "45 min", price: "€200" },
    { name: t('creationWeb.mockups.strategySession'), color: "purple", duration: "60 min", price: "€300" }
  ];

  const timeSlots = ["10:00", "11:00", "12:00", "14:00", "15:00", "16:00"];

  useEffect(() => {
    // Auto-rotate services
    const serviceInterval = setInterval(() => {
      setSelectedService(prev => (prev + 1) % services.length);
    }, 3000);

    return () => clearInterval(serviceInterval);
  }, [services.length]);

  useEffect(() => {
    // Booking progress animation
    if (isBooking) {
      const interval = setInterval(() => {
        setBookingProgress(prev => {
          if (prev >= 100) {
            setIsBooking(false);
            return 0;
          }
          return prev + 3;
        });
      }, 50);

      return () => clearInterval(interval);
    }
  }, [isBooking]);

  const handleBookNow = () => {
    setIsBooking(true);
    setBookingProgress(0);
  };

  return (
    <div className="h-full bg-gradient-to-b from-white to-slate-50">
      {/* Header */}
      <div className="h-8 bg-white border-b border-gray-100 flex items-center justify-between px-3">
         <div className="text-xs font-bold text-gray-800">{t('creationWeb.mockups.bookingApp')}</div>
        <div className="w-4 h-4 bg-blue-50 rounded-lg flex items-center justify-center">
          <motion.div 
            className="w-2 h-2 bg-blue-500 rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </div>
      
      {/* Service Selection */}
      <div className="p-2">
        <motion.div 
          className="text-xs font-semibold text-gray-800 mb-2"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {t('creationWeb.mockups.selectService')}
        </motion.div>
         <div className="space-y-2">
           {services.map((service, index) => (
             <motion.div 
               key={index}
               className={`h-8 rounded-lg border shadow-sm flex items-center px-3 cursor-pointer transition-all duration-300 ${
                 selectedService === index 
                   ? 'bg-blue-100 border-blue-300 shadow-md' 
                   : 'bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200 hover:border-gray-300'
               }`}
               initial={{ opacity: 0, x: -20 }}
               animate={{ 
                 opacity: 1, 
                 x: 0,
                 scale: selectedService === index ? 1.02 : 1
               }}
               transition={{ duration: 0.3, delay: index * 0.1 }}
               whileHover={{ scale: 1.02 }}
               whileTap={{ scale: 0.98 }}
               onClick={() => setSelectedService(index)}
             >
               <motion.div 
                 className={`w-3 h-3 rounded-full mr-3 ${
                   selectedService === index ? 'bg-blue-500' : `bg-${service.color}-400`
                 }`}
                 animate={{ 
                   scale: selectedService === index ? 1.2 : 1,
                   opacity: selectedService === index ? 1 : 0.7
                 }}
                 transition={{ duration: 0.3 }}
               />
               <div className="text-xs text-gray-800 flex-1 font-medium">{service.name}</div>
               <div className="text-xs text-gray-500">{service.duration}</div>
             </motion.div>
           ))}
         </div>
      </div>
      
      {/* Time Slots */}
      <div className="p-2">
        <motion.div 
          className="text-xs font-semibold text-gray-800 mb-2"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {t('creationWeb.mockups.availableTimes')}
        </motion.div>
         <div className="grid grid-cols-3 gap-2">
           {timeSlots.slice(0, 3).map((time, index) => (
             <motion.div 
               key={index}
               className={`h-6 rounded-lg text-xs flex items-center justify-center border cursor-pointer font-medium transition-all duration-300 ${
                 selectedTime === index 
                   ? 'bg-blue-100 border-blue-300 text-blue-700 shadow-sm' 
                   : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'
               }`}
               initial={{ opacity: 0, scale: 0.8 }}
               animate={{ 
                 opacity: 1, 
                 scale: 1
               }}
               transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
               onClick={() => setSelectedTime(index)}
             >
               {time}
             </motion.div>
           ))}
         </div>
      </div>

      {/* Booking Progress */}
      {isBooking && (
        <motion.div 
          className="p-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="w-full bg-gray-200 rounded-full h-1 mb-2">
            <motion.div 
              className="bg-gradient-to-r from-blue-500 to-indigo-500 h-1 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${bookingProgress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
           <div className="text-xs text-gray-600 text-center">
             {t('creationWeb.mockups.booking')}...
           </div>
        </motion.div>
      )}

       {/* Book Now Button */}
       <div className="p-2">
         <motion.button
           className={`w-full h-8 rounded-lg flex items-center justify-center shadow-sm font-semibold transition-all duration-300 ${
             isBooking 
               ? 'bg-gradient-to-r from-blue-500 to-blue-600' 
               : 'bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600'
           }`}
           initial={{ opacity: 0, y: 10 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.8 }}
           whileHover={{ scale: isBooking ? 1 : 1.02 }}
           whileTap={{ scale: isBooking ? 1 : 0.98 }}
           onClick={handleBookNow}
           disabled={isBooking}
         >
           <div className="text-sm text-white">
             {isBooking ? t('creationWeb.mockups.booking') : t('creationWeb.mockups.bookNow')}
           </div>
         </motion.button>
       </div>
    </div>
  );
};

// Mobile Client Dashboard with Dynamic Content
const MobileClientDashboard = () => {
  const { t } = useI18n();
  const [balance, setBalance] = useState(12450);
  const [transactions] = useState([
    { type: "received", amount: 250, description: t('creationWeb.mockups.paymentReceived'), icon: "💰" },
    { type: "sent", amount: -150, description: t('creationWeb.mockups.transferSent'), icon: "💸" },
    { type: "received", amount: 500, description: t('creationWeb.mockups.salaryDeposit'), icon: "💳" }
  ]);
  const [currentTransaction, setCurrentTransaction] = useState(0);

  useEffect(() => {
    // Balance updates
    const balanceInterval = setInterval(() => {
      setBalance(prev => prev + Math.floor(Math.random() * 100) - 50);
    }, 4000);

    // Transaction rotation
    const transactionInterval = setInterval(() => {
      setCurrentTransaction(prev => (prev + 1) % transactions.length);
    }, 3000);

    return () => {
      clearInterval(balanceInterval);
      clearInterval(transactionInterval);
    };
  }, [transactions.length]);

  return (
    <div className="h-full bg-gradient-to-b from-white to-slate-50">
      {/* Header */}
      <div className="h-8 bg-white border-b border-gray-100 flex items-center justify-between px-3">
        <div className="text-xs font-bold text-gray-800">{t('creationWeb.mockups.myAccount')}</div>
        <div className="w-4 h-4 bg-gray-100 rounded-lg flex items-center justify-center">
          <motion.div 
            className="w-2 h-2 bg-gray-400 rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </div>
      
      {/* Balance Card */}
      <div className="p-2">
        <motion.div 
          className="h-12 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-lg p-2 shadow-sm"
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <div className="text-xs text-white">{t('creationWeb.mockups.accountBalance')}</div>
          <motion.div 
            className="text-xs text-emerald-100"
            key={balance}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            €{balance.toLocaleString()}.00
          </motion.div>
        </motion.div>
      </div>
      
      {/* Quick Actions */}
      <div className="p-2">
        <motion.div 
          className="text-xs font-semibold text-gray-800 mb-2"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {t('creationWeb.mockups.quickActions')}
        </motion.div>
        <div className="grid grid-cols-2 gap-2">
          <motion.div 
            className="h-8 bg-gradient-to-r from-blue-100 to-blue-200 rounded-lg border border-blue-200 shadow-sm flex items-center justify-center cursor-pointer"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="text-xs text-blue-700 font-medium">{t('creationWeb.mockups.transfer')}</div>
          </motion.div>
          <motion.div 
            className="h-8 bg-gradient-to-r from-purple-100 to-purple-200 rounded-lg border border-purple-200 shadow-sm flex items-center justify-center cursor-pointer"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="text-xs text-purple-700 font-medium">{t('creationWeb.mockups.payBills')}</div>
          </motion.div>
        </div>
      </div>
      
      {/* Recent Activity */}
      <div className="p-2">
        <motion.div 
          className="text-xs font-semibold text-gray-800 mb-2"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {t('creationWeb.mockups.recentActivity')}
        </motion.div>
        <div className="space-y-2">
          {transactions.map((transaction, index) => (
            <motion.div 
              key={index}
              className="min-h-6 bg-gray-100 rounded-lg border border-gray-200 flex items-center px-3 py-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ 
                opacity: 1, 
                x: 0,
                scale: currentTransaction === index ? 1.02 : 1
              }}
              transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
            >
              <motion.div 
                className={`w-2 h-2 rounded-full mr-3 flex-shrink-0 ${
                  transaction.type === 'received' ? 'bg-green-500' : 'bg-blue-500'
                }`}
                animate={{ 
                  scale: currentTransaction === index ? 1.3 : 1,
                  opacity: currentTransaction === index ? 1 : 0.7
                }}
                transition={{ duration: 0.3 }}
              />
              <div className="text-xs text-gray-700 flex-1 leading-tight">{transaction.description}</div>
              <motion.div 
                className={`text-xs font-semibold whitespace-nowrap ${
                  transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                }`}
                key={transaction.amount}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <span className={transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}>
                  {transaction.amount > 0 ? '+' : ''}€{Math.abs(transaction.amount)}
                </span>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Live Status Indicator */}
      <div className="px-2 pb-2">
        <motion.div 
          className="text-xs text-gray-500 flex items-center gap-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span>{t('creationWeb.mockups.accountActive')}</span>
        </motion.div>
      </div>
    </div>
  );
};

// Premium Mobile Phone Mockup with Multiple Scenarios
const PremiumMobile = ({ scenario }: { scenario: number }) => {
  const { t } = useI18n();
  const scenarios = [
    { name: t('creationWeb.mockups.mobileCheckout'), component: MobileCheckout },
    { name: t('creationWeb.mockups.bookingApp'), component: MobileBooking },
    { name: t('creationWeb.mockups.clientDashboard'), component: MobileClientDashboard }
  ];

  const CurrentComponent = scenarios[scenario]?.component || MobileCheckout;

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0, y: 50, rotateX: 15 }}
      animate={{ scale: 1, opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 1, delay: 0.8 }}
      className="relative w-40 h-80 perspective-1000"
    >
      {/* Phone Body */}
      <motion.div
        animate={{ 
          y: [0, -4, 0],
          rotateX: [0, -1, 0]
        }}
        transition={{ 
          duration: 4, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        className="relative w-full h-full bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800 rounded-3xl shadow-2xl border border-slate-600"
        style={{
          background: 'linear-gradient(135deg, #1e293b 0%, #334155 50%, #1e293b 100%)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.15), inset 0 -1px 0 rgba(0, 0, 0, 0.2)'
        }}
      >
        {/* Screen */}
        <div className="absolute inset-3 bg-white rounded-2xl overflow-hidden shadow-inner">
          {/* Status Bar */}
          <div className="h-6 bg-white border-b border-gray-100 flex items-center justify-between px-3 text-xs">
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
            </div>
            <div className="text-xs font-semibold text-gray-800">9:41</div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-1.5 bg-gray-400 rounded-sm"></div>
              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
            </div>
          </div>
          
          {/* Dynamic Mobile Content */}
          <CurrentComponent />
        </div>
        
        {/* Home Indicator */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-gray-600 rounded-full"></div>
        
        {/* Camera Module */}
        <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-gray-700 rounded-full"></div>
      </motion.div>

      {/* Premium Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-highlight/10 to-primary/10 rounded-3xl blur-xl -z-10"></div>
    </motion.div>
  );
};



// Service Card Component
const ServiceCard = ({ 
  icon: Icon, 
  title, 
  description, 
  delay = 0,
  theme = 'dark'
}: { 
  icon: React.ComponentType<{ className?: string }>; 
  title: string; 
  description: string; 
  delay?: number;
  theme?: 'light' | 'dark';
}) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
    className={`group relative backdrop-blur-sm border rounded-2xl p-6 transition-all duration-300 hover:border-highlight/30 hover:shadow-lg hover:shadow-highlight/10 ${
      theme === 'dark' 
        ? 'bg-surface/50 border-border/20 hover:bg-surface/80' 
        : 'bg-white/80 border-gray-200/50 hover:bg-white'
    }`}
  >
    <div className="flex items-center mb-4">
      <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-highlight/20 group-hover:from-primary/30 group-hover:to-highlight/30 transition-all duration-300">
        <Icon className="w-6 h-6 text-primary group-hover:text-highlight transition-colors duration-300" />
      </div>
    </div>
    <h3 className={`text-xl font-semibold mb-3 group-hover:text-highlight transition-colors duration-300 ${
      theme === 'dark' ? 'text-foreground' : 'text-gray-900'
    }`}>
      {title}
    </h3>
    <p className={`leading-relaxed transition-colors duration-300 ${
      theme === 'dark' ? 'text-muted-foreground' : 'text-gray-600'
    }`}>
      {description}
    </p>
  </motion.div>
);

// Enhanced Animated Feature Card Component
const FeatureCard = ({ 
  icon: Icon, 
  text, 
  delay = 0,
  index = 0
}: { 
  icon: React.ComponentType<{ className?: string }>; 
  text: string; 
  delay?: number;
  index?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 30, scale: 0.9 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ duration: 0.6, delay }}
    whileHover={{ 
      y: -5, 
      scale: 1.05,
      transition: { duration: 0.2 }
    }}
    className="group relative bg-gradient-to-br from-surface/40 to-surface/20 backdrop-blur-md border border-border/30 rounded-2xl p-4 hover:border-highlight/50 transition-all duration-300 hover:shadow-lg hover:shadow-highlight/20"
  >
    <div className="flex items-center gap-3">
      <motion.div
        whileHover={{ rotate: 360 }}
        transition={{ duration: 0.5 }}
        className="p-2 rounded-xl bg-gradient-to-br from-highlight/20 to-primary/20 group-hover:from-highlight/30 group-hover:to-primary/30 transition-all duration-300"
      >
        <Icon className="w-5 h-5 text-highlight group-hover:text-primary transition-colors duration-300" />
      </motion.div>
      <span className="text-sm font-semibold text-foreground group-hover:text-highlight transition-colors duration-300">
        {text}
      </span>
    </div>
    
    {/* Animated background gradient */}
    <motion.div
      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300"
      style={{
        background: `linear-gradient(45deg, ${
          index % 3 === 0 ? '#00BFA6' : index % 3 === 1 ? '#1F3A93' : '#FF6F3C'
        }, transparent)`
      }}
    />
  </motion.div>
);

// Floating Particles Background Component
const FloatingParticles = () => {
  const [particles, setParticles] = useState<Array<{
    id: number;
    x: number;
    y: number;
    size: number;
    delay: number;
  }>>([]);

  useEffect(() => {
    // Generate particles only on client side to avoid hydration mismatch
    const generatedParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      delay: Math.random() * 5
    }));
    setParticles(generatedParticles);
  }, []);

  if (particles.length === 0) {
    return null; // Don't render until particles are generated
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-highlight/20"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: 3 + particle.delay * 0.4, // Use deterministic duration
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

const CreationWebPage: React.FC = () => {
  const { t } = useI18n();
  const { theme } = useTheme();
  const [showMobile, setShowMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [laptopScenario, setLaptopScenario] = useState(0);
  const [mobileScenario, setMobileScenario] = useState(0);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  const laptopScenarios = [
    t('creationWeb.mockups.enterpriseDashboard'),
    t('creationWeb.mockups.luxuryEcommerce'), 
    t('creationWeb.mockups.b2bPlatform')
  ];

  const mobileScenarios = [
    t('creationWeb.mockups.mobileCheckout'),
    t('creationWeb.mockups.bookingApp'),
    t('creationWeb.mockups.clientDashboard')
  ];

  // Ensure component is mounted on client side
  useEffect(() => {
    setMounted(true);
  }, []);

  // Show mobile on scroll or after delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMobile(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // Auto-cycle through scenarios
  useEffect(() => {
    const interval = setInterval(() => {
      setLaptopScenario((prev) => (prev + 1) % laptopScenarios.length);
      setMobileScenario((prev) => (prev + 1) % mobileScenarios.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [laptopScenarios.length, mobileScenarios.length]);

  // Don't render until mounted to avoid hydration issues
  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-surface/20">
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <div className="w-16 h-16 border-4 border-highlight/30 border-t-highlight rounded-full animate-spin"></div>
        </div>
        <Footer />
      </div>
    );
  }

  const services = [
    {
      icon: ShoppingCart,
      title: t('creationWeb.services.ecommerce.title'),
      description: t('creationWeb.services.ecommerce.description'),
      delay: 0.1
    },
    {
      icon: Building,
      title: t('creationWeb.services.business.title'),
      description: t('creationWeb.services.business.description'),
      delay: 0.2
    },
    {
      icon: User,
      title: t('creationWeb.services.personal.title'),
      description: t('creationWeb.services.personal.description'),
      delay: 0.3
    }
  ];

  const features = [
    { icon: Globe, text: t('creationWeb.features.modern'), delay: 0.1, index: 0 },
    { icon: Smartphone, text: t('creationWeb.features.responsive'), delay: 0.2, index: 1 },
    { icon: Zap, text: t('creationWeb.features.animated'), delay: 0.3, index: 2 },
    { icon: Zap, text: t('creationWeb.features.fast'), delay: 0.4, index: 3 },
    { icon: Search, text: t('creationWeb.features.seo'), delay: 0.5, index: 4 },
    { icon: Shield, text: t('creationWeb.features.secure'), delay: 0.6, index: 5 }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
          {/* Video Hero Section */}
          <section className="relative h-screen w-full overflow-hidden">
            {/* Video Background */}
            <div className="absolute inset-0 w-full h-full">
              <video
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              >
                <source src="/images/creation webb.mp4" type="video/mp4" />
                {/* Fallback for browsers that don't support video */}
                <div className="w-full h-full bg-gradient-to-br from-primary via-highlight to-primary flex items-center justify-center">
                  <div className="text-center text-white">
                    <h1 className="text-6xl font-bold mb-4">Web Creation Services</h1>
                    <p className="text-xl">Modern, Responsive & Animated Websites</p>
                  </div>
                </div>
              </video>
            </div>
            
            {/* Enhanced Video Overlay with Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/60"></div>
            
            {/* Floating Particles Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {Array.from({ length: 20 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-white/20 rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -30, 0],
                    opacity: [0.2, 0.8, 0.2],
                    scale: [1, 1.5, 1],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </div>
            
            {/* Hero Text Block */}
            <div className="relative z-10 h-full flex items-center justify-center">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="text-center"
                >
                  {/* Enhanced Semi-transparent overlay with glow */}
                  <motion.div 
                    className="relative bg-black/40 backdrop-blur-md rounded-3xl p-8 sm:p-10 lg:p-12 border border-white/20 shadow-2xl inline-block"
                    whileHover={{ 
                      scale: 1.02,
                      boxShadow: '0 25px 50px rgba(0, 191, 166, 0.2)'
                    }}
                    transition={{ duration: 0.3 }}
                    style={{
                      boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1)'
                    }}
                  >
                    {/* Main Title with Enhanced Effects */}
                    <motion.h1
                      initial={{ opacity: 0, y: 30, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-tight"
                      style={{
                        textShadow: '0 8px 32px rgba(0, 0, 0, 0.8), 0 4px 16px rgba(0, 0, 0, 0.6), 0 2px 8px rgba(0, 0, 0, 0.4)',
                        filter: 'drop-shadow(0 0 20px rgba(255, 255, 255, 0.1))'
                      }}
                    >
                      {t('creationWeb.heroTitle')}
                    </motion.h1>
                    
                    {/* Accent Line */}
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 1, delay: 0.6 }}
                      className="h-1 bg-gradient-to-r from-transparent via-highlight to-transparent mx-auto mb-8 rounded-full"
                    />
                    
                    {/* Subtitle with Enhanced Gradient and Pulsing */}
                    <motion.h2
                      initial={{ opacity: 0, y: 30, scale: 0.9 }}
                      animate={{ 
                        opacity: 1, 
                        y: 0, 
                        scale: 1,
                        textShadow: [
                          '0 0 20px rgba(0, 191, 166, 0.3)',
                          '0 0 30px rgba(0, 191, 166, 0.5)',
                          '0 0 20px rgba(0, 191, 166, 0.3)'
                        ]
                      }}
                      transition={{ 
                        duration: 0.8, 
                        delay: 0.4,
                        textShadow: {
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }
                      }}
                      className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-semibold leading-relaxed"
                      style={{
                        background: 'linear-gradient(135deg, #00BFA6 0%, #4ADE80 50%, #00BFA6 100%)',
                        backgroundSize: '200% 200%',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        animation: 'gradientShift 3s ease infinite'
                      }}
                    >
                      {t('creationWeb.heroSubtitle')}
                    </motion.h2>
                  </motion.div>
                </motion.div>
                
                {/* Scroll Down Indicator */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.2 }}
                  className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
                >
                  <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="flex flex-col items-center text-white/70 hover:text-white transition-colors cursor-pointer"
                  >
                    <span className="text-sm font-medium mb-2">Scroll Down</span>
                    <motion.div
                      animate={{ y: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    </motion.div>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </section>

      {/* Enhanced Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Enhanced Background with Gradient Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/10"></div>
        <div className="absolute inset-0">
          <motion.div 
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-highlight/20 to-primary/20 rounded-full blur-3xl"
          />
          <motion.div 
            animate={{ 
              scale: [1.1, 1, 1.1],
              opacity: [0.2, 0.5, 0.2]
            }}
            transition={{ 
              duration: 5, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: 1
            }}
            className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-br from-primary/20 to-highlight/20 rounded-full blur-3xl"
          />
        </div>

        {/* Floating Particles */}
        <FloatingParticles />

        <motion.div 
          style={{ y, scale }}
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
        >
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content - Enhanced */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="inline-block"
                >
                  <motion.div 
                    className="w-20 h-1 bg-gradient-to-r from-primary via-highlight to-primary rounded-full"
                    animate={{ 
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                    }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity, 
                      ease: "easeInOut" 
                    }}
                  />
                </motion.div>
                
                    <motion.h1
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                      className={`text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight transition-colors duration-300 ${
                        theme === 'dark' ? 'text-foreground' : 'text-gray-900'
                      }`}
                    >
                      {t('creationWeb.heroTitle')}
                    </motion.h1>
                    
                    <motion.h2
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      className="text-lg sm:text-xl text-highlight font-semibold"
                    >
                      {t('creationWeb.heroSubtitle')}
                    </motion.h2>
                    
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.5 }}
                      className={`text-base leading-relaxed max-w-xl transition-colors duration-300 ${
                        theme === 'dark' ? 'text-muted-foreground' : 'text-gray-600'
                      }`}
                    >
                      {t('creationWeb.heroDescription')}
                    </motion.p>
              </div>

              {/* Enhanced Feature Cards Grid */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="grid grid-cols-2 gap-4"
              >
                {features.map((feature, index) => (
                  <FeatureCard
                    key={index}
                    icon={feature.icon}
                    text={feature.text}
                    delay={feature.delay}
                    index={feature.index}
                  />
                ))}
              </motion.div>

                  {/* Enhanced CTA Button with Pulse Animation */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                    className="pt-4"
                  >
                <Link href="/Contact">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    animate={{ 
                      boxShadow: [
                        "0 0 0 0 rgba(0, 191, 166, 0.4)",
                        "0 0 0 20px rgba(0, 191, 166, 0)",
                        "0 0 0 0 rgba(0, 191, 166, 0)"
                      ]
                    }}
                    transition={{ 
                      boxShadow: { 
                        duration: 2, 
                        repeat: Infinity, 
                        ease: "easeInOut" 
                      }
                    }}
                        className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-primary via-highlight to-primary text-white px-8 py-4 rounded-full font-bold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 overflow-hidden"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-highlight to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        background: "linear-gradient(45deg, #00BFA6, #1F3A93, #00BFA6)",
                        backgroundSize: "200% 200%",
                        animation: "gradientShift 3s ease infinite"
                      }}
                    />
                    <span className="relative z-10">{t('creationWeb.ctaButton')}</span>
                    <motion.div
                      className="relative z-10"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ArrowRight className="w-6 h-6" />
                    </motion.div>
                  </motion.button>
                </Link>
              </motion.div>
            </motion.div>

            {/* Right Content - Enhanced 3D Animation */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative h-96 lg:h-[600px]"
            >
              {/* Enhanced Glow Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-highlight/20 to-primary/30 rounded-3xl blur-2xl"></div>
              <div className="absolute inset-0 bg-gradient-to-tr from-highlight/10 to-primary/10 rounded-3xl blur-xl"></div>
              
              <div className={`relative h-full backdrop-blur-md border rounded-3xl overflow-hidden shadow-2xl transition-colors duration-300 ${
                theme === 'dark' 
                  ? 'bg-gradient-to-br from-surface/40 to-surface/20 border-border/40' 
                  : 'bg-gradient-to-br from-white/90 to-gray-50/90 border-gray-200/60'
              }`}
              style={{
                boxShadow: theme === 'dark' 
                  ? '0 25px 50px -12px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)' 
                  : '0 25px 50px -12px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.8)'
              }}>
                    {/* Premium Badge */}
                    <div className="absolute top-4 right-4 z-10">
                      <div className="px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-highlight to-primary text-white shadow-lg">
                        {t('creationWeb.showcase.premiumDesign')}
                      </div>
                    </div>

                {/* Device Toggle */}
                <div className="absolute top-4 left-4 z-10 flex gap-2">
                  <button
                    onClick={() => setShowMobile(false)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 ${
                      !showMobile 
                        ? 'bg-highlight text-white' 
                        : theme === 'dark' 
                          ? 'bg-surface/50 text-foreground/70 hover:bg-surface/70'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                        {t('creationWeb.showcase.desktop')}
                      </button>
                      <button
                        onClick={() => setShowMobile(true)}
                        className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 ${
                          showMobile 
                            ? 'bg-highlight text-white' 
                            : theme === 'dark' 
                              ? 'bg-surface/50 text-foreground/70 hover:bg-surface/70'
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {t('creationWeb.showcase.mobile')}
                  </button>
                </div>

                {/* Scenario Indicators */}
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <div className={`backdrop-blur-sm border rounded-lg px-3 py-1 transition-colors duration-300 ${
                    theme === 'dark' 
                      ? 'bg-surface/50 border-border/30' 
                      : 'bg-white/80 border-gray-200/50'
                  }`}>
                    <div className={`text-xs font-medium transition-colors duration-300 ${
                      theme === 'dark' ? 'text-foreground/80' : 'text-gray-700'
                    }`}>
                      {showMobile ? mobileScenarios[mobileScenario] : laptopScenarios[laptopScenario]}
                    </div>
                  </div>
                </div>

                {/* Scenario Controls */}
                <div className="absolute bottom-4 right-4 z-10">
                  <div className={`backdrop-blur-sm border rounded-lg p-2 transition-colors duration-300 ${
                    theme === 'dark' 
                      ? 'bg-surface/50 border-border/30' 
                      : 'bg-white/80 border-gray-200/50'
                  }`}>
                        <div className={`text-xs mb-1 transition-colors duration-300 ${
                          theme === 'dark' ? 'text-foreground/60' : 'text-gray-500'
                        }`}>{t('creationWeb.showcase.scenarios')}</div>
                    <div className="flex gap-1">
                      {(showMobile ? mobileScenarios : laptopScenarios).map((scenario, index) => (
                        <button
                          key={index}
                          onClick={() => showMobile ? setMobileScenario(index) : setLaptopScenario(index)}
                          title={`Switch to ${scenario}`}
                          aria-label={`Switch to ${scenario}`}
                          className={`w-2 h-2 rounded-full transition ${
                            (showMobile ? mobileScenario : laptopScenario) === index 
                              ? 'bg-highlight' 
                              : 'bg-foreground/30 hover:bg-foreground/50'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                    {/* Instructions */}
                    <div className="absolute bottom-4 left-4 z-10">
                      <p className={`text-xs backdrop-blur-sm px-2 py-1 rounded-full transition-colors duration-300 ${
                        theme === 'dark' 
                          ? 'text-foreground/60 bg-surface/50' 
                          : 'text-gray-500 bg-white/80'
                      }`}>
                        {showMobile ? t('creationWeb.showcase.responsiveMobileDesign') : t('creationWeb.showcase.professionalDesktopExperience')}
                      </p>
                    </div>

                {/* Premium Device Mockups */}
                <div className="w-full h-full flex items-center justify-center relative">
                  {/* Laptop Mockup */}
                  <motion.div
                    initial={{ opacity: 1 }}
                    animate={{ 
                      opacity: showMobile ? 0.3 : 1,
                      scale: showMobile ? 0.8 : 1,
                      x: showMobile ? -100 : 0
                    }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="absolute"
                  >
                    <PremiumLaptop scenario={laptopScenario} />
                  </motion.div>

                  {/* Mobile Mockup */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, x: 100 }}
                    animate={{ 
                      opacity: showMobile ? 1 : 0,
                      scale: showMobile ? 1 : 0.8,
                      x: showMobile ? 0 : 100
                    }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="absolute"
                  >
                    <PremiumMobile scenario={mobileScenario} />
                  </motion.div>
                </div>

                {/* Premium Glow Effects */}
                <div className="absolute inset-0 bg-gradient-to-br from-highlight/5 to-primary/5 rounded-3xl blur-2xl"></div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className={`transition-colors duration-300 ${
          theme === 'dark' 
            ? 'bg-gradient-to-br from-background via-background to-primary/10' 
            : 'bg-gradient-to-br from-gray-50 via-white to-blue-50'
        }`}>
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
                  <h2 className={`text-3xl sm:text-4xl font-bold mb-6 transition-colors duration-300 ${
                    theme === 'dark' ? 'text-foreground' : 'text-gray-900'
                  }`}>
                    {t('creationWeb.showcase.ourWebCreationServices')}
                  </h2>
                  <p className={`text-lg max-w-3xl mx-auto transition-colors duration-300 ${
                    theme === 'dark' ? 'text-muted-foreground' : 'text-gray-600'
                  }`}>
                    {t('creationWeb.showcase.weSpecializeInCreating')}
                  </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <ServiceCard
                  key={index}
                  icon={service.icon}
                  title={service.title}
                  description={service.description}
                  delay={service.delay}
                  theme={theme}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CreationWebPage;
