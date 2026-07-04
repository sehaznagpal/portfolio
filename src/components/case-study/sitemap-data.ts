export interface SitemapNode {
  id: string;
  label: string;
  x: number;
  y: number;
  variant?: 'accent' | 'default';
}

export interface SitemapEdge {
  from: string;
  to: string;
}

export interface SitemapData {
  nodes: SitemapNode[];
  edges: SitemapEdge[];
}

export const moolroopSitemap: SitemapData = {
  nodes: [
    { id: 'welcome', label: 'Welcome Carousel', x: 0, y: 350, variant: 'accent' },
    { id: 'home', label: 'Explore / Home', x: 220, y: 350 },

    { id: 'search', label: 'Search', x: 440, y: 0 },
    { id: 'categories', label: 'Categories', x: 440, y: 70 },
    { id: 'states', label: 'States', x: 440, y: 140 },
    { id: 'popular', label: 'Popular Products', x: 440, y: 210 },
    { id: 'recommended', label: 'Recommended', x: 440, y: 280 },
    { id: 'wishlist', label: 'Wishlist', x: 440, y: 350 },
    { id: 'bag', label: 'Bag', x: 440, y: 420 },
    { id: 'menu', label: 'Menu', x: 440, y: 490 },

    { id: 'category-page', label: 'Category Page', x: 660, y: 70 },
    { id: 'state-page', label: 'State Page', x: 660, y: 140 },
    { id: 'about', label: 'About', x: 660, y: 420 },
    { id: 'help', label: 'Help & Support', x: 660, y: 490 },
    { id: 'language', label: 'Language (future)', x: 660, y: 560 },
    { id: 'checkout', label: 'Checkout (future scope)', x: 660, y: 630 },

    { id: 'product-type', label: 'Product Type Page', x: 880, y: 70 },
    { id: 'product-page', label: 'Product Page', x: 1100, y: 70, variant: 'accent' },

    { id: 'how-made', label: "How It's Made", x: 1320, y: -30 },
    { id: 'provenance', label: 'Provenance Trail', x: 1320, y: 40, variant: 'accent' },
    { id: 'bag-2', label: 'Bag', x: 1320, y: 110 },
    { id: 'wishlist-2', label: 'Wishlist', x: 1320, y: 180 },
  ],
  edges: [
    { from: 'welcome', to: 'home' },
    { from: 'home', to: 'search' },
    { from: 'home', to: 'categories' },
    { from: 'home', to: 'states' },
    { from: 'home', to: 'popular' },
    { from: 'home', to: 'recommended' },
    { from: 'home', to: 'wishlist' },
    { from: 'home', to: 'bag' },
    { from: 'home', to: 'menu' },
    { from: 'categories', to: 'category-page' },
    { from: 'states', to: 'state-page' },
    { from: 'state-page', to: 'category-page' },
    { from: 'category-page', to: 'product-type' },
    { from: 'product-type', to: 'product-page' },
    { from: 'product-page', to: 'how-made' },
    { from: 'product-page', to: 'provenance' },
    { from: 'product-page', to: 'bag-2' },
    { from: 'product-page', to: 'wishlist-2' },
    { from: 'bag', to: 'checkout' },
    { from: 'menu', to: 'about' },
    { from: 'menu', to: 'help' },
    { from: 'menu', to: 'language' },
  ],
};

export const drCuterusSitemap: SitemapData = {
  nodes: [
    { id: 'home', label: 'Landing Page (Home)', x: 0, y: 350, variant: 'accent' },

    { id: 'hero', label: 'Hero: Bio + Bilingual Toggle', x: 240, y: 0 },
    { id: 'press-wall', label: 'Press / Feature Wall', x: 240, y: 70 },
    { id: 'book', label: 'Book Section', x: 240, y: 140 },
    { id: 'content-hub', label: 'Content Hub (IG / YouTube / Podcast)', x: 240, y: 210 },
    { id: 'fursat', label: 'Fursat Product Section', x: 240, y: 280 },
    { id: 'contact', label: 'Contact / Footer', x: 240, y: 350 },
    { id: 'appointments', label: 'Appointments', x: 240, y: 420 },
    { id: 'blog', label: 'Blog', x: 240, y: 560 },
    { id: 'corporate', label: 'Corporate Workshops', x: 240, y: 700 },

    { id: 'symptom-hook', label: 'Symptom-Led Hook', x: 480, y: 390 },
    { id: 'faq', label: 'FAQ (Bilingual)', x: 480, y: 460 },
    { id: 'query-intake', label: 'Query Intake CTA', x: 480, y: 530 },
    { id: 'articles', label: 'Categorised Articles', x: 480, y: 600 },
    { id: 'workshop-proof', label: 'Workshop Proof (Event Photography)', x: 480, y: 670 },
    { id: 'press-wall-2', label: 'Press Wall (reused)', x: 480, y: 740 },
    { id: 'booking-cta', label: 'Booking CTA', x: 480, y: 810, variant: 'accent' },

    { id: 'whatsapp', label: 'WhatsApp Booking CTA', x: 720, y: 390, variant: 'accent' },
  ],
  edges: [
    { from: 'home', to: 'hero' },
    { from: 'home', to: 'press-wall' },
    { from: 'home', to: 'book' },
    { from: 'home', to: 'content-hub' },
    { from: 'home', to: 'fursat' },
    { from: 'home', to: 'contact' },
    { from: 'home', to: 'appointments' },
    { from: 'home', to: 'blog' },
    { from: 'home', to: 'corporate' },
    { from: 'appointments', to: 'symptom-hook' },
    { from: 'appointments', to: 'faq' },
    { from: 'symptom-hook', to: 'whatsapp' },
    { from: 'blog', to: 'query-intake' },
    { from: 'blog', to: 'articles' },
    { from: 'corporate', to: 'workshop-proof' },
    { from: 'corporate', to: 'press-wall-2' },
    { from: 'corporate', to: 'booking-cta' },
  ],
};

