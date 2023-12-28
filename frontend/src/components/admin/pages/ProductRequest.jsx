import React, { useEffect, useState } from 'react'
import { ADMIN_APPROVE_PRODUCT, ADMIN_REJECT_PRODUCT, ALLPRODUCTS_TO_BE_APPROVED_BY_ADMIN } from '../../../api/api';
import Button from '../../Button';
function ProductRequestCard(props){
  return(
    <div className='p-3 bg-gray-100 text-center' >
              <p>Name:{props?.product?.name}</p>
              <p>Description:{props?.product?.description}</p>
              <p>Price:{props?.product?.price}</p>
              <p>Quantity:{props?.product?.quantity}</p>
              {/* <Button name="Reject" onClick={()=>handleReject(product?.id)}/>
              <Button name="Approve" onClick={()=>handleApprove(product?.id)}/> */}
              <button className='bg-black text-white p-1 m-2' onClick={()=>{
                props.handleReject(product?.id);
              }}>Reject</button>
              <button className='bg-black text-white p-1 m-2' onClick={()=>{
                props.handleApprove(product?.id);
              }}>Approve</button>
              </div>
  )
}

function ProductRequest() {
  const [products,setProducts]=useState([]);
  useEffect(()=>{
    fetch(ALLPRODUCTS_TO_BE_APPROVED_BY_ADMIN,{
      method:'get',
      credentials:'include'
    })
    .then(res=>{
      if(res.status==200){
        return res.json();
      }
    })
    .then(data=>{
      setProducts(data);
      console.log(data);
    })
  },[])

  function onReject(id){
    setProducts(products.filter(p=>{
      return p.id!=id;
    }));
  
  }
  function handleReject(id){
  console.log('rejected')
  fetch(ADMIN_REJECT_PRODUCT+ id,{
    method:'get',
    credentials:'include'
  }).then(res=>{
    if(res.ok){
    }
  })
  }
  function handleApprove(id){
  console.log('approved');
  fetch(ADMIN_APPROVE_PRODUCT+ id,{
    method:'get',
    credentials:'include'
  }).then(res=>{
    if(res.ok){
      onReject(id);
    }
  })
  }
  return (

      products.map((product,ind)=>{
      return(
             <ProductRequestCard key={product.id} 
             product={product}
             handleReject={handleReject}
            handleApprove={handleApprove} /> 
            )
      })
     
  )
}

export default ProductRequest
