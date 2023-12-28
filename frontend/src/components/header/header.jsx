import { useContext, useEffect, useState } from "react";
import { HeaderLink } from "../headerItem/headerItem";
import "./header.css";
import UserContext from "../../context/user/userContext";
import { useNavigate } from "react-router-dom";
import { CHECK_IS_LOGGED_IN, LOGOUT } from "../../api/api";

const Header = () => {
  const navigate = useNavigate();
  const userData = useContext(UserContext);
  const [role]=useState(userData?.user?.role);
  const rolePath={
    user:'/user/change-password',
    seller:'/seller/change-password',
    transporter:'/transporter/change-password',
    admin:'/admin/change-password'
  }
  console.log('userData',userData.user);
  useEffect(() => {
    fetch(CHECK_IS_LOGGED_IN, {
      method: "get",
      credentials: "include",
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => {
        if (data.isLogin) {
          userData.setUser(JSON.parse(window.sessionStorage.getItem("user")));
          console.log("user....", userData.user);
          // console.log("user....", window.sessionStorage.getItem("user"));
        } else {
          window.sessionStorage.removeItem("user");
        }
      });
  }, []);

  function logout(e) {
    e.preventDefault();
    window.sessionStorage.clear();
    userData.setUser({ isLogin: false, name: "Guest" });
    fetch(LOGOUT, {
      credentials: "include",
    });
    window.sessionStorage.removeItem('user');
    navigate('/user');

  }

  return (
    <div className="header">
      <div className="header-left">
        {(() => {
          if (userData?.user?.role == "user") {
            return (
              <>
                <HeaderLink path="/user" name="Home" />
                <HeaderLink path="/user/orders" name="My Orders" />
              </>
            )
          }else if(userData?.user?.role == "admin"){
           return(
            <>
             <HeaderLink path="/admin/home" name="Home" />
            <HeaderLink
            path="/admin/seller-request"
            name="Check Seller Request"
          />
           <HeaderLink
            path="/admin/product-request"
            name="Check Product Request"
          />
            <HeaderLink
            path="/admin/chart"
            name="Chart"
          />
            </>
           )
          }else if(userData?.user?.role == "seller"){
            return(
              <>
              <HeaderLink path="/seller/home" name="Home" />
              <HeaderLink path="/seller/product/add-new" name="Add-Product"/>
              <HeaderLink path="/seller/customer-placed-order" name="Orders"/>
              <HeaderLink path="/seller/chart" name="Chart"/>
              </>
            )
          }else if(userData?.user?.role=="transporter"){
            return(
              <HeaderLink path="/transporter/home" name="Home"/>
            )
          }else{
            <HeaderLink path="/user/home" name="Home"/>
          }
        })()}
        {/* {userData?.user?.role == "user" && (
          <HeaderLink path="/user/orders" name="My Orders" />
        )} */}
      </div>

      <div className="header-right">
        {role!=undefined && <HeaderLink path={
          rolePath[role]
        } name='Change-Password'/>}
        {userData?.user?.role=="user" && (<HeaderLink path="/user/cart" name="Cart" />)}
        {userData?.user?.role=="transporter" && <span>{userData?.user?.area_allotted}</span>}
        {console.log(userData)}
        <span>{userData?.user?.name } </span>
        <span className="text-gray-400 p-2">{userData?.user?.role?.toUpperCase()}</span>
        {(userData?.user?.isLogin) ? (
          <HeaderLink onClick={logout} path="/" name="Logout" />
        ) : (
          <HeaderLink path="/user/login" name="Login" />
        )}
      </div>
    </div>
  );
};
export default Header;
