import React, { useContext, useState, useEffect } from "react";
import { json, useNavigate } from "react-router-dom";
import UserContext from "../context/user/userContext";
import { BACKEND_URL } from "../config.jsX";
import LabelInput from "../components/Form/LabelInput";
import Button from "../components/Form/Button";
import FormLink from "../components/Form/FormLink";
import "./css/form.css";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType,setUserType]=useState('user');
  const [urlPath,setUrlPath]=useState('login');
  const [loading, setLoading] = useState(false); // Added loading state
  const userData = useContext(UserContext);
  const [err,setErr]=useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true); // Set loading to true before the fetch

      const response = await fetch(`${BACKEND_URL}/${urlPath}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      if (response.status === 200) {
        const user = await response.json();
        userData.setUser({
          ...user,
          isLogin: true,
        });
        window.sessionStorage.setItem('user',JSON.stringify({
          ...user,
          isLogin:true
        }));
        console.log(window.sessionStorage.getItem('user'));
        console.log('role..........',userData.user.role)
        if (userType === 'user') {
         if(user?.role=='admin'){
          navigate("/admin/home");    
         }else{
          navigate("/user");
         }
        } else if (userType === 'transporter') {
          navigate("/transporter/home");
        }else if(userType=='seller'){
          navigate('/seller/home');
        }
      } else if(response.status==401){
        setErr('Wrong Password');
      }else if(response.status==404){
        setErr('User not found');
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false); // Set loading to false after the fetch

      // Navigation logic moved to useEffect
    }
  };

  return (
    <div className="container mx-auto">
      <form className="form-container" onSubmit={handleSubmit}>
      <div className="text-center font-bold">{userType.toLocaleUpperCase()} LOGIN</div>
        <LabelInput
          name="email"
          type="email"
          data="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <LabelInput
          name="password"
          type="password"
          data="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className="text-red-600">{err}</p>
        <Button name="Login" type="submit" />
        <FormLink
          path="/register"
          name="Register"
          data="Don't have an account?"
        />
        <FormLink
          path="/user/forgot-password"
          name="Click"
          data="Forgot Password?"
        />
        {/* <FormLink path="/seller/login" name="Click" data="Seller?" />
        <FormLink path="/transporter/login" name="Click" data="Transporter ?" /> */}
        <div className="">
        Seller?<span onClick={()=>{
          setUserType('seller');
          setUrlPath('seller/login');
        }} className='hover:cursor-pointer text-sky-600'>Seller</span>
        </div>
        <div>
        Transporter?<span onClick={()=>{
          setUserType('transporter');
          setUrlPath('transporter/login');
        }}   className='hover:cursor-pointer text-sky-600'>Transporter</span>
        </div>
        <div>
        {
          userType=='user'?<></>:
          <div>User?
            <span className='hover:cursor-pointer text-sky-600' onClick={()=>{
            setUserType('user');
            setUrlPath('login');
          }}  >User</span>
          </div>
        }
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
