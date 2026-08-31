import { Product } from '../types';

export const PRODUCTS: Product[] = [
  // 1. Straight-Leg Baggy Trousers & Pants
  {
    id: 'prod-trouser-01',
    name: 'Straight-Leg Pleated Baggy Trouser',
    category: 'trousers',
    categoryName: 'Baggy Trousers',
    price: 4990,
    description: 'Masterfully tailored straight-leg baggy silhouette featuring double front pleats, hidden elasticated waistband with internal drawstrings, and a generous hem pooling effortlessly over sneakers.',
    fabricSpecs: '68% Terylene, 28% Rayon, 4% Spandex • Wrinkle-Resistant Heavyweight Suiting Twill',
    fit: 'Relaxed Wide-Leg with Slight Taper at Ankle',
    gsm: 340,
    rating: 4.9,
    reviewCount: 142,
    isNew: true,
    isBestSeller: true,
    inStock: true,
    primaryImage: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=1000&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?q=80&w=1000&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?q=80&w=1000&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Onyx Black', hex: '#121214', colorCode: 'BLK' },
      { name: 'Slate Grey', hex: '#52525b', colorCode: 'GRY' },
      { name: 'Chalk White', hex: '#e4e4e7', colorCode: 'WHT' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    tags: ['Best Seller', 'Drop 04', '340 GSM']
  },
  {
    id: 'prod-trouser-02',
    name: 'Minimal Utility Straight Cargo Pant',
    category: 'trousers',
    categoryName: 'Baggy Trousers',
    price: 5290,
    description: 'Modern utilitarian cargo trousers with seamless streamlined side envelope pockets, darted knee articulation for natural drape, and adjustable ankle cinch cords.',
    fabricSpecs: '100% Japanese Heavyweight Cotton Ripstop with DWR Finish',
    fit: 'Straight Baggy Modular Fit',
    gsm: 320,
    rating: 4.8,
    reviewCount: 98,
    isNew: false,
    isBestSeller: true,
    inStock: true,
    primaryImage: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=1000&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1488161628813-04466f872be2?q=80&w=1000&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1488161628813-04466f872be2?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1000&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Charcoal Black', hex: '#18181b', colorCode: 'BLK' },
      { name: 'Cement Grey', hex: '#71717a', colorCode: 'GRY' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    tags: ['Water Repellent', 'Utility']
  },
  {
    id: 'prod-trouser-03',
    name: 'Relaxed Wide-Leg Raw Denim Pant',
    category: 'trousers',
    categoryName: 'Baggy Trousers',
    price: 5790,
    description: '14.5oz unwashed structural selvedge denim cut in an architectural straight wide-leg silhouette with custom matte-black steel hardware and clean tonal stitching.',
    fabricSpecs: '100% Organic Raw Selvedge Cotton • 14.5oz Dense Weave',
    fit: 'Loose Architectural Wide Leg',
    gsm: 420,
    rating: 4.9,
    reviewCount: 64,
    isNew: true,
    isBestSeller: false,
    inStock: true,
    primaryImage: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1000&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1542272604-780c96856592?q=80&w=1000&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1542272604-780c96856592?q=80&w=1000&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Washed Charcoal', hex: '#27272a', colorCode: 'GRY' },
      { name: 'Deep Pitch Black', hex: '#09090b', colorCode: 'BLK' }
    ],
    sizes: ['M', 'L', 'XL', 'XXL'],
    tags: ['Selvedge 14.5oz', 'Raw Archive']
  },

  // 2. Drop Shoulder T-Shirts
  {
    id: 'prod-tee-01',
    name: 'Heavyweight 300 GSM Drop-Shoulder Tee',
    category: 'drop-shoulder',
    categoryName: 'Drop-Shoulder Tees',
    price: 2490,
    description: 'The foundation of modern streetwear. Cut with extreme dropped shoulders, wide boxy body, elongated sleeves, and a thick 1.25" high-density ribbed mock neck that retains shape after countless washes.',
    fabricSpecs: '100% Ring-Spun Combed Organic Cotton • Pre-Shrunk & Enzyme Softened',
    fit: 'Boxy Heavyweight Drop Shoulder Oversized',
    gsm: 300,
    rating: 5.0,
    reviewCount: 286,
    isNew: false,
    isBestSeller: true,
    inStock: true,
    primaryImage: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=1000&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1000&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1000&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Pure Chalk White', hex: '#f4f4f5', colorCode: 'WHT' },
      { name: 'Washed Ash Grey', hex: '#71717a', colorCode: 'GRY' },
      { name: 'Matte Jet Black', hex: '#18181b', colorCode: 'BLK' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    tags: ['Iconic 300 GSM', 'Top Rated']
  },
  {
    id: 'prod-tee-02',
    name: 'Acid Washed Vintage Drop-Shoulder Tee',
    category: 'drop-shoulder',
    categoryName: 'Drop-Shoulder Tees',
    price: 2790,
    description: 'Custom mineral sun-fade wash with distressing along the collar and hemline. Signature dropped shoulders with subtle center-back spine seam detailing.',
    fabricSpecs: '100% Carded Heavyweight Cotton • Artisanal Mineral Wash',
    fit: 'Oversized Boxy Silhouette',
    gsm: 280,
    rating: 4.8,
    reviewCount: 119,
    isNew: true,
    isBestSeller: false,
    inStock: true,
    primaryImage: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1000&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=1000&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=1000&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Vintage Acid Grey', hex: '#52525b', colorCode: 'GRY' },
      { name: 'Faded Black', hex: '#27272a', colorCode: 'BLK' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    tags: ['Mineral Wash', 'Drop 04']
  },
  {
    id: 'prod-tee-03',
    name: 'Raw Hem Sculptural Boxy Tee',
    category: 'drop-shoulder',
    categoryName: 'Drop-Shoulder Tees',
    price: 2690,
    description: 'Featuring laser-finished raw bottom hem with reinforced lock-stitching, extended drop shoulder line, and blind-stitched cuffs for a pristine minimalist profile.',
    fabricSpecs: '100% Long-Staple Egyptian Cotton • Mercerized Lustre',
    fit: 'Relaxed Square Boxy Cut',
    gsm: 260,
    rating: 4.7,
    reviewCount: 83,
    isNew: false,
    isBestSeller: false,
    inStock: true,
    primaryImage: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=1000&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1000&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1000&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Optic White', hex: '#fafafa', colorCode: 'WHT' },
      { name: 'Smoked Iron', hex: '#3f3f46', colorCode: 'GRY' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    tags: ['Raw Edge', 'Mercerized']
  },

  // 3. Polos & Luxury Knits
  {
    id: 'prod-polo-01',
    name: 'Waffle Knit Open-Collar Boxy Polo',
    category: 'polos',
    categoryName: 'Polos & Knits',
    price: 3490,
    description: 'Sophisticated relaxed-fit resort polo crafted from a breathable heavyweight 3D waffle stitch knit. Features a buttonless relaxed Johnny open collar and seamless dropped shoulders.',
    fabricSpecs: '100% Combed Cotton Waffle Knit • Breathable Thermal Texture',
    fit: 'Contemporary Boxy Dropped Fit',
    gsm: 310,
    rating: 4.9,
    reviewCount: 167,
    isNew: true,
    isBestSeller: true,
    inStock: true,
    primaryImage: 'https://images.unsplash.com/photo-1625910513413-5b870c538743?q=80&w=1000&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?q=80&w=1000&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1625910513413-5b870c538743?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1000&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Onyx Black', hex: '#121214', colorCode: 'BLK' },
      { name: 'Ivory Cream', hex: '#f4f4f5', colorCode: 'WHT' },
      { name: 'Heather Grey', hex: '#a1a1aa', colorCode: 'GRY' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    tags: ['Open Collar', 'Waffle Knit']
  },
  {
    id: 'prod-polo-02',
    name: 'Minimalist Quarter-Zip Heavy Polo',
    category: 'polos',
    categoryName: 'Polos & Knits',
    price: 3790,
    description: 'Clean high-density interlock polo with custom gunmetal matte zipper pull, flat knit spread collar, and ribbed hem for structured waist resting.',
    fabricSpecs: '92% Double-Knit Interlock Cotton, 8% Elastane',
    fit: 'Structured Relaxed Fit',
    gsm: 330,
    rating: 4.8,
    reviewCount: 92,
    isNew: false,
    isBestSeller: false,
    inStock: true,
    primaryImage: 'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?q=80&w=1000&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1625910513413-5b870c538743?q=80&w=1000&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1625910513413-5b870c538743?q=80&w=1000&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Charcoal Shadow', hex: '#18181b', colorCode: 'BLK' },
      { name: 'Mist Silver', hex: '#d4d4d8', colorCode: 'GRY' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    tags: ['Quarter Zip', 'Interlock Cotton']
  },

  // 4. Hoodies & Outerwear
  {
    id: 'prod-hoodie-01',
    name: 'Ultra-Heavy 480 GSM Double-Hooded Boxy Pullover',
    category: 'hoodies-outerwear',
    categoryName: 'Hoodies & Outerwear',
    price: 5990,
    description: 'Engineered without drawstring eyelets for a clean brutalist aesthetic. Features a double-layered crossover hood, double-stitched kangaroo pocket, and signature oversized dropped sleeves.',
    fabricSpecs: '100% French Terry Heavyweight Fleece • 480 GSM Density',
    fit: 'Oversized Sculptural Boxy Silhouette',
    gsm: 480,
    rating: 5.0,
    reviewCount: 231,
    isNew: true,
    isBestSeller: true,
    inStock: true,
    primaryImage: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=1000&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?q=80&w=1000&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?q=80&w=1000&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Matte Pitch Black', hex: '#09090b', colorCode: 'BLK' },
      { name: 'Concrete Grey', hex: '#71717a', colorCode: 'GRY' },
      { name: 'Bone White', hex: '#f4f4f5', colorCode: 'WHT' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    tags: ['480 GSM French Terry', 'Flagship']
  },
  {
    id: 'prod-hoodie-02',
    name: 'Dual-Way Metal Zip Oversized Cardigan Jacket',
    category: 'hoodies-outerwear',
    categoryName: 'Hoodies & Outerwear',
    price: 6490,
    description: 'Brutalist outerwear hybrid crafted with custom bidirectional YKK silver hardware, dropped shoulders, stand collar, and concealed vertical slash pockets.',
    fabricSpecs: '80% Heavy Combed Cotton, 20% Technical Poly Weave',
    fit: 'Relaxed Tailored Streetwear Fit',
    gsm: 400,
    rating: 4.9,
    reviewCount: 77,
    isNew: true,
    isBestSeller: false,
    inStock: true,
    primaryImage: 'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?q=80&w=1000&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=1000&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=1000&auto=format&fit=crop'
    ],
    colors: [
      { name: 'True Black', hex: '#121214', colorCode: 'BLK' },
      { name: 'Steel Melange', hex: '#52525b', colorCode: 'GRY' }
    ],
    sizes: ['M', 'L', 'XL'],
    tags: ['2-Way Zip', 'Limited Run']
  }
];

export const HERO_SLIDES = [
  {
    id: 'slide-01',
    type: 'video',
    title: 'THE NEW ARCHIVE',
    subtitle: 'MONOCHROME SYSTEM / EDITION 2026',
    description: 'Architectural minimalism tailored for effortless everyday luxury. Heavyweight premium fabrics, sculpted profiles, and a refined monochromatic palette.',
    tag: 'NEW RELEASE',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-fashion-model-in-a-black-outfit-walking-in-a-studio-41487-large.mp4',
    poster: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1600&auto=format&fit=crop',
    ctaText: 'EXPLORE COLLECTION',
    categoryTarget: 'all',
    featuredProduct: 'prod-trouser-01'
  },
  {
    id: 'slide-02',
    type: 'image',
    title: 'FORM & SILHOUETTE',
    subtitle: 'STUDIO CRAFTSMANSHIP',
    description: 'Engineered with meticulous attention to drape, fall, and density. Designed to look effortless and maintain structure wear after wear.',
    tag: 'SIGNATURE FORM',
    image: 'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?q=80&w=1600&auto=format&fit=crop',
    ctaText: 'VIEW THE LOOKS',
    categoryTarget: 'trousers',
    featuredProduct: 'prod-trouser-01'
  },
  {
    id: 'slide-03',
    type: 'image',
    title: 'TIMELESS ESSENTIALS',
    subtitle: 'PURE MONOCHROME PALETTE',
    description: 'A curated wardrobe in Onyx Black, Slate Grey, and Pure Chalk White. Minimalist foundational pieces crafted for all seasons.',
    tag: 'CAPSULE ARCHIVE',
    image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=1600&auto=format&fit=crop',
    ctaText: 'SHOP ESSENTIALS',
    categoryTarget: 'drop-shoulder',
    featuredProduct: 'prod-tee-01'
  }
];

export const CATEGORIES_LIST = [
  {
    id: 'all',
    name: 'All Collection',
    count: 8,
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'trousers',
    name: 'Straight-Leg Baggy Trousers',
    count: 3,
    image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'drop-shoulder',
    name: 'Drop Shoulder Tees',
    count: 3,
    image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'polos',
    name: 'Polos & Waffle Knits',
    count: 2,
    image: 'https://images.unsplash.com/photo-1625910513413-5b870c538743?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'hoodies-outerwear',
    name: 'Heavyweight Hoodies',
    count: 2,
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=600&auto=format&fit=crop'
  }
];
