import React from 'react';

function Categories(props) {
  const [activeCategory, setactiveCategory] = React.useState(0);
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];
  const onClickCategory = (index) => setactiveCategory(index);
  return (
    <div className="categories">
      <ul>
        {categories.map((name, index) => {
          return (
            <li
              key={index}
              onClick={() => onClickCategory(index)}
              className={activeCategory === index ? 'active' : ''}
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
