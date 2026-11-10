export type StockStatus = "in-stock" | "low-stock" | "out-of-stock";

export type Curriculum = "CBE" | "Cambridge" | "Literature" | "General";

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  categoryId: string;
  sku: string;
  curriculum: Curriculum;
  publisher: string;
  grade: string;
  subject: string;
  priceKsh: number;
  stockStatus: StockStatus;
  image: string;
  isSample: true;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  productCount: number;
}

export interface School {
  id: string;
  name: string;
  location: string;
  isSample: true;
}

export interface SchoolListItem {
  productId: string;
  quantity: number;
}

export interface SchoolList {
  id: string;
  schoolId: string;
  name: string;
  grade: string;
  academicYear: string;
  items: SchoolListItem[];
  isSample: true;
}

export interface CartItem {
  productId: string;
  quantity: number;
}

export type OrderStatus =
  | "pending"
  | "awaiting-payment"
  | "paid"
  | "processing"
  | "shipped"
  | "cancelled";

export interface Order {
  id: string;
  items: CartItem[];
  subtotalKsh: number;
  deliveryFeeKsh: number;
  totalKsh: number;
  status: OrderStatus;
  createdAt: string;
  customerName: string;
  phoneNumber: string;
  deliveryAddress: string;
  isSample: true;
}

export interface Review {
  id: string;
  productId: string;
  reviewerName: string;
  rating: 1 | 2 | 3 | 4 | 5;
  title: string;
  body: string;
  date: string;
  isSample: true;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  readTimeMinutes: number;
  image: string;
  isSample: true;
}
