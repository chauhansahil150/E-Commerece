import React, { useContext, useEffect, useState } from "react";
import Button from "../../Button";
import { addProductBySeller } from "../../../api/apiFunction";
import UserContext from "../../../context/user/userContext";
const AddProduct = () => {
  const {user,setUser}=useContext(UserContext);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [description, setDescription] = useState("");
  const [images,setImages]=useState([]);
  const [nameErr, setNameErr] = useState("");
  const [priceError, setpriceError] = useState("");
  const [quantityError, setQuantityError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [submitMsg,setSubmitMsg]=useState('');
  function checkNameErr(val) {
    if (val?.trim().length <= 0) {
      setNameErr("Enter Name");
    } else {
      setNameErr();
    }
  }
  function checkQuantityErr(val) {
    if (val?.length <= 0) {
      setQuantityError("Enter Quantity");
    } else {
      setQuantityError();
    }
  }
  function checkPriceErr(val) {
    if (val?.length <= 0) {
      setpriceError("Enter Price");
    } else {
      setpriceError();
    }
  }
  function checkDescriptionError(val) {
    if (val?.trim().length <= 0) {
      setDescriptionError("Enter Description");
    } else {
      setDescriptionError();
    }
  }
  async function handleSubmit(e){
    e.preventDefault();
    setSubmitMsg('Please wait for a while...');
    const formData=new FormData();
    formData.append('name',name);
    formData.append('price',price);
    formData.append('quantity',quantity);
    formData.append('description',description);
    formData.append('sellerId',user.id);
    console.log('user.......',user);
    for (let i = 0; i < images.length; i++) {
      formData.append('images', images[i]);
    }
    console.log('formdata.....',formData);
    const msg=await addProductBySeller(formData);
    setSubmitMsg(msg);
    
  }
  return (
    <div className="flex justify-center items-center flex-col">
      <form onSubmit={handleSubmit} method="post" encType="multipart/form-data">
      <h1 className="font-black text-center">Welcome</h1>
      <div className="">
        <input
          type="text"
          placeholder="Enter product Name"
          onChange={(e) => {
            setName(e?.target?.value);
            checkNameErr(e?.target?.value);
          }}
        />
        <p className="text-red-600">{nameErr}</p>
        <input
          type="number"
          placeholder="Enter Product Price"
          onChange={(e) => {
            setPrice(e.target.value);
            checkPriceErr(e.target.value);
          }}
        />
        <p className="text-red-600">{priceError}</p>

        <input
          type="number"
          placeholder="Enter Product Quantity"
          onChange={(e) => {
            setQuantity(e.target.value);
            checkQuantityErr(e.target.value);
          }}
        />
        <p className="text-red-600">{quantityError}</p>

        <input
          type="text"
          id=""
          placeholder="Enter Descriptions"
          onChange={(e) => {
            setDescription(e.target.value);
            checkDescriptionError(e.target.value);
          }}
        />
        <p className="text-red-600">{descriptionError}</p>
        <input type="file" name="images" id="" multiple accept="image/*"
        onChange={(e)=>{
          setImages(e.target.files);
        }}
        />
        <input className="text-white bg-black hover:cursor-pointer hover:bg-gray-300 hover:text-black" type="submit" value="Submit" />
        <p className="text-blue-600">{submitMsg}</p>
      </div>
      </form>
    </div>
  );
};
export default AddProduct;
