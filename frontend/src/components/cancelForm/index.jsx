import React, { useState } from 'react'
import style from './style.module.css'
import Button from '../Button'
export default function CancelReason(props) {
    const [error,setError]=useState(null);
    const [reason,setReason]=useState('');
    function cancelOrder(){
        if(reason.length<10){
            setError('Give proper reason')
            return;
        }else{
            setError(null);
        }
        props.cancelReason(props.order_id,reason)
        
    }
  return (
    <div id="reason" className={style.container} >
      <button  className='absolute top-2  font-bold right-2'>X</button>
      <div className="form">
        <label htmlFor="">Tell us why are you cancelling:</label>
        <textarea name="reason" id="reasontext" cols="30" rows="10"
        onChange={(e) => {
            setReason(e.target.value.trim());
          }}
        ></textarea>
        <p id={style.reason_err}>{error}</p>
        <Button onClick={()=>{
            cancelOrder();
        }} name='Cancel Order' />
      </div>
    </div>
  )
}
