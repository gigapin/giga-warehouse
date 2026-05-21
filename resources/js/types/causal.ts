export type Causal = {
  id: number;
  code: string;
  description: string;
  typology: 'inbound' | 'outbound';
  created_at: Date;
  updated_at: Date;
}
