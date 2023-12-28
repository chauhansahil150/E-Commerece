import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Outlet } from 'react-router-dom'
import Header from './components/header/header'
import UserState from './context/user/userState'
import CartState from './context/cart/cartState'
import { useEffect } from 'react'
import { CHECK_IS_LOGGED_IN } from './api/api'
import { useContext } from 'react'
import UserContext from './context/user/userContext'

export default function UserApp() {
  const [count, setCount] = useState(0);
  const {user,setUser}=useContext(UserContext);
  const [isLoading,setIsLoading]=useState(true);
  useEffect(()=>{
    setIsLoading(true);
    fetch(CHECK_IS_LOGGED_IN,{
      method:'get',
      credentials:'include'
    }).then(res=>{
      if(res.ok){
        return res.json();
      }
    }).then(data=>{
      if(data.isLogin){
        setUser(JSON.parse(window.sessionStorage.getItem('user')));
        setIsLoading(false);
      }else{
        window.sessionStorage.removeItem('user');
        setIsLoading(false)
      }
    })
  },[])
  return !isLoading?(
    <>
   <Header/>
     <CartState>
     <Outlet/>
     </CartState>
    </>
  ):(
    <div className="">
      loading..........
    </div>
  )
}
