import type { Municipality } from '@/types/municipality';

export type Customer = {
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
  municipality?: Municipality;
  created_at: Date;
  updated_at: Date;
}
