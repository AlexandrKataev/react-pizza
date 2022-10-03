import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CartEmpty from './components/CartEmpty/CartEmpty';

import Header from './components/Header/Header';
import Cart from './Pages/Cart';
import Home from './Pages/Home';
import NotFound from './Pages/NotFound';

import './scss/app.scss';

function App() {
  const cartTotalPrice = useSelector((state) => state.cart.totalPrice);
  return (
    <div>
      <div className="wrapper">
        <Header />

        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={cartTotalPrice ? <Cart /> : <CartEmpty />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
