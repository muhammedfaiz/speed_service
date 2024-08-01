import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom";

const AdminAuth = () => {
    const {admin,token}=useSelector(store=>store.admin);
  return (
    admin && token ? <Outlet/>:<Navigate to='/admin/login'/>
  )
}
export default AdminAuth