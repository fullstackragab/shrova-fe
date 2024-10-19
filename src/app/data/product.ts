export interface Product {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  category: number;
  price: number;
  stock: number;
  published: boolean;
  length: number;
  width: number;
  height: number;
  weight: number;
  massUnit: string;
  distanceUnit: string;
}
