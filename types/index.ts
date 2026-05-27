export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  sort_order: number;
  created_at: string;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category_id: string;
  category?: Category;
  image_url: string;
  is_veg: boolean;
  is_spicy: boolean;
  is_available: boolean;
  sort_order: number;
  created_at: string;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image_url: string;
  is_veg: boolean;
}

export interface Order {
  id: string;
  customer_name: string;
  customer_phone: string;
  customer_email?: string;
  items: OrderItemDetail[];
  total_amount: number;
  status: 'pending' | 'preparing' | 'ready' | 'delivered';
  special_instructions?: string;
  created_at: string;
  updated_at: string;
}

export interface OrderItemDetail {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image_url?: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  menu_item_id: string;
  menu_item?: MenuItem;
  quantity: number;
  unit_price: number;
  created_at: string;
}

export interface Reservation {
  id: string;
  customer_name: string;
  customer_phone: string;
  customer_email?: string;
  date: string;
  time: string;
  guest_count: number;
  special_request?: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  created_at: string;
}

export interface Review {
  id: string;
  customer_name: string;
  rating: number;
  review_text: string;
  date: string;
}
