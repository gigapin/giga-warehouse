import type { Customer } from '@/types/customer';
import type { Supplier } from '@/types/supplier';

export type Order = {
  id: number;
  typology: 'customer' | 'supplier';
  customer_id?: number;
  supplier_id?: number;
  order_number: string;
  request_date: string;
  closing_date?: string;
  status: 'open' | 'close';
  note?: string;
  customer?: Customer;
  supplier?: Supplier;
  created_at: Date;
  updated_at: Date;
}
