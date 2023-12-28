import ChangePassword from '../pages/ChangePassword';
import Home from '../pages/Home'
import LoginForm from '../pages/LoginForm';
import Buy from '../pages/buyPage';
import Cart from '../pages/cartPage';
import UserOrders from '../pages/myOrderPage';
import Email from '../pages/Email';
import Register from '../pages/Register';
const userRoutes = [
  {
    path:'',
    element: <Home />,
  },
  {
    path: "cart",
    element: <Cart/>,
  },
  {
    path: "myOrder",
    element: <h3>orders</h3>,
  },
  {
    path:"register",
    element:<Register />
  },
  {
    path: "login",
    element: <LoginForm />,
  },
  {
    path: "dashboard",
    element: <Home />,
  },
  {
    path:'buy',
    element:<Buy />
  },
  {
    path:'orders',
    element:<UserOrders/>
  },
  {
    path:'change-password',
    element:<ChangePassword/>
  },
  {
    path:'forgot-password',
    element:<Email/>
  }
];

export default userRoutes;