export const dissertationSitemap: SitemapData = {
  nodes: [
    { id: 'participant', label: 'Participant', x: 0, y: 400, variant: 'accent' },
    { id: 'consent', label: 'Instructions + Consent', x: 180, y: 400 },
    { id: 'random-assign', label: 'Random Group Assignment', x: 360, y: 400 },

    { id: 'control-group', label: 'Control Group', x: 540, y: 250 },
    { id: 'warning-group', label: 'Warning Group', x: 540, y: 400 },
    { id: 'cta-group', label: 'CTA Group', x: 540, y: 550 },

    { id: 'scenarios', label: '3 Fraud Scenarios (randomized)', x: 720, y: 400 },

    { id: 'authority', label: 'Authority: Traffic Police Fine', x: 900, y: 300 },
    { id: 'urgency', label: "Urgency: Friend's Compromised Number", x: 900, y: 400 },
    { id: 'social-proof', label: 'Social Proof: Instagram Marketplace', x: 900, y: 500 },

    { id: 'money-transfer', label: 'Money Transfer', x: 1080, y: 400 },
    { id: 'select-bank', label: 'Select Bank Account', x: 1260, y: 400 },
    { id: 'pin-entry', label: 'PIN Entry', x: 1440, y: 400 },
    { id: 'intervention', label: 'Intervention Layer', x: 1620, y: 400, variant: 'accent' },

    { id: 'control-none', label: 'Control: no intervention', x: 1800, y: 250 },
    { id: 'warning-banner', label: 'Warning: caution banner', x: 1800, y: 400 },
    { id: 'cta-buttons', label: 'CTA: Cancel Payment / Continue anyway', x: 1800, y: 550 },

    { id: 'transferring', label: 'Transferring', x: 1980, y: 280 },
    { id: 'decision', label: 'Decision', x: 1980, y: 550, variant: 'accent' },

    { id: 'success', label: 'Success', x: 2160, y: 280 },
    { id: 'cancelled', label: 'Cancelled', x: 2160, y: 550 },

    { id: 'confidence', label: 'Confidence Rating (1-5)', x: 2340, y: 400, variant: 'accent' },
    { id: 'next', label: 'Next Scenario / Post-Survey', x: 2520, y: 400 },
  ],
  edges: [
    { from: 'participant', to: 'consent' },
    { from: 'consent', to: 'random-assign' },
    { from: 'random-assign', to: 'control-group' },
    { from: 'random-assign', to: 'warning-group' },
    { from: 'random-assign', to: 'cta-group' },
    { from: 'control-group', to: 'scenarios' },
    { from: 'warning-group', to: 'scenarios' },
    { from: 'cta-group', to: 'scenarios' },
    { from: 'scenarios', to: 'authority' },
    { from: 'scenarios', to: 'urgency' },
    { from: 'scenarios', to: 'social-proof' },
    { from: 'authority', to: 'money-transfer' },
    { from: 'urgency', to: 'money-transfer' },
    { from: 'social-proof', to: 'money-transfer' },
    { from: 'money-transfer', to: 'select-bank' },
    { from: 'select-bank', to: 'pin-entry' },
    { from: 'pin-entry', to: 'intervention' },
    { from: 'intervention', to: 'control-none' },
    { from: 'intervention', to: 'warning-banner' },
    { from: 'intervention', to: 'cta-buttons' },
    { from: 'control-none', to: 'transferring' },
    { from: 'warning-banner', to: 'transferring' },
    { from: 'cta-buttons', to: 'decision' },
    { from: 'decision', to: 'cancelled' },
    { from: 'decision', to: 'transferring' },
    { from: 'transferring', to: 'success' },
    { from: 'success', to: 'confidence' },
    { from: 'cancelled', to: 'confidence' },
    { from: 'confidence', to: 'next' },
  ],
};
