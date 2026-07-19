// Google Business Profile Schema Data
// Supports GBP ranking factors: Relevance, Distance, Prominence

import { getDrJanPhotoAbsoluteUrl } from "./agent-photo";
import { agentStats } from "./site-config";

export const businessInfo = {
  // NAP - Must match GBP exactly
  name: "Madeira Canyon | Homes by Dr Jan Duffy",
  address: {
    streetAddress: "Suite A, 2721 Bonaparte Ln",
    addressLocality: "Henderson",
    addressRegion: "NV",
    postalCode: "89044",
    addressCountry: "US",
  },
  phone: {
    display: "(702) 500-1942",
    tel: "+17025001942",
  },
  email: "DrDuffy@MadeiraCanyonHomes.com",
  url: "https://madeiracanyonhomes.com", // MadeiraCanyonHomes.com

  // Business Details
  license: "S.0197614.LLC",
  priceRange: "$$",

  // Hours - Match GBP exactly
  hours: {
    monday: "09:00-18:00",
    tuesday: "09:00-18:00",
    wednesday: "09:00-18:00",
    thursday: "09:00-18:00",
    friday: "09:00-18:00",
    saturday: "10:00-16:00",
    sunday: "By Appointment",
  },

  // Geo coordinates for distance ranking (Club Madeira / Bonaparte Ln)
  geo: {
    latitude: 35.927504,
    longitude: -115.090006,
  },

  // Service areas - Start focused on Madeira Canyon / Henderson
  serviceAreas: [
    "Madeira Canyon, Henderson, NV",
    "Club Madeira, Henderson, NV",
    "Henderson, NV",
    "Anthem Highlands, NV",
    "Las Vegas, NV",
    "Clark County, NV",
  ],

  // Categories - Primary + Secondary for GBP
  categories: {
    primary: "Real Estate Agent",
    secondary: [
      "Real Estate Agency",
      "Real Estate Consultant",
    ],
  },

  // Services - Each creates searchable fields in GBP
  services: [
    // Core Services
    { name: "Buyer Representation", description: "Full-service home buying assistance" },
    { name: "Seller Representation", description: "List and sell your home for top dollar" },
    { name: "Luxury Home Sales", description: "High-end properties $1M+" },
    // Niche Services (trigger intent phrases)
    { name: "California Relocation Services", description: "Helping CA buyers transition to Las Vegas" },
    { name: "55+ Community Specialist", description: "Sun City, Anthem, Del Webb communities" },
    { name: "First-Time Home Buyer Guidance", description: "FHA, VA, down payment assistance" },
    { name: "Probate Real Estate Sales", description: "Estate and probate property transactions" },
    { name: "Divorce Real Estate Sales", description: "Neutral representation for marital asset division" },
    { name: "Relocation Services", description: "Corporate and individual relocation assistance" },
    { name: "Investment Property Consulting", description: "Rental properties and investment analysis" },
    { name: "New Construction Representation", description: "Builder negotiations and buyer protection" },
    { name: "Military/VA Home Buying", description: "Specialized service for veterans" },
    { name: "Downsizing Consultation", description: "Transition to smaller, maintenance-free living" },
    { name: "Luxury Condo Sales", description: "High-rise and resort-style condominiums" },
  ],

  // Attributes for GBP - Fill out ALL available
  attributes: {
    // Accessibility (important for GBP)
    accessibility: [
      "Wheelchair accessible entrance",
      "Wheelchair accessible parking lot",
      "Wheelchair accessible restroom",
    ],
    // Service options
    serviceOptions: [
      "Online appointments",
      "Onsite services",
      "Same-day appointments",
    ],
    // Highlights
    highlights: [
      "Identifies as women-owned",
      "LGBTQ+ friendly",
      "Veteran-led",
    ],
    // Offerings
    offerings: [
      "Free consultation",
      "Free estimates",
    ],
    // Amenities
    amenities: [
      "Free Wi-Fi",
      "Free parking",
    ],
    // Planning
    planning: [
      "Appointment required",
      "Accepts new clients",
    ],
    // Payments (if applicable)
    payments: [
      "Credit cards",
      "Checks",
      "Wire transfer",
    ],
  },

  // Social profiles for sameAs schema
  socialProfiles: [
    "https://www.facebook.com/drjanduffy",
    "https://www.instagram.com/drjanduffy",
    "https://www.linkedin.com/in/drjanduffy",
    "https://www.youtube.com/@drjanduffy",
    "https://twitter.com/drjanduffy",
  ],

  // Languages spoken
  languages: ["English", "Spanish"],

  // Payment methods accepted
  paymentAccepted: ["Credit Card", "Check", "Wire Transfer"],

  // Year established
  foundingDate: "2010",
};

