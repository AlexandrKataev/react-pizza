import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setCategoryId } from '../Redux/Slices/filterSlice';
import { setSortType } from '../Redux/Slices/filterSlice';
import Categories from '../components/Categories/Categories';
import Sort from '../components/Sort/Sort';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import { fetchPizzas, selectPizzaItems } from '../Redux/Slices/pizzaSlice';

export default function Home() {
  const dispatch = useDispatch();
  const categoryId = useSelector((state) => state.filter.categoryId);
  const sortType = useSelector((state) => state.filter.sort.sortProperty);
  const searchValue = useSelector((state) => state.filter.searchValue);
  const { items, status } = useSelector(selectPizzaItems);

  const pizzas = items
    .filter((obj) => {
      if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
        return true;
      }
      return false;
    })
    .map((obj) => <PizzaBlock key={obj.id} {...obj} />);
  const skeletons = [...new Array(6)].map((_, index) => <Skeleton />);

  const onClickCategory = (id) => {
    dispatch(setCategoryId(id));
  };
  const onClickSortType = (id) => {
    dispatch(setSortType(id));
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
          <Sort sortType={sortType} onClickSortType={(i) => setSortType(i)} />
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
}
