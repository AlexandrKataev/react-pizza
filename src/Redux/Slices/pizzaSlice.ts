import axios from 'axios';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { CartItem } from './cartSlice';

/* 
Создаем асинхронную функцию - fetch запрос, который возвращает данные. 
createAsyncThunk - создает ассинхронную функцию
'pizza/fetchPizzasStatus' - просто имя для функции, можно указать любое, его будет видно в Redux отладчике
params - входящие в функцию параметры
response - ответ от сервера
thunkAPI - дает доступ к функциям dispatch(), getState(), signal() 
*/

type FetchPizzasArgs = {
  categoryId: number;
  sortType: string;
};

type Pizza = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  size: number[];
  type: number[];
  count: number;
};

enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

interface PizzaState {
  items: Pizza[];
  status: Status;
}
/* Создаём начальный state */
const initialState: PizzaState = {
  items: [],
  status: Status.LOADING, //   loading | success | error
};

export const fetchPizzas = createAsyncThunk<Pizza[], FetchPizzasArgs>(
  'pizza/fetchPizzasStatus',
  async (params) => {
    const { categoryId, sortType } = params;
    const response = await axios.get<Pizza[]>(
      `https://632a05584c626ff832cfe7bb.mockapi.io/items?${
        categoryId > 0 ? `category=${categoryId}` : ''
      }&sortBy=${sortType}&order=desc`,
    );
    return response.data;
  },
);

/* reducers - для использования в UI

extraReducers - для fetch запросов
  pending - выполняется при загрузке
  fulfilled - выполняется после успешной загрузки
  rejected - выполняется при ошибке */
export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<Pizza[]>) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state, action) => {
      state.items = []; //  на всякий случай
      state.status = Status.LOADING;
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload; // здесь передаем в state загруженные пиццы
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchPizzas.rejected, (state, action) => {
      state.status = Status.ERROR;
      state.items = []; //  на всякий случай
    });
  },
  // extraReducers: {
  //   [fetchPizzas.pending]: (state) => {
  //     state.items = []; //  на всякий случай
  //     state.status = 'loading';
  //   },
  //   [fetchPizzas.fulfilled]: (state, action) => {
  //     state.items = action.payload; // здесь передаем в state загруженные пиццы
  //     state.status = 'success';
  //   },
  //   [fetchPizzas.rejected]: (state, action) => {
  //     state.status = 'error';
  //     state.items = []; //  на всякий случай
  //   },
  // },
});

export const selectPizzaItems = (state: RootState) => state.pizza;

/* Экспортируем редьюсеры */
export const { setItems } = pizzaSlice.actions;

/* по дефолту экспортируем слайс (для создания стора) */
export default pizzaSlice.reducer;
