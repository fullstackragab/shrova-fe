export interface Order {
  id: number;
  userId: number;
  transObjId: string;
  paymentIntentId: string;
  summaryId: number;
  orderDate: Date;
  items: string;
  total: number;
  labelUrl: string;
  trackingNumber: string;
  trackingUrl: string;
}
