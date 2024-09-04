import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom";

const EmployeeAuth = () => {
    const {employee,token}=useSelector(store=>store.employee);
  return (
    employee && token ? <Outlet/>:<Navigate to="/employee/login"/>
  )
}
export default EmployeeAuth;