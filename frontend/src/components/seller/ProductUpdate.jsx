import React, { useState } from "react";
import Button from "../Button";
import { handleUpdate,handleDelete } from "../../api/apiFunction";
import { BACKEND_URL } from "../../config.jsX";

function ProductUpdate(props) {
    const [name,setName]=useState(props?.product?.name);
    const [price,setprice]=useState(props?.product?.price);
    const [quantity,setQuantity]=useState(props?.product?.quantity);
    const [description,setDescription]=useState(props?.product?.description);
    const [isDeleteClicked,setIsDeleteClicked]=useState(false);
    const id=props?.product?.id;
  return (
    isDeleteClicked?<></>:
    <div className="drop-shadow-xl	w-64 rounded-md flex  flex-col m-4 ">
      <p>Status:{props?.product?.status}</p>
      Name:
      <input type="text" value={name}
      onChange={(e)=>{
        setName(e.target.value);
      }}
      />
      Price:
      <input type="number" value={price}
      onChange={(e)=>{
        setprice(e.target.value);
      }}
      />
      Quantity:
      <input type="number" value={quantity}
      onChange={(e)=>{
        setQuantity(e.target.value);
      }}
      />
  <img
    className="mx-auto m-1"
    src={props?.product?.image}
    width="150px"
    height="150px"
    alt="Alternate Text"
  />

      Description:
      <textarea
        name=""
        id=""
        className="resize-none"
        cols="20"
        rows="5"
        value={description}
        onChange={(e)=>{
            setDescription(e.target.value);
          }}
      ></textarea>
     <div className="flex justify-between">
     <Button name="Update" onClick={()=>{
        handleUpdate({id,name,price,quantity,description})
     }}/>
      <Button name="Delete" onClick={()=>{
        handleDelete(props?.product?.id,setIsDeleteClicked);
      }} />
     </div>
    </div>
  );
}

export default ProductUpdate;
