import React, { useContext, useState } from 'react';
import { PLACE_ORDER_API } from '../api/api';
import UserContext from '../context/user/userContext';
import { useNavigate } from 'react-router-dom';
import style from './css/buyPage.module.css'
const Buy = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipcode: '',
    payment_mode: 'cod',
  });
  const {user,setUser}=useContext(UserContext);
  const [placeOrderStatus,setPlaceOrderStatus]=useState(false);
  const navigate=useNavigate();

  const [errors, setErrors] = useState({
    name: '',
  });

  const validateForm = () => {
    const newErrors = { ...errors };
    if (formData.name.trim() === '') {
      newErrors.name = 'Name is required';
    } else {
      newErrors.name = '';
    }

    // Add validation for other fields

    setErrors(newErrors);

    // Check if there are any errors
    return Object.values(newErrors).every((error) => error === '');
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!user.isLogin){
        navigate('/user/login');
        return;
    }
    fetch(PLACE_ORDER_API,{
        method:'post',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(formData),
        credentials:'include'
    }).then(res=>{
      if(res.ok){
        return res.json();
      }
    }).then(data=>{
      if(data?.success){
        setPlaceOrderStatus(true);
      }
    })

    if (validateForm()) {
      // Form submission logic goes here
      console.log('Form submitted:', formData);
    } else {
      console.log('Form validation failed');
    }
  };

  

  return (
    <div className={style.container}>
      <h1>Place Order Form</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="name">
          Name <span className={style.required}>*</span>
        </label>
        <input
          type="text"
          name="name"
          className={style.input}
          value={formData.name}
          onChange={handleChange}
          required
        />
        <p className="error">{errors.name}</p>

        <label htmlFor="phone">
          Phone Number <span className={style.required}>*</span>
        </label>
        <input
          type="tel"
          name="phone"
          className={style.input}
          value={formData.phone}
          onChange={handleChange}
          required
        />

        <label htmlFor="address">
          Address <span className={style.required}>*</span>
        </label>
        <input
          type="text"
          name="address"
          placeholder="HNO locality"
          className={style.input}
          value={formData.address}
          onChange={handleChange}
          required
        />

        <label htmlFor="city">
          City <span className={style.required}>*</span>
        </label>
        <input
          type="text"
          name="city"
          className={style.input}
          value={formData.city}
          onChange={handleChange}
          required
        />

        <label htmlFor="state">
          State <span className={style.required}>*</span>
        </label>
        <input
          type="text"
          name="state"
          className={style.input}
          value={formData.state}
          onChange={handleChange}
          required
        />

        <label htmlFor="zipcode">
          Zip Code <span className={style.required}>*</span>
        </label>
        <input
          type="text"
          name="zipcode"
          className={style.input}
          value={formData.zipcode}
          onChange={handleChange}
          required
        />

        <label htmlFor="payment_mode">
          Payment Mode <span className={style.required}>*</span>
        </label>
        <select
          name="payment_mode"
          className={style.input}
          value={formData.payment_mode}
          onChange={handleChange}
        >
          <option value="cod">Cash on Delivery (COD)</option>
        </select>

        <p style={{ color: 'green' }}>{(placeOrderStatus?'Placed Order Successfully':<></>)}</p>

        <button  className={style.button} type="submit">Place Order</button>
      </form>
    </div>
  );
};

export default Buy;
