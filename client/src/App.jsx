import RegisterationPage from "./pages/user/RegisterationPage";
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import './App.css';
import LoginPage from "./pages/user/LoginPage";
import HomePage from "./pages/user/HomePage";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/signup" element={<RegisterationPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<HomePage/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
