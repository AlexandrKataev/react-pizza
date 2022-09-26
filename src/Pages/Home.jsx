import React from 'react';
import axios from 'axios';

import { useSelector, useDispatch } from 'react-redux';
import { setCategoryId } from '../Redux/Slices/filterSlice';
import { setSortType } from '../Redux/Slices/filterSlice';
import Categories from '../components/Categories/Categories';
import Sort from '../components/Sort/Sort';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';

export default function Home({ searchValue }) {
  const dispatch = useDispatch();
  const categoryId = useSelector((state) => state.filter.categoryId);
  const sortType = useSelector((state) => state.filter.sort.sortProperty);

  const [items, setItems] = React.useState([]);
  const [isLoading, setIsloading] = React.useState(true);

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

  React.useEffect(() => {
    setIsloading(true);
    axios
      .get(
        `https://632a05584c626ff832cfe7bb.mockapi.io/items?${
          categoryId > 0 ? `category=${categoryId}` : ''
        }&sortBy=${sortType}&order=desc`,
      )

      .then((res) => {
        setItems(res.data);
        setIsloading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType, searchValue]);

  return (
    <div className="container">
      <div>
        <div className="content__top">
          <Categories categoryId={categoryId} onClickCategory={onClickCategory} />
          <Sort sortType={sortType} onClickSortType={(i) => setSortType(i)} />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      </div>
    </div>
  );
}
