import React, { useState } from "react";
import { USER_FORGOT_PASSWORD } from "../api/api";

const Email=()=>{
    const [email,setEmail]=useState('');
    const emailRegx=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const [emailErr,setEmailErr]=useState(false);
    const [message,setMessage]=useState('');
    console.log(emailErr);
   function checkEmailErr(){
    if(!emailRegx.test(email)){
        setEmailErr(true);
    }else{
        setEmailErr(false);
    }
   }
   function handleSubmit(e){
    e.preventDefault();
    checkEmailErr();
    if(emailErr){
        return;
    }else{
        // const formData=new FormData();
        // formData.append('email',email)
        fetch(USER_FORGOT_PASSWORD,{
            method:'post',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({email}),
        })
        .then(res=>{
            if(res.status==200){
                return res.json();
            }
        })
        .then(data=>{
            setMessage(data?.message);
        })
        .catch(err=>console.log(err));
    }
   }
    return (
        <div className="flex justify-center items-center flex-col">
           <form onSubmit={handleSubmit} method="post">
           <input type="text"
            onChange={(e)=>{
                setEmail(e.target.value);
                checkEmailErr();
            }}
            placeholder="Enter Email"
            />
            {emailErr?<div className="text-red-600">Invalid Email</div>:<></>}
            <p className="text-green-500">{message}</p>
            <input className="text-white bg-black hover:cursor-pointer hover:bg-gray-300 hover:text-black" type="submit" value="Submit" />           
            </form>

        </div>
    )
}
export default Email;