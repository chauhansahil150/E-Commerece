import React, { useEffect, useState } from 'react'
import { BACKEND_URL } from '../../../config.jsX';
import { APPROVE_SELLER, BECOMING_SELLER_REQUEST, REJECT_SELLER } from '../../../api/api';
import Button from '../../Button';
import ImageSlider from '../../slider/SimpleSlider';
import EmptyMessage from '../../EmptyMessage';
function ViewSellerDetails(props){
    const aadharImage=BACKEND_URL+ '/'+props.user.aadhar_image;
    const panImage=BACKEND_URL+'/'+props.user.pan_image;
    const profileImage=BACKEND_URL+'/'+props.user.profile_image;
    const storeImage=BACKEND_URL+'/'+props.user.store_image;
    const images=[aadharImage,panImage,profileImage,storeImage];
    console.log('images',images);
    console.log('hello');
    return(
        <div className='p-3 bg-gray-100 text-center fixed top-0 left-0 right-0' >
                     <ImageSlider images={images}/>
                     <br />
                     <br />
         <div>
              <p>Name:{props.user.f_name} {props.user.l_name}</p>
        <p>Gender:{props.user.gender}</p>
        <p>Email:{props.user.email}</p>
        <p>Mobile No:{props.user.mobile_no}</p>
        <p>Date of Birth:{props.user.dob}</p>
        <p>Business Name:{props.user.business_name}</p>
        <p>Business Address:{props.user.business_address}</p>
        <p>Aadhar Number:{props.user.aadhar_no}</p>
        <p>Pan Number:{props.user.pan_no}</p>
        <p>GST Number:{props.user.gst_no}</p>
        <Button name="Close" onClick={props.handleCloseBtn}/>
         </div>
    </div> 
        )
}
function SellerRequest() {
    const [users,setUsers]=useState([]);
    const [isViewDescriptionClicked,setIsViewDescriptionClicked]=useState(false);
    const [isSellerRejected,setIsSellerRejected]=useState(false);
    const [isSellerApproved,setIsSellerApproved]=useState(false);
    useEffect(()=>{
        fetch(BECOMING_SELLER_REQUEST,{
            method:'get',
            credentials:'include'
        }).then(res=>{
            if(res.status==200){
                return res.json();
            }
        }).then(data=>{
            setUsers(data);
        })
        .catch(error=>{
            console.log(error);
        })
    },[])
    console.log(users);

    function handleCloseBtn(){
        setIsViewDescriptionClicked(!isViewDescriptionClicked);
    }

    function handleReject(seller_id){
        fetch(REJECT_SELLER+seller_id,{
            credentials:'include'
        })
        .then(res=>{
            if(res.ok){
                setIsSellerRejected(true);
            }
        })
        // setIsSellerRejected(true);
    }
    function handleApprove(seller_id){
        fetch(APPROVE_SELLER+seller_id,{
            credentials:'include'
        })
        .then(res=>{
            if(res.ok){
                setIsSellerApproved(true);
            }
        })
        // setIsSellerApproved(true);
    }
  return !users?
  (
  <EmptyMessage message={"No Seller Request Yet"}/>
  )
  :
  ( 
    <>
    {users.map((user, ind) => (
        <div key={user.seller_id}>
          {isViewDescriptionClicked && <ViewSellerDetails user={user} handleCloseBtn={handleCloseBtn} />}
          {isSellerRejected ? (
            <></>
          ) : isSellerApproved ? (
            <></>
          ) : (
            <div className='p-3 bg-gray-100 text-center'>
              <p>Name: {user.f_name} {user.l_name}</p>
              <p>Gender: {user.gender}</p>
              <p>Email: {user.email}</p>
              <p>Mobile No: {user.mobile_no}</p>
              <p>Date of Birth: {user.dob}</p>
              <Button name="Reject" onClick={() => handleReject(user?.seller_id)} />
              <Button name={isSellerApproved ? "Approved" : "Approve"} onClick={() => handleApprove(user?.seller_id)} />
              <Button name="View Description" onClick={() => setIsViewDescriptionClicked(!isViewDescriptionClicked)} />
            </div>
          )}
        </div>
      ))
    }     
    </> 
  )
}

export default SellerRequest;
