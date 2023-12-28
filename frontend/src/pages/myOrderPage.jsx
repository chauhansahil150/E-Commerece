import React, { useEffect, useState } from "react";
import { ORDER_CANCEL, USER_ORDERS } from "../api/api";
import style from "./css/myOrders.module.css";
import Button from "../components/Button";
import CancelReason from "../components/cancelForm";
import EmptyMessage from "../components/EmptyMessage";
function UserOrders() {
  const [allProducts, setAllProducts] = useState([]);
  const [isCancelledClicked, setIsCancelledClicked] = useState(false);
  const [cancelItemId,setCancelItem] = useState("");
  const [isCancelled,setIsCancelled]=useState(false);
  console.log('current id',cancelItemId);
  useEffect(() => {
    setIsCancelledClicked(false);
    fetch(USER_ORDERS, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => {
        console.log(res);
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => {
        // console.log(data);
        setAllProducts(data.myOrderedProdects);
        console.log("object.......", allProducts);
      });
  }, []);
  function formatDate(date) {
    return new Date(date).toLocaleDateString();
  }

  const cancelThisItem = (pid) => {
      setIsCancelledClicked(p=>!p)
      !isCancelledClicked?setCancelItem(pid):setCancelItem("")    
  }

  function calculateExpectedDeliveryDate(orderDate, daysToAdd) {
    const deliveryDate = new Date(orderDate);
    deliveryDate.setDate(deliveryDate.getDate() + daysToAdd);
    return formatDate(deliveryDate);
  }
  function cancelOrder(id) {
    setIsCancelledClicked(true);
  }

  function cancelReason(order_id, reason) {
    const cancel_date = new Date();
    fetch(ORDER_CANCEL + order_id, {
      method: "PUT",
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ reason: reason, cancel_date }),
    }).then((res) => {
      if (res.ok) {
        setIsCancelledClicked(false);
        setIsCancelled(true);
        return res.json();
      }
    });
  }
  return allProducts.length==0?(
    <EmptyMessage message={"No Order Yet"}/>
  ):
  (
    <>
      <div className={style.container}>
        {isCancelledClicked?
                <CancelReason
                  cancelReason={cancelReason}
                  order_id={cancelItemId}
                />:<></>}
        {allProducts.map((p, ind) => (
          <div key={ind} className="w-[20%] h-[40%]">
            {console.log(p.order_id)}
            {isCancelledClicked ? (
             <></>
            ) : (
              <></>
            )}
            <div className={style.order_container} key={ind}>
              <p className={style.order_status}>{isCancelled?"cancelled":p.status}</p>
              <p>{p.name}</p>
              <img className="block mx-auto" src={p.thumbnail} alt="" />
              <p>Description: {p.description}</p>
              <p>Quantity {p.quantity}</p>
              <p>Total Price: {p.total_amount}</p>
              <p>Payment Mode: {p.payment_mode}</p>
              <p>Order Date: {formatDate(p.order_date)}</p>
              {(() => {
                if (p.status == "pending") {
                  return (
                    <p>
                      Expected Delivery Date:{" "}
                      {calculateExpectedDeliveryDate(p.order_date, 3)}
                    </p>
                  );
                } else if (p.status == "cancelled") {
                  return (
                    <p>
                      Cancelled On: {new Date(p.cancel_date).toLocaleString()}
                    </p>
                  );
                } else if (p.status == "delivered") {
                  return (
                    <p>
                      Delivery Date:
                      {new Date(p?.delivery_date).toLocaleString()}
                    </p>
                  );
                }
              })()}
              {p.status == "pending" ? (
                <Button
                  onClick={() => {
                    cancelThisItem(p.order_id);
                  }}
                  name="Cancel"
                />
              ) : (
                <></>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default UserOrders;
