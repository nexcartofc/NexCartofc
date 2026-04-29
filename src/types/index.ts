export enum UserRole {
  ADMIN = "admin",
  SELLER = "seller",
  CUSTOMER = "customer",
}

export interface UserProfile {
  uid: string;
  email: string;
  fullName: string;
  role: UserRole;
  phoneNumber?: string;
  address?: string;
  createdAt: number;
}

export interface Product {
  id: string;
  sellerId: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  images: string[];
  stock: number;
  ratings: number;
  numReviews: number;
  isFlashDeal?: boolean;
  isTrending?: boolean;
  isNew?: boolean;
  createdAt: number;
  features?: string[];
  sellerName?: string;
}

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface OrderItem extends CartItem {
  priceAtPurchase: number;
  name: string;
  image: string;
}

export enum OrderStatus {
  PENDING = "pending",
  CONFIRMED = "confirmed",
  SHIPPED = "shipped",
  DELIVERED = "delivered",
  CANCELLED = "cancelled",
}

export interface Order {
  id: string;
  customerId: string;
  items: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
  paymentMethod: "COD" | "UPI" | "CARD" | "WALLET";
  shippingAddress: string;
  trackingNumber?: string;
  createdAt: number;
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  timestamp: number;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}
