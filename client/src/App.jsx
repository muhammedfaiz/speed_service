import RegisterationPage from "./pages/user/RegisterationPage";
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import './App.css';
import LoginPage from "./pages/user/LoginPage";
import AdminLoginPage from './pages/admin/LoginPage';
import HomePage from "./pages/user/HomePage";
import AdminAuth from "./components/admin/AdminAuth";
import Dashboard from "./pages/admin/Dashboard";
import UserList from "./pages/admin/UserList";
import ApplicationPage from "./pages/employee/ApplicationPage";
// import SplashScreen from "./components/user/SplashScreen";
import Category from "./pages/admin/Category";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SuccessPage from "./pages/employee/SuccessPage";
import ApplicationList from "./pages/admin/ApplicationList";
import EmployeeLogin from "./pages/employee/EmployeeLogin";
import EmployeeDashboard from "./pages/employee/EmployeeDashboard";
import EmployeeAuth from "./components/employee/EmployeeAuth";
import EmployeeList from "./pages/admin/EmployeeList";
import ServicePage from "./pages/admin/ServicePage";
import EmployeeServices from "./pages/employee/EmployeeServices";
import ServiceBookingPage from "./pages/user/ServiceBookingPage";

function App() {
  return (
    <BrowserRouter>
    <Routes>

      {/* User Routes */}
      <Route path="/signup" element={<RegisterationPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<HomePage/>}/>
      <Route path="/service/:id" element={<ServiceBookingPage/>}/>

      {/* Admin Routes */}
      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route element={<AdminAuth/>}>
      <Route path="/admin/dashboard" element={<Dashboard/>}/>
      <Route path="/admin/users" element={<UserList/>}/>
      <Route path="/admin/categories" element={<Category/>}/>
      <Route path="/admin/applicants" element={<ApplicationList/>}/>
      <Route path="/admin/employee" element={<EmployeeList/>}/>
      <Route path="/admin/services" element={<ServicePage/>}/>
      </Route>

      

      {/* Employee Routes */}
      <Route path="/employee/application" element={<ApplicationPage/>}/>
      <Route path="/employee/success" element={<SuccessPage/>}/>
      <Route path="/employee/login" element={<EmployeeLogin/>}/>
      <Route element={<EmployeeAuth/>}>
      <Route path="/employee/dashboard" element={<EmployeeDashboard/>}/>
      <Route path="/employee/services" element={<EmployeeServices/>}/>
      </Route>
      
    </Routes>
    <ToastContainer />
    </BrowserRouter>
  )
}


export default App
