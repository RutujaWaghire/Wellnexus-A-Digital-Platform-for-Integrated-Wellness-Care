// Type definitions for API requests and responses

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  fullName: string;
  role: string;
}

export interface UserProfileUpdate {
  name?: string;
  email?: string;
  password?: string;
  specializations?: string[];
  isVerified?: boolean;
}

export interface TherapySessionBooking {
  therapyId: number;
  practitionerId: number;
  sessionDate: string;
  notes?: string;
}

export interface AddToCartRequest {
  productId: string;
  quantity: number;
}

export interface User {
  id: string;
  email: string;
  fullName: string;
  role: string;
}

export interface Practitioner {
  id: number;
  name: string;
  specialization: string;
  email: string;
  isVerified: boolean;
}

export interface Therapy {
  id: number;
  name: string;
  description: string;
  category: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
}

export interface CartItem {
  id: number;
  productId: number;
  quantity: number;
  product: Product;
}

export interface Notification {
  id: number;
  message: string;
  isRead: boolean;
  createdAt: string;
}
