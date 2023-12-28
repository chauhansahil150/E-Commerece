import React, { useEffect, useState } from "react";
import { ALL_PLACED_ORDERS_API, DISPATCH_ORDER_BY_SELLER } from "../../../api/api";
function PlacedOrderCard(props){
    const [dispatchTo,setDispatchedTo]=useState("Ambala");
    return (
        <div className=" p-2">
                <p> Product Id: {props.order.product_id}</p>
                <p>Address Id: {props.order.address_id}</p>
                <p>payment_status: {props.order.payment_status}</p>
                <p>payment_mode: { props.order.payment_mode}</p>
                <p>Quantity: { props.order.quantity}</p>
                <p> total_amount:${ props.order.total_amount}</p> 

                <div class="bottom">
                   <label for="dispatch_to">Dispatch To</label>
                 <select name="dispatch_to" className="bg-gray-200"
                 onChange={(e)=>{setDispatchedTo(e.target.value)}}
                 >
                    <option value="Ambala">Ambala</option>
                    <option value="Kurukshetra">Kurukshetra</option>
                    <option value="Karnal">Karnal</option>
                    <option value="Mohali">Mohali</option>
                    <option value="Chandigarh">Chandigarh</option>
                    <option value="Yamunanagar">Yamunanagar</option>
                </select>
                <br />
                <button className="bg-black text-white p-1 m-1 rounded-md shadow-xl" onClick={()=>{
                    props.handleDispatch(props.order.id,dispatchTo);
                }} >Dispatch</button>
               </div>
            </div>
    )
}
const PlacedOrders=()=>{
    const [orders,setOrders]=useState([]);

    function handleDispatch(o_id,dispatchTo){
        console.log('object');
        const arr=[o_id,dispatchTo];
        fetch(DISPATCH_ORDER_BY_SELLER + arr.join('-'),{
            method:'put',
            credentials:'include'
        })
        .then(res=>{
            if(res.ok){
                filterData(o_id);
            }
        })
    }
    function filterData(o_id){
        setOrders(orders.filter(o=>{
            return o.id!=o_id
        }))
    }
    useEffect(()=>{
        fetch(ALL_PLACED_ORDERS_API,{
            method:'get',
            credentials:'include',
        })
        .then(res=>{
            if(res.status==200){
                return res.json();
            }
        })
        .then(data=>{
            setOrders(data);
        })
    },[])
    console.log(orders)
    return(
        orders.length>=1?<div className="flex p-2">
        {orders.map((order,ind)=>{
         return(
            <PlacedOrderCard key={order.id} order={order} handleDispatch={handleDispatch} />
         )
        })}
     </div>:<>No Req Yet</>
    )
}
export default PlacedOrders;