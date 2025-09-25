"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Language = "en" | "fr";

// Define translations directly to avoid import issues
const translations = {
  en: {
    // Common
    common: {
      languageToggle: "Toggle Language",
      themeToggle: "Toggle Theme",
      muteVideo: "Mute video",
      unmuteVideo: "Unmute video"
    },
    // Navigation
    nav: {
    home: "Home",
    industry: "Industry",
    services: "Services",
    about: "About",
    robots: "Robots",
    faq: "FAQ",
    contact: "Contact",
      emenu: "E-menu",
      robotXbot: "Robot Xbot",
      robotAmy: "Robot Amy",
      robotPanda: "Robot Panda",
      creationWeb: "Creation Web"
    },
    // Home
    home: {
      heroTitle: "RKHAMI Consulting Group",
      heroStrategyWord: "Strategy.",
      heroDescription: "We partner with you to boost efficiency and innovation through tailored automation and strategic guidance.",
      whyChooseUsTitle: "Why Choose Us?",
      whyChooseUsSubtitle: "We provide tailor-made advice and robotics that allow companies to innovate, optimize operations and obtain measurable results.",
      phrases: {
        holisticTitle: "Holistic Approach",
        holisticDesc: "We combine strategic consulting with practical robotics implementation for comprehensive solutions.",
        tailoredTitle: "Tailored Solutions",
        tailoredDesc: "We understand that every business is unique and develop solutions to meet your specific challenges and goals.",
        localGlobalTitle: "Local Expertise, Global Vision",
        localGlobalDesc: "Based in Tunisia, we possess a deep understanding of the local market while maintaining a global perspective on technological advancements.",
        experiencedTitle: "Experienced Team",
        experiencedDesc: "Our consultants and engineers have a proven track record of delivering successful automation projects.",
        partnershipTitle: "Long-Term Partnership",
        partnershipDesc: "We are committed to building lasting relationships with our clients, providing ongoing support and guidance."
      }
    },
    // Services
    services: {
      topLabel: "Consulting service",
      title: "Strategic consulting services",
      subtitle1: "For intelligent automation",
      subtitle2: "We offer expert advice to help you unlock the full potential of automation.",
      items: {
        automationStrategyTitle: "Automation Strategy Development",
        automationStrategyDesc: "Defining clear objectives and roadmaps for robotics integration.",
        changeManagementTitle: "Change Management",
        changeManagementDesc: "Guiding organizations through the transition and adoption of new technologies.",
        processOptimizationTitle: "Process Optimization",
        processOptimizationDesc: "Analyzing existing workflows to identify bottlenecks and areas for improvement through automation.",
        trainingTitle: "Training & Skill Development",
        trainingDesc: "Equipping your team with the knowledge and skills to work effectively with robotic systems.",
        feasibilityTitle: "Feasibility Studies & ROI Analysis",
        feasibilityDesc: "Evaluating the technical and economic viability of robotics solutions."
      }
    },
    // About
    about: {
      whoWeAre: "Who We Are?",
      titleLine1: "Led by a goal,",
      titleLine2: "Powered by innovation.",
      subtitle1: "We are a dedicated advisory and automation company",
      subtitle2: "to help organizations transform complexity into clarity.",
      missionTitle: "Our Mission",
      missionDesc: "To empower businesses across various sectors to achieve unprecedented levels of efficiency, productivity, and innovation through tailored automation solutions and strategic guidance.",
      missionBullet: "We bring together a team of seasoned consultants with deep industry knowledge and robotics engineers at the forefront of automation advancements.",
      visionTitle: "Our Vision",
      visionBullet1: "To be the leading catalyst for transformative growth in Tunisia and beyond, enabling organizations to thrive in the age of intelligent automation.",
      visionBullet2: "We envision a future where businesses seamlessly integrate robotics and data-driven strategies to optimize operations, enhance safety, and unlock new opportunities."
    },
    // Industries
    industries: {
      topLabel: "Industries We Serve",
      title: "Engine automation",
      subtitle1: "Through the key sectors",
      subtitle2: "We associate ourselves with companies in critical industries to implement tailor-made automation solutions that transform operations, stimulate productivity and feed sustainable growth.",
      cards: {
        foodTitle: "Food & Beverage",
        foodDesc: "We optimize food production and packaging lines with robotics that meet hygiene standards, ensuring consistency, safety, and speed.",
        agricultureTitle: "Agriculture",
        agricultureDesc: "We implement robotic systems for planting, harvesting, and monitoring crops, increasing efficiency while reducing labor-intensive operations.",
        logisticsTitle: "Logistics & Warehousing",
        logisticsDesc: "Our automation solutions improve inventory tracking, material handling, and order fulfillment through smart robotics like AMRs and automated picking systems.",
        manufacturingTitle: "Manufacturing",
        manufacturingDesc: "We streamline production lines with robotic systems, improving precision, reducing downtime, and increasing throughput for factories and industrial plants.",
        healthcareTitle: "Healthcare",
        healthcareDesc: "We assist hospitals and clinics in integrating service robots to enhance patient care, automate administrative tasks, and support sterile logistics.",
        retailTitle: "Retail",
        retailDesc: "We help retail businesses adopt automation for inventory management, self-checkout systems, and customer interaction tools, enhancing the shopping experience."
      }
    },
    // FAQ
    faq: {
      topLabel: "Questions & Answers",
      title: "Any questions?",
      subtitle1: "We got you",
      description: "Find answers to the most commonly asked questions about our services, implementation process, and how we can help transform your business through innovative automation solutions.",
      items: {
        q1: "What industries do you work with?",
        a1: "We work across multiple sectors, including manufacturing, healthcare, logistics, agriculture, retail, and more. Our solutions are tailored to each industry’s specific needs.",
        q2: "Do I need to have technical knowledge to work with you?",
        a2: "Not at all. Our team guides you through every step, from strategy development to implementation, in clear and accessible language.",
        q3: "Can your automation solutions be integrated into existing systems?",
        a3: "Yes. We specialize in seamless integration of robotics and automation into your current infrastructure to minimize disruption and maximize efficiency.",
        q4: "How long does a typical project take?",
        a4: "Timelines vary based on the project scope. After an initial consultation, we provide a clear roadmap with milestones and estimated completion dates.",
        q5: "Do you offer post-deployment support?",
        a5: "Absolutely. We provide ongoing technical support, training, and maintenance to ensure your systems continue to perform optimally.",
        q6: "What’s your approach to ROI and cost analysis?",
        a6: "We conduct thorough feasibility studies and ROI assessments before implementation to ensure the investment aligns with your goals."
      }
    },
    // Footer
    footer: {
      rcg: "RCG",
      rkhamiConsultingGroup: "RKHAMI Consulting Group",
      contact: "Contact",
      tunisOffice: "Tunis Office",
      address: "Immeuble Carthage Palace, Bloc A, 5ème Etage App. A51, Centre Urbain Nord, 1082 Tunis, Tunisie",
      copyright: "© 2025 RKHAMI Consulting Group. All rights reserved."
    },
    // Robots
    robots: {
      nameXbot: "Oxbot",
      nameAmy: "Amy",
      namePanda: "Panda",
      keyFeatures: "Key Features",
      advancedFeatures: "Advanced Features",
      realImpact: "Real Impact",
      featuresBadge: "Features",
      builtToAutomate: "Built to Automate",
      designedToPerform: "Designed to Perform.",
      serviceCases: "Service Cases",
      realWorldImpact: "Real-World Impact Across Industries",
      trustedByLeaders: "Trusted by Leaders in Logistics and Manufacturing",
      xbot: {
        headline: "Revolutionizing Industrial Delivery",
        subhead: "Your Smart Logistics Assistant",
        intro: "Oxbot is an advanced Autonomous Mobile Robot (AMR) engineered to streamline industrial material handling. With impressive features like 500kg payload, 40m LiDAR, and RGBD obstacle avoidance, Oxbot ensures smooth, efficient, and safe transport across warehouses and factories.",
        impactDesc: "From smart warehouses to automated production lines, Oxbot delivers real results. Our robots are deployed in diverse industrial settings, improving efficiency, accuracy, and safety with every task.",
        bullets: {
          screenTitle: "13.3\" Full HD Touchscreen",
          screenDesc: "Clear, user-friendly interface for seamless operation",
          batteryTitle: "24V40AH Lithium Battery",
          batteryDesc: "Long life, high safety, zero combustion",
          navTitle: "Smart Navigation",
          navDesc: "LiDAR + RGBD camera for 3D obstacle detection",
          modularTitle: "Modular Design",
          modularDesc: "Choose between Standard / Bin / Shelf modes",
          modelsTitle: "Multiple Models",
          modelsDesc: "F150 (150kg), F300 (300kg), F500 (500kg)"
        }
        ,
        carousel: {
          loadTitle: "500KG Max Load Capacity",
          loadDesc: "The body is made from 80% high-strength aluminum alloy, ensuring excellent stability. Designed for repetitive and cyclical transportation of heavy goods, with broad application scenarios to enhance efficiency and reliability in material flow.",
          lidarTitle: "40m LiDAR",
          lidarDesc: "Equipped with advanced LiDAR technology for real-time navigation and safety. Suitable for factories covering tens of thousands of square meters and adaptable to various operational environments.",
          rgbdTitle: "RGBD High-Definition Camera",
          rgbdDesc: "Binocular cameras + LiDAR, three-dimensional intelligent obstacle avoidance, real-time perception of the dynamic environment.",
          touchscreenTitle: "13.3-Inch Touchscreen",
          touchscreenDesc: "The large screen displays information query, map, etc. more clearly.",
          thresholdsTitle: "Thresholds and Grooves Crossed Freely",
          thresholdsDesc: "Equipped with 8-inch main drive wheels and 5-inch large double-row universal wheels. Delivers robust power to overcome 30mm thresholds and 40mm grooves with ease, enabling precise material transfer between production lines and meeting autonomous elevator riding requirements.",
          batteryTitle: "High-Security Lithium-Ion Battery",
          batteryDesc: "Battery capacity 24V40AH, high temperature resistant, non-explosive, non-combustible, providing safe and reliable use, long battery life."
        }
      },
      amy: {
        headline: "The Future of Smart Hospitality",
        subhead: "Your Interactive Delivery Companion",
        intro: "Amy is a service delivery robot designed for restaurants, hotels, and commercial spaces. With voice interaction, obstacle avoidance, and high-precision LiDAR navigation, Amy delivers items smoothly and interacts naturally with guests.",
        impactDesc: "From smart warehouses to automated production lines, Amy delivers real results. Our robots are deployed in diverse industrial settings, improving efficiency, accuracy, and safety with every task.",
        bullets: {
          screenTitle: "13\" HD Touch Screen",
          screenDesc: "Intuitive user interface for orders and interaction",
          batteryTitle: "15Ah Battery Capacity",
          batteryDesc: "8+ hours of operation with 2–3h fast charging",
          speedTitle: "0–1.5 m/s Walking Speed",
          speedDesc: "Smooth and stable indoor mobility",
          accuracyTitle: "±50mm Positioning Accuracy",
          accuracyDesc: "Precise navigation in dynamic spaces",
          loadTitle: "5kg Load Capacity",
          loadDesc: "Dual tray design ideal for hospitality and service",
          sensorsTitle: "40m LiDAR + Ultrasonic Sensors",
          sensorsDesc: "Advanced obstacle avoidance",
          osTitle: "Android OS + Voice AI (Smartstar)",
          osDesc: "Smart communication and dish guidance"
        }
        ,
        carousel: {
          welcomeTitle: "Welcome and Attract Guests",
          welcomeDesc: "The humanoid Amy robot supports facial recognition sensing and plays welcome and promotional messages.",
          voiceTitle: "Intelligent Voice Interaction",
          voiceDesc: "Built in self-developed vertical large model 'Smartstar' AI voice interaction, natural semantic understanding, personification and efficient communication.",
          trayTitle: "Double Layer Tray",
          trayDesc: "The double-layer tray can carry about 5 kilograms, and the tray size meets various usage ranges in the catering industry.",
          dishesTitle: "Introduction to Dishes",
          dishesDesc: "Voice recommendation of featured dishes, food introduction, today's specials, set meals, etc., to provide customers with more dish references.",
          deliveryTitle: "Efficient Food Delivery",
          deliveryDesc: "High-precision navigation indoors, stable and free movement; shock absorption system effectively enhances driving stability and prevents food from spilling.",
          obstacleTitle: "Autonomous Obstacle Avoidance",
          obstacleDesc: "Combining LiDAR and depth camera, it has the ability of stereoscopic perception and obstacle avoidance, accurately identifying obstacles such as table legs and table tops. Perceive real-time personnel walking around, choose the optimal route to advance, and reach the target point."
        }
      },
      panda: {
        headline: "The Future of Food Delivery",
        subhead: "Your Reliable Service Robot",
        intro: "Panda is a smart delivery robot designed for restaurants and hospitality environments. With a 3-layer tray, high-speed navigation (up to 2 m/s), and real-time obstacle avoidance, Panda ensures fast, safe, and efficient meal delivery even in narrow spaces.",
        impactDesc: "From smart warehouses to automated production lines, Panda delivers real results. Our robots are deployed in diverse industrial settings, improving efficiency, accuracy, and safety with every task.",
        bullets: {
          screenTitle: "10.1\" HD Touch Screen",
          screenDesc: "Intuitive display for menus, orders, and interaction",
          batteryTitle: "15Ah Battery Capacity",
          batteryDesc: "Ensures ≥8 hours of uninterrupted service",
          speedTitle: "0–2 m/s Walking Speed",
          speedDesc: "Fast, stable navigation with smooth movement",
          accuracyTitle: "±50mm Positioning Accuracy",
          accuracyDesc: "High precision in tight and crowded spaces",
          loadTitle: "30kg Load Capacity",
          loadDesc: "Multi-layer tray system ideal for restaurants",
          sensorsTitle: "40m LiDAR + Depth Cameras",
          sensorsDesc: "Real-time dynamic obstacle avoidance",
          chassisTitle: "Independent Suspension Chassis",
          chassisDesc: "Enhanced balance and shock absorption",
          osTitle: "Smartstar™ Voice AI + Android OS",
          osDesc: "Natural voice interaction and dish recommendations"
        }
        ,
        carousel: {
          trayTitle: "Multi Layer Tray",
          trayDesc: "The 3-layer tray can carry about 40 kilograms, and the tray size meets various usage ranges in the catering industry. One delivery can reach multiple dining tables.",
          narrowTitle: "Narrow Passage",
          narrowDesc: "Centimeter level precise positioning, easy access to narrow roads, more suitable for restaurant environments.",
          smoothTitle: "Efficient and Smooth Delivery of Meals",
          smoothDesc: "Realize high-precision indoor navigation and stable free movement; The shock absorption system effectively enhances the stability of the driving process and prevents food from spilling out.",
          obstacleTitle: "Autonomous Obstacle Avoidance",
          obstacleDesc: "Combining LiDAR and depth camera, it has the ability of stereoscopic perception and obstacle avoidance, accurately identifying obstacles such as table legs and table tops. Perceive real-time personnel walking around, choose the optimal route to advance, and reach the target point.",
          voltageTitle: "Safe Voltage",
          voltageDesc: "24V safe voltage <36V safe voltage for human body, More secure",
          voiceTitle: "Intelligent Voice Interaction",
          voiceDesc: "Built in self-developed vertical large model 'Smartstar' AI voice interaction, natural semantic understanding, personification and efficient communication"
        }
      }
    },
    // E-menu
    emenu: {
      badge: "Digital Menu Solution",
      title: "E-menu",
      subtitle: "Guests scan a QR code at the table to view your live menu and order—fast, contactless, and beautiful on every device.",
      highlights: {
        noApp: "No App Required",
        instantAccess: "Instant Access",
        realtimeUpdates: "Real-time Updates"
      },
      premiumBadge: "Premium Experience",
      whyTitle: "Why E-menu",
      whySubtitle: "Designed for global brands and modern hospitality—fast, elegant, and effortless for every guest.",
      howTitle: "How it works",
      howSubtitle: "From scan to order and management in six steps.",
      steps: {
        scanTitle: "Scan QR",
        scanDesc: "Guests scan the table QR code with their phone camera.",
        openTitle: "Open Menu",
        openDesc: "A fast, responsive menu opens instantly.",
        browseTitle: "Browse & Customize Items",
        browseDesc: "Guests can view menu categories, select items, and customize options (ingredients, size, quantity).",
        orderTitle: "Place Order",
        orderDesc: "Add items and submit orders contactlessly.",
        dashboardTitle: "Restaurant Dashboard",
        dashboardDesc: "Staff receives orders in real-time, updates menu items, marks orders as ready, and manages inventory.",
        assistTitle: "Assistance & Notifications",
        assistDesc: "Guests can call the waiter or request help. Staff receives notifications for requests."
      },
      featureCards: {
        contactlessTitle: "Contactless Ordering",
        contactlessDesc: "Browse items, add to cart, and place orders right from the phone.",
        realtimeTitle: "Real-Time Updates",
        realtimeDesc: "Edit prices and availability in seconds—changes go live instantly."
      },
      globalTitle: "Global by design",
      globalSubtitle: "Built for international restaurants and diverse customer bases",
      globalCards: {
        multilingualTitle: "Multilingual",
        multilingualDesc: "Serve menus in multiple languages with easy switching.",
        rtlTitle: "RTL Support",
        rtlDesc: "Right‑to‑left layouts for Arabic, Hebrew, and more.",
        localizationTitle: "Localization",
        localizationDesc: "Localized currencies, formats, and regional preferences."
      },
      ctaTitle: "Ready to modernize your dining?",
      ctaSubtitle: "Launch a beautiful, contactless menu in minutes.",
      ctaButton: "Contact us"
    },
    // Contact
    contactPage: {
      heroTitle: "Contact us",
      heroSubtitle: "Rakhami Group is ready to provide the right solution according to your needs",
      getInTouchTitle: "Get in touch",
      getInTouchSubtitle: "Ready to discuss your project? Schedule a meeting with our CEO to explore how we can help transform your business.",
      headOffice: "Head Office",
      emailUs: "Email Us",
      callUs: "Call Us",
      followSocial: "Follow our social media",
      formTitle: "Schedule Meeting with Mr Rakhami",
      formIntro: "Fill out the form below and we'll get back to you ASAP to schedule your meeting.",
      labels: {
        companyName: "Company Name *",
        emailAddress: "Email Address *",
        meetingDate: "Meeting Date *",
        meetingTime: "Meeting Time *",
        industry: "Industry *",
        description: "Project Description (Optional)"
      },
      placeholders: {
        companyName: "Enter your company name",
        emailAddress: "Enter a valid email address",
        industry: "Select your industry",
        description: "Tell us about your project, goals, or any specific requirements...",
        timeSlot: "Select a time slot"
      },
      helpers: {
        availableMonths: "Available up to 3 months in advance",
        slotWindow: "30-minute slots between 9:00 AM - 4:00 PM",
        descriptionHelp: "This helps us prepare for our discussion"
      },
      submit: "Schedule Meeting",
      submitting: "Scheduling Meeting...",
      errors: {
        failed: "Failed to send meeting request. Please try again.",
        network: "Network error. Please check your connection and try again."
      },
      success: {
        title: "Meeting Request Sent!",
        description: "Thank you for your interest! We've received your meeting request and will send you an email confirmation ASAP to confirm the meeting details.",
        button: "Got it, thanks!"
      }
    },
    // Creation Web
    creationWeb: {
      heroTitle: "Web Creation Services",
      heroSubtitle: "Modern, Responsive & Animated Websites",
      heroDescription: "We build cutting-edge websites that combine stunning design with powerful functionality. From e-commerce platforms to business sites and personal portfolios, we create digital experiences that engage your audience and drive results.",
      ctaButton: "Get Your Website",
      services: {
        ecommerce: {
          title: "E-commerce Solutions",
          description: "Complete online stores with secure payment processing, inventory management, and customer analytics."
        },
        business: {
          title: "Business Websites",
          description: "Professional corporate sites with modern design, mobile responsiveness, and integrated business tools."
        },
        personal: {
          title: "Personal Portfolios",
          description: "Stunning personal websites and portfolios that showcase your work and attract opportunities."
        }
      },
      features: {
        modern: "Modern Design",
        responsive: "Mobile Responsive",
        animated: "Smooth Animations",
        fast: "Lightning Fast",
        seo: "SEO Optimized",
        secure: "Secure & Reliable"
      },
      showcase: {
        premiumDesign: "Premium Design",
        desktop: "Desktop",
        mobile: "Mobile",
        scenarios: "Scenarios",
        responsiveMobileDesign: "Responsive mobile design",
        professionalDesktopExperience: "Professional desktop experience",
        ourWebCreationServices: "Our Web Creation Services",
        weSpecializeInCreating: "We specialize in creating modern, responsive, and engaging websites that help your business thrive in the digital world."
      },
      mockups: {
        enterpriseDashboard: "Enterprise Dashboard",
        luxuryEcommerce: "Luxury E-commerce",
        b2bPlatform: "B2B Platform",
        mobileCheckout: "Mobile Checkout",
        bookingApp: "Booking App",
        clientDashboard: "Client Dashboard",
        analyticsPro: "Analytics Pro",
        luxe: "LUXE",
        techFlow: "TechFlow",
        diamondRing: "Diamond Ring",
        goldWatch: "Gold Watch",
        pearlNecklace: "Pearl Necklace",
        cloudSolutions: "Cloud Solutions",
        dataAnalytics: "Data Analytics",
        aiIntegration: "AI Integration",
        consultation: "Consultation",
        designReview: "Design Review",
        strategySession: "Strategy Session",
        cardDetails: "Card Details",
        verification: "Verification",
        processing: "Processing",
        paymentReceived: "Payment received",
        transferSent: "Transfer sent",
        salaryDeposit: "Salary deposit",
        revenue: "Revenue",
        growth: "Growth",
        accountBalance: "Account Balance",
        quickActions: "Quick Actions",
        recentActivity: "Recent Activity",
        selectService: "Select Service",
        availableTimes: "Available Times",
        bookNow: "Book Now",
        booking: "Booking...",
        payNow: "Pay Now",
        checkout: "Checkout",
        myAccount: "My Account",
        transfer: "Transfer",
        payBills: "Pay Bills",
        viewingNow: "viewing now",
        accountActive: "Account active",
        implementationInProgress: "Implementation in Progress"
      }
    }
  },
  fr: {
    // Common
    common: {
      languageToggle: "Basculer la langue",
      themeToggle: "Basculer le thème",
      muteVideo: "Couper le son de la vidéo",
      unmuteVideo: "Activer le son de la vidéo"
    },
    // Navigation
    nav: {
    home: "Accueil",
    industry: "Industrie",
    services: "Services",
    about: "À propos",
    robots: "Robots",
    faq: "FAQ",
    contact: "Contact",
      emenu: "E-menu",
      robotXbot: "Robot Xbot",
      robotAmy: "Robot Amy",
      robotPanda: "Robot Panda",
      creationWeb: "Création Web"
    },
    // Home
    home: {
      heroTitle: "RKHAMI Consulting Group",
      heroStrategyWord: "Stratégie.",
      heroDescription: "Nous vous accompagnons pour booster l'efficacité et l'innovation grâce à une automatisation sur mesure et des conseils stratégiques.",
      whyChooseUsTitle: "Pourquoi nous choisir ?",
      whyChooseUsSubtitle: "Nous fournissons des conseils et une robotique sur mesure permettant aux entreprises d'innover, d'optimiser les opérations et d'obtenir des résultats mesurables.",
      phrases: {
        holisticTitle: "Approche holistique",
        holisticDesc: "Nous combinons conseil stratégique et mise en œuvre robotique pratique pour des solutions complètes.",
        tailoredTitle: "Solutions sur mesure",
        tailoredDesc: "Nous savons que chaque entreprise est unique et développons des solutions adaptées à vos défis et objectifs.",
        localGlobalTitle: "Expertise locale, vision globale",
        localGlobalDesc: "Basés en Tunisie, nous comprenons le marché local tout en gardant une perspective mondiale sur les avancées technologiques.",
        experiencedTitle: "Équipe expérimentée",
        experiencedDesc: "Nos consultants et ingénieurs ont fait leurs preuves dans la réussite de projets d'automatisation.",
        partnershipTitle: "Partenariat à long terme",
        partnershipDesc: "Nous construisons des relations durables, avec un accompagnement et un support continus."
      }
    },
    // Services
    services: {
      topLabel: "Service de conseil",
      title: "Services de conseil stratégique",
      subtitle1: "Pour une automatisation intelligente",
      subtitle2: "Nous offrons des conseils d'experts pour vous aider à exploiter tout le potentiel de l'automatisation.",
      items: {
        automationStrategyTitle: "Développement de stratégie d'automatisation",
        automationStrategyDesc: "Définir des objectifs clairs et des feuilles de route pour l'intégration de la robotique.",
        changeManagementTitle: "Conduite du changement",
        changeManagementDesc: "Accompagner les organisations dans la transition et l'adoption de nouvelles technologies.",
        processOptimizationTitle: "Optimisation des processus",
        processOptimizationDesc: "Analyser les flux existants pour identifier les goulots d'étranglement et les axes d'amélioration via l'automatisation.",
        trainingTitle: "Formation et développement des compétences",
        trainingDesc: "Doter vos équipes des connaissances et compétences pour travailler efficacement avec les systèmes robotiques.",
        feasibilityTitle: "Études de faisabilité et analyse du ROI",
        feasibilityDesc: "Évaluer la viabilité technique et économique des solutions robotiques."
      }
    },
    // About
    about: {
      whoWeAre: "Qui sommes-nous ?",
      titleLine1: "Guidés par un objectif,",
      titleLine2: "Portés par l'innovation.",
      subtitle1: "Nous sommes une société de conseil et d'automatisation dédiée",
      subtitle2: "à aider les organisations à transformer la complexité en clarté.",
      missionTitle: "Notre mission",
      missionDesc: "Permettre aux entreprises de divers secteurs d'atteindre des niveaux inédits d'efficacité, de productivité et d'innovation grâce à des solutions d'automatisation sur mesure et un accompagnement stratégique.",
      missionBullet: "Nous réunissons des consultants expérimentés et des ingénieurs en robotique à la pointe des avancées.",
      visionTitle: "Notre vision",
      visionBullet1: "Être le catalyseur de croissance transformative en Tunisie et au-delà, pour prospérer à l'ère de l'automatisation intelligente.",
      visionBullet2: "Un avenir où les entreprises intègrent la robotique et la donnée pour optimiser leurs opérations, renforcer la sécurité et créer de nouvelles opportunités."
    },
    // Industries
    industries: {
      topLabel: "Secteurs que nous servons",
      title: "Automatisation moteur",
      subtitle1: "À travers les secteurs clés",
      subtitle2: "Nous collaborons avec des entreprises de secteurs critiques pour déployer des solutions d'automatisation sur mesure qui transforment les opérations, stimulent la productivité et soutiennent une croissance durable.",
      cards: {
        foodTitle: "Agroalimentaire",
        foodDesc: "Nous optimisons la production et le conditionnement avec des robots conformes aux normes d'hygiène, pour la constance, la sécurité et la rapidité.",
        agricultureTitle: "Agriculture",
        agricultureDesc: "Mise en place de systèmes robotiques pour planter, récolter et surveiller les cultures, en augmentant l'efficacité tout en réduisant les tâches pénibles.",
        logisticsTitle: "Logistique & Entrepôts",
        logisticsDesc: "Nos solutions améliorent le suivi des stocks, la manutention et la préparation de commandes via des robots intelligents (AMR, picking automatisé).",
        manufacturingTitle: "Manufacturing",
        manufacturingDesc: "Nous rationalisons les lignes de production avec des systèmes robotiques, améliorant la précision, réduisant les arrêts et augmentant le débit.",
        healthcareTitle: "Santé",
        healthcareDesc: "Nous aidons hôpitaux et cliniques à intégrer des robots de service pour améliorer les soins, automatiser l'administratif et soutenir la logistique stérile.",
        retailTitle: "Retail",
        retailDesc: "Nous aidons le retail à adopter l'automatisation pour la gestion des stocks, le self-checkout et les outils d'interaction client."
      }
    },
    // FAQ
    faq: {
      topLabel: "Questions & Réponses",
      title: "Des questions ?",
      subtitle1: "On s'en charge",
      description: "Trouvez des réponses aux questions les plus fréquentes sur nos services, notre processus de mise en œuvre et comment nous pouvons transformer votre activité grâce à l'automatisation.",
      items: {
        q1: "Avec quels secteurs travaillez-vous ?",
        a1: "Nous intervenons dans de nombreux secteurs : manufacturing, santé, logistique, agriculture, retail, etc. Nos solutions sont adaptées aux besoins de chaque industrie.",
        q2: "Dois-je avoir des connaissances techniques pour travailler avec vous ?",
        a2: "Pas du tout. Nous vous accompagnons à chaque étape, de la stratégie à la mise en œuvre, avec un langage clair et accessible.",
        q3: "Vos solutions s'intègrent-elles à des systèmes existants ?",
        a3: "Oui. Nous sommes spécialisés dans l'intégration fluide de la robotique et de l'automatisation pour minimiser les perturbations et maximiser l'efficacité.",
        q4: "Combien de temps dure un projet type ?",
        a4: "La durée dépend de l'étendue du projet. Après une consultation initiale, nous fournissons une feuille de route claire avec jalons et dates estimées.",
        q5: "Proposez-vous un support après déploiement ?",
        a5: "Absolument. Nous assurons support technique, formation et maintenance pour des performances optimales dans la durée.",
        q6: "Quelle est votre approche du ROI et des coûts ?",
        a6: "Nous réalisons des études de faisabilité et des analyses de ROI avant la mise en œuvre pour garantir l'adéquation avec vos objectifs."
      }
    },
    // Footer
    footer: {
      rcg: "RCG",
      rkhamiConsultingGroup: "RKHAMI Consulting Group",
      contact: "Contact",
      tunisOffice: "Bureau de Tunis",
      address: "Immeuble Carthage Palace, Bloc A, 5ème Etage App. A51, Centre Urbain Nord, 1082 Tunis, Tunisie",
      copyright: "© 2025 RKHAMI Consulting Group. Tous droits réservés."
    },
    // Robots
    robots: {
      nameXbot: "Oxbot",
      nameAmy: "Amy",
      namePanda: "Panda",
      keyFeatures: "Caractéristiques clés",
      advancedFeatures: "Fonctionnalités avancées",
      realImpact: "Impact réel",
      featuresBadge: "Fonctionnalités",
      builtToAutomate: "Conçu pour automatiser",
      designedToPerform: "Conçu pour performer.",
      serviceCases: "Cas clients",
      realWorldImpact: "Impact réel dans les industries",
      trustedByLeaders: "Plébiscité par les leaders de la logistique et du manufacturing",
      xbot: {
        headline: "Révolutionner la livraison industrielle",
        subhead: "Votre assistant logistique intelligent",
        intro: "Oxbot est un AMR avancé pour le flux de matériaux. Avec 500 kg de charge, LiDAR 40 m et évitement d'obstacles RGBD, il assure un transport fluide et sûr dans entrepôts et usines.",
        impactDesc: "Des entrepôts intelligents aux lignes de production, Oxbot délivre des résultats concrets en efficacité, précision et sécurité.",
        bullets: {
          screenTitle: "Écran tactile Full HD 13,3\"",
          screenDesc: "Interface claire et conviviale pour une exploitation fluide",
          batteryTitle: "Batterie lithium 24V40AH",
          batteryDesc: "Longue durée de vie, haute sécurité, zéro combustion",
          navTitle: "Navigation intelligente",
          navDesc: "LiDAR + caméra RGBD pour détection d'obstacles 3D",
          modularTitle: "Conception modulaire",
          modularDesc: "Modes Standard / Bac / Étagère au choix",
          modelsTitle: "Multiples modèles",
          modelsDesc: "F150 (150kg), F300 (300kg), F500 (500kg)"
        }
        ,
        carousel: {
          loadTitle: "Capacité de charge maximale 500 kg",
          loadDesc: "Structure composée à 80% d'alliage d'aluminium haute résistance pour une excellente stabilité. Conçu pour des transports répétitifs et cycliques de charges lourdes, améliorant l'efficacité et la fiabilité des flux.",
          lidarTitle: "LiDAR 40 m",
          lidarDesc: "LiDAR avancé pour la navigation et la sécurité en temps réel. Adapté aux grandes usines et divers environnements.",
          rgbdTitle: "Caméra RGBD haute définition",
          rgbdDesc: "Caméras binoculaires + LiDAR pour un évitement d'obstacles 3D et une perception en temps réel.",
          touchscreenTitle: "Écran tactile 13,3\"",
          touchscreenDesc: "Affichage plus clair des informations, cartes, etc.",
          thresholdsTitle: "Franchit seuils et rainures",
          thresholdsDesc: "Roues motrices 8'' et roulettes 5'' pour franchir des seuils de 30 mm et des rainures de 40 mm, transfert précis entre lignes et compatibilité ascenseur.",
          batteryTitle: "Batterie lithium-ion haute sécurité",
          batteryDesc: "24V40AH, résistante aux hautes températures, non explosive, non inflammable, pour une sécurité et une autonomie élevées."
        }
      },
      amy: {
        headline: "L'avenir de l'hôtellerie intelligente",
        subhead: "Votre compagnon de livraison interactif",
        intro: "Amy est un robot de service pour restaurants, hôtels et espaces commerciaux. Interaction vocale, évitement d'obstacles et navigation LiDAR haute précision pour des livraisons fluides.",
        impactDesc: "Des entrepôts intelligents aux lignes de production, Amy apporte des gains réels en efficacité, précision et sécurité.",
        bullets: {
          screenTitle: "Écran tactile HD 13\"",
          screenDesc: "Interface intuitive pour commandes et interactions",
          batteryTitle: "Batterie 15Ah",
          batteryDesc: "Plus de 8 h d'autonomie, charge rapide 2–3 h",
          speedTitle: "Vitesse 0–1,5 m/s",
          speedDesc: "Déplacements intérieurs fluides et stables",
          accuracyTitle: "Précision de positionnement ±50 mm",
          accuracyDesc: "Navigation précise en environnements dynamiques",
          loadTitle: "Charge utile 5 kg",
          loadDesc: "Double plateau idéal pour l'hôtellerie et le service",
          sensorsTitle: "LiDAR 40 m + capteurs ultrason",
          sensorsDesc: "Évitement d'obstacles avancé",
          osTitle: "Android + IA vocale (Smartstar)",
          osDesc: "Communication intelligente et recommandation de plats"
        }
        ,
        carousel: {
          welcomeTitle: "Accueil et attraction des clients",
          welcomeDesc: "Reconnaissance faciale et diffusion de messages d'accueil et promotionnels.",
          voiceTitle: "Interaction vocale intelligente",
          voiceDesc: "IA vocale Smartstar développée en interne, compréhension naturelle et communication efficace.",
          trayTitle: "Plateau double niveau",
          trayDesc: "Double plateau supportant ~5 kg, adapté à la restauration.",
          dishesTitle: "Présentation des plats",
          dishesDesc: "Recommandations vocales, plats du jour, menus, etc., pour guider le client.",
          deliveryTitle: "Service de livraison efficace",
          deliveryDesc: "Navigation intérieure précise, mouvement stable; amortissement pour éviter les renversements.",
          obstacleTitle: "Évitement d'obstacles autonome",
          obstacleDesc: "LiDAR + caméra de profondeur pour identifier précisément obstacles et personnes et choisir la meilleure trajectoire."
        }
      },
      panda: {
        headline: "L'avenir de la livraison de repas",
        subhead: "Votre robot de service fiable",
        intro: "Panda est conçu pour la restauration et l'hôtellerie. Plateau à 3 niveaux, navigation rapide (jusqu'à 2 m/s) et évitement d'obstacles en temps réel pour des livraisons rapides et sûres.",
        impactDesc: "Des entrepôts intelligents aux lignes de production, Panda délivre des résultats tangibles en efficacité, précision et sécurité.",
        bullets: {
          screenTitle: "Écran tactile HD 10,1\"",
          screenDesc: "Affichage intuitif pour menus, commandes et interaction",
          batteryTitle: "Batterie 15Ah",
          batteryDesc: "Assure ≥ 8 h de service ininterrompu",
          speedTitle: "Vitesse 0–2 m/s",
          speedDesc: "Navigation rapide et stable, mouvements fluides",
          accuracyTitle: "Précision de positionnement ±50 mm",
          accuracyDesc: "Haute précision dans les espaces exigus",
          loadTitle: "Charge utile 30 kg",
          loadDesc: "Plateaux multi‑niveaux adaptés à la restauration",
          sensorsTitle: "LiDAR 40 m + caméras de profondeur",
          sensorsDesc: "Évitement d'obstacles dynamique en temps réel",
          chassisTitle: "Châssis à suspension indépendante",
          chassisDesc: "Meilleur équilibre et amortissement",
          osTitle: "IA vocale Smartstar™ + Android",
          osDesc: "Interaction naturelle et recommandations de plats"
        }
        ,
        carousel: {
          trayTitle: "Plateau multi‑niveaux",
          trayDesc: "Plateau 3 niveaux jusqu'à ~40 kg, une livraison pour plusieurs tables.",
          narrowTitle: "Passage étroit",
          narrowDesc: "Positionnement au centimètre, circulation aisée dans des allées étroites.",
          smoothTitle: "Livraison de repas fluide et efficace",
          smoothDesc: "Navigation intérieure précise et mouvements stables; amortisseurs pour éviter les renversements.",
          obstacleTitle: "Évitement d'obstacles autonome",
          obstacleDesc: "LiDAR + caméra de profondeur pour détecter obstacles (pieds/plateaux de tables) et personnes en temps réel.",
          voltageTitle: "Tension sûre",
          voltageDesc: "Tension 24 V inférieure au seuil de 36 V pour le corps humain; plus sûr.",
          voiceTitle: "Interaction vocale intelligente",
          voiceDesc: "IA vocale Smartstar développée en interne, compréhension naturelle et communication efficace."
        }
      }
    },
    // E-menu
    emenu: {
      badge: "Solution de menu digital",
      title: "E-menu",
      subtitle: "Les clients scannent un QR au niveau de la table pour voir votre menu et commander — rapide, sans contact et superbe sur tous les appareils.",
      highlights: {
        noApp: "Sans application",
        instantAccess: "Accès instantané",
        realtimeUpdates: "Mises à jour en temps réel"
      },
      premiumBadge: "Expérience premium",
      whyTitle: "Pourquoi l'E-menu",
      whySubtitle: "Pensé pour les marques internationales et l'hôtellerie moderne — rapide, élégant et sans effort pour chaque client.",
      howTitle: "Comment ça marche",
      howSubtitle: "De l'analyse du QR à la commande et la gestion en six étapes.",
      steps: {
        scanTitle: "Scanner le QR",
        scanDesc: "Le client scanne le QR de la table avec son téléphone.",
        openTitle: "Ouvrir le menu",
        openDesc: "Un menu rapide et réactif s'ouvre instantanément.",
        browseTitle: "Parcourir et personnaliser",
        browseDesc: "Voir les catégories, choisir les plats et personnaliser (ingrédients, taille, quantité).",
        orderTitle: "Passer la commande",
        orderDesc: "Ajouter au panier et valider sans contact.",
        dashboardTitle: "Tableau de bord restaurant",
        dashboardDesc: "Le staff reçoit les commandes en temps réel, met à jour le menu et gère l'inventaire.",
        assistTitle: "Assistance et notifications",
        assistDesc: "Les clients peuvent appeler un serveur; le staff est notifié."
      },
      featureCards: {
        contactlessTitle: "Commande sans contact",
        contactlessDesc: "Parcourez, ajoutez au panier et commandez depuis le téléphone.",
        realtimeTitle: "Mises à jour en temps réel",
        realtimeDesc: "Modifiez prix et disponibilités en quelques secondes — en ligne instantanément."
      },
      globalTitle: "Conçu pour le monde",
      globalSubtitle: "Adapté aux restaurants internationaux et à des clientèles diverses",
      globalCards: {
        multilingualTitle: "Multilingue",
        multilingualDesc: "Servez vos menus en plusieurs langues avec un changement facile.",
        rtlTitle: "Support RTL",
        rtlDesc: "Mises en page de droite à gauche pour l'arabe, l'hébreu, etc.",
        localizationTitle: "Localisation",
        localizationDesc: "Devises, formats et préférences régionales localisés."
      },
      ctaTitle: "Prêt à moderniser votre service ?",
      ctaSubtitle: "Lancez un menu sans contact, élégant, en quelques minutes.",
      ctaButton: "Contactez-nous"
    },
    // Contact
    contactPage: {
      heroTitle: "Contactez-nous",
      heroSubtitle: "Rakhami Group est prêt à fournir la solution adaptée à vos besoins",
      getInTouchTitle: "Entrer en contact",
      getInTouchSubtitle: "Prêt à discuter de votre projet ? Planifiez un rendez‑vous avec notre CEO pour explorer comment nous pouvons transformer votre activité.",
      headOffice: "Siège",
      emailUs: "Nous écrire",
      callUs: "Nous appeler",
      followSocial: "Suivez-nous sur les réseaux",
      formTitle: "Planifier une réunion avec M. Rakhami",
      formIntro: "Remplissez le formulaire ci‑dessous et nous vous recontacterons rapidement pour planifier la réunion.",
      labels: {
        companyName: "Nom de l'entreprise *",
        emailAddress: "Adresse email *",
        meetingDate: "Date de réunion *",
        meetingTime: "Heure de réunion *",
        industry: "Secteur *",
        description: "Description du projet (optionnel)"
      },
      placeholders: {
        companyName: "Entrez le nom de votre entreprise",
        emailAddress: "Saisissez une adresse email valide",
        industry: "Sélectionnez votre secteur",
        description: "Parlez-nous de votre projet, objectifs ou exigences spécifiques...",
        timeSlot: "Sélectionnez un créneau"
      },
      helpers: {
        availableMonths: "Disponible jusqu'à 3 mois à l'avance",
        slotWindow: "Créneaux de 30 minutes entre 9:00 et 16:00",
        descriptionHelp: "Cela nous aide à préparer la discussion"
      },
      submit: "Planifier la réunion",
      submitting: "Planification en cours...",
      errors: {
        failed: "Échec de l'envoi. Veuillez réessayer.",
        network: "Erreur réseau. Vérifiez votre connexion puis réessayez."
      },
      success: {
        title: "Demande envoyée !",
        description: "Merci pour votre intérêt ! Nous avons bien reçu votre demande et vous enverrons une confirmation par email au plus vite.",
        button: "Compris, merci !"
      }
    },
    // Creation Web
    creationWeb: {
      heroTitle: "Services de Création Web",
      heroSubtitle: "Sites Web Modernes, Responsifs & Animés",
      heroDescription: "Nous créons des sites web de pointe qui allient design époustouflant et fonctionnalités puissantes. Des plateformes e-commerce aux sites d'entreprise et portfolios personnels, nous créons des expériences numériques qui captivent votre audience et génèrent des résultats.",
      ctaButton: "Obtenez Votre Site Web",
      services: {
        ecommerce: {
          title: "Solutions E-commerce",
          description: "Boutiques en ligne complètes avec traitement sécurisé des paiements, gestion des stocks et analyses clients."
        },
        business: {
          title: "Sites d'Entreprise",
          description: "Sites corporatifs professionnels avec design moderne, responsivité mobile et outils business intégrés."
        },
        personal: {
          title: "Portfolios Personnels",
          description: "Sites personnels et portfolios époustouflants qui mettent en valeur votre travail et attirent les opportunités."
        }
      },
      features: {
        modern: "Design Moderne",
        responsive: "Responsive Mobile",
        animated: "Animations Fluides",
        fast: "Ultra Rapide",
        seo: "Optimisé SEO",
        secure: "Sécurisé & Fiable"
      },
      showcase: {
        premiumDesign: "Design Premium",
        desktop: "Bureau",
        mobile: "Mobile",
        scenarios: "Scénarios",
        responsiveMobileDesign: "Design mobile responsive",
        professionalDesktopExperience: "Expérience bureau professionnelle",
        ourWebCreationServices: "Nos Services de Création Web",
        weSpecializeInCreating: "Nous nous spécialisons dans la création de sites web modernes, responsifs et engageants qui aident votre entreprise à prospérer dans le monde numérique."
      },
      mockups: {
        enterpriseDashboard: "Tableau de Bord Entreprise",
        luxuryEcommerce: "E-commerce de Luxe",
        b2bPlatform: "Plateforme B2B",
        mobileCheckout: "Paiement Mobile",
        bookingApp: "App de Réservation",
        clientDashboard: "Tableau de Bord Client",
        analyticsPro: "Analytics Pro",
        luxe: "LUXE",
        techFlow: "TechFlow",
        diamondRing: "Bague Diamant",
        goldWatch: "Montre Or",
        pearlNecklace: "Collier Perles",
        cloudSolutions: "Solutions Cloud",
        dataAnalytics: "Analytique de Données",
        aiIntegration: "Intégration IA",
        consultation: "Consultation",
        designReview: "Révision Design",
        strategySession: "Session Stratégie",
        cardDetails: "Détails Carte",
        verification: "Vérification",
        processing: "Traitement",
        paymentReceived: "Paiement reçu",
        transferSent: "Transfert envoyé",
        salaryDeposit: "Dépôt salaire",
        revenue: "Revenus",
        growth: "Croissance",
        accountBalance: "Solde du Compte",
        quickActions: "Actions Rapides",
        recentActivity: "Activité Récente",
        selectService: "Sélectionner un Service",
        availableTimes: "Créneaux Disponibles",
        bookNow: "Réserver Maintenant",
        booking: "Réservation...",
        payNow: "Payer Maintenant",
        checkout: "Commande",
        myAccount: "Mon Compte",
        transfer: "Transfert",
        payBills: "Payer les Factures",
        viewingNow: "en train de regarder",
        accountActive: "Compte actif",
        implementationInProgress: "Mise en œuvre en cours"
      }
    }
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
    let value: unknown = translations[language];
    
    for (const k of keys) {
      value = (value as Record<string, unknown>)?.[k];
    }
    
    if (!value) {
      console.warn(`Translation key not found: ${key}`);
      return key;
    }

    // Replace parameters if provided
    if (params) {
      return Object.entries(params).reduce((str, [key, val]) => {
        return str.replace(new RegExp(`{{${key}}}`, "g"), String(val));
      }, String(value));
    }

    return String(value);
  };

  const value: I18nContextType = {
    language,
    changeLanguage,
    t,
    mounted,
  };

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};
