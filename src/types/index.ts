/**
 * Shared TypeScript types and interfaces for the e-commerce app.
 */

// User types
export interface UserWithOrders extends Omit<User, 'password'> {
  orders?: Order[];
  cartItems?: CartItem[];
}

// Product types
export interface ProductWithCategory extends Product {
  category?: Category;
}

// Order types
export interface OrderWithItems extends Order {
  items?: OrderItem[];
  user?: User;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Import Prisma types
export type {
  User,
  Product,
  Category,
  Order,
  OrderItem,
  CartItem,
} from '@prisma/client';
