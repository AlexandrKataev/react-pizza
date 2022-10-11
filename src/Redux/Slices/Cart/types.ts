export type CartItem = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  size: number;
  type: string;
  count: number;
};

export interface CartState {
  totalPrice: number;
  items: CartItem[];
}
