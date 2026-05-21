import type { Causal } from '@/types/causal';
import type { Item } from '@/types/item';
import type { Order } from '@/types/order';

export type InventoryMovement = {
  id: number;
  causal_id: number;
  item_id: number;
  inventory_movement_type: 'inbound' | 'outbound';
  parent_id?: number;
  order_id?: number;
  detail_order_id: number;
  quantity: number;
  reference_ddt?: string;
  inventory_movement_date: string;
  purchase_price_cad: number;
  sale_price_cad: number;
  causal?: Causal;
  item?: Item;
  order?: Order;
  created_at: Date;
  updated_at: Date;
}
