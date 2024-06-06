import React, { useState } from "react";
import CartContext from "./cart-context";

const CartProvider = (props) => {
  const [cartItems, setCartItems] = useState([]);
  const addItemsHandler = (item) => {
    setCartItems((prevItem) => [...prevItem, item]);
    console.log(cartItems);
  };
  const removeItemsHandler = (title) => {
    const updatedItems = cartItems.filter((item) => item.title !== title);
    setCartItems(updatedItems);
  };
  const cartContext = {
    cartItems: cartItems,
    addItems: addItemsHandler,
    removeItems: removeItemsHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
