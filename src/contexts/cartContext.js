import React, { createContext, useReducer,useState } from "react";

import { CartReducer } from "./cartReducer";

export const CartContext = createContext();

const Storage =  sessionStorage.getItem('cart') ? JSON.parse(sessionStorage.getItem('cart')) : [];

const initialState = { cartItems: Storage}

const CustomAlert = ({ message, onClose }) => {
  return (
    <div style={{ position: 'fixed', top: '20px', right: '20px', padding: '10px', background: 'green', color: 'white', borderRadius: '5px' }}>
      {message}
    </div>
  );
};

const CartContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(CartReducer, initialState);
  const [alertMessage, setAlertMessage] = useState(null);

  const showAlert = (message) => {
    setAlertMessage(message);
    setTimeout(() => {
      setAlertMessage(null);
    }, 2000); // Hide the alert after 2000 milliseconds (2 seconds)
  };

  const addProduct = payload => {
    dispatch({ type: 'ADD', payload });
    showAlert("Product added");
    return state.cartItems;
  }

  const removeProduct = payload =>
  {
    dispatch({ type: 'REMOVE', payload });
    return state.cartItems;
  }

  const increaseQuantity = payload => 
  {
    dispatch({ type: 'INCQTY', payload });
    return state.cartItems;
  }

  const decreaseQuantity = payload => 
  {
    dispatch({ type: 'DECQTY', payload });
    return state.cartItems;
  }

  const clearBasket = () => {
    dispatch({ type: 'CLEAR', payload: undefined });
    return state.cartItems;
  }

  const getCartItems = () => {
    return state.cartItems;
  }

  const contextValues = {
    addProduct,
    removeProduct,
    increaseQuantity,
    decreaseQuantity,
    clearBasket,
    getCartItems,
    ...state
  }

  return (
    <CartContext.Provider value={contextValues} >
      {children}
      {alertMessage && <CustomAlert message={alertMessage} />}
    </CartContext.Provider>
  )
}

export default CartContextProvider;