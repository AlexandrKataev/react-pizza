import React from 'react';

function Categories(props) {
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  return (
    <div className="categories">
      <ul>
        {categories.map((name, index) => {
          return (
            <li
              key={index}
              onClick={() => props.onClickCategory(index)}
              className={props.categoryId === index ? 'active' : ''}
            >
              {name}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Categories;
