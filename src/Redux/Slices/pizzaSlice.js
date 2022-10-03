import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

/* 
Создаем асинхронную функцию - fetch запрос, который возвращает данные. 
createAsyncThunk - создает ассинхронную функцию
'pizza/fetchPizzasStatus' - просто имя для функции, можно указать любое, его будет видно в Redux отладчике
params - входящие в функцию параметры
response - ответ от сервера
thunkAPI - дает доступ к функциям dispatch(), getState(), signal() 
*/
export const fetchPizzas = createAsyncThunk('pizza/fetchPizzasStatus', async (params, thunkAPI) => {
  const { categoryId, sortType } = params;
  const response = await axios.get(
    `https://632a05584c626ff832cfe7bb.mockapi.io/items?${
      categoryId > 0 ? `category=${categoryId}` : ''
    }&sortBy=${sortType}&order=desc`,
  );
  return response.data;
});

/* Создаём начальный state */
const initialState = {
  items: [],
  status: 'loading', //   loading | success | error
};

/* reducers - для использования в UI

extraReducers - для fetch запросов
  pending - выполняется при загрузке
  fulfilled - выполняется после успешной загрузки
  rejected - выполняется при ошибке */
export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },
  },
  extraReducers: {
    [fetchPizzas.pending]: (state) => {
      state.items = []; //  на всякий случай
      state.status = 'loading';
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.items = action.payload; // здесь передаем в state загруженные пиццы
      state.status = 'success';
    },
    [fetchPizzas.rejected]: (state, action) => {
      state.status = 'error';
      state.items = []; //  на всякий случай
    },
  },
});

export const selectPizzaItems = (state) => state.pizza;

/* Экспортируем редьюсеры */
export const { setItems } = pizzaSlice.actions;

/* по дефолту экспортируем слайс (для создания стора) */
export default pizzaSlice.reducer;
