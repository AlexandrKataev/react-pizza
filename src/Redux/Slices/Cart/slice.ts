import { getCartFromLocalStorage } from './../../../utils/getCartFromLocalStorage';
import { calcTotalPrice } from './../../../utils/calcTotalPrice';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { CartItem, CartState } from './types';

const { totalPrice, items } = getCartFromLocalStorage();

const initialState: CartState = {
  totalPrice,
  items,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // addItem: (state, action) => {
    //   state.items.push(action.payload);
    //   state.totalPrice = state.items.reduce((sum, obj) => {
    //     return obj.price + sum;
    //   }, 0);
    // },
    addItem: (state, action: PayloadAction<CartItem>) => {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },

    minusItem: (state, action: PayloadAction<string>) => {
      const findItem = state.items.find((obj) => obj.id === action.payload);
      if (findItem) {
        findItem.count--;
      }
      state.totalPrice = calcTotalPrice(state.items);
    },

    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((obj) => obj.id != action.payload);
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },
    clearItem: (state) => {
      state.items = [];
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },
  },
});

export const { addItem, removeItem, clearItem, minusItem } = cartSlice.actions;

export default cartSlice.reducer;
