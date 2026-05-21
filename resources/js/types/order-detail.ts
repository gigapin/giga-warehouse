import type { Order } from '@/types/order';
import type { Item } from '@/types/item';

export type OrderDetail = {
  id: number;
  order_id: number;
  item_id: number;
  delivery_date: string;
  qta_ordered: number;
  qta_delivered: number;
  delivered: number;
  note?: string;
  order?: Order;
  item?: Item;
  created_at: Date;
  updated_at: Date;
}
