import React, { useState, useEffect, useContext } from "react";
import CartContext from "./cart-context";
import AuthContext from "./auth-context";

const CartProvider = (props) => {
  const [cartItems, setCartItems] = useState([]);
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    if (authCtx.isLoggedIn && authCtx.email) {
      fetchCartItems();
    }
  }, [authCtx.isLoggedIn, authCtx.email]);

  const addItemsHandler = async (item) => {
    if (!authCtx.email) {
      console.error("User email is not available");
      return;
    }

    setCartItems((prevItems) => [...prevItems, item]);

    const userEmail = authCtx.email.replace(/[@.]/g, "");
    await fetch(
      `https://crudcrud.com/api/30899445d99945bdac639985ec4ff19e/cart${userEmail}`,
      {
        method: "POST",
        body: JSON.stringify(item),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  };

  const removeItemsHandler = async (title) => {
    if (!authCtx.email) {
      console.error("User email is not available");
      return;
    }

    const updatedItems = cartItems.filter((item) => item.title !== title);
    setCartItems(updatedItems);

    const userEmail = authCtx.email.replace(/[@.]/g, "");
    const response = await fetch(
      `https://crudcrud.com/api/30899445d99945bdac639985ec4ff19e/cart${userEmail}`
    );
    const data = await response.json();
    const itemToRemove = data.find((item) => item.title === title);

    if (itemToRemove) {
      await fetch(
        `https://crudcrud.com/api/30899445d99945bdac639985ec4ff19e/cart${userEmail}/${itemToRemove._id}`,
        {
          method: "DELETE",
        }
      );
    }
  };

  const fetchCartItems = async () => {
    if (!authCtx.email) {
      console.error("User email is not available");
      return;
    }

    const userEmail = authCtx.email.replace(/[@.]/g, "");
    const response = await fetch(
      `https://crudcrud.com/api/30899445d99945bdac639985ec4ff19e/cart${userEmail}`
    );
    const data = await response.json();
    setCartItems(data);
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
