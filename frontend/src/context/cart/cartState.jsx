import React, { useState } from "react";
import CartContext from "./cartContext";

const CartState = (props) => {
  const [totalPrice,setTotalPrice] = useState(0);
  const [allProducts, setAllProducts] = useState([]);


  return (
    <CartContext.Provider value={{ totalPrice, setTotalPrice,allProducts, setAllProducts }}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartState;
