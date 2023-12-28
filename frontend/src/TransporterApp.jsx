import React from "react";
import Header from "./components/header/header";
import { Outlet } from "react-router-dom";
const TransporterApp=()=>{
    return(
        <>
        <Header/>
        <Outlet/>
        </>
    )
}
export default TransporterApp;