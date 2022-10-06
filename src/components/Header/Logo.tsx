import React from 'react';

import pizzaLogo from '../../assets/img/pizza-logo.svg';
import { Link } from 'react-router-dom';

export default function Logo() {
  return (
    <Link to="/">
      <div className="header__logo">
        <img width="38" src={pizzaLogo} alt="Pizza logo" />
        <div>
          <h1>React Pizza</h1>
          <p>самая вкусная пицца во вселенной</p>
        </div>
      </div>
    </Link>
  );
}
