import RegisterationPage from "./pages/user/RegisterationPage";
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import './App.css';
import LoginPage from "./pages/user/LoginPage";
import AdminLoginPage from './pages/admin/LoginPage';
import HomePage from "./pages/user/HomePage";
import AdminAuth from "./components/admin/AdminAuth";
import Dashboard from "./pages/admin/Dashboard";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      {/* User Routes */}
      <Route path="/signup" element={<RegisterationPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<HomePage/>}/>

      {/* Admin Routes */}
      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route element={<AdminAuth/>}>
      <Route path="/admin/dashboard" element={<Dashboard/>}/>
      </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
