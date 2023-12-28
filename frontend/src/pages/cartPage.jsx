import React, { useContext, useEffect, useState } from "react";
import style from './css/cartPage.module.css'
import CartItem from "../components/cart/cartItemContainer";
import { GET_ALL_CARTiTEMS, REMOVE_CART_PRODUCT } from "../api/api";
import Button from "../components/Button";
import CartContext from "../context/cart/cartContext";
import { NavLink } from "react-router-dom";
const Cart=()=>{
    const [allProducts, setAllProducts] = useState([]);
    const {totalPrice,setTotalPrice}=useContext(CartContext)
    
useEffect(()=>{
       fetch(GET_ALL_CARTiTEMS,{
            method:'get',
            headers:{
                'Content-Type':'application/json'
            },
            credentials:'include'
        }).then(res=>{
            if(res.ok){
                return res.json();
            }
        })
        .then(data=>{
            setAllProducts(data);
            console.log(data);
        })
    
},[]);

function removeTile(p){
    fetch(REMOVE_CART_PRODUCT + p.id, {
        method: 'delete',
        credentials: 'include'
      })
        .then(res => {
          if (res.status === 204) {
              setAllProducts(pre=>pre.filter(e=>e.id!=p.id))
          }
        });
}

function updateTotal(id,quantity){
    setAllProducts(p=>p.map(e=>{
        if(e.id==id){
            e.quantity=quantity;
            return e
        } else {
            return e
        }
    }))
}

function calculateTotalPrice(){
    const newTotalPrice = allProducts.reduce((t, p) => {
        return t + (p.quantity * p.product_id.price);
      }, 0);
      setTotalPrice(newTotalPrice)
}
calculateTotalPrice();
// useEffect(() => {
//     // Calculate total price based on allProducts and update context
//    calculateTotalPrice();
//   }, [allProducts, setTotalPrice]);
return(
    <>
    <div className={style.container} key='container'>
    <div className={style.left_container} key='left'>
      {
        allProducts.map((product)=>{
           return (
            <CartItem key={product.id} product={product} updateTotal={updateTotal} removeTile={removeTile}/>
           )
        })
      }
    </div>
    <div className={style.right_container} key='right'>
    <div className="billing-container" >
        {/* <table id="cart-table">
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Quantity</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody id="cart-body">
                
            </tbody>
        </table> */}
        <h3>Total: <span id="total-price">${totalPrice}</span></h3>
        <NavLink to='/user/buy'><Button  id="buy-now" name="Buy"/></NavLink>
    </div>
    </div>
  </div>
  </>
)
}
export default Cart;
