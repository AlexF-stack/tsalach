export type Dictionary = {
  meta: {
    title: string;
    description: string;
  };
  brand: {
    tagline: string;
    closing: string;
    footprint: string;
  };
  prologue: {
    lines: [string, string, string];
    skip: string;
  };
  ui: {
    skipToContent: string;
    loading: string;
    openMenu: string;
    closeMenu: string;
    menu: string;
    close: string;
    legalNotice: string;
    privacyPolicy: string;
    backHome: string;
    sent: string;
    formError: string;
    name: string;
    email: string;
    message: string;
    send: string;
    address: string;
    phone: string;
    website: string;
    contactForm: string;
    contactShort: string;
    downloadProfile: string;
    founded: string;
    headquarters: string;
    businessScope: string;
    strategicUnits: string;
    explore: string;
    themeLight: string;
    themeDark: string;
    mapPlaceholder: string;
    viewDivision: string;
    allDivisions: string;
    insightsNav: string;
    backToDivisions: string;
  };
  nav: { href: string; label: string; external?: boolean }[];
  hero: {
    actLabel: string;
    line1: string;
    line2: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
  };
  about: {
    label: string;
    headline: string;
    body: string;
    purposeLabel: string;
    purpose: string;
    philosophy: string;
  };
  story: {
    label: string;
    headline: string;
    body: string;
    items: { year: string; title: string; body: string }[];
  };
  leadership: {
    label: string;
    headline: string;
    paragraphs: string[];
    quote: string;
  };
  identityCard: {
    label: string;
    headline: string;
    rows: { element: string; description: string }[];
  };
  businessModel: {
    label: string;
    headline: string;
    intro: string;
    steps: { title: string; body: string }[];
    strengthsLabel: string;
    strengths: { title: string; body: string }[];
    quote: string;
  };
  whyInvest: {
    label: string;
    headline: string;
    intro: string;
    items: { title: string; body: string }[];
    quote: string;
  };
  mediaBand: {
    label: string;
    headline: string;
    body: string;
  };
  identity: {
    label: string;
    headline: string;
  };
  vision: {
    label: string;
    body: string;
  };
  visionHeadline: string;
  visionSupport: string;
  mission: {
    label: string;
    body: string;
  };
  missionItems: string[];
  purpose: {
    label: string;
    body: string;
  };
  divisions: {
    sectionLabel: string;
    actLabel: string;
    headline: string;
    intro: string;
    items: {
      id: string;
      title: string;
      description: string;
      body: string;
      focus: string[];
      accent: string;
      imageSrc: string;
    }[];
  };
  expertiseDomains: {
    label: string;
    headline: string;
    intro: string;
    items: { id: string; title: string; focus: string[] }[];
  };
  promise: {
    label: string;
    headline: string;
    intro: string;
    steps: string[];
    signature: string;
  };
  trust: { items: { label: string; value: string }[] };
  closing: {
    label: string;
    headline: string;
    paragraphs: string[];
    quote: string;
    cta: string;
  };
  insights: {
    label: string;
    headline: string;
    intro: string;
    readMore: string;
    back: string;
    items: {
      id: string;
      title: string;
      excerpt: string;
      date: string;
      category: string;
    }[];
  };
  approach: {
    label: string;
    intro: string;
    values: {
      title: string;
      description: string | null;
    }[];
  };
  subsidiaries: {
    label: string;
    headline: string;
    intro: string;
    tagline: string;
    visitSite: string;
    items: {
      id: string;
      name: string;
      sector: string;
      services: string[];
      logoSrc: string;
      href?: string;
    }[];
  };
  partners: {
    label: string;
    headline: string;
    intro: string;
    items: {
      id: string;
      name: string;
      role: string;
      phone: string | null;
      phoneTel: string | null;
      logoBg: string;
      logoSrc: string;
    }[];
  };
  contact: {
    actLabel: string;
    title: string;
    invite: string;
    partnerContactsLabel: string;
    entity: string;
    partnerPhones: {
      label: string;
      phone: string;
      phoneTel: string;
    }[];
  };
  legal: {
    copyright: string;
    noticeTitle: string;
    noticeDescription: string;
    noticeExtra: string;
    privacyTitle: string;
    privacyIntro: string;
    privacyContactHeading: string;
    privacyContactBody: string;
    privacyDataHeading: string;
    privacyDataBody: string;
    privacyRetentionHeading: string;
    privacyRetentionBody: string;
    privacyPlaceholder: string;
  };
};

