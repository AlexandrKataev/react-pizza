import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

type Sort = {
  name: string;
  sortProperty: 'rating' | 'price' | 'title';
};

interface FilterState {
  searchValue: string;
  categoryId: number;
  sort: Sort;
}

const initialState: FilterState = {
  searchValue: '',
  categoryId: 0,
  sort: { name: 'популярности', sortProperty: 'rating' },
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryId: (state, action: PayloadAction<number>) => {
      state.categoryId = action.payload;
    },
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
    setSortType: (state, action: PayloadAction<Sort>) => {
      state.sort = action.payload;
    },
  },
});

export const selectSort = (state: RootState) => state.filter.sort;
export const selectSortCategoryId = (state: RootState) => state.filter.categoryId;
export const selectSortProperty = (state: RootState) => state.filter.sort.sortProperty;
export const selectSearchValue = (state: RootState) => state.filter.searchValue;

export const { setCategoryId, setSortType, setSearchValue } = filterSlice.actions;

export default filterSlice.reducer;
