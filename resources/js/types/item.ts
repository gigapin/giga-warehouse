import type { Category } from '@/types/category';

export type Item = {
  id: number;
  name: string;
  description: string;
  category_id: number;
  stock_beginning_year: number;
  progressive_annual_inbound: number;
  progressive_annual_outbound: number;
  safety_stock: number;
  available_stock: number;
  category?: Category;
  created_at: Date;
  updated_at: Date;
}
