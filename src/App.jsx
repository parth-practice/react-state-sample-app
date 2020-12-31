import React, { useState } from "react";
import { Routes, Route } from 'react-router-dom';

import "./App.css";
import Footer from "./Footer";
import Header from "./Header";
import Products from './Products';
import Detail from './Detail';
import Cart from './Cart';

export default function App() {

  const [cart, setCart] = useState([]);

  function addToCart(id, sku) {
    // console.log(":::", cart);
    setCart((items) => {
      const itemInCart = items.find((i) => i.sku === sku);

      if (itemInCart) {
        // return new array with matching item replace
        return items.map((i) => i.sku === sku ? {...i, quantity: i.quantity + 1 } : i);
      } else {
        // return new array with new item added
        return [ ...items, { id, sku, quantity: 1 } ];
      }
    });
  }

  return (
    <>
      <div className="content">
        <Header />
        <main>
          <Routes>
            <Route path='/' element={<h1> Welcome to the Online shopping </h1>} />
            <Route path='/:category' element={<Products/>} />
            <Route path='/:category/:id' element={<Detail addToCart={addToCart}/>} />
            <Route path='/cart' element={<Cart />}/>
          </Routes>
        </main>
      </div>
      <Footer />
    </>
  );
}
