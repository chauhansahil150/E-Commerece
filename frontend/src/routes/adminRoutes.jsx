import AdminHome from "../components/admin/pages/AdminHome";
import SellerRequest from "../components/admin/pages/SellerRequest";
import ProductRequest from "../components/admin/pages/ProductRequest";
import ChangePassword from "../pages/ChangePassword";
import Chart from "../components/seller/pages/Chart";
const adminRoutes=[
    {
        path:'home',
        element:<AdminHome/>
    },
    {
        path:'seller-request',
        element:<SellerRequest/>
    },
    {
        path:'product-request',
        element:<ProductRequest/>
    },
    {
        path:'change-password',
        element:<ChangePassword />
    },
    {
        path:'chart',
        element:<Chart />
    }
];
export default adminRoutes;