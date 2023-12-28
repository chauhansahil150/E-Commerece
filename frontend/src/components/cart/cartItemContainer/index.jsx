import React, { useContext, useEffect, useState } from "react";
import style from './style.module.css';
import Button from "../../Button";
import { REMOVE_CART_PRODUCT } from "../../../api/api";
import { UPDATE_CART_PRODUCT_QUANTITY } from "../../../api/api";
import ProductItemDetail from "../../productDetails";
import CartContext from "../../../context/cart/cartContext";

const CartItem = (props) => {
    console.log(props);
  const [isRemoved, setIsRemoved] = useState(false);
  const [product, setProduct] = useState(props.product);
  const [isViewDetailsClicked, setIsViewDetailsClicked] = useState(false);
  const {totalPrice,setTotalPrice}=useContext(CartContext)

  // useEffect(() => {
  //   props.calculateTotalPrice(); // Initial calculation
  // }, [product, props]);

  

  function updateQuantity(newQuantity) {
    const productId = props?.product?.id;

    fetch(`${UPDATE_CART_PRODUCT_QUANTITY}/${productId}/${newQuantity}`, {
      method: 'put',
      credentials: 'include'
    })
      .then(res => {
        if (res.ok) {
          setProduct((prevProduct) => ({
            ...prevProduct,
            quantity: newQuantity
          }));
          props.updateTotal(props.product.id,newQuantity);
        }
      });
  }

   function incrementQuantity() {
    let quantity = product?.quantity;
    if (quantity < 5) {
      quantity++;
      updateQuantity(quantity);
    //   props.calculateTotalPrice(); // Recalculate immediately after updating quantity
    //  setTotalPrice((p)=>{
    //      p+(props.product.product_id.price);
    // })
    setTotalPrice(7);
    console.log('total price inside index........',totalPrice);
    } else {
      alert('Quantity cannot be more than 5');
    }
  }

  function decrementQuantity() {
    let quantity = product?.quantity;
    if (quantity > 1) {
      quantity--;
      updateQuantity(quantity);
      props.updateTotal(); // Recalculate immediately after updating quantity
    }
  }

  return (
    <>
      {isViewDetailsClicked ? <ProductItemDetail onClickProductItem={() => setIsViewDetailsClicked(!isViewDetailsClicked)} product={props.product.product_id} /> : <></>}
      
        <div className={style.cart_item} id={props?.product?.id} key={props?.product?.id}>
          <div className={style.img_div} key='img'>
            <img src={props?.product?.product_id?.image} alt="product image" />
          </div>
          <div className={style.cart_item_right} key='data'>
            <div key={`${props?.product?.product_id?.name}-${props?.product?.product_id?.price}`}>
              <h1>{props?.product?.product_id?.name}</h1>
              <h2>${props?.product?.product_id?.price}</h2>
            </div>
            <div className={style.cart_quantity_btn} key='quantity-btn'>
              <button onClick={decrementQuantity} className={style.btn} key='-'>-</button>
              <h3 className={style.quantity}>{product?.quantity}</h3>
              <button onClick={incrementQuantity} className={style.btn} key='+'>+</button>
            </div>
            <div className={style.cart_btn} key='btn'>
              <Button onClick={()=>{
                props.removeTile(props.product)
              }} name='Remove' />
              <Button onClick={() => {
                setIsViewDetailsClicked(true);
              }} name='View-Detail' />
            </div>
          </div>
        </div>
      
    </>
  );
};

export default CartItem;
