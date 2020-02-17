import React, { createContext, useState, useEffect } from 'react';

import {
  addItemToCart,
  removeItemFromCart,
  filterItemFromCart,
  getTotal,
  getCartItemsCount
} from './cart.utils';

export const CartContext = createContext({
  hidden: true,
  toggleHidden: () => {},
  cartItems: [],
  addItem : () => {},
  removeItem: () => {},
  clearItem: () => {},
  cartItemsCount: 0,
  total: 0
});

const CartProvider = ({ children }) => {
  const [hidden, setHidden] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setCartItemsCount(getCartItemsCount(cartItems));
    setTotal(getTotal(cartItems));
  }, [cartItems]);

  const addItem = item => {
    setCartItems(addItemToCart(cartItems, item));
  };

  const removeItem = item => {
    setCartItems(removeItemFromCart(cartItems, item));
  };

  const clearItem = item => {
    setCartItems(filterItemFromCart(cartItems, item));
  };

  const toggleHidden = () => setHidden(!hidden);

  return (
    <CartContext.Provider
      value={{
        hidden,
        toggleHidden,
        cartItems,
        addItem,
        removeItem,
        clearItem,
        cartItemsCount,
        total
      }}
    >
      {children}
    </CartContext.Provider>
  )
};

export default CartProvider;
