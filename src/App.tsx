import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';

import MainLayout from './layouts/MainLayout';
import CartEmpty from './components/CartEmpty/CartEmpty';
import Cart from './Pages/Cart';
import Home from './Pages/Home';
import FullPizza from './Pages/FullPizza';
import NotFound from './Pages/NotFound';
import { selectCartTotalPrice } from './Redux/Slices/cartSlice';

import './scss/app.scss';

function App() {
  const cartTotalPrice = useSelector(selectCartTotalPrice);
  console.log(cartTotalPrice);
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route path="cart" element={cartTotalPrice ? <Cart /> : <CartEmpty />} />
        <Route path="pizza/:id" element={<FullPizza />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
