import React, { useContext, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import UserApp from './UserApp.jsx'
import './index.css';
import { createBrowserRouter,Outlet,RouterProvider } from 'react-router-dom';
import userRoutes from './routes/userRoutes.jsx';
import UserState from './context/user/userState.jsx';
import AdminApp from './AdminApp.jsx';
import adminRoutes from './routes/adminRoutes.jsx';
import sellerRoutes from './routes/sellerRoutes.jsx';
import SellerApp from './SellerApp.jsx';
import TransporterApp from './TransporterApp.jsx';
import transporterRoutes from './routes/transporterRoutes.jsx';
import UserContext from './context/user/userContext.jsx';
import Header from './components/header/header.jsx';
import EmptyMessage from './components/EmptyMessage.jsx';

const IsAuthorized=(props)=>{
  const {user,setUser}=useContext(UserContext);
  useEffect(()=>{
    setUser(JSON.parse(window.sessionStorage.getItem('user')));
  },[])
  console.log('object....',user);
  if(user?.role==props.role){
    return <AdminApp/>
  }else{
    return (
      <div className="">Not Authorized</div>
    )
  }
}
const router=createBrowserRouter([
  {
    path:"/user",
    element:<UserApp/>,
    children:userRoutes
  },
  {
    path:"/admin",
    element:<IsAuthorized role='admin'></IsAuthorized>,
    children:adminRoutes
  },
  {
    path:"/seller",
    element:<IsAuthorized role='seller'></IsAuthorized>,
    children:sellerRoutes
  },
  {
    path:"/transporter",
    element:<IsAuthorized role='transporter'><TransporterApp/></IsAuthorized>,
    children:transporterRoutes
  },
  {
    path:'*',
    element:<>
    <Header/>
    <EmptyMessage message={"Page Not Found"}/>
    </>
  }
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <UserState> <RouterProvider router={router}/></UserState>
  </React.StrictMode>,
)
