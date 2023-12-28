import AddProduct from "../components/seller/pages/AddProduct";
import Chart from "../components/seller/pages/Chart";
import PlacedOrders from "../components/seller/pages/Placedorders";
import SellerHome from "../components/seller/pages/SellerHome";
import ChangePassword from "../pages/ChangePassword";

const sellerRoutes=[
 {
    path:'home',
    element:<SellerHome/>
 },
 {
   path:'product/add-new',
   element:<AddProduct/>
 },
 {
   path:'customer-placed-order',
   element:<PlacedOrders/>
 } ,
 {
  path:'change-password',
  element:<ChangePassword />
 },
 {
  path:'chart',
  element:<Chart />
 }
];
export default sellerRoutes;