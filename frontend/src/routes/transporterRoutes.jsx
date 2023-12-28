import TransporterHome from "../components/transporter/TransporterHome"
import ChangePassword from "../pages/ChangePassword";
const transporterRoutes=[
    {
        path:'home',
        element:<TransporterHome />
    },
    {
        path:'change-password',
        element:<ChangePassword />
    }
]
export default transporterRoutes;