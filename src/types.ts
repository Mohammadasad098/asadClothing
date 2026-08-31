export type ProductCategory = 
  | 'all'
  | 'trousers'
  | 'drop-shoulder'
  | 'polos'
  | 'hoodies-outerwear';

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  categoryName: string;
  price: number;
  originalPrice?: number;
  description: string;
  fabricSpecs: string;
  fit: string;
  gsm: number;
  rating: number;
  reviewCount: number;
  isNew?: boolean;
  isBestSeller?: boolean;
  inStock: boolean;
  primaryImage: string;
  secondaryImage: string;
  galleryImages: string[];
  colors: {
    name: string;
    hex: string;
    colorCode: string;
  }[];
  sizes: ('S' | 'M' | 'L' | 'XL' | 'XXL')[];
  tags: string[];
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  image: string;
  size: string;
  color?: {
    name: string;
    hex: string;
  };
  quantity: number;
  categoryName: string;
}

export interface Review {
  id: string;
  author: string;
  rating?: number;
  date: string;
  title: string;
  comment: string;
  verifiedBuyer?: boolean;
  productName?: string;
  sizePurchased?: string;
  fitFeedback?: string;
  helpfulCount?: number;
}

export interface LookbookItem {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  categoryTag: string;
  products: {
    productId: string;
    name: string;
    price: number;
    posX: number; // percentage
    posY: number; // percentage
  }[];
}
