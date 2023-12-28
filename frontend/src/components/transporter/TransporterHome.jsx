import React, { useEffect, useState } from "react";
import { ALL_PLACED_ORDERS_FOR_TRANSPORTER_API, DISPATCH_ORDER_BY_TRANSPORTER } from "../../api/api";
function PlacedOrderTransPorterCard(props) {
  const [status,setStatus]=useState("returned");
  const {
    order_id,
    payment_mode,
    total_amount,
    name,
    phone,
    address,
    city,
    state,
    zipcode,
  } = props.order;
  return (
   <div className="shadow-md shadow-black p-2 m-2">
     <p className="text-end p-2">Total Amount:${total_amount}</p>
     <p>Order id:{order_id}</p>
    <p>Payment Mode:{payment_mode}</p>
    <p>Name:{name}</p>
    <p>Phone:{phone}</p>
    <p>Address:{address}</p>
    <p>City;{city}</p>
    <p>State:{state}</p>
    <p>Pincode:{zipcode}</p>
   <label htmlFor="order_status">Order Status</label>
   <select className="bg-gray-200 p-1" name="order_status" id=""
   onChange={(e)=>{setStatus(e.target.value)}}
   >
    {/* {above status has hardcodeed 'returned' initial value} */}
    <option value="returned">Returned</option>
    <option value="delivered">Delivered</option>
   </select>
    <br />
   <button className="bg-black text-white p-1 mt-3 text-center block m-auto rounded-sm" onClick={()=>{props.handleDispatch(order_id,status)}}>Submit</button>
   </div>
  )
}
const TransporterHome = () => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    fetch(ALL_PLACED_ORDERS_FOR_TRANSPORTER_API, {
      method: "get",
      credentials: "include",
    })
      .then((res) => {
        if (res.status == 200) {
          return res.json();
        }
      })
      .then((data) => {
        setOrders(data.allOrders);
        console.log(data);
      })
      .catch((err) => console.log(err));
  }, []);

  function handleDispatch(o_id,status){
    const arr=[o_id,status];
    fetch(DISPATCH_ORDER_BY_TRANSPORTER + arr.join('-'),{
      method:'put',
      credentials:'include'
    })
    .then(res=>{
      if(res.status==200){
        return res.json();
      }
    })
    .then(data=>{
      if(data.success){
        alert("Order "+status+" successfully");
        filterData(o_id);
      }
    })
  }
  function filterData(o_id){
    setOrders(orders.filter((order)=>order.order_id!=o_id));
  }
  return (
    <div className="flex flex-wrap">
      {orders.map((order, ind) => {
        return <PlacedOrderTransPorterCard kay={order.id} order={order} handleDispatch={handleDispatch}/>;
      })}
    </div>
  );
};
export default TransporterHome;
