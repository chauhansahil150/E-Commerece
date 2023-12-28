import React from "react";
import { Outlet } from "react-router-dom";
const SellerApp=()=>{
    return(
        <>
        <Header/>
        <Outlet/>
        </>
    )
}
export default SellerApp;      