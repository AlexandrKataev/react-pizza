import React from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../Redux/store';

import {
  selectSearchValue,
  selectSortCategoryId,
  selectSortProperty,
  setCategoryId,
} from '../Redux/Slices/filterSlice';
import { setSortType } from '../Redux/Slices/filterSlice';
import Categories from '../components/Categories/Categories';
import Sort from '../components/Sort/Sort';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import { fetchPizzas, selectPizzaItems } from '../Redux/Slices/pizzaSlice';

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const categoryId = useSelector(selectSortCategoryId);
  const sortType = useSelector(selectSortProperty);
  const searchValue = useSelector(selectSearchValue);
  const { items, status } = useSelector(selectPizzaItems);

  const pizzas = items
    .filter((obj: any) => {
      if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
        return true;
      }
      return false;
    })
    .map((obj: any) => <PizzaBlock {...obj} />);
  const skeletons = [...new Array(6)].map((_, index) => <Skeleton />);

  const onClickCategory = (id: number) => {
    dispatch(setCategoryId(id));
  };

  const getPizzas = async () => {
    dispatch(fetchPizzas({ categoryId, sortType }));
    window.scrollTo(0, 0);
  };

  React.useEffect(() => {
    getPizzas();
  }, [categoryId, sortType, searchValue]);

  return (
    <div className="container">
      <div>
        <div className="content__top">
          <Categories categoryId={categoryId} onClickCategory={onClickCategory} />
          <Sort />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        {status === 'error' ? (
          <h1>Ошибка запроса на сервер</h1>
        ) : (
          <div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>
        )}
      </div>
    </div>
  );
};

export default Home;
