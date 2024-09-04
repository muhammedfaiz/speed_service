import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom";


const UserAuth = () => {
    const {user,token} = useSelector(store=>store.user);
  return (
    user && token? <Outlet/>:<Navigate to="/login"/>
  )
}
export default UserAuth