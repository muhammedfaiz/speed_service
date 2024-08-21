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
import Checkout from "./pages/user/Checkout";
import SuccessOrderPage from "./pages/user/SuccessOrderPage";
import BookingsPage from "./pages/user/BookingsPage";
import BookingDetailsPage from "./pages/user/BookingDetailsPage";
import CartPage from "./pages/user/CartPage";
import EmployeeRequestPage from "./pages/employee/EmployeeRequestPage";
import ServiceAdd from "./pages/admin/ServiceAdd";
import EditService from "./pages/admin/EditService";
import AddCategoryPage from "./pages/admin/AddCategoryPage";
import EmployeeTasks from "./pages/employee/EmployeeTasks";
import HistoryPage from "./pages/employee/HistoryPage";

function App() {
  return (
    <BrowserRouter>
    <Routes>

      {/* User Routes */}
      <Route path="/signup" element={<RegisterationPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<HomePage/>}/>
      <Route path="/service/:id" element={<ServiceBookingPage/>}/>
      <Route path="/cart" element={<CartPage/>}/>
      <Route path="/checkout/:id" element={<Checkout/>}/>
      <Route path="/success" element={<SuccessOrderPage/>}/>
      <Route path="/bookings" element={<BookingsPage/>}/>
      <Route path="/booking-details/:id" element={<BookingDetailsPage/>}/>

      {/* Admin Routes */}
      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route element={<AdminAuth/>}>
      <Route path="/admin/dashboard" element={<Dashboard/>}/>
      <Route path="/admin/users" element={<UserList/>}/>
      <Route path="/admin/categories" element={<Category/>}/>
      <Route path="/admin/add-category" element={<AddCategoryPage/>}/>
      <Route path="/admin/applicants" element={<ApplicationList/>}/>
      <Route path="/admin/employee" element={<EmployeeList/>}/>
      <Route path="/admin/services" element={<ServicePage/>}/>
      <Route path="/admin/add-service" element={<ServiceAdd/>}/>
      <Route path="/admin/edit-service/:id" element={<EditService/>}/>
      </Route>

      

      {/* Employee Routes */}
      <Route path="/employee/application" element={<ApplicationPage/>}/>
      <Route path="/employee/success" element={<SuccessPage/>}/>
      <Route path="/employee/login" element={<EmployeeLogin/>}/>
      <Route element={<EmployeeAuth/>}>
      <Route path="/employee/dashboard" element={<EmployeeDashboard/>}/>
      <Route path="/employee/services" element={<EmployeeServices/>}/>
      <Route path="/employee/requests" element={<EmployeeRequestPage/>}/>
      <Route  path="/employee/tasks" element={<EmployeeTasks/>}/>
      <Route path="/employee/history" element = {<HistoryPage/>}/>
      </Route>
      
    </Routes>
    <ToastContainer />
    </BrowserRouter>
  )
}


export default App
