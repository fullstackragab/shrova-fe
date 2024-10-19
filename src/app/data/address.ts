export interface Address {
  id: number;
  userId: number;
  name: string;
  street1: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  type: number;
  isDefault?: boolean;
}