// 750-word GBP Description (3 sections)
export const gbpDescription = {
  // Section 1: Who you are/mission (~250 words)
  whoWeAre: `Madeira Canyon | Homes by Dr Jan Duffy is the local real estate resource for buyers and sellers in Madeira Canyon and Club Madeira in Henderson, NV—the community connected with clubmadeirahoa.com searches. Dr. Jan Duffy, REALTOR® with Berkshire Hathaway HomeServices Nevada Properties (License S.0197614.LLC), focuses on this Anthem Highlands corridor with square-footage comps, amenity knowledge, and clear next steps—not generic valley-wide marketing.

With $127 million in closed transactions and hundreds of clients helped since 2008, Dr. Jan brings BHHS resources plus hyperlocal Madeira Canyon inventory insight. Whether you are comparing Club Madeira listings, reviewing HOA dues tied to clubmadeirahoa.com community info, or relocating to Henderson for Nevada's tax advantages, you get data-backed guidance and a single point of contact.`,

  // Section 2: What/why - Value proposition (~250 words)
  whatWeDo: `What sets this practice apart is Madeira Canyon focus plus Berkshire Hathaway HomeServices backing. Clients get current MLS pricing for Club Madeira and surrounding Madeira Canyon villages, negotiation support, and honest advice—not sales pressure. Sellers receive professional marketing; buyers get representation that costs them nothing when the listing side pays the commission.

Services include buyer and seller representation in Madeira Canyon / Club Madeira, Henderson market analysis, California relocation assistance, investment property consulting, new construction representation, and first-time buyer programs (FHA, VA, conventional, Nevada down-payment assistance).

Dr. Jan's approach: know the street-level inventory, match amenities (clubhouse, pool, fitness, courts) to your criteria, and stay on the file until closing.`,

  // Section 3: Where - Areas served (~250 words)
  whereWeServe: `Primary focus: Madeira Canyon and Club Madeira in Henderson, NV 89044—the guard-gated Anthem Highlands community buyers often research via clubmadeirahoa.com. Nearby coverage includes Anthem Highlands, Green Valley, Inspirada, and the broader Henderson / Las Vegas Valley market when your search expands.

Office: Suite A, 2721 Bonaparte Ln, Henderson, NV 89044 (at The Club at Madeira Canyon clubhouse address). Hours Monday–Friday 9am–6pm, Saturday 10am–4pm, Sunday by appointment. Call (702) 500-1942 or email DrDuffy@MadeiraCanyonHomes.com. Start at madeiracanyonhomes.com for Madeira Canyon homes by Dr. Jan Duffy.`,
};

