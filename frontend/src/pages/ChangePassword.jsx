import React, { useContext, useState } from 'react'
import UserContext from '../context/user/userContext';
// import { USER_CHANGE_PASSWORD } from '../api/api';
import { BACKEND_URL } from '../config.jsX';
function ChangePassword() {
    const [newPass,setNewPass]=useState();
const [confirmPass,setConfirmPass]=useState('');
const [newPassError,setNewPassError]=useState('');
const [confirmPassError,setConfirmPassError]=useState('');

const [message,setMessage]=useState('');

const {user}=useContext(UserContext);
    function handleSubmit(e){
        e.preventDefault();
        validateConfirmPassword(confirmPass);
        validateNewPassword(newPass);
        if(newPassError.length!=0 || confirmPassError.length!=0){
            return;
        }else{
            console.log(user?.role);
            if(user?.role==undefined){
                setMessage('Please Login First....');
                return;
            }
            fetch(`${BACKEND_URL}/${user?.role}/change-password/`+ user?.id,{
                method:'post',
                headers:{
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({
                    new_password:newPass,
                }),
                credentials:'include'
            }) .then(res=>{
                if(res.status==200){
                    return res.json();
                }
            })
            .then(data=>{
                setMessage(data?.message);
            })
        }


    }
    function validateNewPassword(newPass){
        if (newPass.length < 8) {
            setNewPassError('New Password must be at least 8 characters long');
        } else if (!/[A-Z]/.test(newPass)) {
            setNewPassError('New Password must contain at least one uppercase letter');
        }
         else if (!/[!@#$%^&*(),.?":{}|<>]/.test(newPass)) {
            setNewPassError('New Password must contain at least one special character');
        } else if (!/[0-9]/.test(newPass)) {
            setNewPassError('New Password must contain at least one number');
        }else{
            setNewPassError('');
        }
    }
    function validateConfirmPassword(value){
        if(newPass!=value){
            setConfirmPassError('Password does not match');
        }else{
            setConfirmPassError('');
        }
    }
  return (
    <div className='flex justify-center'>
        <form onSubmit={handleSubmit} method='post'>
        <div className="form-group">
                <label htmlFor="new_password">New Password:</label>
                <input type="password" name="new_password" id="new-password"
                onChange={(e)=>{
                    setNewPass(e.target.value);
                    validateNewPassword(e.target.value);
                    setMessage('');
                }}
                />
                <p className='text-red-600' id="new-password-error" >{newPassError}</p>
            </div>
            <div className="form-group">
                <label htmlFor="confirm-password">Confirm Password:</label>
                <input type="password" name="confirm-password" id="confirm-password"
                  onChange={(e)=>{
                    setConfirmPass(e.target.value);
                    validateConfirmPassword(e.target.value);
                    setMessage('');
                }}
                />
                <p id="confirm-password-error" className="error text-red-600">{confirmPassError}</p>
            </div>
            <div className="form-group">
                <p className='text-green-600'>{message}</p>
             </div>
             <input className="text-white bg-blue-700 hover:cursor-pointer hover:bg-blue-500 hover:text-white" type="submit" value="Submit" />

        </form>
    </div>
  )
}

export default ChangePassword
