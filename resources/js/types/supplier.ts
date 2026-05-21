import type { Municipality } from '@/types/municipality';

export type Supplier = {
  id: number;
  company_name: string;
  vat_number: string;
  fiscal_code: string;
  municipality_id: number;
  address: string;
  sdi_code?: string;
  pec?: string;
  email: string;
  phone: string;
  service?: number;
  punctuality?: number;
  quality?: number;
  prices?: number;
  assistance?: number;
  municipality?: Municipality;
  created_at: Date;
  updated_at: Date;
}
