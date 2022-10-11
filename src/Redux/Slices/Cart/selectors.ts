import { RootState } from '../../store';

export const selectCartState = (state: RootState) => state.cart;
export const selectCart = (state: RootState) => state.cart.items;
export const selectPizza = (id: string) => (state: RootState) =>
  state.cart.items.find((obj) => obj.id === id);
export const selectCartTotalPrice = (state: RootState) => state.cart.totalPrice;
