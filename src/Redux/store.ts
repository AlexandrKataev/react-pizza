import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import filter from './Slices/filterSlice';
import cart from './Slices/cartSlice';
import pizza from './Slices/pizzaSlice';

export const store = configureStore({
  reducer: { filter, cart, pizza },
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
