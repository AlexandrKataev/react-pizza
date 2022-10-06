import React from 'react';

type CategoriesProps = {
  categoryId: number;
  onClickCategory: any;
};

const Categories: React.FC<CategoriesProps> = (props) => {
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  return (
    <div className="categories">
      <ul>
        {categories.map((name, index) => {
          return (
            <li
              key={index}
              onClick={() => props.onClickCategory(index)}
              className={props.categoryId === index ? 'active' : ''}>
              {name}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Categories;