export const en: Dictionary = {
  meta: {
    title: "TSALACH S.A. | Structuring, financing & infrastructure in Gabon",
    description:
      "From Libreville, TSALACH S.A. structures, finances and delivers real estate and infrastructure — PPP, EPC and lasting impact across Gabon and Africa.",
  },
  brand: {
    tagline: "Structure. Finance. Deliver.",
    closing: "TSALACH — Building development",
    footprint: "Structuring • Financing • Construction • Infrastructures • PPP",
  },
  prologue: {
    lines: [
      "Structure. Finance. Deliver.",
      "Projects that transform territories.",
      "Impact that outlasts delivery.",
    ],
    skip: "Skip",
  },
  ui: {
    skipToContent: "Skip to content",
    loading: "Loading",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    menu: "Menu",
    close: "Close",
    legalNotice: "Legal notice",
    privacyPolicy: "Privacy policy",
    backHome: "Back to home",
    sent: "Sent.",
    formError: "Please complete all fields.",
    name: "Name",
    email: "Email",
    message: "Message",
    send: "Send",
    address: "Address",
    phone: "Phone",
    website: "Website",
    contactForm: "Contact form",
    contactShort: "Contact",
    downloadProfile: "Download company profile",
    founded: "Founded",
    headquarters: "Head office",
    businessScope: "Business scope",
    strategicUnits: "Strategic business units",
    explore: "Explore",
    themeLight: "Light mode",
    themeDark: "Dark mode",
    mapPlaceholder: "Gabonese Republic — map placeholder",
    viewDivision: "View expertise",
    allDivisions: "All expertise areas",
    insightsNav: "Insights",
    backToDivisions: "Back to expertise",
  },
  nav: [
    { href: "#about", label: "About" },
    { href: "#identity", label: "Identity" },
    { href: "#model", label: "Model" },
    { href: "#objet", label: "Capabilities" },
    { href: "#expertise", label: "Expertise" },
    { href: "#why-invest", label: "Why us" },
    { href: "#sectors", label: "Sectors" },
    { href: "#contact", label: "Contact" },
  ],
  hero: {
    actLabel: "Developer & general contractor",
    line1: "Structure.",
    line2: "Finance. Deliver.",
    subtitle:
      "TSALACH S.A. helps governments, municipalities and investors design, fund and deliver high-impact real estate and infrastructure — Gabon & International.",
    primaryCta: "Explore our capabilities",
    secondaryCta: "Talk to our teams",
  },
  about: {
    label: "Who we are",
    headline:
      "The partner that turns territorial ambition into delivered assets.",
    body: "TSALACH S.A. is an African company specialized in the development, structuring, financing and delivery of real estate and infrastructure projects.",
    purposeLabel: "Our purpose",
    purpose: "Turning ambitions into lasting achievements",
    philosophy:
      "Faced with growing needs for infrastructure, housing and public facilities, TSALACH brings integrated technical and financial expertise to secure every stage of the project.",
  },
  story: {
    label: "Ambition",
    headline: "Three levers to build Africa's next chapter",
    body: "We believe sustainable territorial development rests on well-designed projects, solid financing and flawless execution.",
    items: [
      {
        year: "01",
        title: "Well-designed projects",
        body: "Solutions tailored to the real needs of populations.",
      },
      {
        year: "02",
        title: "Innovative financing",
        body: "Mechanisms that make projects feasible and sustainable.",
      },
      {
        year: "03",
        title: "Flawless execution",
        body: "Works delivered on cost, on schedule and to quality standards.",
      },
    ],
  },
  leadership: {
    label: "About",
    headline: "TSALACH",
    paragraphs: [
      "TSALACH S.A. is an African company specialized in the development, structuring, financing and delivery of real estate and infrastructure projects.",
      "We support public and private stakeholders across the full project lifecycle — from concept to commissioning — with integrated technical and financial expertise.",
      "From Libreville, we position ourselves as a strategic partner able to turn vision into lasting, high-performing and impactful delivery.",
    ],
    quote:
      "Turning development ambitions into lasting, high-performing achievements that create impact for present and future generations.",
  },
  identityCard: {
    label: "Identity",
    headline: "The essentials at a glance",
    rows: [
      { element: "Name", description: "TSALACH S.A." },
      { element: "Legal form", description: "Public limited company (S.A.)" },
      {
        element: "Operating area",
        description: "Gabonese Republic & International",
      },
      {
        element: "Core sectors",
        description:
          "Real estate – Infrastructures – Public works – PPP – Engineering – Project finance",
      },
      {
        element: "Positioning",
        description: "Integrated developer and general contractor",
      },
    ],
  },
  businessModel: {
    label: "Model",
    headline: "One value chain. One counterpart.",
    intro:
      "From need identification to value creation — five steps that turn ambition into lasting infrastructure.",
    steps: [
      {
        title: "Need identification",
        body: "Territorial analysis – Opportunity studies – Objective definition",
      },
      {
        title: "Project structuring",
        body: "Technical studies – Financial modelling – Legal setup – Financing plan",
      },
      {
        title: "Resource mobilization",
        body: "Pre-financing – Financial partnerships – Investors – Institutions",
      },
      {
        title: "Delivery",
        body: "EPC / General contractor – Works management – Quality control – Safety",
      },
      {
        title: "Handover & value creation",
        body: "Commissioning – Performance monitoring – Maintenance and support",
      },
    ],
    strengthsLabel: "Strengths",
    strengths: [
      {
        title: "Integrated approach",
        body: "A single counterpart across the entire project lifecycle.",
      },
      {
        title: "Dual expertise",
        body: "Technical and financial capabilities that secure complex projects.",
      },
      {
        title: "PPP structuring capacity",
        body: "Mastery of partnership mechanisms between public and private actors.",
      },
      {
        title: "Results orientation",
        body: "Focus on schedule control, cost optimization, execution quality and asset durability.",
      },
    ],
    quote:
      "Engineering, financing, construction and project management — a complete response across the value chain.",
  },
  whyInvest: {
    label: "Why TSALACH",
    headline: "What sets us apart",
    intro:
      "An integrated developer and general contractor — serving States, municipalities, institutions and private investors.",
    items: [
      {
        title: "Integrated approach",
        body: "A single counterpart for the entire project lifecycle.",
      },
      {
        title: "Dual expertise",
        body: "Combining technical and financial skills to secure complex projects.",
      },
      {
        title: "PPP structuring capacity",
        body: "Mastery of partnership mechanisms between public and private actors.",
      },
      {
        title: "Results orientation",
        body: "Focus on schedule control, cost optimization, execution quality and asset durability.",
      },
      {
        title: "Pan-African vision",
        body: "Deep understanding of African territorial development — with the capacity to operate internationally.",
      },
    ],
    quote: "Structure. Finance. Deliver.",
  },
  mediaBand: {
    label: "Promise",
    headline: "TSALACH — Building development",
    body: "Turn a vision into a structured project, a project into secured financing, financing into concrete infrastructure — and infrastructure into lasting impact.",
  },
  identity: {
    label: "Identity",
    headline: "Vision. Mission. Purpose.",
  },
  vision: {
    label: "Vision",
    body: "To become a leading African player in the development and delivery of high-impact real estate and infrastructure projects, turning territorial development ambitions into lasting achievements.",
  },
  visionHeadline: "Become a reference African player",
  visionSupport:
    "Contribute to the structural transformation of African territories through useful, high-performing and lasting investments.",
  mission: {
    label: "Mission",
    body: "Design, structure, finance and deliver",
  },
  missionItems: [
    "Design solutions tailored to territorial needs",
    "Structure technically and financially viable projects",
    "Mobilize the resources required for financing",
    "Deliver infrastructure and real estate to international standards",
    "Ensure lasting impact for populations and local economies",
  ],
  purpose: {
    label: "Purpose",
    body: "Turning ambitions into lasting achievements",
  },
  divisions: {
    sectionLabel: "Corporate purpose",
    actLabel: "Capabilities",
    headline: "Five capabilities. One delivery promise.",
    intro:
      "From structuring to site delivery — the activities that make TSALACH a complete partner.",
    items: [
      {
        id: "immobilier",
        title: "Real estate & infrastructure development",
        description:
          "Structuring real estate projects, developing public and private infrastructures, urban planning and collective facilities.",
        body: "We structure and develop residential, commercial and institutional assets alongside public and private infrastructure.",
        focus: [
          "Real estate project structuring",
          "Public & private infrastructure development",
          "Urban planning and collective facilities",
        ],
        accent: "#c69214",
        imageSrc: "/divisions/real-estate.png",
      },
      {
        id: "epc",
        title: "General contractor — All trades",
        description:
          "Studies, procurement, construction, site coordination and turnkey delivery.",
        body: "As general contractor, TSALACH covers the full EPC chain through to turnkey handover.",
        focus: [
          "Studies",
          "Procurement (supply)",
          "Construction",
          "Site coordination & steering",
          "Turnkey delivery",
        ],
        accent: "#0f172a",
        imageSrc: "/divisions/equipment.png",
      },
      {
        id: "ppp",
        title: "Public-Private Partnerships (PPP)",
        description:
          "Institutional and legal setup, financial structuring, PPP contract execution and monitoring.",
        body: "We design and implement PPP frameworks that accelerate public investment.",
        focus: [
          "Institutional & legal setup",
          "Financial structuring",
          "PPP contract execution & monitoring",
        ],
        accent: "#c69214",
        imageSrc: "/divisions/energy.png",
      },
      {
        id: "engineering",
        title: "Engineering & financing",
        description:
          "Technical engineering, financial engineering, project pre-financing and structured funding mobilization.",
        body: "Our engineering practice combines technical and financial capabilities across the project lifecycle.",
        focus: [
          "Technical engineering",
          "Financial engineering",
          "Project pre-financing",
          "Structured funding mobilization",
        ],
        accent: "#0f172a",
        imageSrc: "/divisions/agriculture.png",
      },
      {
        id: "public-works",
        title: "Public & private works",
        description:
          "Building works, civil engineering, roads and utilities, and infrastructure structures.",
        body: "We deliver building works, civil engineering, roads and utilities and infrastructure structures for public and private clients.",
        focus: [
          "Building works",
          "Civil engineering",
          "Roads and utilities",
          "Infrastructure structures",
        ],
        accent: "#c69214",
        imageSrc: "/divisions/mining.png",
      },
    ],
  },
  expertiseDomains: {
    label: "Expertise",
    headline: "Three domains. Full command.",
    intro:
      "Real estate, infrastructure and project engineering — covering the full cycle from concept to delivery.",
    items: [
      {
        id: "immobilier",
        title: "Real estate",
        focus: [
          "Residential housing",
          "Collective residences",
          "Administrative buildings",
          "Shopping centres",
          "Institutional facilities",
        ],
      },
      {
        id: "infrastructures",
        title: "Infrastructures",
        focus: [
          "Roads and thoroughfares",
          "Urban networks",
          "Civil engineering structures",
          "Public facilities",
          "Socio-collective infrastructures",
        ],
      },
      {
        id: "ingenierie",
        title: "Project engineering",
        focus: [
          "Feasibility studies",
          "Project owner assistance",
          "Project management",
          "Control and supervision",
          "Techno-financial optimization",
        ],
      },
    ],
  },
  promise: {
    label: "Promise",
    headline: "From vision to impact — unbroken",
    intro: "Our promise, in four transformations:",
    steps: [
      "transform a vision into a structured project",
      "transform a project into secured financing",
      "transform financing into concrete infrastructure",
      "transform infrastructure into lasting impact for populations",
    ],
    signature: "TSALACH — Building development",
  },
  trust: {
    items: [
      { label: "Legal form", value: "Public limited company (S.A.)" },
      { label: "Footprint", value: "Gabon & International" },
      {
        label: "Positioning",
        value: "Integrated developer & general contractor",
      },
      {
        label: "Value chain",
        value: "Structure · Finance · Build · PPP",
      },
    ],
  },
  closing: {
    label: "Next step",
    headline: "Ready to structure your next project?",
    paragraphs: [
      "TSALACH S.A. is the trusted partner for real estate and infrastructure across Africa — anchored in Libreville, oriented toward the continent.",
      "Engineering, financing, construction and project management: a complete response for States, municipalities, institutions and private investors.",
    ],
    quote:
      "Turning development ambitions into lasting, high-performing achievements that create impact for present and future generations.",
    cta: "Start the conversation",
  },
  insights: {
    label: "Insights",
    headline: "Perspectives from TSALACH.",
    intro:
      "Strategic notes and corporate updates will appear here when official communications are published.",
    readMore: "Read more",
    back: "Back to insights",
    items: [],
  },
  approach: {
    label: "Our DNA",
    intro:
      "Five values that shape how we design, finance and deliver lasting development.",
    values: [
      {
        title: "Commitment",
        description:
          "We fully own our responsibilities and place project success at the heart of our action.",
      },
      {
        title: "Excellence",
        description:
          "We aim for high standards of quality, performance and professionalism.",
      },
      {
        title: "Integrity",
        description:
          "Transparency, ethics and keeping our word form the foundation of our relationships.",
      },
      {
        title: "Innovation",
        description:
          "We develop solutions suited to African realities and the future challenges of territories.",
      },
      {
        title: "Impact",
        description:
          "Every project must generate lasting economic, social and environmental value.",
      },
    ],
  },
  subsidiaries: {
    label: "Sectors",
    headline: "Where impact matters most",
    intro:
      "We focus development on sectors with strong impact for African territories.",
    tagline:
      "Housing. Public facilities. Urban infrastructure. Territories. PPP.",
    visitSite: "Visit website",
    items: [
      {
        id: "housing",
        name: "Housing",
        sector: "Housing",
        services: ["Reducing the housing deficit"],
        logoSrc: "/brand/tsalach-logo-clear.png",
      },
      {
        id: "public-facilities",
        name: "Public facilities",
        sector: "Public facilities",
        services: ["Modernizing services for populations"],
        logoSrc: "/brand/tsalach-logo-clear.png",
      },
      {
        id: "urban-infra",
        name: "Urban infrastructure",
        sector: "Urban infrastructure",
        services: ["Improving mobility and quality of life"],
        logoSrc: "/brand/tsalach-logo-clear.png",
      },
      {
        id: "territorial",
        name: "Territorial development",
        sector: "Territorial development",
        services: ["Structuring lasting economic hubs"],
        logoSrc: "/brand/tsalach-logo-clear.png",
      },
      {
        id: "ppp-projects",
        name: "Landmark PPP projects",
        sector: "Landmark PPP projects",
        services: ["Accelerating public investment"],
        logoSrc: "/brand/tsalach-logo-clear.png",
      },
    ],
  },
  partners: {
    label: "Partners",
    headline: "Strategic partners",
    intro:
      "TSALACH S.A. builds trusted alliances with States, municipalities, institutions and private investors to accelerate lasting projects.",
    items: [],
  },
  contact: {
    actLabel: "Contact",
    title: "Let's talk about your project",
    invite:
      "Governments, municipalities, institutions, investors: our teams in Libreville are ready to structure, finance and deliver with you.",
    partnerContactsLabel: "Partner contacts",
    entity: "TSALACH S.A.",
    partnerPhones: [],
  },
  legal: {
    copyright: `© ${new Date().getFullYear()} TSALACH S.A. All rights reserved.`,
    noticeTitle: "Legal notice",
    noticeDescription:
      "Legal information about TSALACH S.A.: publisher, hosting and intellectual property.",
    noticeExtra:
      "TSALACH S.A. strives to keep the information on this website accurate and up to date. However, we cannot guarantee completeness or uninterrupted availability. Use of the site is at your own risk. Corporate registration numbers will be published here as soon as they are available.",
    privacyTitle: "Privacy policy",
    privacyIntro:
      "This policy explains how TSALACH S.A. collects and uses personal information submitted through tsalach.ga and related contact channels.",
    privacyContactHeading: "Contact",
    privacyContactBody: "For privacy requests, contact",
    privacyDataHeading: "Data collected",
    privacyDataBody:
      "When you use the contact form, we may process your name, email address and message content solely to respond to your inquiry. Technical logs (IP address, browser type, pages visited) may be processed by our hosting provider for security and performance.",
    privacyRetentionHeading: "Retention",
    privacyRetentionBody:
      "Messages are retained only as long as needed to handle your request, unless a longer period is required by applicable law. Hosting logs follow the retention practices of our infrastructure provider.",
    privacyPlaceholder:
      "Depending on applicable law, you may have the right to access, rectify or delete personal data concerning you, and to object to or restrict certain processing. Contact us at the email above to exercise these rights. This policy may be updated; the version published on this page is the one in force.",
  },
};