// FAQ Schema for GBP Q&A section
export const gbpFAQs = [
  {
    question: "What areas does Dr. Jan Duffy serve?",
    answer: "Primary focus is Madeira Canyon and Club Madeira in Henderson, NV (clubmadeirahoa.com community searches), plus Anthem Highlands, Green Valley, Inspirada, and the broader Henderson / Las Vegas Valley market.",
  },
  {
    question: "Is this the Club Madeira HOA website (clubmadeirahoa.com)?",
    answer: "No. clubmadeirahoa.com is the community/HOA site. MadeiraCanyonHomes.com is Madeira Canyon | Homes by Dr Jan Duffy — a Berkshire Hathaway HomeServices Nevada Properties real estate site for buying and selling homes in Madeira Canyon and Club Madeira.",
  },
  {
    question: "Does Dr. Jan help buyers relocating from California?",
    answer: "Yes! California relocation is a specialty. Dr. Jan helps CA buyers understand Nevada's 0% state income tax advantage, compare home values (40-60% lower than comparable CA properties), and find the perfect Las Vegas neighborhood. Call (702) 500-1942 for California relocation assistance.",
  },
  {
    question: "What 55+ communities does Dr. Jan specialize in?",
    answer: "Dr. Jan specializes in Sun City Summerlin (Nevada's largest 55+ community with 7,700+ homes), Sun City Anthem in Henderson, Del Webb Lake Las Vegas, and Solera at Anthem. Each community offers different amenities and price points for active adult living.",
  },
  {
    question: "Does Berkshire Hathaway HomeServices help with new construction?",
    answer: "Yes! Dr. Jan provides free buyer representation for new construction purchases from builders like Toll Brothers, Lennar, and Century Communities. The builder pays the commission, but Dr. Jan works exclusively for you—protecting your interests during the build process.",
  },
  {
    question: "How does Dr. Jan help with probate or divorce real estate sales?",
    answer: "Dr. Jan handles sensitive transactions with discretion and professionalism. For probate sales, she coordinates with estate attorneys and ensures court compliance. For divorce sales, she provides neutral representation and works with both parties' attorneys. Call (702) 500-1942 for a confidential consultation.",
  },
  {
    question: "What is the average home price in Las Vegas in 2026?",
    answer: "As of January 2026, the Las Vegas median home price is $450,000, up 4.2% year-over-year. Henderson's median is slightly higher at $485,000. Luxury communities like Summerlin average $625,000, while The Ridges averages $2.5 million. Contact Dr. Jan for current market data.",
  },
  {
    question: "Does Dr. Jan work with first-time home buyers?",
    answer: "Absolutely! Dr. Jan guides first-time buyers through every step, including pre-approval, loan programs (FHA 3.5% down, VA 0% down, conventional options), Nevada down payment assistance programs, and new construction incentives. Free buyer consultations available.",
  },
  {
    question: "Why choose Berkshire Hathaway HomeServices over other agencies?",
    answer: "Berkshire Hathaway HomeServices is backed by Warren Buffett's Berkshire Hathaway Inc.—the only real estate brand with this level of financial stability and trust. You get a global network of 50,000+ agents, world-class marketing, and a name synonymous with integrity.",
  },
  {
    question: "How do I schedule a consultation with Dr. Jan Duffy?",
    answer: "Call or text (702) 500-1942 for immediate assistance, or email DrDuffy@MadeiraCanyonHomes.com. Office visits available at Suite A, 2721 Bonaparte Ln, Henderson, NV 89044. Monday-Friday 9am-6pm, Saturday 10am-4pm, Sunday by appointment.",
  },
  {
    question: "Does Dr. Jan help with investment properties in Las Vegas?",
    answer: "Yes! Dr. Jan provides investment property consulting including rental property analysis, cap rate calculations, short-term rental regulations, and multi-family opportunities across the Las Vegas Valley. Contact (702) 500-1942 for investment property guidance.",
  },
];

// Generate LocalBusiness Schema
export function generateLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "@id": "https://madeiracanyonhomes.com/#organization",
    name: businessInfo.name,
    image: getDrJanPhotoAbsoluteUrl("https://madeiracanyonhomes.com"),
    url: businessInfo.url,
    telephone: businessInfo.phone.tel,
    email: businessInfo.email,
    priceRange: businessInfo.priceRange,
    address: {
      "@type": "PostalAddress",
      ...businessInfo.address,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: businessInfo.geo.latitude,
      longitude: businessInfo.geo.longitude,
    },
    openingHoursSpecification: [
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Monday", opens: "09:00", closes: "18:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Tuesday", opens: "09:00", closes: "18:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Wednesday", opens: "09:00", closes: "18:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Thursday", opens: "09:00", closes: "18:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Friday", opens: "09:00", closes: "18:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "10:00", closes: "16:00" },
    ],
    areaServed: businessInfo.serviceAreas.map((area) => ({
      "@type": "City",
      name: area,
    })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Real Estate Services",
      itemListElement: businessInfo.services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.name,
          description: service.description,
        },
      })),
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: agentStats.averageRating.toString(),
      reviewCount: agentStats.reviewCount.toString(),
      bestRating: "5",
      worstRating: "1",
    },
    sameAs: [
      "https://www.facebook.com/drjanduffy",
      "https://www.instagram.com/drjanduffy",
      "https://www.linkedin.com/in/drjanduffy",
    ],
  };
}

// Generate FAQPage Schema
export function generateFAQSchema(faqs = gbpFAQs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
