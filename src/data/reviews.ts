import { Review } from '../types';

export const REVIEWS_DATA: Review[] = [
  {
    id: 'rev-01',
    author: 'Hamza Malik',
    rating: 5,
    date: '2 days ago',
    title: 'The fit on the Straight-Leg Baggy Trousers is unmatched',
    comment: 'I have been looking for straight-leg trousers with this exact stack on low sneakers and boots. The heavyweight twill does not wrinkle, the pleats stay razor sharp, and the waist drawstring gives complete freedom. 10/10 craftsmanship.',
    verifiedBuyer: true,
    productName: 'Straight-Leg Pleated Baggy Trouser',
    sizePurchased: 'L / Slate Grey',
    fitFeedback: 'Perfect Oversized',
    helpfulCount: 42
  },
  {
    id: 'rev-02',
    author: 'Zain A.',
    rating: 5,
    date: '1 week ago',
    title: '300 GSM Drop-Shoulder Tee is heavier than Fear of God',
    comment: 'The collar ribbing is super thick and tight—does not bacon after wash. The dropped shoulder seam hangs perfectly boxy without looking sloppy. Definitely ordering in Chalk White and Onyx Black.',
    verifiedBuyer: true,
    productName: 'Heavyweight 300 GSM Drop-Shoulder Tee',
    sizePurchased: 'M / Pure Chalk White',
    fitFeedback: 'True to Size',
    helpfulCount: 38
  },
  {
    id: 'rev-03',
    author: 'Danyal Siddiqui',
    rating: 5,
    date: '2 weeks ago',
    title: 'Waffle Knit Open-Collar Polo feels like luxury Italian knitwear',
    comment: 'The 3D waffle texture breathes so well while still having substantial weight. Johnny collar sits flat and looks incredibly clean styled with the pleated pants.',
    verifiedBuyer: true,
    productName: 'Waffle Knit Open-Collar Boxy Polo',
    sizePurchased: 'L / Onyx Black',
    fitFeedback: 'True to Size',
    helpfulCount: 29
  },
  {
    id: 'rev-04',
    author: 'Bilal R.',
    rating: 5,
    date: '3 weeks ago',
    title: '480 GSM French Terry is a tank',
    comment: 'No drawstrings on the hoodie makes it look minimal and sculptural. The crossover hood stays standing up even when worn down. Best hoodie I own in my entire wardrobe.',
    verifiedBuyer: true,
    productName: 'Ultra-Heavy 480 GSM Double-Hooded Boxy Pullover',
    sizePurchased: 'XL / Matte Pitch Black',
    fitFeedback: 'Perfect Oversized',
    helpfulCount: 51
  },
  {
    id: 'rev-05',
    author: 'Usman Farooq',
    rating: 4,
    date: '1 month ago',
    title: 'Cargo Pants are utilitarian perfection',
    comment: 'Pockets are flush with the leg so you do not look bulky. The Japanese ripstop fabric feels indestructible and the ankle cinch cords allow you to switch from straight stack to tapered jogger in seconds.',
    verifiedBuyer: true,
    productName: 'Minimal Utility Straight Cargo Pant',
    sizePurchased: 'M / Charcoal Black',
    fitFeedback: 'True to Size',
    helpfulCount: 19
  }
];

export const RATING_BREAKDOWN = {
  average: 4.9,
  totalReviews: 894,
  recommendPercent: 98,
  distribution: [
    { stars: 5, count: 792, percentage: 89 },
    { stars: 4, count: 82, percentage: 9 },
    { stars: 3, count: 14, percentage: 1.5 },
    { stars: 2, count: 4, percentage: 0.4 },
    { stars: 1, count: 2, percentage: 0.1 }
  ],
  fitStats: {
    runsSmall: 2,
    trueToSize: 76,
    perfectOversized: 20,
    runsLarge: 2
  }
};
