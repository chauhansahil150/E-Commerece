import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import UserState from './context/user/userState';
import Header from './components/header/header';

 const AdminApp=()=> {
  return (
    <>
    <Header/>
     <Outlet/>
    </>
  )
}
export default AdminApp;
