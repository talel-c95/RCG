"use client";

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
}

const FAQAccordion: React.FC<FAQAccordionProps> = ({ items }) => {
  const [openItem, setOpenItem] = useState<string | null>(items[0]?.id || null);

  const toggleItem = (id: string) => {
    setOpenItem(openItem === id ? null : id);
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {items.map((item, index) => (
        <div
          key={item.id}
          className={`border-2 rounded-xl overflow-hidden bg-surface shadow-lg transition-all duration-300 hover:shadow-xl ${
            openItem === item.id 
              ? 'border-primary shadow-primary/20' 
              : 'border-border hover:border-primary/30'
          }`}
        >
                     <button
             onClick={() => toggleItem(item.id)}
             className={`w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-6 text-left flex items-center justify-between transition-all duration-300 ${
               openItem === item.id 
                 ? 'bg-gradient-to-r from-primary/5 to-accent/5' 
                 : 'hover:bg-gradient-to-r hover:from-muted/30 hover:to-muted/20'
             }`}
           >
             <h3 className={`text-base sm:text-lg font-semibold pr-3 sm:pr-4 ${
               openItem === item.id ? 'text-primary' : 'text-foreground'
             }`}>
               {item.question}
             </h3>
            <div className="flex-shrink-0">
              {openItem === item.id ? (
                <ChevronUp className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              ) : (
                <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 text-muted-foreground" />
              )}
            </div>
          </button>
          
          {openItem === item.id && (
            <div className="px-4 sm:px-6 lg:px-8 pb-4 sm:pb-6 border-t-2 border-primary/20 bg-gradient-to-b from-primary/5 to-transparent">
              <p className="text-muted-foreground leading-relaxed pt-4 sm:pt-6 text-sm sm:text-base">
                {item.answer}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

const FAQPage: React.FC = () => {
  // Sample FAQ data - you can replace this with your own questions and answers
  const faqItems: FAQItem[] = [
    {
      id: '1',
      question: 'What industries do you work with?',
      answer: 'We work across multiple sectors, including manufacturing, healthcare, logistics, agriculture, retail, and more. Our solutions are tailored to each industry’s specific needs.'
    },
    {
      id: '2',
      question: 'Do I need to have technical knowledge to work with you?',
      answer: 'Not at all. Our team guides you through every step, from strategy development to implementation, in clear and accessible language.'
    },
    {
      id: '3',
      question: 'Can your automation solutions be integrated into existing systems?',
      answer: 'Yes. We specialize in seamless integration of robotics and automation into your current infrastructure to minimize disruption and maximize efficiency.'
    },
    {
      id: '4',
      question: 'How long does a typical project take?',
      answer: 'Timelines vary based on the project scope. After an initial consultation, we provide a clear roadmap with milestones and estimated completion dates.'
    },
    {
      id: '5',
      question: 'Do you offer post-deployment support?',
      answer: 'Absolutely. We provide ongoing technical support, training, and maintenance to ensure your systems continue to perform optimally.'
    },
    {
      id: '6',
      question: 'What’s your approach to ROI and cost analysis?',
      answer: 'We conduct thorough feasibility studies and ROI assessments before implementation to ensure the investment aligns with your goals.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-surface/20">
      {/* Header Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-24 sm:pb-32">
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <div className="inline-block mb-4 sm:mb-6">
            <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-primary to-primary/60 rounded-full mx-auto"></div>
          </div>
          <h3 className="text-base sm:text-lg font-semibold text-primary mb-3 sm:mb-4 uppercase tracking-wider">
            Questions & Answers
          </h3>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-3 sm:mb-4">
            Any questions?
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground mb-4 sm:mb-6">
            We got you
          </p>
          <p className="text-base sm:text-lg text-muted-foreground/80 max-w-4xl mx-auto leading-relaxed px-4">
            Find answers to the most commonly asked questions about our services, 
            implementation process, and how we can help transform your business 
            through innovative automation solutions.
          </p>
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto relative px-4">
          {/* Background decoration */}
          <div className="absolute -top-10 -left-10 w-16 sm:w-20 h-16 sm:h-20 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-xl"></div>
          <div className="absolute -bottom-10 -right-10 w-24 sm:w-32 h-24 sm:h-32 bg-gradient-to-br from-highlight/10 to-primary/10 rounded-full blur-xl"></div>
          
          <FAQAccordion items={faqItems} />
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
